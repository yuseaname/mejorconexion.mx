# Content System Overview

This system generates Spanish articles from outlines. Drop outlines into `content-system/inbox-outlines/` and run:

```
npm run content:build
```

Each run processes up to 3 outlines, creates drafts and published-ready markdown, updates pillar hubs, writes image prompt packs, and moves outlines to `done-outlines/` or `failed-outlines/`.

Outputs:
- Drafts: `content-system/draft-articles/`
- Published: `content-system/published-articles/`
- Pillar hubs: `content-system/pillars/`
- Image prompts: `content-system/assets/image-prompts/`
- Run report: `content-system/last-run-report.json`
