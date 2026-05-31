# Continue Here

## Current State (2026-05-30)

### Batch Articles Deployed
10 new batch articles deployed to production on 2026-05-30 (commit `2d70d3f`).

### Hero Images
All 10 batch articles now have hero images:
- SVG placeholder images added to `blog/images/{slug}/hero.svg`
- `<figure class="article-image article-hero">` markup added to each article
- `og:image` and `twitter:image` meta tags updated

**Action needed:** Replace SVG placeholders with proper WebP hero images (1200x630px).
See `blog/images/` for the directory structure.

### Articles with Hero Images
| # | Article | Image Directory |
|---|---------|----------------|
| 01 | Internet con teléfono incluido | `blog/images/01-internet-con-telefono-incluido/` |
| 02 | Internet para personas mayores | `blog/images/02-internet-para-personas-mayores/` |
| 03 | Cambiar proveedor sin perder número | `blog/images/03-cambiar-proveedor-internet-sin-perder-numero/` |
| 04 | Internet residencial vs datos móviles | `blog/images/04-internet-residencial-vs-datos-moviles/` |
| 05 | Router modem integrado | `blog/images/05-router-modem-integrado-mexico/` |
| 06 | Internet simétrico | `blog/images/06-que-es-internet-simetrico/` |
| 07 | Cancelar servicio internet | `blog/images/07-cancelar-servicio-internet-mexico/` |
| 08 | Velocidad de subida | `blog/images/08-velocidad-de-subida-importancia/` |
| 09 | Internet para estudiantes | `blog/images/09-mejor-internet-estudiantes-mexico/` |
| 10 | Cable coaxial vs fibra óptica | `blog/images/10-cable-coaxial-vs-fibra-optica/` |

### Deployment Config
`deployment-node.yml` added at repo root for standardized deployment configuration.
