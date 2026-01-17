"""
OpenAI Images API client for GPT image models.
Uses Images API endpoint ONLY - NOT Responses API.
GPT image models return base64 ONLY (no URL mode).
"""

import base64
import hashlib
import logging
import os
import time
from typing import Optional

import requests

logger = logging.getLogger(__name__)

# Valid configurations for GPT image models
VALID_MODELS = {"gpt-image-1"}
VALID_SIZES = {"1024x1024", "1536x1024", "1024x1536", "auto"}
VALID_QUALITIES = {"low", "medium", "high", "auto"}


class OpenAIImageError(Exception):
    """Custom exception for OpenAI image generation errors."""


class ModelNotAllowedError(OpenAIImageError):
    """Raised when attempting to use a non-GPT-image model."""


def validate_model(model: str) -> None:
    """Validate model is GPT-image family. Reject DALL-E."""
    if model.startswith("dall-e"):
        raise ModelNotAllowedError(
            f"DALL-E models are not allowed. Got: {model}. "
            f"Use one of: {VALID_MODELS}"
        )
    if model not in VALID_MODELS:
        raise ModelNotAllowedError(
            f"Invalid model: {model}. Must be one of: {VALID_MODELS}"
        )


def validate_size(size: str) -> None:
    """Validate size is allowed for GPT image models."""
    if size not in VALID_SIZES:
        raise OpenAIImageError(
            f"Invalid size: {size}. Must be one of: {VALID_SIZES}"
        )


def validate_quality(quality: str) -> None:
    """Validate quality setting."""
    if quality not in VALID_QUALITIES:
        raise OpenAIImageError(
            f"Invalid quality: {quality}. Must be one of: {VALID_QUALITIES}"
        )


def generate_image(
    prompt: str,
    model: str = "gpt-image-1",
    size: str = "1536x1024",
    quality: str = "medium",
    api_key: Optional[str] = None,
    max_retries: int = 3,
    base_delay: float = 1.0,
) -> bytes:
    """
    Generate image using OpenAI Images API.

    Args:
        prompt: Image generation prompt
        model: Must be gpt-image-1
        size: One of 1024x1024, 1536x1024, 1024x1536, auto
        quality: One of low, medium, high, auto
        api_key: OpenAI API key (defaults to OPENAI_API_KEY env var)
        max_retries: Max retry attempts for transient errors
        base_delay: Base delay for exponential backoff

    Returns:
        Raw image bytes (decoded from base64)

    Raises:
        ModelNotAllowedError: If model is DALL-E or invalid
        OpenAIImageError: For API or validation errors
    """
    # Validate inputs
    validate_model(model)
    validate_size(size)
    validate_quality(quality)

    # Get API key
    api_key = api_key or os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise OpenAIImageError("OPENAI_API_KEY not set")

    # Prepare request
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "n": 1,
        # Note: response_format not specified - GPT image models return b64_json only
    }

    # Log request details
    prompt_hash = hashlib.sha256(prompt.encode()).hexdigest()[:16]
    logger.info(
        "Generating image: model=%s, size=%s, quality=%s, prompt_hash=%s",
        model,
        size,
        quality,
        prompt_hash,
    )

    # Make request with retries
    last_error = None
    for attempt in range(max_retries):
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=120)

            if response.status_code == 200:
                data = response.json()
                # GPT image models return base64 in b64_json field
                b64_data = data["data"][0]["b64_json"]
                image_bytes = base64.b64decode(b64_data)
                logger.info("Successfully generated image: %s bytes", len(image_bytes))
                return image_bytes

            if response.status_code in (429, 500, 502, 503, 504):
                delay = base_delay * (2**attempt)
                logger.warning("Retryable error %s, waiting %ss...", response.status_code, delay)
                time.sleep(delay)
                last_error = OpenAIImageError(
                    f"API error {response.status_code}: {response.text}"
                )
                continue

            raise OpenAIImageError(
                f"API error {response.status_code}: {response.text}"
            )

        except requests.exceptions.Timeout:
            delay = base_delay * (2**attempt)
            logger.warning("Request timeout, waiting %ss...", delay)
            time.sleep(delay)
            last_error = OpenAIImageError("Request timeout")

        except requests.exceptions.RequestException as exc:
            raise OpenAIImageError(f"Request failed: {exc}")

    raise last_error or OpenAIImageError("Max retries exceeded")


def log_generation(
    log_path: str,
    slot_id: str,
    model: str,
    size: str,
    quality: str,
    prompt_hash: str,
    status: str,
    error: Optional[str] = None,
) -> None:
    """Append generation log entry to JSONL file."""
    import json
    from datetime import datetime

    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "slot_id": slot_id,
        "model": model,
        "size": size,
        "quality": quality,
        "prompt_hash": prompt_hash,
        "status": status,
        "error": error,
    }

    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
