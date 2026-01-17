"""
Slot discovery for hero and inline image placements.
"""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from .html_parser import element_css_context, element_selector, find_closest_container, parse_html


@dataclass
class SlotResult:
    slots: List[Dict]
    image_patterns: List[str]


def normalize_page_path(path: Path, root: Path) -> str:
    rel = path.relative_to(root).as_posix()
    if not rel.startswith("/"):
        rel = "/" + rel
    return rel.lower()


def compute_slot_id(
    page_path: str,
    anchor_selector: str,
    anchor_index: int,
    insertion_mode: str,
    slot_key: str,
) -> str:
    """Deterministic slot ID - does NOT include prompt text."""
    normalized_path = page_path.lower().strip().replace("\\", "/")
    normalized_selector = anchor_selector.lower().strip()

    hash_input = "|".join(
        [
            normalized_path,
            normalized_selector,
            str(anchor_index),
            insertion_mode,
            slot_key,
        ]
    )

    return hashlib.sha256(hash_input.encode()).hexdigest()[:16]


def _word_count(text: str) -> int:
    return len(re.findall(r"\b\w+\b", text))


def _extract_markdown_headings(text: str) -> List[Tuple[int, str]]:
    headings = []
    for line in text.splitlines():
        if line.startswith("#"):
            level = len(line) - len(line.lstrip("#"))
            heading = line.lstrip("#").strip()
            if heading:
                headings.append((level, heading))
    return headings


def _extract_markdown_images(text: str) -> List[str]:
    return re.findall(r"!\[[^\]]*\]\(([^)]+)\)", text)


def _extract_html_images(soup) -> List[str]:
    sources = []
    for img in soup.find_all("img"):
        if img.has_attr("src"):
            sources.append(img["src"])
    return sources


def _find_image_patterns(sources: List[str]) -> List[str]:
    patterns = []
    for src in sources:
        if not src:
            continue
        if "/images/" in src:
            patterns.append("/images/")
        elif "/img/" in src:
            patterns.append("/img/")
        elif "/assets/" in src:
            patterns.append("/assets/")
    return sorted(set(patterns))


def _ad_marker_present(text: str, ad_keywords: List[str]) -> bool:
    lower = text.lower()
    return any(keyword in lower for keyword in ad_keywords)


def _risk_score(word_count: int, image_count: int, ad_risk: float, slot_type: str) -> Tuple[float, List[str]]:
    risk = 0.0
    factors = []

    if word_count < 300:
        risk += 0.2
        factors.append("thin_content")
    if image_count >= 5:
        risk += 0.2
        factors.append("image_heavy")
    if ad_risk > 0:
        risk += min(0.4, ad_risk)
        factors.append("near_ads")
    if slot_type == "hero":
        risk += 0.2
        factors.append("above_fold")

    return min(1.0, risk), factors


def _priority_for_path(page_path: str, page_is_home: bool) -> int:
    if page_is_home:
        return 1
    depth = max(0, page_path.strip("/").count("/"))
    if depth <= 0:
        return 2
    if depth == 1:
        return 3
    return 4


def _select_anchor_text(page_title: str, heading: Optional[str]) -> str:
    if heading:
        return heading
    if page_title:
        return page_title
    return "Untitled page"


def _page_title_from_html(soup) -> str:
    title = soup.find("title")
    if title and title.text:
        return title.text.strip()
    return ""


def discover_slots_for_page(
    root: Path,
    page_path: Path,
    content: str,
    config: Dict,
) -> SlotResult:
    ext = page_path.suffix.lower()
    normalized_path = normalize_page_path(page_path, root)
    page_is_home = page_path.name.startswith("index.") or normalized_path == "/index.html"
    market_code = (config.get("market") or {}).get("country", "")

    slots: List[Dict] = []
    image_sources: List[str] = []

    ad_keywords = config.get("ad_marker_patterns", {}).get("keywords", [])

    if ext == ".html":
        soup = parse_html(content)
        page_title = _page_title_from_html(soup)
        text = soup.get_text(" ", strip=True)
        image_sources = _extract_html_images(soup)

        h1 = soup.find_all("h1")
        h2 = soup.find_all("h2")
        h3 = soup.find_all("h3")

        anchor_elements = h1 or h2 or h3
        if anchor_elements:
            hero_anchor = anchor_elements[0]
            anchor_selector = hero_anchor.name
            anchor_index = 0
            anchor_text = _select_anchor_text(page_title, hero_anchor.get_text(strip=True))
        else:
            anchor_selector = "body"
            anchor_index = 0
            anchor_text = _select_anchor_text(page_title, None)

        hero_slot_key = "hero"
        hero_slot_id = compute_slot_id(
            normalized_path,
            anchor_selector,
            anchor_index,
            "after",
            hero_slot_key,
        )

        container = find_closest_container(hero_anchor) if anchor_elements else None
        container_selector = element_selector(container) if container else ""
        container_context = element_css_context(container) if container else ""
        ad_risk = 0.6 if _ad_marker_present(content, ad_keywords) else 0.0
        risk_score, risk_factors = _risk_score(
            _word_count(text), len(image_sources), ad_risk, "hero"
        )

        slots.append(
            {
                "slot_id": hero_slot_id,
                "page_path": normalized_path,
                "normalized_page_path": normalized_path,
                "slot_key": hero_slot_key,
                "slot_type": "hero",
                "market": market_code,
                "anchor_selector": anchor_selector,
                "anchor_index": anchor_index,
                "insertion_mode": "after",
                "priority_level": _priority_for_path(normalized_path, page_is_home),
                "page_is_home": page_is_home,
                "risk_score": risk_score,
                "risk_factors": risk_factors,
                "anchor_text": anchor_text,
                "container_selector": container_selector,
                "container_css_context": container_context,
            }
        )

        inline_count = 0
        for anchor_index, tag in enumerate(h2 + h3):
            inline_count += 1
            anchor_selector = tag.name
            anchor_text = _select_anchor_text(page_title, tag.get_text(strip=True))
            slot_key = f"inline-{inline_count}"
            slot_id = compute_slot_id(
                normalized_path,
                anchor_selector,
                anchor_index,
                "after",
                slot_key,
            )
            container = find_closest_container(tag)
            container_selector = element_selector(container) if container else ""
            container_context = element_css_context(container) if container else ""
            ad_risk = 0.6 if _ad_marker_present(content, ad_keywords) else 0.0
            risk_score, risk_factors = _risk_score(
                _word_count(text), len(image_sources), ad_risk, "inline"
            )
            slots.append(
                {
                    "slot_id": slot_id,
                    "page_path": normalized_path,
                    "normalized_page_path": normalized_path,
                    "slot_key": slot_key,
                    "slot_type": "inline",
                    "market": market_code,
                    "anchor_selector": anchor_selector,
                    "anchor_index": anchor_index,
                    "insertion_mode": "after",
                    "priority_level": _priority_for_path(normalized_path, page_is_home),
                    "page_is_home": page_is_home,
                    "risk_score": risk_score,
                    "risk_factors": risk_factors,
                    "anchor_text": anchor_text,
                    "container_selector": container_selector,
                    "container_css_context": container_context,
                }
            )

    else:
        headings = _extract_markdown_headings(content)
        image_sources = _extract_markdown_images(content)
        text = re.sub(r"[#*_`>\-]", " ", content)

        page_title = headings[0][1] if headings else page_path.stem
        anchor_text = _select_anchor_text(page_title, None)
        hero_slot_key = "hero"
        hero_slot_id = compute_slot_id(
            normalized_path,
            "h1",
            0,
            "after",
            hero_slot_key,
        )
        ad_risk = 0.6 if _ad_marker_present(content, ad_keywords) else 0.0
        risk_score, risk_factors = _risk_score(
            _word_count(text), len(image_sources), ad_risk, "hero"
        )
        slots.append(
            {
                "slot_id": hero_slot_id,
                "page_path": normalized_path,
                "normalized_page_path": normalized_path,
                "slot_key": hero_slot_key,
                "slot_type": "hero",
                "market": market_code,
                "anchor_selector": "h1",
                "anchor_index": 0,
                "insertion_mode": "after",
                "priority_level": _priority_for_path(normalized_path, page_is_home),
                "page_is_home": page_is_home,
                "risk_score": risk_score,
                "risk_factors": risk_factors,
                "anchor_text": anchor_text,
                "container_selector": "",
                "container_css_context": "",
            }
        )

        inline_count = 0
        for level, heading in headings:
            if level <= 1:
                continue
            inline_count += 1
            slot_key = f"inline-{inline_count}"
            slot_id = compute_slot_id(
                normalized_path,
                f"h{min(level,6)}",
                inline_count - 1,
                "after",
                slot_key,
            )
            risk_score, risk_factors = _risk_score(
                _word_count(text), len(image_sources), ad_risk, "inline"
            )
            slots.append(
                {
                    "slot_id": slot_id,
                    "page_path": normalized_path,
                    "normalized_page_path": normalized_path,
                    "slot_key": slot_key,
                    "slot_type": "inline",
                    "market": market_code,
                    "anchor_selector": f"h{min(level,6)}",
                    "anchor_index": inline_count - 1,
                    "insertion_mode": "after",
                    "priority_level": _priority_for_path(normalized_path, page_is_home),
                    "page_is_home": page_is_home,
                    "risk_score": risk_score,
                    "risk_factors": risk_factors,
                    "anchor_text": heading,
                    "container_selector": "",
                    "container_css_context": "",
                }
            )

    return SlotResult(slots=slots, image_patterns=_find_image_patterns(image_sources))
