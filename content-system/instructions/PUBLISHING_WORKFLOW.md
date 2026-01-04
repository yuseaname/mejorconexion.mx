# Publishing Workflow

This pipeline publishes draft markdown articles into the live site content folder.

## Add drafts
- Put ready-to-publish markdown files in `content-system/published-articles/`.
- Each draft must have YAML frontmatter with: `title`, `slug`, `description`, `date`, `lang`.

## Run publish

```
npm run content:publish
```

## What the publisher does
- Discovers the live articles folder by scanning the repo for Spanish markdown content.
- Validates each draft (Spanish, 2000+ words, SEO structure, headings, links).
- Fixes minor formatting issues and normalizes labels (Key Takeaways -> Puntos clave).
- Ensures meta description length <= 160 characters.
- Ensures slug is kebab-case and unique (adds -2, -3 if needed).
- Publishes to the detected live folder with backups for any existing file.
- Moves published drafts to `content-system/published-archive/`.
- Moves failed drafts to `content-system/failed-publish/` and writes an error report JSON.

## Failure reasons
Common failure reasons include:
- Missing required frontmatter fields.
- Word count below 2000.
- Missing sections (Tabla de contenidos, Puntos clave, FAQ, CTA).
- Less than 5 internal links.
- Language appears non-Spanish.
- Placeholder text detected (TODO, TBD, lorem, [INSERT]).

## Reports
Each run writes:
- `content-system/reports/last-publish-report.json`
- Backups (if any) in `content-system/reports/backups/<timestamp>/`

If the live folder cannot be detected, the report includes a warning and defaults to `content/guia/`.
