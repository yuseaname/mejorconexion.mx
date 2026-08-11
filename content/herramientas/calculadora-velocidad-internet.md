---
title: "Calculadora de Velocidad de Internet"
slug: "calculadora-velocidad-internet"
date: 2026-08-10
author: "Equipo Mejor Conexión"
author_bio: "Comparamos internet y datos en México con criterio real, sin promesas raras."
author_slug: "equipo"
description: "Calcula cuántos Mbps necesitas según tu uso real: streaming, gaming, videollamadas y dispositivos. Herramienta interactiva para México."
keywords:
  - "calculadora velocidad internet"
  - "cuantos mbps necesito"
  - "calculadora internet mexico"
  - "cuanta velocidad internet necesito"
draft: false
image: "/images/topic-provider-comparison.webp"
type: "tool"
---

::: container
::: breadcrumbs
[Inicio](/) / [Herramientas](/herramientas/) / Calculadora de Velocidad
:::

# Calculadora de Velocidad de Internet

¿No sabes cuántos Mbps necesitas? Usa nuestra calculadora interactiva. Selecciona tus actividades y dispositivos y te diremos qué plan contratar.

<div id="speed-calculator" style="max-width:600px;margin:2rem auto;padding:2rem;border-radius:1rem;background:#f0f9ff;border:2px solid #0284c7;">

<h3 style="text-align:center;margin-bottom:1.5rem;color:#0c4a6e;">Tu uso de internet</h3>

<div style="margin-bottom:1rem;">
<label style="display:block;font-weight:600;margin-bottom:0.5rem;">¿Cuántas personas viven en tu casa?</label>
<select id="persons" style="width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;">
<option value="1">1 persona</option>
<option value="2">2 personas</option>
<option value="3" selected>3 personas</option>
<option value="4">4 personas</option>
<option value="5">5 personas</option>
<option value="6">6+ personas</option>
</select>
</div>

<div style="margin-bottom:1rem;">
<label style="display:block;font-weight:600;margin-bottom:0.5rem;">Streaming de video</label>
<select id="streaming" style="width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;">
<option value="0">No vemos streaming</option>
<option value="5">Netflix HD ocasional</option>
<option value="10" selected>Netflix HD diario</option>
<option value="25">Netflix 4K diario</option>
<option value="50">Multiple pantallas 4K</option>
</select>
</div>

<div style="margin-bottom:1rem;">
<label style="display:block;font-weight:600;margin-bottom:0.5rem;">Gaming</label>
<select id="gaming" style="width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;">
<option value="0">No jugamos online</option>
<option value="5">Gaming casual</option>
<option value="10" selected>Gaming regular</option>
<option value="25">Gaming competitivo + streaming</option>
</select>
</div>

<div style="margin-bottom:1rem;">
<label style="display:block;font-weight:600;margin-bottom:0.5rem;">Videollamadas / Home Office</label>
<select id="work" style="width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;">
<option value="0">No trabajamos desde casa</option>
<option value="5">Ocasional (1-2 horas/día)</option>
<option value="10" selected>Regular (3-5 horas/día)</option>
<option value="20">Full-time (8+ horas/día)</option>
</select>
</div>

<div style="margin-bottom:1rem;">
<label style="display:block;font-weight:600;margin-bottom:0.5rem;">Dispositivos IoT / Casa inteligente</label>
<select id="iot" style="width:100%;padding:0.5rem;border-radius:0.5rem;border:1px solid #ccc;">
<option value="0">Ninguno</option>
<option value="2">1-3 dispositivos</option>
<option value="5" selected>4-10 dispositivos</option>
<option value="10">10+ dispositivos</option>
</select>
</div>

<button onclick="calculateSpeed()" style="width:100%;padding:1rem;background:#0284c7;color:white;border:none;border-radius:0.5rem;font-size:1.1rem;font-weight:600;cursor:pointer;margin-top:1rem;">Calcular velocidad recomendada</button>

<div id="result" style="margin-top:1.5rem;padding:1.5rem;background:white;border-radius:0.75rem;display:none;">
<h3 style="color:#0c4a6e;margin-bottom:0.5rem;">Velocidad recomendada:</h3>
<div id="speed-result" style="font-size:2.5rem;font-weight:700;color:#0284c7;text-align:center;margin:1rem 0;"></div>
<p id="plan-result" style="text-align:center;color:#475569;"></p>
<div id="providers" style="margin-top:1rem;"></div>
</div>

</div>

<script>
function calculateSpeed() {
    var persons = parseInt(document.getElementById('persons').value);
    var streaming = parseInt(document.getElementById('streaming').value);
    var gaming = parseInt(document.getElementById('gaming').value);
    var work = parseInt(document.getElementById('work').value);
    var iot = parseInt(document.getElementById('iot').value);

    // Base: 25 Mbps per person
    var base = persons * 25;
    var total = base + streaming + gaming + work + iot;

    // Round up to nearest plan tier
    var recommended = Math.ceil(total / 50) * 50;
    if (recommended < 50) recommended = 50;

    var speedDiv = document.getElementById('speed-result');
    var planDiv = document.getElementById('plan-result');
    var providersDiv = document.getElementById('providers');
    var resultDiv = document.getElementById('result');

    speedDiv.innerHTML = recommended + ' Mbps';
    
    var planText = '';
    var providersHtml = '';
    
    if (recommended <= 50) {
        planText = 'Plan básico suficiente. Ideal para uso ligero.';
        providersHtml = '<p style="font-size:0.9rem;margin-top:0.5rem;">Planes recomendados: Telmex 50 Mbps ($399/mes), Megacable 80 Mbps ($299/mes)</p>';
    } else if (recommended <= 200) {
        planText = 'Plan intermedio. Cubre la mayoría de hogares mexicanos.';
        providersHtml = '<p style="font-size:0.9rem;margin-top:0.5rem;">Planes recomendados: Totalplay 200 Mbps ($399/mes), Izzi 200 Mbps ($449/mes)</p>';
    } else if (recommended <= 500) {
        planText = 'Plan avanzado. Para familias grandes y mucho streaming.';
        providersHtml = '<p style="font-size:0.9rem;margin-top:0.5rem;">Planes recomendados: Totalplay 500 Mbps ($699/mes), Telmex 500 Mbps ($899/mes)</p>';
    } else {
        planText = 'Plan premium. Para gaming, 4K en multiples pantallas y home office.';
        providersHtml = '<p style="font-size:0.9rem;margin-top:0.5rem;">Planes recomendados: Totalplay 1 Gbps ($1,499/mes), Telmex 1 Gbps ($1,099/mes)</p>';
    }
    
    planDiv.innerHTML = planText;
    providersDiv.innerHTML = providersHtml;
    resultDiv.style.display = 'block';
}
</script>

::: section
## Cómo funciona esta calculadora

Nuestra calculadora usa datos reales de consumo de ancho de banda por actividad:

| Actividad | Consumo (Mbps) |
|-----------|---------------|
| Netflix HD | 5 Mbps |
| Netflix 4K | 25 Mbps |
| Zoom/Meet 1080p | 4 Mbps |
| Gaming online | 10-25 Mbps |
| TikTok/Instagram | 3-5 Mbps |
| Casa inteligente (10 disp.) | 5-10 Mbps |

La calculadora suma estos valores y añade 25 Mbps base por persona para cubrir navegación general, descargas y headroom.

Para más detalle, consulta nuestra guía de [cuántos Mbps necesitas](/guias/cuantos-mbps-necesito.html) o el [pilar de velocidad de internet](/blog/pilar-velocidad-internet-mexico-2026.html).
:::

::: section
## ¿Por qué importa la velocidad correcta?

Contratar un plan con menos velocidad de la que necesitas resulta en buffering, lag y frustración. Contratar demasiado es tirar dinero. Esta calculadora te ayuda a encontrar el punto exacto.

Los factores que más impactan tu velocidad necesaria son:
1. **Número de usuarios** simultáneos en la red
2. **Streaming 4K** — consume 5x más que HD
3. **Gaming competitivo** — necesita baja latencia, no solo velocidad
4. **Trabajo remoto** — videollamadas requieren subida estable

Lee también: [velocidad contratada no me llega](/blog/velocidad-contratada-no-me-llega-mexico.html), [test de velocidad](/guias/como-medir-velocidad-real-internet.html).
:::

## Preguntas Frecuentes

{{< faq "¿Esta calculadora funciona para empresas?" >}}
Esta versión está diseñada para hogares. Para negocios, el cálculo es diferente porque hay más dispositivos concurrentes y necesidades de subida mayores. Contacta a un proveedor business.
{{< /faq >}}}

{{< faq "¿Incluye la velocidad de subida?" >}}
La calculadora estima la velocidad de bajada. Para subida, necesitas al menos 1/4 de tu bajada. Si trabajas remoto o subes contenido, busca planes simétricos (misma subida que bajada) como los de Totalplay.
{{< /faq >}}}
