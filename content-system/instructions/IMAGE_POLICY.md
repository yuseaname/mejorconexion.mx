# Image Policy

Default behavior:
- The system generates an image prompt pack (JSON) per article.
- It adds featured and inline image placeholders in the article.
- No images are downloaded by default.

Optional safe image download:
- If `UNSPLASH_API_KEY` or `PEXELS_API_KEY` is set, the system can download 3 license-safe images.
- Images are saved to `content-system/assets/images/`.
- Attribution is stored in `content-system/assets/attribution.json` and referenced in frontmatter.

No random image scraping is used.
