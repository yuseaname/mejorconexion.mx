# Image Pipeline

AdSense-safe, performance-optimized image generation pipeline.

## Requirements
- Python 3.10+
- OpenAI API key with GPT image model access

## Setup

### Windows (PowerShell)
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r image-pipeline/requirements.txt
copy .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

### macOS/Linux
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r image-pipeline/requirements.txt
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

## Usage

### 1. Discover slots
```bash
python image-pipeline/scripts/01_discover_slots.py
```

### 2. Refine prompts (top 10 priority slots)
```bash
python image-pipeline/scripts/02_refine_prompts.py --priority-only --max-slots 10
```

### 3. Generate images
```bash
python image-pipeline/scripts/03_generate_images.py \
  --priority-only \
  --quality medium \
  --model gpt-image-1 \
  --size 1536x1024 \
  --max-slots 10
```

Add `--force` to regenerate even if prompt hasn't changed.
Add `--dry-run` to preview without API calls.
Add `--budget-guard` to confirm before generating >10 images.

### 4. Build ledger
```bash
python image-pipeline/scripts/build_image_ledger.py --scan-html
```

### 5. Plan placements (default: plan-only)
```bash
python image-pipeline/scripts/04_place_images.py --limit 20
```

Add `--apply` to actually modify HTML files (creates backups).

### 6. Audit
```bash
python image-pipeline/scripts/05_polish_audit.py
```

## Configuration

Edit `image-pipeline/config.yaml` to customize:
- Content roots and exclusions
- Model/quality/size defaults
- Safe placement containers
- Domain-specific constraints

## Files

| File | Purpose |
|------|---------|
| `REPO_PROFILE.md` | Human-readable repo analysis |
| `repo_profile.json` | Machine-readable repo profile |
| `config.yaml` | Pipeline configuration |
| `prompts/index.json` | All discovered slots |
| `generated/manifest.json` | Generation status |
| `ledger/ledger.json` | Complete slot status |
| `generated/placement-plan.md` | Placement preview |
| `generated/AUDIT_REPORT.md` | Compliance audit |
