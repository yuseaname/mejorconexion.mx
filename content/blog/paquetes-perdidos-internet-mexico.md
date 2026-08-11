---
title: "Pérdida de paquetes (packet loss) en México: diagnóstico y solución"
slug: "paquetes-perdidos-internet-mexico"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/topic-provider-comparison.webp"
keywords:
  - "perdida de paquetes mexico"
  - "packet loss internet"
  - "ping con saltos gaming"
  - "packet loss telmex izzi"
  - "como medir packet loss"
---

## Respuesta Rápida

**La pérdida de paquetes (packet loss) en México se debe principalmente a: conexión WiFi débil o con interferencia, saturación de la red local por descargas simultáneas, cables Ethernet dañados, rutas congestionadas del proveedor o hardware defectuoso (router/módem). Un packet loss de 1-2% ya afecta gaming y videollamadas; por encima de 5% el internet se vuelve inutilizable para actividades en tiempo real. La solución empieza conectando por cable Ethernet, identificando dónde se pierden los paquetes con PingPlotter, y aislando si el problema es local (tu red) o externo (proveedor).**

- **Si tienes packet loss solo por WiFi y no por cable, el problema es tu red inalámbrica, no el proveedor.**
- **Un packet loss mayor a 5% justifica un reporte técnico a tu proveedor.**
- **El 70% de los casos de packet loss se resuelven con cable Ethernet y reinicio del router.**

Relacionado: [ping alto en gaming](/blog/ping-alto-gaming-mexico-solucion.html) y [router saturado](/blog/router-lento-reiniciar-mexico.html).

## ¿Qué es la pérdida de paquetes y por qué importa?

Cuando envías datos por internet (un comando en un juego, tu voz en una llamada, un frame de video), estos se dividen en "paquetes". La pérdida de paquetes ocurre cuando algunos de esos paquetes **no llegan a destino** o llegan demasiado tarde.

### Impacto según el porcentaje

| Packet loss | Gaming competitivo | Videollamadas | Streaming | Navegación web |
|-------------|-------------------|---------------|-----------|----------------|
| **0%** | Perfecto | Perfecto | Perfecto | Perfecto |
| **1-2%** | Se notan "lag spikes" | Audio cortado ocasional | Imperceptible | Imperceptible |
| **3-5%** | Muerte injusta, teletransportes | Audio/video entrecortado | Buffering ocasional | Lento a veces |
| **5-10%** | Injugable | Imposible seguir | Buffering frecuente | Muy lento |
| **>10%** | Desconexión del servidor | Caída de llamada | Imposible ver | Timeout, páginas no cargan |

## Cómo medir el packet loss

### Método 1: Ping simple (Windows CMD)

1. Abre **CMD** (Inicio → cmd)
2. Escribe: `ping 8.8.8.8 -n 100`
3. Espera a que termine (100 paquetes)
4. Mira el resultado: **"Paquetes: perdidos = X (Y% de pérdida)"**

### Método 2: PingPlotter (recomendado)

**PingPlotter** (versión free) te muestra dónde se pierden los paquetes, hop por hop. Así sabes si el problema es tu router, tu proveedor o el servidor final.

1. Descarga PingPlotter de pingplotter.com
2. Introduce la IP o dominio del servidor (ej: `8.8.8.8` para test general)
3. Deja correr 5-10 minutos
4. Identifica **a partir de qué hop** empieza la pérdida

### Interpretación de PingPlotter

| Dónde pierde | Significado | Responsable |
|--------------|-------------|-------------|
| Hop 1 (tu router) | Problema local: WiFi, cable, router | **Tú** |
| Hop 2-3 (módem del proveedor) | Problema de señal del proveedor | **Proveedor** |
| Hop 4-8 (red del proveedor) | Congestión interna del proveedor | **Proveedor** |
| Hop 9+ (tránsito/internacional) | Ruta congestionada o lejana | **Mixto** |
| Último hop (servidor final) | Problema del servidor del juego/servicio | **El servicio** |

## Causa 1: WiFi débil o interferido (causa #1)

El WiFi es susceptible a interferencia de microondas, Bluetooth, paredes gruesas y otros routers. Si juegas o haces videollamadas por WiFi, tendrás packet loss.

### Solución

- **Cable Ethernet** para PC/consola gaming y computadora de trabajo
- Si no puedes cablear, usa **powerline adapters** ($600-$900 MXN)
- Cambia a **WiFi 5 GHz** o WiFi 6 si tu router lo soporta
- Usa un [extensor WiFi](/blog/mejor-extensor-wifi-mexico-2026.html) si la señal es débil

## Causa 2: Router saturado

Si tu router maneja 20+ dispositivos y tiene procesador limitado (común en routers de proveedor), empieza a perder paquetes por falta de capacidad de procesamiento.

### Solución

- **Reinicia el router** (alivio temporal)
- **Compra un router propio** de mejor capacidad
- Lee nuestra [guía de routers Wi-Fi 6](/blog/mejores-routers-wifi-6-mexico-2026.html)

## Causa 3: Cable Ethernet dañado

Un cable Cat5e/Cat6 con el clip roto, doblado o pisado genera errores de transmisión que el router interpreta como paquetes perdidos.

### Diagnóstico

- Cambia el cable por uno nuevo ($100-$200 MXN)
- Si el packet loss desaparece, ese era el problema

## Causa 4: Saturación de subida

Si tu plan es **asimétrico** (ej: 500 Mbps de bajada / 50 Mbps de subida), la subida se satura fácil. Una descarga de Google Photos o una subida a la nube puede saturar los 50 Mbps de subida y causar packet loss en todo lo demás.

### Solución

- **Activa QoS** para priorizar tu tráfico importante
- Pausa subidas automáticas (Google Photos, OneDrive) cuando juegues
- Considera un plan **simétrico** (Totalplay ofrece 500/500). Lee [qué es internet simétrico](/blog/que-es-internet-simétrico.html)

## Causa 5: Rutas congestionadas del proveedor

En horario pico (7-11 PM), los proveedores mexicanos congestionan sus rutas internacionales. Si jugamos a servidores de EU, notamos packet loss en ese horario.

### Solución

- Reporta al proveedor con datos de PingPlotter
- Prueba con un **VPN gaming** (ExitLag, $150-$200 MXN/mes) que enruta mejor
- Considera cambiar de proveedor si el problema es persistente

## Causa 6: Hardware defectuoso

Un módem/router con más de 4 años, un ONT (módem de fibra) defectuoso o un splitter coaxial oxidado generan packet loss.

### Solución

- Solicita cambio de equipo al proveedor
- Revisa cables coaxiales (Izzi/Megacable): el conector debe estar firme, sin óxido
- Para fibra (Totalplay/Telmex): el cable óptico no debe estar doblado

## Tabla: packet loss por proveedor (promedio 2026)

| Proveedor | Packet loss promedio | Horario pico | Comentario |
|-----------|---------------------|--------------|------------|
| Totalplay fibra | 0.5-1.5% | 1-3% en noche | Bueno, mejor opción para gaming |
| Telmex Infinitum fibra | 0.5-2% | 2-4% en noche | Depende mucho de la zona |
| Telmex cobre (ADSL) | 3-8% | 5-15% | No recomendable para gaming |
| Izzi coaxial | 1-3% | 3-6% | Medio, con picos |
| Megacable coaxial | 2-5% | 4-8% | Más problemático |

*Datos promedio, varía según zona y momento.*

## Diagnóstico paso a paso

### Paso 1: Aislar WiFi vs cable

1. Conecta tu PC por **cable Ethernet** directamente al router
2. Corre `ping 8.8.8.8 -n 100`
3. Anota el packet loss

**Si por cable no hay packet loss pero por WiFi sí:** el problema es tu WiFi.

### Paso 2: Aislar router vs proveedor

1. Conecta la PC directamente al **módem del proveedor** (si es diferente del router)
2. Corre el test

**Si directo al módem no hay packet loss:** el problema es tu router.

### Paso 3: Identificar el hop problemático

Usa PingPlotter contra el servidor del juego (busca la IP en Google: "valorant server IP", "CS2 server IP"). Mira a partir de qué hop empieza la pérdida.

### Paso 4: Reportar al proveedor con datos

Cuando llames a soporte, di:
- "Tengo X% de pérdida de paquetes entre las 8 y 10 PM"
- "El problema inicia en el hop X de mi proveedor, según PingPlotter"
- "Esto afecta mi trabajo/juego, necesito visita técnica"

## Preguntas Frecuentes

{{< faq "¿Cuánto packet loss es aceptable?" >}}
Para navegación web y streaming, hasta 3% es tolerable (quizá notes algo de buffering). Para videollamadas (Zoom, Teams), idealmente menos de 1%. Para gaming competitivo, cualquier cosa por encima de 0.5% ya te perjudica; busca 0%.
{{< /faq >}}

{{< faq "¿Por qué tengo packet loss solo en la noche?" >}}
Es congestión del proveedor en horario pico (7-11 PM). Cuando todos en tu zona se conectan, la infraestructura se satura. Reporta al proveedor con datos de PingPlotter. Si no mejoran tras 2 reportes, considera cambiar de proveedor.
{{< /faq >}}

{{< faq "¿Un cable Ethernet mejor reduce el packet loss?" >}}
Sí, si tu cable actual está dañado. Un cable Cat6 o Cat7 nuevo ($100-$200 MXN) elimina errores de transmisión. Pero un cable Cat6 no es mejor que un Cat5e si ambos están en buen estado: para casa, ambos dan 1 Gbps.
{{< /faq >}}

{{< faq "¿Por qué tengo packet loss solo en un juego y no en otros?" >}}
Probablemente el problema es la ruta hacia ese servidor específico del juego. Cada juego usa servidores distintos. Prueba con un VPN gaming para ver si mejora; si lo hace, tu proveedor enruta mal hacia ese servidor.
{{< /faq >}}

{{< faq "¿Cambiar de DNS elimina el packet loss?" >}}
No. El DNS solo afecta la resolución inicial del dominio. El packet loss es problema de la ruta de red o tu hardware local. Cambiar DNS puede acelerar la conexión inicial pero no reduce la pérdida de paquetes durante el juego.
{{< /faq >}}
