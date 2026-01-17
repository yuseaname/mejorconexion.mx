#!/usr/bin/env python3
"""
Build image ledger from slots, manifest, and placed images.
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from dotenv import load_dotenv

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.io_utils import load_json, load_yaml, save_json, write_csv, write_text
from lib.html_parser import parse_html


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _load_config() -> Dict:
    return load_yaml(PIPELINE_ROOT / "config.yaml") or {}


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


def _should_exclude(path: Path, exclude_dirs: List[str]) -> bool:
    parts = {p.lower() for p in path.parts}
    return any(ex.lower() in parts for ex in exclude_dirs)


def _scan_html_for_slots(root: Path, exclude_dirs: List[str]) -> set:
    placed = set()
    for path in root.rglob("*.html"):
        if _should_exclude(path, exclude_dirs):
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        soup = parse_html(content)
        for img in soup.find_all("img"):
            if img.has_attr("data-slot-id"):
                placed.add(img["data-slot-id"])
    return placed


def main() -> int:
    parser = argparse.ArgumentParser(description="Build image ledger.")
    parser.add_argument("--scan-html", action="store_true", help="Scan HTML for placed images.")
    args = parser.parse_args()

    load_dotenv()
    root = _repo_root()
    config = _load_config()

    index = load_json(PIPELINE_ROOT / "prompts" / "index.json") or {}
    slots = index.get("slots", [])

    manifest = load_json(PIPELINE_ROOT / "generated" / "manifest.json") or {}
    manifest_map = {entry.get("slot_id"): entry for entry in manifest.get("slots", [])}

    locked = set(load_json(PIPELINE_ROOT / "ledger" / "locked_slots.json") or [])
    selected = sorted(slots, key=_slot_sort_key)[: config.get("pipeline", {}).get("top_n", 20)]
    selected_ids = {slot["slot_id"] for slot in selected}

    placed = set()
    if args.scan_html:
        placed = _scan_html_for_slots(root, config.get("exclude_dirs", []))

    ledger_rows = []
    counts = {}

    for slot in sorted(slots, key=_slot_sort_key):
        slot_id = slot["slot_id"]
        status = "NEEDS_GENERATION"
        manifest_entry = manifest_map.get(slot_id)
        prompt_hash = slot.get("prompt_hash")

        if slot_id in locked:
            status = "LOCKED"
        elif slot_id in placed:
            status = "PLACED"
        elif slot_id not in selected_ids:
            status = "SKIPPED_NOT_SELECTED"
        else:
            if manifest_entry:
                m_status = manifest_entry.get("status")
                m_hash = manifest_entry.get("prompt_hash")
                if m_status == "failed":
                    status = "FAILED_LAST_RUN"
                elif m_status in {"success", "existing_valid"}:
                    if prompt_hash and m_hash and prompt_hash != m_hash:
                        status = "STALE_PROMPT_CHANGED"
                    else:
                        status = "GENERATED_READY_TO_PLACE"
                elif m_status == "stale":
                    status = "STALE_PROMPT_CHANGED"

        counts[status] = counts.get(status, 0) + 1
        ledger_rows.append(
            {
                "slot_id": slot_id,
                "status": status,
                "page_path": slot.get("page_path", ""),
                "slot_key": slot.get("slot_key", ""),
                "prompt_hash": prompt_hash or "",
                "manifest_status": manifest_entry.get("status") if manifest_entry else "",
            }
        )

    ledger = {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "slots": ledger_rows,
    }
    save_json(PIPELINE_ROOT / "ledger" / "ledger.json", ledger)
    write_csv(
        PIPELINE_ROOT / "ledger" / "ledger.csv",
        ledger_rows,
        ["slot_id", "status", "page_path", "slot_key", "prompt_hash", "manifest_status"],
    )
    save_json(
        PIPELINE_ROOT / "ledger" / "summary.json",
        {
            "generated_at": ledger["generated_at"],
            "counts": counts,
        },
    )

    lines = [
        "# Image Ledger",
        "",
        f"Generated: {ledger['generated_at']}",
        "",
        "## Summary",
    ]
    for key, value in sorted(counts.items()):
        lines.append(f"- {key}: {value}")
    write_text(PIPELINE_ROOT / "ledger" / "LEDGER.md", "\n".join(lines))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
