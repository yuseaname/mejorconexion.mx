---
title: "Cómo configurar QoS en tu router para priorizar tráfico (México 2026)"
slug: "configurar-qos-router-mexico"
description: "**QoS (Quality of Service) es una función del router que permite priorizar el tráfico de dispositivos o aplicaciones específicas (tu PC gaming, tu conso…"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/topic-provider-comparison.webp"
keywords:
  - "configurar qos router mexico"
  - "priorizar trafico router"
  - "qos router gaming"
  - "qos router telmex izzi"
  - "priorizar xbox playstation router"
---

## Respuesta Rápida

**QoS (Quality of Service) es una función del router que permite priorizar el tráfico de dispositivos o aplicaciones específicas (tu PC gaming, tu consola, tu Smart TV) sobre el resto. Se activa en el panel del router (192.168.1.1), en la sección "QoS" o "Control de ancho de banda". Lo configuras diciendo: "este dispositivo tiene prioridad máxima para voz/juegos". Es la solución #1 cuando hay buffering, llamadas cortadas o ping alto porque otros están usando la red. No todos los routers lo tienen: los de gama baja de proveedor suelen tenerlo limitado; los routers propios (TP-Link, ASUS, Netgear) lo tienen completo.**

- **QoS prioriza pero no crea ancho de banda. Si tu plan es 20 Mbps y 5 personas lo usan, QoS ayuda pero no milagros.**
- **Para gaming: prioriza tu PC/consola por IP o MAC. Para streaming: prioriza tu Smart TV/Chromecast.**
- **Si tu router no tiene QoS, considera comprar uno propio de $1,500-$3,000 MXN.**

Relacionado: [cómo abrir puertos del router](/blog/como-abrir-puertos-router-mexico.html) y [ping alto en gaming](/blog/ping-alto-gaming-mexico-solucion.html).

## ¿Qué es QoS y cómo funciona?

**QoS (Quality of Service)** es una función del router que gestiona el tráfico de red. Sin QoS, el router trata todos los paquetes de datos igual: un paquete de Netflix vale lo mismo que un paquete de tu llamada de Zoom. Cuando la red se satura, todo sufre por igual.

**Con QoS**, el router identifica qué tráfico es sensible (voz, gaming, streaming) y lo envía primero. El tráfico menos sensible (descargas de Steam, backups, navegación) se queda esperando.

### Analogía

Imagina una fila de súper:
- **Sin QoS:** todos hacen fila igual, sin importar si compras un chicle o el carrito lleno
- **Con QoS:** las personas con "prioridad" (voz, gaming) pasan primero, los que llevan carrito lleno esperan

## Tipos de QoS

### 1. QoS por dispositivo (Device Priority)

Priorizas un dispositivo completo por su IP o MAC. El tráfico de ese dispositivo siempre tiene preferencia.

**Ejemplo:** "Mi PlayStation siempre tiene prioridad máxima sobre Netflix."

### 2. QoS por aplicación (App Priority)

Priorizas tráfico por tipo de aplicación (voz, gaming, streaming, descargas).

**Ejemplo:** "Todo el tráfico de voz (Zoom, WhatsApp) tiene prioridad sobre navegación."

### 3. QoS por puerto (Port-based)

Priorizas un puerto Ethernet físico del router sobre los demás.

**Ejemplo:** "Lo que se conecte al puerto 1 (mi PC gaming) tiene prioridad."

### 4. QoS por ancho de banda (Bandwidth Control)

Limitas el ancho de banda máximo de dispositivos específicos.

**Ejemplo:** "El cuarto de visitas tiene máximo 10 Mbps de descarga, para que no afecte al resto."

## Cómo configurar QoS en routers por proveedor

### Router Telmex Infinitum

1. Entra a `192.168.1.1` (admin / contraseña del sticker)
2. Ve a **Advanced → QoS** o **Network → Bandwidth Control**
3. Si no ves esa opción, tu router Telmex no soporta QoS (común en modelos básicos)
4. Si la tienes:
   - Activa **"Enable QoS"**
   - Añade regla: IP del dispositivo + prioridad (High/Medium/Low)
5. Guarda y reinicia

### Router Izzi (Arris, Technicolor)

1. Entra a `192.168.0.1` (admin / password)
2. Ve a **Advanced → QoS Configuration**
3. Algunos modelos lo tienen, otros no
4. Si lo tienes, configura:
   - Upstream/Downstream bandwidth (ej: 50/10 Mbps)
   - Añade reglas por IP/MAC

### Router Totalplay

1. Entra a `192.168.100.1` o `192.168.1.1` (admin / admin)
2. Ve a **Network → QoS** o **Advanced → QoS**
3. Totalplay ha mejorado sus routers recientes, pero los modelos viejos no lo soportan
4. Si lo tienes: activa y configura reglas por dispositivo

### Router Megacable

1. Entra a `192.168.1.1`
2. Ve a **Advanced → QoS** o **Bandwidth Control**
3. Funcionalidad limitada en la mayoría de modelos

**Si tu router del proveedor no tiene QoS (común), la solución es comprar tu propio router.** Lee nuestra [guía de routers Wi-Fi 6](/blog/mejores-routers-wifi-6-mexico-2026.html).

## Cómo configurar QoS en routers propios

Los routers propios tienen QoS mucho más potente y fácil de configurar.

### TP-Link (Archer, Deco)

**En routers Archer:**
1. Entra a `192.168.0.1` o `tplinkwifi.net`
2. Ve a **Advanced → QoS**
3. Activa QoS
4. En **"Priority"**, añade dispositivos por nombre/IP/MAC y asigna: High, Medium, Low
5. Guarda

**En sistemas mesh Deco:**
1. Abre la app **Deco**
2. Ve a **More → QoS**
3. Activa QoS
4. Añade dispositivos prioritarios

### ASUS

1. Entra a `192.168.1.1` o `router.asus.com`
2. Ve a **Traffic Manager → QoS**
3. Activa "Enable QoS"
4. Configura el ancho de banda de subida y bajada (manual o automático)
5. En **"User-defined QoS Rules"**, añade reglas:
   - Por IP origen (tu PC)
   - Por servicio (gaming, streaming, VoIP)
   - Por protocolo/puerto
6. Guarda

ASUS tiene perfiles predefinidos muy útiles: "Game", "Streaming", "VoIP".

### Netgear

1. Entra a `192.168.1.1` o `routerlogin.net`
2. Ve a **Advanced → Setup → QoS Settings**
3. Activa "Turn Internet Access QoS On"
4. Configura upstream bandwidth
5. Añade reglas en "QoS Setup" por IP/MAC/puerto

## Ejemplos prácticos de configuración

### Ejemplo 1: Gamer en casa familiar

**Situación:** Gamer juega Valorant en PC, pero cuando alguien abre Netflix o su hermano descarga Steam, su ping sube a 200+ ms.

**Configuración QoS:**
1. Asigna IP estática a la PC gamer (ej: 192.168.1.50)
2. En QoS, añade regla: IP 192.168.1.50 → **Prioridad Alta**
3. Configura el resto de dispositivos como **Prioridad Baja** o Normal
4. Si el plan es 100 Mbps: reserva 30 Mbps prioritarios para la PC

### Ejemplo 2: Home office con videollamadas

**Situación:** Trabajas desde casa con Zoom/Teams. Cuando tus hijos abren TikTok, las llamadas se cortan.

**Configuración QoS:**
1. Identifica la IP de tu laptop de trabajo
2. Prioriza esa IP como **Alta**
3. O mejor: prioriza por aplicación (**VoIP/voice = High priority**)
4. Limita los celulares de los hijos a 10 Mbps (suficiente para TikTok)

### Ejemplo 3: Streaming de Netflix sin buffering

**Situación:** Netflix buffering cuando alguien descarga algo.

**Configuración QoS:**
1. Prioriza el Smart TV (o el Chromecast) como **High**
2. O prioriza por servicio: **Streaming multimedia = High**
3. Las descargas de Steam/OneDrive quedan como **Low** y esperan

## Limitaciones de QoS

### No crea ancho de banda

Si tu plan es 20 Mbps y 5 personas lo usan intensivamente, QoS prioriza pero no multiplica. Para 4K Netflix + gaming + otros, necesitas al menos 100-200 Mbps.

### Solo funciona para tráfico de subida en algunos routers

Algunos routers básicos solo pueden controlar el tráfico de subida (que sale de tu casa). Para el tráfico de bajada, QoS es menos efectivo.

### No soluciona problemas de latencia del proveedor

Si tu proveedor enruta mal hacia los servidores del juego, QoS en tu router no ayuda. Lee [ping alto en gaming](/blog/ping-alto-gaming-mexico-solucion.html) para eso.

### Requiere conocimiento técnico mínimo

Configurar QoS correctamente requiere entender qué IP tiene cada dispositivo. No es tan simple como "apretar un botón".

## Tabla: routers recomendados para QoS en México

| Router | Precio MXN | QoS | Mejor para |
|--------|-----------|-----|------------|
| **TP-Link Archer AX21** | $1,200-$1,500 | Básico | Casas pequeñas |
| **TP-Link Archer AX5400** | $2,499 | Avanzado | Gaming + streaming |
| **ASUS RT-AX86U** | $5,299 | Excelente (Adaptive QoS) | Gaming profesional |
| **Netgear Nighthawk RAX70** | $6,999 | Muy bueno | Casas grandes |
| **ASUS ROG Rapture GT-AX11000** | $8,499 | Gaming QoS superior | Gaming competitivo |

Lee nuestra [guía de mejores routers gaming](/blog/router-gaming-mexico-2026.html).

## Preguntas Frecuentes

{{< faq "¿QoS reduce la velocidad del internet?" >}}
No reduce tu velocidad total, solo prioriza. Si tu plan es 100 Mbps y nadie más está usando internet, QoS no hace nada (todo va a 100 Mbps). QoS solo actúa cuando hay congestión: en ese momento, los dispositivos prioritarios van a velocidad máxima y los demás se reducen.
{{< /faq >}}

{{< faq "¿Mi router de Telmex/Izzi tiene QoS?" >}}
Depende del modelo. Los routers Huawei/ZTE de Telmex de gama baja no tienen QoS. Los modelos más recientes (como algunos ZTE AX3000) sí tienen QoS básico. Revisa en el panel del router si existe una sección "QoS" o "Bandwidth Control". Si no la tiene, necesitas un router propio.
{{< /faq >}}

{{< faq "¿Es mejor QoS por dispositivo o por aplicación?" >}}
Por aplicación es más elegante (automáticamente prioriza voz/gaming sin que configures cada dispositivo), pero por dispositivo es más sencillo y predecible. Para gaming y videollamadas, priorizar por dispositivo (la IP de tu PC/laptop) suele ser suficiente.
{{< /faq >}}

{{< faq "¿Configurar QoS mal puede empeorar el internet?" >}}
Sí. Si configuras la velocidad total de tu plan incorrectamente (ej: pones 1000 Mbps cuando tienes 100 Mbps), QoS no funciona bien. Y si marcas demasiados dispositivos como "prioridad alta", no hay prioridad real. Configura con cuidado y solo marca como "alta" 1-2 dispositivos críticos.
{{< /faq >}}

{{< faq "¿Un mesh system tiene QoS?" >}}
Sí, la mayoría de sistemas mesh modernos (TP-Link Deco, ASUS AiMesh, Linksys Velop) tienen QoS en su app. Es incluso más fácil de configurar que en routers tradicionales porque la app identifica los dispositivos por nombre automáticamente.
{{< /faq >}}
