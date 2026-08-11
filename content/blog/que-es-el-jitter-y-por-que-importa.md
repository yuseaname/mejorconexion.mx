---
title: "Qué es el jitter y por qué arruina tu internet (explicación fácil)"
slug: "que-es-el-jitter-y-por-que-importa"
date: 2026-08-10
author: "Equipo Mejor Conexión"
author_bio: "Comparamos internet y datos en México con criterio real, sin promesas raras."
author_slug: "equipo"
description: "Qué es el jitter (variación de latencia) en internet, cómo medirlo, por qué arruina videollamadas y juegos online, y cómo reducirlo en tu conexión en México."
keywords:
  - "que es el jitter"
  - "jitter internet"
  - "jitter alto"
  - "reducir jitter"
  - "jitter mexico"
draft: false
image: "/images/jitter-internet-explicacion-mexico.webp"
---

## Respuesta Rápida

**El jitter es la variación en el tiempo que tardan los paquetes de datos en llegar de un punto a otro en internet. Un jitter alto (mayor a 30 ms) causa cortes en videollamadas, lag en juegos online y voz robótica. En México, la fibra óptica de Totalplay y Telmex tiene jitter de 1-10 ms (excelente), mientras que el cable coaxial de Izzi y Megacable puede tener 15-50 ms. Para reducirlo: usa cable Ethernet, reinicia tu router y cambia a fibra óptica si tu conexión es de cobre o coaxial.**

- **Jitter ideal:** menos de 20 ms
- **Jitter aceptable:** 20-30 ms
- **Jitter problemático:** más de 30 ms
- **Causas comunes:** Wi-Fi saturado, router viejo, cable coaxial, congestión de red
- **Solución #1:** conecta dispositivos críticos por cable Ethernet

Para entender el concepto base, lee primero [qué es el ping](/blog/que-es-el-ping.html).

## Qué es el jitter, explicado fácil

Imagina que envías 10 cartas por correo. Si el correo es perfecto, todas llegan exactamente en 3 días. Pero si el correo es irregular, algunas llegan en 2 días, otras en 5 y otras en 7. Esa diferencia en los tiempos de llegada es el **jitter**.

En internet, los datos viajan en "paquetes". Si todos llegan con el mismo retraso (por ejemplo, 20 ms), todo funciona bien. Pero si algunos llegan en 10 ms y otros en 60 ms, hay jitter alto y la experiencia se degrada.

### Jitter vs Ping vs Latencia: cuál es la diferencia

| Concepto | Qué significa | Ideal | Problemático |
|---|---|---|---|
| Latencia (ping) | Tiempo de ida y vuelta | < 50 ms | > 100 ms |
| Jitter | Variación de la latencia | < 20 ms | > 30 ms |
| Packet loss | Paquetes perdidos | 0% | > 1% |

Estos tres conceptos están relacionados. Un ping bajo con jitter alto sigue dando problemas. Para entender la relación, lee [qué es el ping](/blog/que-es-el-ping.html).

## Cómo afecta el jitter a cada actividad online

### Videollamadas (Zoom, Teams, Meet)

El jitter es el enemigo #1 de las videollamadas. Cuando los paquetes de video llegan a ritmos irregulares, la imagen se congela, se pixela o se corta. El audio suena robótico o se retrasa respecto al video.

**Impacto:**
- Jitter < 20 ms: videollamada perfecta
- Jitter 20-30 ms: microcortes ocasionales, imperceptibles
- Jitter 30-50 ms: cortes visibles, voz robótica
- Jitter > 50 ms: videollamada inutilizable

Para más información sobre videollamadas, lee [internet para Zoom y videollamadas](/blog/internet-para-zoom-y-videollamadas-mexico.html).

### Gaming online

En juegos competitivos (Call of Duty, Valorant, League of Legends), el jitter causa "stuttering" (tirones) y hace que tu personaje se teletransporte. En lugar de un ping constante de 30 ms, el jitter hace que varie entre 20 y 80 ms, arruinando la experiencia.

**Impacto:**
- Jitter < 10 ms: experiencia ideal para gaming competitivo
- Jitter 10-20 ms: aceptable para la mayoría de juegos
- Jitter > 20 ms: noticeable lag, desventaja competitiva

Para más detalles sobre gaming, lee [mejor internet para gamers](/blog/mejor-internet-para-gamers-mexico-2026.html).

### Streaming (Netflix, YouTube)

El streaming es más tolerante al jitter porque los servicios usan "buffering" (almacenamiento previo). Sin embargo, un jitter alto puede causar reducción de calidad o buffering si la variación es extrema.

### Navegación web y redes sociales

El jitter casi no se nota en navegación normal o redes sociales. Las páginas cargan igual aunque los paquetes lleguen a diferentes ritmos. Solo lo notarás si el jitter es extremo (> 100 ms), en cuyo caso las imágenes tardarán más en cargar.

## Cómo medir el jitter en tu conexión

### Con Speedtest (Ookla)

1. Entra a [speedtest.net](https://www.speedtest.net) desde una computadora
2. Ejecuta la prueba
3. El resultado muestra "Jitter" en milisegundos (ms)

### Con la herramienta Ping de Windows/Mac

Abre la terminal (Símbolo del sistema en Windows, Terminal en Mac) y escribe:

```
ping 8.8.8.8 -n 20
```

Esto envía 20 paquetes a Google. Al final, muestra el tiempo mínimo, máximo y promedio. La diferencia entre máximo y mínimo es una buena aproximación del jitter.

### Con Packet Loss Test

Para una medición más precisa, usa herramientas como [Packet Loss Test](https://packetlosstest.com) que miden jitter, packet loss y latencia simultáneamente.

## Valores de jitter por proveedor en México

Estos son valores típicos de jitter según la tecnología y proveedor:

| Proveedor | Tecnología | Jitter típico | Jitter en horas pico |
|---|---|---|---|
| Totalplay | Fibra FTTH | 1-5 ms | 3-10 ms |
| Telmex (fibra) | Fibra FTTH/FTTC | 2-8 ms | 5-15 ms |
| Telmex (cobre VDSL) | Cobre | 10-30 ms | 20-60 ms |
| Izzi | Cable coaxial | 5-20 ms | 15-50 ms |
| Megacable | Cable coaxial | 10-30 ms | 20-60 ms |
| Starlink | Satelital | 20-50 ms | 30-80 ms |

La fibra óptica es claramente superior para mantener un jitter bajo. Si tienes cobre o coaxial y experimentas jitter alto, considera cambiar a fibra. Para más información, lee [fibra óptica vs cable](/blog/fibra-optica-vs-cable-mexico.html).

## Causas comunes de jitter alto y cómo solucionarlas

### 1. Conexión por Wi-Fi (causa #1)

El Wi-Fi es la causa más común de jitter alto. Las señales inalámbricas sufren interferencias de otros routers, paredes, microondas y dispositivos Bluetooth.

**Solución:** Conecta tu computadora o consola directamente al router con cable Ethernet. Esto elimina el jitter causado por Wi-Fi. Un cable Ethernet de categoría 5e cuesta $80-$150 MXN y marca una diferencia enorme.

### 2. Router viejo o saturado

Los routers viejos (más de 3-4 años) o económicos no manejan bien múltiples dispositivos. Si tienes 10+ dispositivos conectados, el router se satura y el jitter sube.

**Solución:** Invierte en un router Wi-Fi 6 moderno. Para recomendaciones, lee [mejores routers Wi-Fi 6 en México](/blog/mejores-routers-wifi-6-mexico-2026.html).

### 3. Congestión de la red del proveedor

En horas pico (7-11 PM), tu proveedor reparte ancho de banda entre miles de usuarios. Esto aumenta el jitter, especialmente en cable coaxial.

**Solución:** No mucho que puedas hacer excepto cambiar de proveedor. La fibra óptica es menos susceptible a la congestión. Para más información, lee [por qué el internet es lento de noche](/blog/internet-lento-en-la-noche-2026.html).

### 4. Cable coaxial o cobre

El cable coaxial (Izzi, Megacable) y especialmente el cobre (Telmex en zonas sin fibra) tienen inherentemente más jitter que la fibra óptica.

**Solución:** Verifica si tienes cobertura de fibra óptica en tu zona. Para más detalles, lee [cómo saber si tienes fibra óptica](/blog/como-saber-si-tengo-fibra-optica-2026.html).

### 5. Dispositivos consumiendo ancho de banda

Si alguien en casa está descargando un juego de 50 GB mientras tú haces una videollamada, el jitter se dispara.

**Solución:** Activa QoS (Quality of Service) en tu router para priorizar el tráfico de videollamadas y gaming. Para más información, lee [ajustes del router para mejorar velocidad](/blog/ajustes-router-mejorar-velocidad-internet.html).

## Comparativa: qué proveedor elegir para minimizar el jitter

| Tu necesidad | Mejor opción | Tecnología | Por qué |
|---|---|---|---|
| Videollamadas profesionales | Totalplay 300 Mbps | Fibra simétrica | Jitter 1-5 ms |
| Gaming competitivo | Totalplay 500 Mbps | Fibra simétrica | Jitter mínimo, sin horas pico |
| Uso general + streaming | Telmex 100 Mbps (fibra) | Fibra | Jitter bajo y buena cobertura |
| Zona sin fibra | Izzi 200 Mbps | Cable coaxial | Mejor opción disponible |
| Zona rural | Starlink | Satelital | Jitter más alto pero única opción |

Para más contexto sobre fibra vs cable, lee [fibra óptica vs cable coaxial](/blog/cable-coaxial-vs-fibra-optica.html).

## Preguntas Frecuentes

{{< faq "¿Qué es un jitter bueno en internet?" >}}
Un jitter menor a 20 ms se considera excelente y no causa problemas en ninguna actividad. Entre 20-30 ms es aceptable para uso general. Más de 30 ms empieza a causar cortes en videollamadas y lag en juegos online.
{{< /faq >}}

{{< faq "¿Por qué tengo jitter alto con fibra óptica?" >}}
Si tienes fibra y aún así el jitter es alto, las causas más probables son: 1) te conectas por Wi-Fi en lugar de cable Ethernet, 2) tu router es viejo o está saturado, 3) hay dispositivos consumiendo todo el ancho de banda simultáneamente. Conecta por cable y reinicia el router.
{{< /faq >}}

{{< faq "¿Cómo bajo el jitter de mi internet?" >}}
Las soluciones más efectivas son: 1) conectar tu dispositivo por cable Ethernet en lugar de Wi-Fi, 2) reiniciar el router semanalmente, 3) usar un router Wi-Fi 6 moderno si tienes muchos dispositivos, 4) activar QoS en el router para priorizar videollamadas y gaming, y 5) cambiar de cable coaxial o cobre a fibra óptica.
{{< /faq >}}

{{< faq "¿El jitter afecta a Netflix y YouTube?" >}}
En general, no mucho. Netflix y YouTube usan buffering (almacenamiento previo) que compensa el jitter. Solo notarás problemas si el jitter es extremo (más de 100 ms), lo cual causaría reducción de calidad o buffering ocasional.
{{< /faq >}}
