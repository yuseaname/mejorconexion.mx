"""
Detect framework and content roots for common static site frameworks.
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List


FRAMEWORKS = {
    "nextjs": {
        "source_roots": ["pages", "app", "src/pages", "src/app"],
        "build_dirs": [".next", "out"],
        "page_extensions": [".js", ".jsx", ".ts", ".tsx", ".mdx"],
    },
    "gatsby": {
        "source_roots": ["src/pages", "src/templates"],
        "build_dirs": ["public"],
        "page_extensions": [".js", ".jsx", ".ts", ".tsx"],
    },
    "astro": {
        "source_roots": ["src/pages", "src/content"],
        "build_dirs": ["dist"],
        "page_extensions": [".astro", ".md", ".mdx"],
    },
    "hugo": {
        "source_roots": ["content", "layouts"],
        "build_dirs": ["public"],
        "page_extensions": [".md", ".html"],
    },
    "jekyll": {
        "source_roots": [".", "_posts", "_pages"],
        "build_dirs": ["_site"],
        "page_extensions": [".md", ".html"],
    },
    "html": {
        "source_roots": [".", "src"],
        "build_dirs": [],
        "page_extensions": [".html"],
    },
}


def _exists(root: Path, rel_path: str) -> bool:
    return (root / rel_path).exists()


def detect_framework(root: Path) -> Dict[str, List[str]]:
    detected = "unknown"

    if _exists(root, "next.config.js") or any(
        _exists(root, p) for p in FRAMEWORKS["nextjs"]["source_roots"]
    ):
        detected = "nextjs"
    elif _exists(root, "gatsby-config.js") or any(
        _exists(root, p) for p in FRAMEWORKS["gatsby"]["source_roots"]
    ):
        detected = "gatsby"
    elif _exists(root, "astro.config.mjs") or _exists(root, "astro.config.ts") or any(
        _exists(root, p) for p in FRAMEWORKS["astro"]["source_roots"]
    ):
        detected = "astro"
    elif _exists(root, "config.toml") or _exists(root, "config.yaml") or _exists(root, "config.yml"):
        if any(_exists(root, p) for p in FRAMEWORKS["hugo"]["source_roots"]):
            detected = "hugo"
    elif _exists(root, "_config.yml") or _exists(root, "_config.yaml"):
        detected = "jekyll"
    elif any(root.glob("*.html")) or _exists(root, "src"):
        detected = "html"

    if detected == "unknown":
        return {
            "detected_framework": "unknown",
            "source_roots": [],
            "build_dirs": [],
            "page_extensions": [],
        }

    data = FRAMEWORKS[detected]
    return {
        "detected_framework": detected,
        "source_roots": data["source_roots"],
        "build_dirs": data["build_dirs"],
        "page_extensions": data["page_extensions"],
    }
