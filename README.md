# mejorconexion.mx

## Content pipeline

Run the content system:

```
npm run content:build
```

Add new outlines to `content-system/inbox-outlines/` in Markdown or JSON format. The system will process up to 3 outlines per run, generate drafts and published-ready markdown, update pillar hubs, and move outlines to `done-outlines/` or `failed-outlines/`.

See docs in `content-system/instructions/` for outline format and rules.
