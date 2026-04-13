# mejorconexion.mx

A static website and content pipeline for Spanish-language internet and telecom comparisons in Mexico. The site helps Mexican consumers choose internet providers, mobile plans, and eSIM options through SEO-optimized guides and comparisons.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Node.js | 22.x | Build scripts and content generation |
| Language | JavaScript | ES2017+ | Vanilla JS (no TypeScript) |
| Build | esbuild + PostCSS + cssnano | Latest | Asset minification and optimization |
| Static Site | Vanilla HTML/CSS/JS | - | No framework, pure static files |
| Deployment | GitHub Actions | - | CI/CD to Hostinger via rsync |
| Analytics | Rybbit | - | Privacy-focused analytics |

## Quick Start

```bash
# Prerequisites
# - Node.js 18+ (22 recommended)
# - npm

# Installation
npm install

# Development: Start a local server
npx serve . -p 3000
# Or open index.html directly in browser

# Build for production
npm run build

# Content generation (see Content Pipeline section)
npm run content:build
npm run content:publish
```

## Project Structure

```
mejorconexion.mx/
├── index.html              # Homepage
├── assets/
│   ├── css/styles.css      # Main stylesheet
│   ├── js/main.js          # Client-side JS (nav, calculators, JSON-LD)
│   └── images/             # Static images organized by section
├── content/
│   └── blog/               # Published articles (Markdown with frontmatter)
├── content-system/         # Article generation pipeline
│   ├── inbox-outlines/     # Drop outlines here for processing
│   ├── done-outlines/      # Successfully processed outlines
│   ├── failed-outlines/    # Failed outline processing logs
│   ├── draft-articles/     # Generated drafts
│   ├── published-articles/ # Final articles ready for publishing
│   ├── pillars/            # Pillar hub pages by topic
│   ├── instructions/       # Pipeline documentation
│   └── assets/
│       ├── image-prompts/  # Generated image prompts (JSON)
│       └── images/         # Downloaded stock images
├── scripts/
│   ├── build.js            # Production build (copy + minify)
│   ├── generate_articles_from_outlines.js  # Main content generator
│   ├── publish_drafts.js   # Validates and publishes drafts
│   ├── pillar_manager.js   # Manages pillar hub pages
│   ├── link_graph.js       # Internal linking suggestions
│   └── utils.js            # Shared utilities
├── config/
│   └── content-system.config.json  # Pipeline configuration
├── dist/                   # Production build output (gitignored)
├── internet-en-casa/       # Pillar: Home internet guides
├── planes-moviles/         # Pillar: Mobile plans
├── esim/                   # Pillar: eSIM information
├── ciudades/               # Pillar: City-specific coverage
├── guias/                  # Pillar: Tutorials and guides
├── herramientas/           # Pillar: Tools (speed test, calculators)
└── blog/                   # Blog listing page
```

## Architecture Overview

### Static Site Architecture

The site is a pure static HTML/CSS/JS website with no build framework. Each page is a standalone HTML file with:

- Consistent header/footer navigation
- Spanish-language content (es-MX)
- SEO optimizations (meta tags, JSON-LD structured data)
- AdSense integration
- Rybbit analytics tracking

The build process (`npm run build`) copies all files to `dist/` and applies:
- CSS minification via cssnano/PostCSS
- JavaScript minification via esbuild
- HTML minification via html-minifier-terser
- Sitemap updates for new blog articles

### Content Pipeline Architecture

The content system generates SEO-optimized Spanish articles from outlines:

```
Outline (MD/JSON) → Draft Article → Validation → Published Article
     ↓                    ↓              ↓              ↓
inbox-outlines/    draft-articles/  checks      content/blog/
```

**Pipeline stages:**
1. **Outline ingestion**: Drop files in `content-system/inbox-outlines/`
2. **Article generation**: `npm run content:build` processes up to 5 outlines per run
3. **Validation**: Checks word count (2000+), H2 count (5+), FAQ count (5+), internal links (5+)
4. **Publishing**: `npm run content:publish` validates and moves to live content folder

### Pillar Structure

Content is organized into pillars (topic clusters):

| Pillar | Slug | Keywords |
|--------|------|----------|
| Internet en Casa | `internet-en-casa` | wifi, router, fibra, modem, velocidad |
| Planes Móviles | `planes-moviles` | plan movil, datos, prepago, portabilidad |
| eSIM | `esim` | esim, sim digital, qr esim |
| Herramientas | `herramientas` | speed test, prueba de velocidad |
| Guías | `guias` | tutorial, como, paso a paso |

## Development Guidelines

### Code Style (JavaScript)

- **File naming**: kebab-case (`main.js`, `link_graph.js`)
- **Functions**: camelCase (`function slugify()`, `function parseFrontmatter()`)
- **Variables**: camelCase (`const blogUrls`, `let inCode`)
- **Constants**: SCREAMING_SNAKE_CASE (`const IGNORES`, `const ROOT`)
- **Exports**: CommonJS (`module.exports = { ... }`)

### Code Style (HTML/CSS)

- **HTML files**: lowercase with hyphens for multi-word (`index.html`, `speed-test.html`)
- **CSS classes**: kebab-case (`.site-header`, `.nav-toggle`, `.hero-grid`)
- **Data attributes**: kebab-case with `data-` prefix (`data-site-header`, `data-nav-toggle`)

### Article Format

All articles use YAML frontmatter with Markdown body:

```markdown
---
title: Article Title Here
slug: article-slug-here
description: Meta description (max 160 chars)
date: 2026-03-20
lang: es-MX
pillar: internet-en-casa
target_keyword: keyword phrase
---

# H1 Heading (only one per article)

Article content with **bold**, *italic*, and [links](/path/).

## H2 Section

### H3 Subsection

- Bullet points
- More points

## FAQ

### Question 1?
Answer text here.

### Question 2?
Answer text here.

## Enlaces internos
- [Related Article](/path/)
```

### Required Article Sections

Every published article must include:
1. **Tabla de contenidos** (Table of Contents)
2. **Puntos clave** (Key Takeaways) - callout block
3. **FAQ** - minimum 5 questions as H3s
4. **CTA** (Call to Action)
5. **Enlaces internos** - minimum 5 internal links

### Import Order (JavaScript)

```javascript
// 1. Node.js built-ins
const fs = require('fs');
const path = require('path');

// 2. External packages
const esbuild = require('esbuild');

// 3. Local modules
const { slugify, parseFrontmatter } = require('./utils');
```

### Commit Conventions

This project uses conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `content:` - Content additions/updates
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production (creates `dist/` folder) |
| `npm run content:build` | Generate articles from outlines |
| `npm run content:publish` | Publish validated drafts to live folder |

## Environment Variables

Set in `.env` file (see `.env.example`):

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | For image generation (optional) |
| `OPENAI_IMAGE_MODEL` | No | Model for images (default: gpt-image-1) |
| `OPENAI_IMAGE_QUALITY` | No | Image quality setting |
| `OPENAI_IMAGE_SIZE` | No | Image dimensions (default: 1536x1024) |
| `UNSPLASH_API_KEY` | No | For stock image downloads |
| `PEXELS_API_KEY` | No | Alternative stock image source |

## Content Pipeline Usage

### Adding New Articles

1. Create an outline file in `content-system/inbox-outlines/`:

```markdown
---
title: Como mejorar el wifi en casa
target_keyword: mejorar wifi en casa
audience: Principiantes en Mexico
intent: Informativa y comparativa
pillar_hint: internet-en-casa
---
- Panorama 2026 del wifi en casa
- Factores que afectan la senal
  - Distancia y paredes
  - Interferencias
- Como elegir el router correcto
- Checklist de mejoras rapidas
- Errores comunes y como evitarlos
```

2. Run the generator:
```bash
npm run content:build
```

3. Check results in:
   - `content-system/draft-articles/` - Generated drafts
   - `content-system/last-run-report.json` - Processing report
   - `content-system/failed-outlines/` - Any failures with error details

4. For final publishing:
```bash
npm run content:publish
```

### Content Quality Requirements

| Metric | Minimum |
|--------|---------|
| Word count | 2000 words |
| H2 headings | 5 sections |
| FAQ questions | 5 questions |
| Internal links | 5 links |
| Meta description | ≤160 characters |

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`):

1. Triggered on push to `main` branch
2. Runs `npm run build` to create production files
3. Deploys `dist/` folder to Hostinger via rsync over SSH

**Required GitHub Secrets:**
- `HOSTINGER_SSH_KEY` - Private SSH key
- `HOSTINGER_SSH_HOST` - Server hostname
- `HOSTINGER_SSH_USER` - SSH username

## Additional Resources

- Content system instructions: `content-system/instructions/`
- Site configuration: `config/content-system.config.json`
- SEO style guide: `content-system/instructions/SEO_STYLE_GUIDE.md`
- Image policy: `content-system/instructions/IMAGE_POLICY.md`


## Skill Usage Guide

When working on tasks involving these technologies, invoke the corresponding skill:

| Skill | Invoke When |
|-------|-------------|
| github-actions | Configures CI/CD workflows for deployment to Hostinger |
| javascript | Writes ES2017+ vanilla JavaScript with CommonJS modules |
| esbuild | Configures esbuild for JavaScript minification and bundling |
| node | Configures Node.js runtime and package management for build scripts |
| postcss | Processes CSS with PostCSS and cssnano for optimization |
