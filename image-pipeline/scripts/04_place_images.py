#!/usr/bin/env python3
"""
Plan or apply image placements into HTML files.
"""

from __future__ import annotations

import argparse
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from dotenv import load_dotenv

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.html_parser import (
    DEFAULT_SAFE_CONTAINERS,
    DEFAULT_SKIP_CONTAINERS,
    element_css_context,
    element_selector,
    find_anchor_elements,
    find_closest_container,
    has_skip_container,
    parse_html,
)
from lib.io_utils import load_json, load_yaml, save_json, write_text


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _load_config() -> Dict:
    return load_yaml(PIPELINE_ROOT / "config.yaml") or {}


def _is_html(path: Path) -> bool:
    return path.suffix.lower() == ".html"


def _choose_dest_dir(config: Dict, root: Path) -> Path:
    candidates = config.get("images_dest_candidates", [])
    for candidate in candidates:
        dest = root / candidate
        if dest.exists():
            return dest
    return root / (candidates[0] if candidates else "public/images/generated")


def _web_path_for(dest_dir: Path, root: Path) -> str:
    rel = dest_dir.relative_to(root).as_posix().strip("/")
    parts = rel.split("/")
    if parts and parts[0] in {"public", "static", "assets"}:
        rel = "/".join(parts[1:])
    return f"/{rel}" if rel else "/"


def _build_img_tag(slot: Dict, src: str) -> str:
    slot_type = slot.get("slot_type", "inline")
    if slot_type == "hero":
        width, height = 1536, 1024
        attrs = {
            "src": src,
            "alt": slot.get("seo_alt_text", ""),
            "width": str(width),
            "height": str(height),
            "loading": "eager",
            "fetchpriority": "high",
            "decoding": "async",
            "data-slot-id": slot["slot_id"],
        }
    else:
        width, height = 800, 533
        attrs = {
            "src": src,
            "alt": slot.get("seo_alt_text", ""),
            "width": str(width),
            "height": str(height),
            "loading": "lazy",
            "decoding": "async",
            "data-slot-id": slot["slot_id"],
        }

    attrs_str = " ".join(f"{k}=\"{v}\"" for k, v in attrs.items())
    return f"<img {attrs_str}>"


def main() -> int:
    parser = argparse.ArgumentParser(description="Plan or apply image placements.")
    parser.add_argument("--apply", action="store_true", help="Modify HTML files.")
    parser.add_argument("--limit", type=int, default=0, help="Limit placements.")
    args = parser.parse_args()

    load_dotenv()
    root = _repo_root()
    config = _load_config()

    manifest = load_json(PIPELINE_ROOT / "generated" / "manifest.json") or {}
    index = load_json(PIPELINE_ROOT / "prompts" / "index.json") or {}
    slots = {slot["slot_id"]: slot for slot in index.get("slots", [])}

    safe_containers = config.get("safe_placement_containers", DEFAULT_SAFE_CONTAINERS)
    skip_complex = config.get("skip_complex_layouts", True)
    allow_markdown = config.get("allow_markdown_placement", False)

    placements = []
    skipped = []

    eligible = [
        entry
        for entry in manifest.get("slots", [])
        if entry.get("status") in {"success", "existing_valid"}
    ]
    fallback_planning = False
    if not eligible:
        fallback_planning = True
        eligible = [{"slot_id": slot_id} for slot_id in slots.keys() if slots[slot_id].get("selected")]

    if args.limit:
        eligible = eligible[: args.limit]

    dest_dir = _choose_dest_dir(config, root)
    web_base = _web_path_for(dest_dir, root)

    for entry in eligible:
        slot_id = entry.get("slot_id")
        slot = slots.get(slot_id)
        if not slot:
            skipped.append({"slot_id": slot_id, "reason": "missing_slot_meta"})
            continue

        page_path = root / slot["page_path"].lstrip("/")
        if not page_path.exists():
            skipped.append({"slot_id": slot_id, "reason": "missing_page", "page_path": str(page_path)})
            continue

        if not _is_html(page_path):
            if allow_markdown:
                skipped.append({"slot_id": slot_id, "reason": "non_html_allowed_plan_only"})
            else:
                skipped.append({"slot_id": slot_id, "reason": "non_html_skipped", "page_path": str(page_path)})
            continue

        html = page_path.read_text(encoding="utf-8", errors="ignore")
        soup = parse_html(html)
        anchors = find_anchor_elements(soup, slot.get("anchor_selector", ""))
        if not anchors or slot.get("anchor_index", 0) >= len(anchors):
            skipped.append({"slot_id": slot_id, "reason": "anchor_not_found", "page_path": str(page_path)})
            continue

        anchor = anchors[slot.get("anchor_index", 0)]
        container = find_closest_container(anchor, safe_containers)
        if not container:
            skipped.append({"slot_id": slot_id, "reason": "no_safe_container", "page_path": str(page_path)})
            continue

        if skip_complex and has_skip_container(anchor, DEFAULT_SKIP_CONTAINERS):
            skipped.append({"slot_id": slot_id, "reason": "container_is_complex", "page_path": str(page_path)})
            continue

        meta_path = PIPELINE_ROOT / "generated" / "images" / "slots" / slot_id / "meta.generated.json"
        meta = load_json(meta_path) if meta_path.exists() else {}
        seo_filename = meta.get("seo_filename", f"{slot_id}.webp")
        web_src = f"{web_base}/{seo_filename}".replace("//", "/")

        existing_img = soup.find("img", attrs={"data-slot-id": slot_id})
        placement_status = "ready"
        if fallback_planning:
            placement_status = "planned_without_generation"
        if existing_img:
            placement_status = "already_present"
        placements.append(
            {
                "slot_id": slot_id,
                "page_path": slot["page_path"],
                "container_selector": slot.get("container_selector") or element_selector(container),
                "container_css_context": slot.get("container_css_context") or element_css_context(container),
                "insertion_point": f"{slot.get('insertion_mode', 'after')} {slot.get('anchor_selector', '')}[{slot.get('anchor_index', 0)}]",
                "status": placement_status,
                "recommended_css": ".generated-image { width: 100%; height: auto; }",
            }
        )

        if args.apply:
            dest_dir.mkdir(parents=True, exist_ok=True)
            slot_image_dir = PIPELINE_ROOT / "generated" / "images" / "slots" / slot_id
            src_webp = slot_image_dir / "image.webp"
            src_png = slot_image_dir / "image.png"
            if src_webp.exists():
                shutil.copy2(src_webp, dest_dir / seo_filename)
            if src_png.exists():
                shutil.copy2(src_png, dest_dir / seo_filename.replace(".webp", ".png"))

        if not args.apply or existing_img:
            continue

        img_html = _build_img_tag(slot, web_src)
        img_tag = parse_html(img_html).find("img")
        if slot.get("insertion_mode") == "before":
            anchor.insert_before(img_tag)
        elif slot.get("insertion_mode") == "replace":
            anchor.replace_with(img_tag)
        else:
            anchor.insert_after(img_tag)

        backup_dir = PIPELINE_ROOT / "generated" / "backups"
        backup_dir.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        page_slug = slot.get("page_path", "").lstrip("/").replace("/", "-") or page_path.name
        backup_path = backup_dir / f"{page_slug}.{timestamp}.bak"
        backup_path.write_text(html, encoding="utf-8")

        page_path.write_text(str(soup), encoding="utf-8")

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "mode": "apply" if args.apply else "plan-only",
        "slots_planned": len(placements),
        "slots_placeable": len(placements),
        "slots_skipped": len(skipped),
        "placements": placements,
        "skipped": skipped,
    }
    save_json(PIPELINE_ROOT / "generated" / "placement-report.json", report)

    plan_lines = [
        "# Placement Plan",
        "",
        f"Generated: {report['generated_at']}",
        "",
    ]
    for placement in placements:
        plan_lines.append(f"- {placement['slot_id']} -> {placement['page_path']} ({placement['insertion_point']})")
    if skipped:
        plan_lines.append("")
        plan_lines.append("## Skipped")
        for entry in skipped:
            plan_lines.append(f"- {entry.get('slot_id', '')}: {entry.get('reason', '')}")
    write_text(PIPELINE_ROOT / "generated" / "placement-plan.md", "\n".join(plan_lines))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
