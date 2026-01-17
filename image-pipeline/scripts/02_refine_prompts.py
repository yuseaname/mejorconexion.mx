#!/usr/bin/env python3
"""
Refine prompts for discovered slots and write prompt hashes.
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime, timezone
from typing import Dict, List

from dotenv import load_dotenv

from pathlib import Path

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.io_utils import load_json, load_yaml, save_json, write_csv
from lib.prompt_engine import build_prompt, build_seo_alt_text, compute_prompt_hash


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


def _select_slots(slots: List[Dict], config: Dict, priority_only: bool, max_slots: int) -> List[Dict]:
    ordered = sorted(slots, key=_slot_sort_key)
    if priority_only or max_slots:
        limit = max_slots or config.get("pipeline", {}).get("top_n", 20)
        return ordered[:limit]
    selected = [slot for slot in ordered if slot.get("selected")]
    return selected or ordered


def main() -> int:
    parser = argparse.ArgumentParser(description="Refine prompts for slots.")
    parser.add_argument("--priority-only", action="store_true", help="Use deterministic priority order.")
    parser.add_argument("--max-slots", type=int, default=0, help="Limit prompt refinement count.")
    args = parser.parse_args()

    load_dotenv()
    config = _load_config()
    market_code = (config.get("market") or {}).get("country", "")

    index_path = PIPELINE_ROOT / "prompts" / "index.json"
    index_data = load_json(index_path)
    if not index_data:
        raise SystemExit("Missing prompts/index.json. Run 01_discover_slots.py first.")

    slots = index_data.get("slots", [])
    selected_slots = _select_slots(slots, config, args.priority_only, args.max_slots)
    selected_ids = {slot["slot_id"] for slot in selected_slots}

    for slot in slots:
        if slot["slot_id"] not in selected_ids:
            continue
        if market_code:
            slot["market"] = market_code
        prompt_text, diversity = build_prompt(
            slot.get("anchor_text", ""),
            slot.get("slot_type", "inline"),
            slot["slot_id"],
            config,
        )
        prompt_hash = compute_prompt_hash(prompt_text)
        slot["prompt_text"] = prompt_text
        slot["prompt_hash"] = prompt_hash
        slot["diversity_seed"] = diversity
        slot["seo_alt_text"] = build_seo_alt_text(slot.get("anchor_text", ""), slot.get("slot_type", "inline"))
        slot["prompt_updated_at"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

        slot_dir = PIPELINE_ROOT / "prompts" / "slots" / slot["slot_id"]
        slot_dir.mkdir(parents=True, exist_ok=True)
        save_json(slot_dir / "meta.json", slot)

    index_data["generated_at"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    index_data["slots"] = sorted(slots, key=_slot_sort_key)
    save_json(index_path, index_data)

    csv_rows = []
    for slot in index_data["slots"]:
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
        PIPELINE_ROOT / "prompts" / "index.csv",
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

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
