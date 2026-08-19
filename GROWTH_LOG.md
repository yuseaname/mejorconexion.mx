# MejorConexion.mx — Growth Log

## Entry 1 — 2026-08-10: Initial Audit & Phase 1-2

### Analytics Baseline (90 days)
| Metric | Value |
|--------|-------|
| Sessions | 340 (~3.8/day) |
| Bounce Rate | 80% |
| Pages/Session | 1.42 |
| Avg Duration | 41s |
| Google Traffic | 89 sessions |
| MX Traffic | 236 (69%) |

### Changes Made
1. **Technical**: .htaccess (security, caching), 3 broken links fixed
2. **Duplicates**: 6 duplicate articles deleted (5 groups consolidated)
3. **Revenue**: Email capture (Spanish), affiliate disclosure, 3 AdSense slots, mid-article ad
4. **UX**: Blog browse-by-topic grid, newsletter CSS, section.html body rendering
5. **Content**: 69/157 articles have Respuesta Rápida (fleet agents working on remainder)
6. **Homepage**: "Las Guías Más Leídas" section featuring top 6 traffic articles
7. **Top pages rescued**: Telcel vs ATT (110 sess), Velocidad internet (35 sess), CDMX (35 sess)

### Fleet Used
- 3 Minimax M3 agents (Ollama Cloud) for content work
- Goose Prime (GLM-5.2) for technical/revenue/template work
- OpenAI provider unavailable (localhost:8080 down)

### Commits
- Phase 1-2: Technical + duplicate consolidation
- Revenue features: Email capture, affiliate, ads, blog listing
- Section.html fix + blog browse rendering
---

## Entry 2 — 2026-08-10: Final Status

### Content Coverage
- 148/156 articles (95%) have Respuesta Rápida sections
- Top 5 traffic pages all rescued with Respuesta Rápida + internal links
- AI patterns removed from key articles

### Revenue Features Deployed
- Email capture on all blog articles (Spanish newsletter signup)
- 3 AdSense slots per article (below_title + mid_article + end_article)
- Affiliate disclosure on about page + shortcode
- Homepage "Las Guías Más Leídas" (top 6 traffic articles)

### Total Commits: 6+

---

## Entry 3 — 2026-08-18: Post-Deploy Learn + Lede-Defect Fix Cycle (Squad SQ-002)

### Analytics (Aug 11–18 vs May 12–Aug 10 baseline)
| Metric | Baseline (91d) | Aug 11–14 (post-TOP10) | Aug 15–18 (post-UX-remediation) |
|---|---|---|---|
| Sessions/day | 3.6 | 25.3 | 18.3 |
| Bounce | 80.2% | 90.1% | **80.8%** |
| Pages/session | 1.45 | 1.09 | **1.55 (best ever)** |
| Duration | 43s | 19s | 38s |

- **Traffic surge is Bing/AI-led**: bing.com 56, google 21, duckduckgo 16, copilot 7, chatgpt 3 (referrer sessions, Aug 11–18). Google-era assumptions no longer apply.
- **Aug-15 UX remediation validated at site level** despite the surge (p/s 1.09 → 1.55).
- Winners: `internet-en-cdmx-por-colonia-2026` (255s, 20% br in post window), `izzi-vs-totalplay-telmex-megacable-2026` (50% br), `internet-totalplay-planes-precios-2026` (25% br).

### Root Cause Found: broken ledes (Commander inspection + Worker A structural audit)
- **90 articles** had literal `**` markdown in front-matter `description`, rendered raw in the visible lede (first thing visitors see) and in meta descriptions (SERP snippets). Correlated with the entire 0s-engagement cluster. Introduced ~Aug 11 content pass.
- Theme bug: section-card fallback `truncate 120 .Plain` double-escapes entities (`.Plain` keeps entities; template escapes again) → `AT&amp;amp;T` on 4 list pages.
- `telcel-vs-att-vs-movistar` (historical #1): title had pre-escaped `AT&amp;T` → visible "AT&amp;T"; **no description at all** (no lede/meta).
- `internet-satelital-rural-mexico`: stale "guia 2025" title, no description.

### Changes (commits c5c8409, 299df2c, 5afb715 — deployed via Actions, live-verified)
1. Stripped `**` from 90 descriptions; backticks from 3 more
2. telcel: title fixed to raw `AT&T`, description added
3. satelital: title 2026 + description
4. Theme `section.html` card fallback: `.Plain | htmlUnescape` **[PORT-WORTHY — sibling adsense-base copies share the bug]**

### Squad (SQ-002)
- Worker A (ornith:9b): 12-page structural audit — all PASS (ruled out rendering/structure; text-level defect was above its checklist)
- Explorer (gemma4:12b): intent-mismatch theory (how-to pages Bing-AI-answered) — contributory, not primary
- Scout (lfm2.5): blocked (tool restrictions) — site inventory still owed

### Open items for next cycle (priority order)
1. **telcel-vs-att-vs-movistar traffic collapse** (102 sess/91d → ~6/8d): investigate rankings/both-URL indexing now that title/meta fixed
2. `que-significa-la-velocidad` regression (17s→0s, clean lede — cause unclear; Bing AI answering educational queries?)
3. `/cobertura/mejor-internet-cdmx` vs colonia-page cannibalization (intent migrated)
4. `por-que-internet-telmex-es-lento`: 63.9s engagement but 91.7% bounce — needs next-step internal paths
5. Site inventory sweep (orphans/thin) — re-dispatch with fixed packet
6. Measurement: re-check Rybbit Aug 25 (7d post-fix) — expect 0s-cluster pages >10s TOS and bounce <85%

### Verification evidence
- Local build: 317 pages, 0 lede `**`, 0 `&amp;amp;`, 0 backtick ledes
- Live (cache-buster fetches): telcel title/lede/meta ✓, qos/control-parental ledes ✓, section cards ✓

