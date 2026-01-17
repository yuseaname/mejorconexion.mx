#!/usr/bin/env python3
"""
Audit prompts and placements for compliance and performance checks.
"""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from dotenv import load_dotenv

PIPELINE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PIPELINE_ROOT))

from lib.io_utils import load_json, load_yaml, write_text
from lib.html_parser import parse_html


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _load_config() -> Dict:
    return load_yaml(PIPELINE_ROOT / "config.yaml") or {}


def _should_exclude(path: Path, exclude_dirs: List[str]) -> bool:
    parts = {p.lower() for p in path.parts}
    return any(ex.lower() in parts for ex in exclude_dirs)


def _is_finance_medical_legal(text: str) -> bool:
    keywords = [
        "finance",
        "bank",
        "loan",
        "credit",
        "insurance",
        "medical",
        "health",
        "legal",
        "law",
        "abogado",
        "seguro",
        "credito",
        "banco",
        "salud",
        "hipoteca",
    ]
    lower = text.lower()
    return any(k in lower for k in keywords)


def main() -> int:
    load_dotenv()
    root = _repo_root()
    config = _load_config()
    market_code = (config.get("market") or {}).get("country", "")

    index = load_json(PIPELINE_ROOT / "prompts" / "index.json") or {}
    slots = {slot["slot_id"]: slot for slot in index.get("slots", [])}

    ad_like = [s.lower() for s in config.get("ad_like_heuristics", [])]
    prompt_failures = []

    for slot in slots.values():
        prompt = slot.get("prompt_text", "")
        if not prompt:
            prompt_failures.append(f"slot_id={slot['slot_id']} missing prompt_text")
            continue
        lower = prompt.lower()
        if "no visible text" not in lower or "no ui elements" not in lower or "no branding" not in lower:
            prompt_failures.append(f"slot_id={slot['slot_id']} missing required constraints")
        if "photorealistic" not in lower and "photorealism" not in lower:
            prompt_failures.append(f"slot_id={slot['slot_id']} missing photorealistic requirement")
        for bad in ad_like:
            if bad.lower() in lower:
                prompt_failures.append(f"slot_id={slot['slot_id']} ad-like phrase detected: {bad}")
                break

    cls_issues = []
    lcp_issues = []
    lazy_issues = []

    exclude_dirs = config.get("exclude_dirs", [])
    html_files = []
    for path in root.rglob("*.html"):
        if _should_exclude(path, exclude_dirs):
            continue
        html_files.append(path)

    for html_path in html_files:
        content = html_path.read_text(encoding="utf-8", errors="ignore")
        soup = parse_html(content)
        for img in soup.find_all("img"):
            if not img.has_attr("data-slot-id"):
                continue
            slot_id = img.get("data-slot-id")
            slot = slots.get(slot_id)
            if not slot:
                continue

            width = img.get("width")
            height = img.get("height")
            style = img.get("style", "")
            if not (width and height) and "aspect-ratio" not in style:
                cls_issues.append(f"slot_id={slot_id} missing width/height")

            if slot.get("slot_type") == "hero":
                if img.get("loading") != "eager" or img.get("fetchpriority") != "high":
                    lcp_issues.append(f"slot_id={slot_id} missing hero loading hints")
            else:
                if img.get("loading") != "lazy":
                    lazy_issues.append(f"slot_id={slot_id} missing lazy loading")

    manual_review_set = set()
    for slot in slots.values():
        if slot.get("slot_type") == "hero":
            manual_review_set.add(f"slot_id={slot['slot_id']} - Hero image")
        if slot.get("risk_score", 0) > 0.7:
            manual_review_set.add(
                f"slot_id={slot['slot_id']} - High risk score ({slot.get('risk_score')})"
            )
        if _is_finance_medical_legal(slot.get("page_path", "") + " " + slot.get("anchor_text", "")):
            manual_review_set.add(f"slot_id={slot['slot_id']} - Finance/medical/legal content")

    manual_review = sorted(manual_review_set)

    summary = {
        "total_slots": len(slots),
        "prompt_failures": len(prompt_failures),
        "cls_issues": len(cls_issues),
        "lcp_issues": len(lcp_issues),
        "lazy_issues": len(lazy_issues),
        "manual_review": len(manual_review),
    }

    failed = len(prompt_failures) + len(cls_issues) + len(lcp_issues) + len(lazy_issues)
    needs_review = len(manual_review)
    passed = max(0, summary["total_slots"] - failed - needs_review)

    lines = [
        "# Image Pipeline Audit Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')}",
        "",
        "## Summary",
        f"- Total slots audited: {summary['total_slots']}",
        f"- Passed all checks: {passed}",
        f"- Needs review: {needs_review}",
        f"- Failed: {failed}",
        "",
        "## CLS Safety",
        "OK: All images have width/height attributes" if not cls_issues else "FAIL: CLS issues detected",
        "",
        "## LCP Optimization",
        "OK: All hero images have eager loading + high priority"
        if not lcp_issues
        else "FAIL: LCP hint issues detected",
        "",
        "## Prompt Compliance",
        "OK: All prompts include required constraints"
        if not prompt_failures
        else "FAIL: Prompt compliance issues detected",
        "",
        "## Manual Review Queue",
    ]

    if manual_review:
        lines.extend([f"WARN: {entry}" for entry in manual_review])
    else:
        lines.append("OK: None")

    lines.extend(["", "## Ad-Like Imagery Check"])
    if any("ad-like" in entry for entry in prompt_failures):
        lines.append("FAIL: Ad-like patterns detected in prompts")
    else:
        lines.append("OK: No ad-like patterns detected in prompts")

    if market_code == "MX":
        lines.extend(
            [
                "",
                "## Localization Checklist",
                "[ ] Visual cues align with Mexican everyday environments",
            ]
        )

    write_text(PIPELINE_ROOT / "generated" / "AUDIT_REPORT.md", "\n".join(lines))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
