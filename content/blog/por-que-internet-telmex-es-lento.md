---
title: "Por qué Telmex/Infinitum es lento (y cómo acelerarlo) 2026"
slug: "por-que-internet-telmex-es-lento"
date: 2026-08-10
author: "Equipo Mejor Conexión"
author_bio: "Comparamos internet y datos en México con criterio real, sin promesas raras."
author_slug: "equipo"
description: "Tu internet Telmex Infinitum es lento. Causas reales (cobre, saturación, DNS) y soluciones que funcionan para acelerar tu conexión."
keywords:
  - "telmex lento"
  - "infinitum lento"
  - "acelerar internet telmex"
  - "por que telmex es lento"
  - "mejorar internet telmex"
draft: false
image: "/images/cat-velocidad.webp"
---

## Respuesta Rápida

**Telmex Infinitum es lento por 3 causas principales: 1) Infraestructura de cobre/VDSL en lugar de fibra (máximo 50 Mbps reales), 2) Saturación del nodo en horas pico (19-23h, caída de 50-80%), 3) Configuración subóptima del router. Soluciones: verificar si tienes fibra, optimizar router, o cambiar de plan.**

- **Causa #1 (40%)**: Tu línea todavía usa cobre/VDSL
- **Causa #2 (35%)**: Saturación del nodo en horas pico
- **Causa #3 (25%)**: Router mal configurado o WiFi débil

Si tienes Telmex Infinitum y sientes que tu internet es más lento de lo que pagas, no estás solo. Telmex es el proveedor con mayor cobertura en México (más de 22 millones de hogares), pero también el que más quejas recibe por velocidad insuficiente. El problema rara vez es un solo factor: suele ser una combinación de tecnología obsoleta (cobre en lugar de fibra), saturación de red, y configuración del router. Esta guía te ayuda a diagnosticar la causa exacta y aplicar la solución correcta.


## Diagnóstico: por qué tu Telmex es lento

### ¿Tienes fibra o cobre?

Esta es la diferencia más importante. Telmex tiene dos infraestructuras: la vieja red de cobre (VDSL/ADSL) y la nueva red de fibra óptica (FTTH). Tu velocidad depende casi enteramente de cuál tienes.

| Señal | Fibra óptica | Cobre/VDSL |
|-------|-------------|------------|
| Cable al módem | Cable fino verde/amarillo (fibra) | Cable telefónico (RJ11) |
| Velocidad máx. | Hasta 1 Gbps | 20-50 Mbps |
| Ping | 10-25 ms | 30-60 ms |
| Módem | ONT (optical network terminal) | Módem VDSL |
| Estabilidad | Excelente | Variable con clima/distancia |
| Atenuación | Nula | Aumenta con distancia a central |

**Cómo verificar fácilmente**: Mira el cable que entra a tu módem. Si es un cable telefónico grueso (RJ11, como el de un teléfono fijo), tienes cobre. Si es un cable delgado verde o amarillo (fibra óptica), tienes fibra. También puedes llamar al 01 800 123 4567 y preguntar directamente.

Para verificar con más detalle, lee [cómo saber si tienes fibra óptica](/blog/como-saber-si-tengo-fibra-optica-2026.html).

### ¿Es saturación del nodo?

La saturación del nodo ocurre cuando muchos usuarios del mismo nodo de Telmex se conectan al mismo tiempo. Es muy común en zonas residenciales entre 19:00 y 23:00.

**Cómo diagnosticar la saturación:**

1. Mide tu velocidad a las 10 AM con [speedtest.net](https://www.speedtest.net) (nodo libre)
2. Mide a las 8 PM (nodo potencialmente saturado)
3. Si la diferencia es mayor al 50%, es saturación confirmada

| Hora del día | Velocidad esperada (100 Mbps contratados) | Estado del nodo |
|-------------|------------------------------------------|-----------------|
| 6-9 AM | 80-95 Mbps | Libre |
| 10 AM - 5 PM | 75-90 Mbps | Normal |
| 6-8 PM | 50-70 Mbps | Empieza a saturar |
| 8-11 PM | 20-50 Mbps | Saturado |
| 12-6 AM | 80-95 Mbps | Libre |

Lee [internet lento en la noche](/blog/internet-lento-noche-mexico-2026.html) para soluciones específicas.

### ¿Es el WiFi o la conexión del proveedor?

Mucha gente culpa al proveedor cuando el problema es su WiFi. Para descartar:

1. Conecta una computadora por cable Ethernet directo al módem
2. Mide la velocidad por cable
3. Si por cable es rápida pero por WiFi es lenta, el problema es tu WiFi (no Telmex)
4. Si por cable también es lenta, el problema es de Telmex

| Medición | Por cable | Por WiFi | Diagnóstico |
|----------|-----------|----------|-------------|
| Escenario A | 90 Mbps | 30 Mbps | WiFi débil (no es culpa de Telmex) |
| Escenario B | 40 Mbps | 40 Mbps | Problema de Telmex (cobre o saturación) |
| Escenario C | 90 Mbps | 85 Mbps | Todo bien |


## 7 trucos para acelerar tu internet Telmex

### 1. Cambia los DNS (efecto inmediato)

Los DNS de Telmex son notoriamente lentos. Cambiarlos a un DNS más rápido mejora la velocidad de resolución de nombres (cuando escribes una dirección web, tarda menos en encontrarla).

**DNS recomendados:**
- **1.1.1.1** (Cloudflare) — el más rápido en México según pruebas
- **8.8.8.8** (Google) — alternativa confiable
- **9.9.9.9** (Quad9) — con seguridad adicional

**Cómo cambiar DNS en Windows:**
1. Panel de control > Redes e Internet > Centro de redes
2. Cambiar configuración del adaptador
3. Propiedades > Protocolo IPv4
4. Usar las siguientes direiciones DNS: 1.1.1.1 y 1.0.0.1

Lee la guía completa de [cómo cambiar DNS](/blog/dns-que-es-como-cambiar-mexico.html).

### 2. Reinicia el módem semanalmente

Los módems Telmex (especialmente los viejos) se saturan con el tiempo: memoria llena, sesiones acumuladas, caché desbordada. Reiniciar una vez por semana libera memoria y mejora el rendimiento.

**Rutina recomendada:**
- Apaga el módem del enchufe (no solo el botón)
- Espera 60 segundos completos
- Enciéndelo
- Espera 3-5 minutos a que sincronice completamente
- Las luces deben quedar en verde sólido

### 3. Separa redes WiFi 2.4 y 5 GHz

Si tu módem Telmex tiene WiFi dual band (2.4 GHz y 5 GHz), no las combines con el mismo nombre. Sepáralas:

| Banda | Alcance | Velocidad | Mejor para |
|-------|---------|-----------|------------|
| 2.4 GHz | Mayor alcance (~30m) | Menor (hasta 50 Mbps) | Dispositivos lejanos |
| 5 GHz | Menor alcance (~15m) | Mayor (hasta 500 Mbps) | Gaming, streaming, PC |

Conecta tus dispositivos a 5 GHz para máxima velocidad y deja 2.4 GHz para dispositivos lejanos o smart home.

### 4. Compra tu propio router

El router integrado en los módems Telmex es básico: WiFi débil, poco alcance, mal manejo de múltiples dispositivos. Un router Wi-Fi 6 propio mejora dramáticamente la cobertura y velocidad.

| Router recomendado | Precio aprox. | Características | Ideal para |
|-------------------|---------------|-----------------|------------|
| TP-Link Archer AX1500 | $800-$1,200 | Wi-Fi 6, 4 antenas | Casa mediana |
| Xiaomi Mi Router AX3200 | $1,000-$1,500 | Wi-Fi 6, buen alcance | Casa grande |
| TP-Link Archer AX73 | $1,800-$2,500 | Wi-Fi 6, 6 antenas | Multi-dispositivo |
| ASUS RT-AX82U | $2,500-$3,500 | Wi-Fi 6, gaming | Gaming/streaming |

Configura el módem de Telmex en "modo bridge" para que tu router maneje toda la red. Lee [mejores routers 2026](/blog/mejores-routers-2026-mexico-guia.html).

### 5. Conecta por cable Ethernet

El WiFi siempre pierde velocidad con respecto al cable. Conecta tu TV, PC, consola y cualquier dispositivo crítico por Ethernet (cable de red) para máxima velocidad.

| Conexión | Velocidad típica (100 Mbps contratados) |
|----------|----------------------------------------|
| Ethernet (cable) | 90-95 Mbps |
| WiFi 5 GHz (cerca) | 50-80 Mbps |
| WiFi 2.4 GHz | 20-40 Mbps |
| WiFi a través de 2 paredes | 10-25 Mbps |

### 6. Exige migración a fibra óptica

Si todavía tienes cobre, la mejora más grande que puedes hacer es exigir a Telmex que te migre a fibra. Llama al 01 800 123 4567 y solicita la migración.

- Si hay fibra en tu zona: la migración suele ser gratuita
- El técnico instala una ONT (nueva caja) y retira el módem VDSL
- Tu velocidad puede pasar de 20-50 Mbps a 100-1000 Mbps
- Ping mejora de 30-60 ms a 10-25 ms

### 7. Revisa tu plan y compara

Si después de todo sigues con velocidad insuficiente, puede ser momento de cambiar de proveedor. Compara Telmex con las alternativas:

| Proveedor | Plan comparable | Precio/mes | Ventaja vs Telmex |
|-----------|----------------|------------|-------------------|
| Totalplay | 200 Mbps simétrico | $399 | Velocidad simétrica |
| Izzi | 200 Mbps + TV | $449 | Incluye TV |
| Megacable | 200 Mbps | $399 | Precio similar |

Lee nuestra [comparativa Totalplay vs Izzi vs Telmex](/blog/comparativa-totalplay-vs-izzi-vs-telmex-2026.html).


## Preguntas Frecuentes

{{< faq "¿Puedo exigir a Telmex que me instale fibra óptica?" >}}
Puedes solicitarlo llamando al 01 800 123 4567. Si hay infraestructura de fibra en tu zona, Telmex debería migrarte sin costo. Sin embargo, si tu zona no tiene fibra aún, tendrás que esperar a que Telmex la despliegue (lo cual puede tardar meses o años). Mientras tanto, si necesitas más velocidad, considera Totalplay o Izzi si llegan a tu zona.
{{< /faq >}}

{{< faq "¿Mi internet Telmex de 100 Mbps por qué da solo 30?" >}}
Las causas más probables: 1) Estás midiendo por WiFi (que pierde velocidad con distancia y paredes), 2) Tu línea es cobre/VDSL no fibra (máximo 20-50 Mbps reales), 3) Saturación del nodo en horas pico (19-23h), 4) Tu módem es viejo y no soporta velocidades altas. Mide por cable Ethernet a las 10 AM para descartar WiFi y saturación. Lee [por qué no me llega la velocidad](/blog/velocidad-contratada-no-me-llega-mexico.html).
{{< /faq >}}

{{< faq "¿Cambia algo si reinicio el módem todos los días?" >}}
Reiniciar el módem una vez por semana es suficiente y recomendable. Hacerlo a diario no aporta beneficio adicional y puede incluso ser contraproducente: cada reinicio toma 3-5 minutos de sincronización y algunos módems actualizan firmware al arrancar, lo que puede tardar más. Lo importante es reiniciar cuando notes lentitud, no por calendario rígido.
{{< /faq >}}

{{< faq "¿El módem de Telmex es malo?" >}}
Los módems que Telmex proporciona (generalmente Technicolor o Huawei) son funcionales pero básicos. Tienen WiFi de alcance limitado y procesadores modestos. Para 1-3 dispositivos funcionan bien; para 10+ dispositivos o casas grandes se quedan cortos. La solución no es quejarse del módem sino comprar tu propio router y poner el módem en modo bridge.
{{< /faq >}}

{{< faq "¿Puedo reclamar a PROFECO si Telmex no me da la velocidad contratada?" >}}
Sí. Si documentas con al menos 3 mediciones de speedtest (por cable, con capturas de pantalla y fechas) que muestras menos del 80% de la velocidad contratada, puedes [quejarte ante PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html). Telmex está obligado a entregar el servicio que vende. En algunos casos puedes cancelar sin penalización por incumplimiento.
{{< /faq >}}
