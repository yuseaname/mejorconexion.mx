"""
I/O utilities for JSON, CSV, YAML, and text with safe writes.
"""

from __future__ import annotations

import csv
import json
import os
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

try:
    import yaml
except Exception:  # pragma: no cover - yaml optional at import time
    yaml = None


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _atomic_write(path: Path, data: str) -> None:
    ensure_dir(path.parent)
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    tmp_path.write_text(data, encoding="utf-8")
    os.replace(tmp_path, path)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, text: str) -> None:
    _atomic_write(path, text)


def load_json(path: Path) -> Any:
    if not path.exists():
        return None
    return json.loads(read_text(path))


def save_json(path: Path, data: Any, indent: int = 2) -> None:
    text = json.dumps(data, indent=indent, ensure_ascii=True)
    _atomic_write(path, text + "\n")


def load_yaml(path: Path) -> Any:
    if yaml is None:
        raise RuntimeError("pyyaml is required to load yaml")
    if not path.exists():
        return None
    return yaml.safe_load(read_text(path))


def save_yaml(path: Path, data: Any) -> None:
    if yaml is None:
        raise RuntimeError("pyyaml is required to save yaml")
    text = yaml.safe_dump(data, sort_keys=False)
    _atomic_write(path, text)


def write_csv(path: Path, rows: Iterable[Dict[str, Any]], fieldnames: List[str]) -> None:
    ensure_dir(path.parent)
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    with tmp_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({k: row.get(k, "") for k in fieldnames})
    os.replace(tmp_path, path)


def read_env(name: str, default: Optional[str] = None) -> Optional[str]:
    return os.environ.get(name, default)
