#!/usr/bin/env python3
"""
Generate images for selected slots using OpenAI Images API.
"""

from __future__ import annotations

import argparse
import logging
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from dotenv import load_dotenv

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.image_postprocess import (
    SIZE_MAPPINGS,
    generate_seo_filename,
    get_final_dimensions,
    get_generation_size,
    process_image,
)
from lib.io_utils import load_json, load_yaml, save_json
from lib.openai_images import generate_image, log_generation, validate_model, validate_quality, validate_size


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


def _select_slots(slots: List[Dict], config: Dict, priority_only: bool, max_slots: int) -> List[Dict]:
    ordered = sorted(slots, key=_slot_sort_key)
    if priority_only or max_slots:
        limit = max_slots or config.get("pipeline", {}).get("top_n", 20)
        return ordered[:limit]
    selected = [slot for slot in ordered if slot.get("selected")]
    return selected or ordered


def _validate_requested_size(size: str) -> None:
    if size in {"1024x1024", "1536x1024", "1024x1536", "auto"}:
        return
    if size in SIZE_MAPPINGS:
        return
    if re.match(r"^\\d+x\\d+$", size):
        return
    raise ValueError(f"Invalid size: {size}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate images for slots.")
    parser.add_argument("--dry-run", action="store_true", help="Report without API calls.")
    parser.add_argument("--report-priority", action="store_true", help="Print selection order and exit.")
    parser.add_argument("--max-slots", type=int, default=0, help="Limit generation count.")
    parser.add_argument("--budget-guard", action="store_true", help="Prompt before generating more than 10 images.")
    parser.add_argument("--debug-api", action="store_true", help="Verbose API logging.")
    parser.add_argument("--force", action="store_true", help="Regenerate even if prompt hash matches.")
    parser.add_argument("--model", type=str, default="", help="Override model.")
    parser.add_argument("--quality", type=str, default="", help="Override quality.")
    parser.add_argument("--size", type=str, default="", help="Override size.")
    parser.add_argument("--priority-only", action="store_true", help="Use deterministic priority order.")
    args = parser.parse_args()

    load_dotenv()
    logging.basicConfig(level=logging.DEBUG if args.debug_api else logging.INFO)

    config = _load_config()
    market_code = (config.get("market") or {}).get("country", "")
    index_path = PIPELINE_ROOT / "prompts" / "index.json"
    index_data = load_json(index_path)
    if not index_data:
        raise SystemExit("Missing prompts/index.json. Run 01_discover_slots.py first.")

    slots = index_data.get("slots", [])
    selected_slots = _select_slots(slots, config, args.priority_only, args.max_slots)
    selected_ids = {slot["slot_id"] for slot in selected_slots}

    if args.report_priority:
        for slot in selected_slots:
            print(f"{slot['slot_id']} {slot['page_path']} {slot['slot_key']}")
        return 0

    if args.budget_guard and len(selected_slots) > 10 and not args.dry_run:
        confirm = input(f"About to generate {len(selected_slots)} images. Continue? [y/N]: ")
        if confirm.strip().lower() not in {"y", "yes"}:
            print("Aborted.")
            return 1

    env_model = os.environ.get("OPENAI_IMAGE_MODEL", "")
    env_quality = os.environ.get("OPENAI_IMAGE_QUALITY", "")
    env_size = os.environ.get("OPENAI_IMAGE_SIZE", "")

    model = args.model or env_model or config.get("default_model", "gpt-image-1")
    quality = args.quality or env_quality or config.get("default_quality", "medium")
    size = args.size or env_size or config.get("default_size", "1536x1024")

    validate_model(model)
    validate_quality(quality)

    _validate_requested_size(size)
    generation_size = get_generation_size(size)
    validate_size(generation_size)

    output_formats = config.get("output_formats", ["webp", "png"])

    locked_path = PIPELINE_ROOT / "ledger" / "locked_slots.json"
    locked_slots = load_json(locked_path) or []
    locked_set = set(locked_slots)

    manifest_entries = []
    manifest_path = PIPELINE_ROOT / "generated" / "manifest.json"
    logs_path = PIPELINE_ROOT / "generated" / "logs.jsonl"

    site_slug = _repo_root().name

    for slot in slots:
        slot_id = slot["slot_id"]
        prompt_hash = slot.get("prompt_hash", "")
        manifest_status = "skipped_not_selected"
        error = None

        if slot_id not in selected_ids:
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "market": market_code,
                }
            )
            continue

        if slot_id in locked_set and not args.force:
            manifest_status = "skipped_locked"
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "market": market_code,
                }
            )
            continue

        slot_dir = PIPELINE_ROOT / "generated" / "images" / "slots" / slot_id
        slot_dir.mkdir(parents=True, exist_ok=True)
        meta_path = slot_dir / "meta.generated.json"
        existing_meta = load_json(meta_path) if meta_path.exists() else None

        if existing_meta and existing_meta.get("prompt_hash") == prompt_hash and not args.force:
            manifest_status = "existing_valid"
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "market": market_code,
                }
            )
            continue

        if args.dry_run:
            manifest_status = "stale"
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "market": market_code,
                }
            )
            continue

        if not slot.get("prompt_text"):
            manifest_status = "failed"
            error = "Missing prompt_text. Run 02_refine_prompts.py first."
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "error": error,
                    "market": market_code,
                }
            )
            log_generation(str(logs_path), slot_id, model, generation_size, quality, prompt_hash, manifest_status, error)
            continue

        try:
            image_bytes = generate_image(
                prompt=slot["prompt_text"],
                model=model,
                size=generation_size,
                quality=quality,
            )
            final_dimensions = get_final_dimensions(size)
            processed = process_image(image_bytes, target_size=final_dimensions, output_formats=output_formats)

            page_slug = slot.get("page_path", "").strip("/").replace("/", "-") or "home"
            seo_filename = generate_seo_filename(site_slug, page_slug, slot["slot_key"], slot_id, "webp")

            output_files = {}
            for fmt, data in processed.items():
                filename = f"image.{fmt}"
                out_path = slot_dir / filename
                out_path.write_bytes(data)
                output_files[fmt] = str(out_path)

            meta = {
                "slot_id": slot_id,
                "prompt_hash": prompt_hash,
                "market": market_code,
                "model": model,
                "size_requested": size,
                "size_generated": generation_size,
                "final_dimensions": final_dimensions,
                "output_files": output_files,
                "seo_filename": seo_filename,
                "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            }
            save_json(meta_path, meta)

            manifest_status = "success"
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "model": model,
                    "size": size,
                    "quality": quality,
                    "seo_filename": seo_filename,
                    "market": market_code,
                }
            )
            log_generation(str(logs_path), slot_id, model, generation_size, quality, prompt_hash, manifest_status)

        except Exception as exc:
            manifest_status = "failed"
            error = str(exc)
            manifest_entries.append(
                {
                    "slot_id": slot_id,
                    "status": manifest_status,
                    "prompt_hash": prompt_hash,
                    "error": error,
                    "market": market_code,
                }
            )
            log_generation(str(logs_path), slot_id, model, generation_size, quality, prompt_hash, manifest_status, error)

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "slots": manifest_entries,
    }
    save_json(manifest_path, manifest)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
