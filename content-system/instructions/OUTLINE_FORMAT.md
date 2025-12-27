# Outline Format

You can provide outlines in Markdown or JSON. The system reads up to 3 outlines per run.

## Markdown format

```
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

## JSON format

```
{
  "title": "Como mejorar el wifi en casa",
  "target_keyword": "mejorar wifi en casa",
  "audience": "Principiantes en Mexico",
  "intent": "Informativa y comparativa",
  "pillar_hint": "internet-en-casa",
  "headings": [
    { "level": 2, "text": "Panorama 2026 del wifi en casa" },
    { "level": 2, "text": "Factores que afectan la senal" },
    { "level": 3, "text": "Distancia y paredes" },
    { "level": 3, "text": "Interferencias" }
  ]
}
```

If fields are missing, the system infers them from the outline text or filename.
