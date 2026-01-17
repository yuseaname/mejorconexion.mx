"""
Prompt refinement and deterministic diversity injection.
"""

from __future__ import annotations

import hashlib
from typing import Dict, List, Tuple


PROMPT_TEMPLATE = """
Photorealistic {slot_type} image representing the real-world meaning of the topic: {anchor_text}.

First, interpret what this topic implies to a general audience in everyday life (e.g., confusion, problem-solving, reassurance, discovery, resolution). Then visually represent that meaning through a realistic moment or situation.

The scene must depict a believable, real-life scenario where the topic would naturally apply, not a staged setup or symbolic arrangement of objects.

Show a single, specific moment in time that a human would immediately recognize as related to the topic (pause during problem-solving, inspection, realization, before/after state, subtle signs an issue is being addressed).

Avoid generic desk setups, flat-lay compositions, or repeated object arrangements.

{diversity_injection}

Camera:
Full-frame camera, 35mm lens. Natural perspective, slight imperfections allowed. Human eye-level or contextual angle (not overhead).

Lighting:
Natural or practical indoor lighting. Time-of-day cues allowed. No dramatic, cinematic, or studio lighting.

Strict constraints:
- No visible text.
- No UI elements or readable screens.
- No diagrams, icons, or symbols.
- No branding, logos, or overlays.
- No symmetry-heavy or stock-photo compositions.
- No product-only centered shots.
- No pricing badges, stars, or CTA button shapes.
- No promotional or advertisement-style imagery.

Style:
Strict photorealism. No CGI, no illustration, no surreal elements.

The image should feel like a real photograph taken during an authentic moment related to the topic, clearly understandable without explanation.

Unique composition guardrail:
Do not reuse visual compositions, object groupings, or scene layouts from previous images. Each image must feel like a different household and a different moment.

{domain_constraints}
""".strip()


DIVERSITY_OPTIONS = {
    "time_of_day": ["morning light", "midday", "afternoon", "early evening", "dusk"],
    "room_type": ["living room", "kitchen", "bedroom", "home office", "hallway", "garage", "basement"],
    "camera_angle": ["eye level", "slightly elevated", "slightly low angle", "from doorway"],
    "subject_context": ["adult homeowner", "elderly resident", "young professional"],
    "environment_style": ["modern apartment", "suburban home", "older house", "renovated space", "cozy cottage"],
}

MEXICO_INJECTION = (
    "Cultural realism:\n"
    "The scene must feel authentically Mexican, reflecting everyday life in Mexico.\n"
    "Architecture, interior design, appliances, and environments should match common Mexican homes or businesses.\n"
    "Avoid U.S. suburban styles, European interiors, or luxury-only environments.\n"
    "People should look naturally Mexican, not model-like or staged."
)


def get_diversity_seed(slot_id: str) -> Dict[str, str]:
    """Deterministic diversity based on slot_id hash."""
    seed = int(slot_id[:8], 16)
    return {key: options[seed % len(options)] for key, options in DIVERSITY_OPTIONS.items()}


def compute_prompt_hash(prompt_text: str) -> str:
    """Hash of final prompt for staleness detection."""
    normalized = prompt_text.strip().lower()
    return hashlib.sha256(normalized.encode()).hexdigest()[:16]


def _domain_constraints(anchor_text: str, config: Dict) -> List[str]:
    constraints = []
    domain_cfg = config.get("domain_constraints", {}).get("household_alarms", {})
    if not domain_cfg.get("enabled"):
        return constraints

    keywords = ["alarm", "alarma", "smoke", "humo", "monoxido", "carbon monoxide"]
    text = anchor_text.lower()
    matches = sum(1 for k in keywords if k in text)
    confidence = 1.0 if matches > 0 else 0.0

    if confidence >= domain_cfg.get("confidence_threshold", 0.7):
        constraints.extend(domain_cfg.get("inject_rules", []))

    return constraints


def build_prompt(anchor_text: str, slot_type: str, slot_id: str, config: Dict) -> Tuple[str, Dict[str, str]]:
    diversity = get_diversity_seed(slot_id)
    diversity_injection = (
        "Diversity: "
        + ", ".join(f"{key}={value}" for key, value in diversity.items())
    )

    domain_constraints_list = _domain_constraints(anchor_text, config)
    if domain_constraints_list:
        domain_constraints = "Domain constraints:\n- " + "\n- ".join(domain_constraints_list)
    else:
        domain_constraints = ""

    market = (config.get("market") or {}).get("country", "").upper()
    market_injection = MEXICO_INJECTION if market == "MX" else ""

    prompt = PROMPT_TEMPLATE.format(
        slot_type=slot_type,
        anchor_text=anchor_text,
        diversity_injection=diversity_injection,
        domain_constraints=domain_constraints,
    ).strip()

    if market_injection:
        prompt = f"{prompt}\n\n{market_injection}"

    return prompt, diversity


def build_seo_alt_text(anchor_text: str, slot_type: str) -> str:
    if slot_type == "hero":
        return f"Realistic photo illustrating {anchor_text}".strip()
    return f"Real-life scene related to {anchor_text}".strip()
