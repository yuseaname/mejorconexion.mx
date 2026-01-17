#!/usr/bin/env python3
"""
Discover image slots across repo pages and build prompt index.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from dotenv import load_dotenv

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.framework_detector import detect_framework
from lib.io_utils import load_yaml, save_json, write_csv, write_text
from lib.slot_discovery import discover_slots_for_page


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _load_config() -> Dict:
    config_path = PIPELINE_ROOT / "config.yaml"
    config = load_yaml(config_path) or {}
    return config


def _path_pattern_excluded(path_str: str, patterns: List[str]) -> bool:
    for pattern in patterns:
        if pattern and pattern in path_str:
            return True
    return False


def _extract_primary_heading(content: str, ext: str) -> str:
    if ext == ".html":
        match = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.IGNORECASE | re.DOTALL)
        if match:
            return re.sub(r"<[^>]+>", "", match.group(1)).strip()
        match = re.search(r"<title[^>]*>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
        if match:
            return re.sub(r"<[^>]+>", "", match.group(1)).strip()
        return ""
    for line in content.splitlines():
        if line.startswith("#"):
            return line.lstrip("#").strip()
    return ""


def _heading_pattern_excluded(heading: str, patterns: List[str]) -> bool:
    if not heading:
        return False
    for pattern in patterns:
        if not pattern:
            continue
        if re.search(pattern, heading, re.IGNORECASE):
            return True
    return False


def _normalize_root_label(root_path: str) -> str:
    cleaned = root_path.strip()
    if cleaned in {".", "./", ""}:
        return "/"
    return f"/{cleaned.strip('/')}"


def _collect_pages(
    root: Path,
    content_roots: List[str],
    page_extensions: List[str],
    exclude_dirs: List[str],
    build_dirs: List[str],
    scan_build: bool,
    exclude_patterns: List[str],
) -> List[Path]:
    pages: List[Path] = []
    exclude_set = {d.lower() for d in exclude_dirs}
    build_set = {d.lower() for d in build_dirs}

    for rel_root in content_roots:
        base = (root / rel_root).resolve()
        if not base.exists():
            continue
        for dirpath, dirnames, filenames in os.walk(base):
            pruned = []
            for name in dirnames:
                lower = name.lower()
                if lower in exclude_set:
                    continue
                if not scan_build and lower in build_set:
                    continue
                pruned.append(name)
            dirnames[:] = pruned

            for filename in filenames:
                path = Path(dirpath) / filename
                if path.suffix.lower() not in page_extensions:
                    continue
                normalized_path = "/" + path.relative_to(root).as_posix()
                if _path_pattern_excluded(normalized_path, exclude_patterns):
                    continue
                pages.append(path)
    return pages


def _slot_sort_key(slot: Dict) -> tuple:
    return (
        slot["priority_level"],
        0 if slot["page_is_home"] else 1,
        0 if slot["slot_type"] == "hero" else 1,
        slot["risk_score"],
        slot["normalized_page_path"],
        slot["slot_key"],
        slot["slot_id"],
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Discover image slots.")
    parser.add_argument("--scan-build", action="store_true", help="Include build directories.")
    args = parser.parse_args()

    load_dotenv()
    root = _repo_root()
    pipeline_root = PIPELINE_ROOT
    config = _load_config()

    detected = detect_framework(root)
    content_roots = config.get("content_roots", ["auto-detect"])
    build_dirs = config.get("build_dirs", ["auto-detect"])

    if "auto-detect" in content_roots:
        content_roots = detected.get("source_roots", [])
    if "auto-detect" in build_dirs:
        build_dirs = detected.get("build_dirs", [])

    page_extensions = detected.get("page_extensions", []) or [".html", ".md", ".mdx"]
    exclude_dirs = config.get("exclude_dirs", [])
    exclude_patterns = config.get("exclude_page_path_patterns", [])

    pages = _collect_pages(
        root=root,
        content_roots=content_roots,
        page_extensions=page_extensions,
        exclude_dirs=exclude_dirs,
        build_dirs=build_dirs,
        scan_build=args.scan_build,
        exclude_patterns=exclude_patterns,
    )

    all_slots: List[Dict] = []
    image_patterns: List[str] = []
    pages_scanned = 0

    exclude_heading_patterns = config.get("exclude_page_heading_patterns", [])

    for page_path in sorted(set(pages)):
        content = page_path.read_text(encoding="utf-8", errors="ignore")
        heading = _extract_primary_heading(content, page_path.suffix.lower())
        if _heading_pattern_excluded(heading, exclude_heading_patterns):
            continue
        pages_scanned += 1
        result = discover_slots_for_page(root, page_path, content, config)
        all_slots.extend(result.slots)
        image_patterns.extend(result.image_patterns)

    image_patterns = sorted(set(image_patterns))

    top_n = config.get("pipeline", {}).get("top_n", 20)
    selected_slots = sorted(all_slots, key=_slot_sort_key)[:top_n]
    selected_ids = {slot["slot_id"] for slot in selected_slots}

    for slot in all_slots:
        slot["selected"] = slot["slot_id"] in selected_ids

    prompts_dir = pipeline_root / "prompts"
    slots_dir = prompts_dir / "slots"

    for slot in all_slots:
        slot_dir = slots_dir / slot["slot_id"]
        slot_dir.mkdir(parents=True, exist_ok=True)
        save_json(slot_dir / "meta.json", slot)

    index_json = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "slots": sorted(all_slots, key=_slot_sort_key),
    }
    save_json(prompts_dir / "index.json", index_json)

    csv_rows = []
    for slot in sorted(all_slots, key=_slot_sort_key):
        csv_rows.append(
            {
                "slot_id": slot["slot_id"],
                "page_path": slot["page_path"],
                "slot_key": slot["slot_key"],
                "slot_type": slot["slot_type"],
                "anchor_text": slot.get("anchor_text", ""),
                "priority_level": slot["priority_level"],
                "risk_score": slot["risk_score"],
                "selected": slot.get("selected", False),
                "prompt_hash": slot.get("prompt_hash", ""),
            }
        )

    write_csv(
        prompts_dir / "index.csv",
        csv_rows,
        [
            "slot_id",
            "page_path",
            "slot_key",
            "slot_type",
            "anchor_text",
            "priority_level",
            "risk_score",
            "selected",
            "prompt_hash",
        ],
    )

    repo_profile = {
        "detected_framework": detected.get("detected_framework", "unknown"),
        "source_roots": [_normalize_root_label(p) for p in content_roots],
        "build_dirs": detected.get("build_dirs", []),
        "page_extensions": page_extensions,
        "total_pages_found": pages_scanned,
        "existing_image_patterns": image_patterns,
        "scan_timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }

    save_json(pipeline_root / "repo_profile.json", repo_profile)

    profile_md = [
        "# Repo Profile",
        "",
        f"- Detected framework: {repo_profile['detected_framework']}",
        f"- Source roots: {', '.join(repo_profile['source_roots']) or 'None'}",
        f"- Build dirs: {', '.join(repo_profile['build_dirs']) or 'None'}",
        f"- Page extensions: {', '.join(repo_profile['page_extensions']) or 'None'}",
        f"- Total pages found: {repo_profile['total_pages_found']}",
        f"- Existing image patterns: {', '.join(repo_profile['existing_image_patterns']) or 'None'}",
        f"- Scan timestamp: {repo_profile['scan_timestamp']}",
        "",
    ]
    write_text(pipeline_root / "REPO_PROFILE.md", "\n".join(profile_md))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
