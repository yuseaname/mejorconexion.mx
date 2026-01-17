"""
Image post-processing: resize, crop, format conversion.
"""

from pathlib import Path
from typing import Optional, Tuple
import io

from PIL import Image

# Size mapping: requested -> (generate_at, crop_to)
SIZE_MAPPINGS = {
    "1600x900": ("1536x1024", (1600, 900)),
    "1920x1080": ("1536x1024", (1920, 1080)),
    "800x600": ("1024x1024", (800, 600)),
    "1200x630": ("1536x1024", (1200, 630)),
}


def get_generation_size(requested: str) -> str:
    """Map requested size to valid GPT image generation size."""
    if requested in {"1024x1024", "1536x1024", "1024x1536", "auto"}:
        return requested

    if requested in SIZE_MAPPINGS:
        return SIZE_MAPPINGS[requested][0]

    return "1536x1024"


def get_final_dimensions(requested: str) -> Optional[Tuple[int, int]]:
    """Get final crop/resize dimensions for requested size."""
    if requested in {"1024x1024", "1536x1024", "1024x1536", "auto"}:
        return None

    if requested in SIZE_MAPPINGS:
        return SIZE_MAPPINGS[requested][1]

    try:
        w, h = requested.split("x")
        return (int(w), int(h))
    except Exception:
        return None


def process_image(
    image_bytes: bytes,
    target_size: Optional[Tuple[int, int]] = None,
    output_formats: list = None,
) -> dict:
    """
    Process generated image: resize/crop and convert formats.

    Returns:
        Dict mapping format to bytes: {"webp": bytes, "png": bytes}
    """
    if output_formats is None:
        output_formats = ["webp", "png"]

    img = Image.open(io.BytesIO(image_bytes))

    if target_size and (img.width, img.height) != target_size:
        img = smart_crop_resize(img, target_size)

    results = {}
    for fmt in output_formats:
        buffer = io.BytesIO()
        if fmt == "webp":
            img.save(buffer, format="WEBP", quality=90)
        elif fmt == "png":
            img.save(buffer, format="PNG", optimize=True)
        elif fmt in {"jpg", "jpeg"}:
            rgb_img = img.convert("RGB")
            rgb_img.save(buffer, format="JPEG", quality=90)
        results[fmt] = buffer.getvalue()

    return results


def smart_crop_resize(img: Image.Image, target: Tuple[int, int]) -> Image.Image:
    """
    Smart crop and resize to target dimensions.
    Centers crop to preserve important content.
    """
    target_w, target_h = target
    target_ratio = target_w / target_h
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    elif img_ratio < target_ratio:
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))

    img = img.resize(target, Image.Resampling.LANCZOS)
    return img


def generate_seo_filename(
    site_slug: str,
    page_slug: str,
    slot_key: str,
    slot_id: str,
    extension: str,
) -> str:
    """Generate SEO-friendly filename."""

    def sanitize(value: str) -> str:
        return "".join(c if c.isalnum() or c == "-" else "-" for c in value.lower()).strip("-")

    parts = [
        sanitize(site_slug),
        sanitize(page_slug),
        sanitize(slot_key),
        slot_id[:8],
    ]

    filename = "-".join(p for p in parts if p)
    return f"{filename}.{extension}"
