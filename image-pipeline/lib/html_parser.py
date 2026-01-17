"""
Safe HTML parsing helpers.
"""

from __future__ import annotations

from typing import List, Optional, Tuple
from bs4 import BeautifulSoup, Tag


DEFAULT_SAFE_CONTAINERS = [
    "article",
    "main",
    ".content",
    ".post-body",
    ".article-content",
    ".entry-content",
    ".prose",
    "[class*='content']",
]

DEFAULT_SKIP_CONTAINERS = [
    "[class*='flex']",
    "[class*='grid']",
    "[class*='sidebar']",
    "[class*='nav']",
    "[class*='header']",
    "[class*='footer']",
    "[class*='ad-']",
    "[class*='widget']",
]


def parse_html(content: str) -> BeautifulSoup:
    return BeautifulSoup(content, "lxml")


def element_selector(element: Tag) -> str:
    if not element:
        return ""
    if element.has_attr("id"):
        return f"#{element['id']}"
    if element.has_attr("class") and element["class"]:
        classes = ".".join(element["class"])
        return f"{element.name}.{classes}"
    return element.name


def element_css_context(element: Tag, max_depth: int = 3) -> str:
    if not element:
        return ""
    parts = []
    current = element
    depth = 0
    while current and depth < max_depth:
        parts.append(current.name)
        current = current.parent if hasattr(current, "parent") else None
        depth += 1
    return " > ".join(reversed(parts))


def _matches_selector(element: Tag, selector: str) -> bool:
    if not element:
        return False
    if selector.startswith("#"):
        return element.has_attr("id") and element["id"] == selector[1:]
    if selector.startswith("."):
        return element.has_attr("class") and selector[1:] in element["class"]
    if selector.startswith("[") and selector.endswith("]"):
        # Simple contains-class/id selector like [class*='content']
        if "class*='" in selector:
            target = selector.split("class*='")[-1].split("'")[0]
            return element.has_attr("class") and any(target in c for c in element["class"])
        if "id*='" in selector:
            target = selector.split("id*='")[-1].split("'")[0]
            return element.has_attr("id") and target in element["id"]
    return element.name == selector


def find_closest_container(
    element: Tag,
    safe_containers: List[str] = None,
) -> Optional[Tag]:
    safe_containers = safe_containers or DEFAULT_SAFE_CONTAINERS
    current = element
    while current and isinstance(current, Tag):
        for selector in safe_containers:
            if _matches_selector(current, selector):
                return current
        current = current.parent
    return None


def has_skip_container(
    element: Tag,
    skip_containers: List[str] = None,
) -> bool:
    skip_containers = skip_containers or DEFAULT_SKIP_CONTAINERS
    current = element
    while current and isinstance(current, Tag):
        for selector in skip_containers:
            if _matches_selector(current, selector):
                return True
        current = current.parent
    return False


def find_anchor_elements(soup: BeautifulSoup, selector: str) -> List[Tag]:
    if selector.startswith("#"):
        el = soup.find(id=selector[1:])
        return [el] if el else []
    if selector.startswith("."):
        return list(soup.find_all(class_=selector[1:]))
    if selector.startswith("["):
        # Not a full CSS engine; fall back to tag scan
        return list(soup.find_all(True))
    return list(soup.find_all(selector))
