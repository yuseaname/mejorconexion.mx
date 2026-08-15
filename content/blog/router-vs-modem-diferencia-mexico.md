---
title: "Router vs módem: cuál es la diferencia y para qué sirve cada uno"
slug: "router-vs-modem-diferencia"
date: 2026-08-09
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
description: "Cuál es la diferencia entre router y módem: qué hace cada uno, por qué tu proveedor te entrega ambos (o uno combinado) y cuándo cambiarlos."
draft: false
image: "/images/generated/hero-router-vs-modem.webp"
keywords:
  - "internet mexico 2026"
  - "proteger wifi casa"
  - "router wifi mexico"
  - "totalplay vs telmex vs izzi"
  - "comparativa proveedores internet"
  - "control parental router"

---

## Respuesta Rápida

**El módem traduce la señal de tu proveedor (fibra, cable o coaxial) a Ethernet; el router reparte esa conexión a tus dispositivos vía Wi-Fi y cable. En México, los operadores entregan un equipo combo (módem+router) que hace ambas cosas, pero con rendimiento limitado. Comprar un router separado solo tiene sentido si necesitas mejor Wi-Fi, más puertos Ethernet o funciones avanzadas como control parental o QoS. Un combo de Telmex o Izzi cuesta $0 (incluido en el plan), mientras que un router Wi-Fi 6 propio va de $1,200 a $3,500 MXN.**

- **Módem = 1 puerto Ethernet de salida; router = 4+ puertos + Wi-Fi. Un combo hace ambas cosas, pero mal.**
- **Si tu combo del operador tiene Wi-Fi débil, conecta un router propio al módem en modo bridge o doble NAT.**
- **Equipos comunes en México: Arris 2Wire (Telmex), Technicolor (Izzi), ONT Huawei (Totalplay), Hitron (Megacable).**

Para más detalle, consulta nuestra guía de [mejores routers 2026](/blog/mejores-routers-2026-mexico-guia.html).


## Preguntas Frecuentes

{{< faq "¿Puedo comprar mi propio módem en lugar del del proveedor?" >}}
En la mayoría de los casos no. El módem debe ser compatible con la red del proveedor (especialmente en fibra óptica). Algunos proveedores permiten módems propios en cable coaxial si son de una lista aprobada, pero casi nunca en fibra. Lo que sí puedes comprar es un router propio para mejorar el Wi-Fi.
{{< /faq >}}}

{{< faq "¿Cómo sé si mi aparato es módem-router combinado?" >}}
Si tiene luces de Wi-Fi y conexión de internet en el mismo aparato, es combinado (combo). La mayoría de equipos que entregan Telmex, Izzi, Totalplay y Megacable son combos. Si solo tiene luces de conexión (no Wi-Fi) y un puerto Ethernet, es un módem o ONT puro.
{{< /faq >}}}

{{< faq "¿Cambiar el router mejora mi internet?" >}}
Si el problema es cobertura Wi-Fi o número de dispositivos, sí. Un router Wi-Fi 6 propio ($1,200-$3,500 MXN) mejora cobertura, estabilidad y manejo de dispositivos. Pero si el problema es la velocidad que llega por cable del proveedor, cambiar el router no ayuda.
{{< /faq >}}}

{{< faq "¿Qué es el ONT de Totalplay?" >}}
El ONT (Optical Network Terminal) es el equivalente al módem para fibra óptica. Convierte la señal de luz en conexión de red. Necesitas un router separado o el ONT-router combinado que entrega Totalplay.
{{< /faq >}}}


::: container
::: breadcrumbs
[Inicio](/) / [Blog](/blog.html) / Router vs módem
:::

El módem conecta tu casa a la red del proveedor de internet. El router distribuye esa conexión entre tus dispositivos vía WiFi o cable. Muchos proveedores entregan un aparato que hace ambas cosas (módem-router combinado), pero entender la diferencia te ayuda a diagnosticar problemas y mejorar tu red. En México, los cuatro grandes (Telmex, Totalplay, Izzi, Megacable) entregan equipos distintos según la tecnología que usan, y saber qué tienes es clave para optimizar tu conexión.

::: {.ad-slot ad-slot="after-intro"}
:::

::: section
## Módem: qué hace y por qué lo necesitas

El módem (modulador-demodulador) es el puente entre la red de tu proveedor y tu casa. Convierte la señal que llega por cable (fibra, coaxial o cobre) en una conexión de red que tus dispositivos pueden usar. Sin módem, no hay internet en casa.

El tipo de módem depende de la tecnología de tu proveedor:

- **Fibra óptica:** el módem se llama ONT (Optical Network Terminal). Convierte la señal de luz en conexión Ethernet. Totalplay y Telmex (en zonas con fibra) usan ONT. El ONT de Totalplay suele ser marca Huawei o ZTE.
- **Cable coaxial:** el módem se llama cable módem. Convierte la señal de RF del coaxial en Ethernet. Izzi y Megacable usan cable módems (marcas como Arris, Hitron, Technicolor).
- **Cobre (ADSL/VDSL):** el módem se llama módem DSL. Convierte la señal eléctrica del cable telefónico en Ethernet. Telmex sigue usando DSL en zonas sin fibra, con módems 2Wire o Arris.

**¿Puedes comprar tu propio módem?** En la mayoría de los casos no. El módem debe ser compatible con la red del proveedor y estar registrado en su sistema. Algunos proveedores de cable (Izzi, Megacable) permiten módems propios de una lista aprobada, pero en fibra (Totalplay, Telmex fibra) casi nunca.

### Señales de que tu módem tiene problemas

- La luz de "Online" o "Internet" parpadea en rojo o amarillo.
- El internet se cae y vuelve sin que reinicies el equipo.
- La velocidad por cable es mucho menor a la contratada.
- El módem se reinicia solo.

Si experimentas alguno de estos, lee nuestra guía de [módem que parpadea en rojo](/blog/modem-parpadea-rojo-solucion.html).
:::

::: section
## Router: qué hace y por qué importa

El router toma la conexión del módem y la distribuye entre tus dispositivos. Crea la red WiFi y los puertos Ethernet donde conectas tus aparatos. Sin router, solo puedes conectar un dispositivo por cable (sin WiFi).

Un router hace cuatro cosas esenciales:

- **Asigna direcciones IP** a cada dispositivo (DHCP). Cada teléfono, laptop o TV que se conecta recibe una dirección única en tu red.
- **Crea la red WiFi** (SSID y contraseña). El SSID es el nombre de tu red; la contraseña controla quién se conecta.
- **Direciona el tráfico** entre dispositivos (LAN) y hacia internet (WAN). El router decide qué datos van a internet y cuáles se quedan en tu red local.
- **Firewall básico** (NAT). Traduce las direcciones entre tu red interna e internet, dando una capa de seguridad.

Si tienes un módem sin router, solo puedes conectar un dispositivo por cable y no tienes WiFi. Por eso casi todos los proveedores entregan equipos combo (módem + router integrados).

Para más sobre routers, lee [cómo elegir router WiFi](/internet-en-casa/como-elegir-router-wifi-mexico.html) o nuestra guía de [mejores routers 2026](/blog/mejores-routers-2026-mexico-guia.html).
:::

<!-- ADSENSE_BREAK -->

::: {.ad-slot ad-slot="mid-content"}
:::

::: section
## Módem-router combinado vs separados: comparativa

La mayoría de proveedores en México entregan un aparato que hace ambas cosas (combo). Pero un combo casi siempre es peor que módem y router separados.

| Opción | Ventaja | Desventaja | Costo típico |
|---|---|---|---|
| Combinado (combo del operador) | Un solo aparato, simple, sin costo extra | Rendimiento Wi-Fi limitado, menos puertos, sin funciones avanzadas | $0 (incluido en plan) |
| Separados (módem del operador + router propio) | Mejor Wi-Fi, más puertos, QoS, control parental | Más aparatos, configuración adicional | $1,200-$3,500 MXN (router) |
| Módem + router + punto de acceso | Máxima cobertura y rendimiento | Complejo, más caro | $3,500-$7,000 MXN |

### ¿Cuándo conviene comprar un router propio?

- Tienes un plan de **200 Mbps o más** y el combo no maneja bien la carga.
- Tu casa tiene **más de 80 m²** o muros gruesos y el Wi-Fi no llega a todas las habitaciones.
- Tienes **más de 10-15 dispositivos** conectados simultáneamente.
- Necesitas **QoS** (priorizar tráfico de videollamadas o gaming).
- Quieres **control parental** avanzado.
- Quieres **Wi-Fi 6** y tu combo solo tiene Wi-Fi 5.

### Equipos comunes entregados por operadores en México

| Operador | Equipo típico | Tecnología | Wi-Fi |
|---|---|---|---|
| Telmex | Arris NVG443B / 2Wire | Fibra/cobre | Wi-Fi 5 (802.11ac) |
| Totalplay | ONT Huawei + router | Fibra FTTH | Wi-Fi 5 (802.11ac) |
| Izzi | Technicolor TC4400 / Hitron | Coaxial HFC | Wi-Fi 5 (802.11ac) |
| Megacable | Hitron CGN2 / Technicolor | Coaxial HFC | Wi-Fi 5 (802.11ac) |

Ninguno de estos equipos incluye Wi-Fi 6 de fábrica. Si quieres Wi-Fi 6 (802.11ax), necesitas comprar tu propio router.
:::

::: section
## Cómo conectar tu propio router al módem del operador

Si quieres mejor WiFi, la estrategia común es:

1. **Pedir al proveedor que ponga su módem en "modo bridge"** (desactiva el router integrado, deja solo la función de módem).
2. **Conectar tu propio router** al puerto Ethernet del módem.
3. **Tu router maneja todo el WiFi, DHCP y la red local.**

### Modo bridge vs doble NAT

| Modo | Cómo funciona | Ventaja | Desventaja |
|---|---|---|---|
| Bridge | El módem pasa directamente la IP pública al router | Mejor rendimiento, menos latencia | Requiere soporte del operador |
| Doble NAT | El módem y el router hacen NAT por separado | Funciona sin configuración especial | Puede causar problemas con gaming y VPN |

**Para Totalplay:** El ONT se puede poner en modo bridge contactando a soporte. No siempre lo hacen sin insistir.

**Para Telmex:** El módem Arris/2Wire tiene opción de bridge en algunos modelos, pero no en todos.

**Para Izzi:** Los módems Technicolor/Hitron no siempre permiten bridge. En esos casos, funciona doble NAT.

**Para Megacable:** Similar a Izzi. Verifica con soporte si tu modelo permite bridge.

Esto te da mejor cobertura, más control y mejor manejo de dispositivos. Para la guía completa, lee [cómo configurar tu router](/blog/como-configurar-router-mexico-2026.html).
:::

::: section
## Preguntas frecuentes

### ¿Puedo comprar mi propio módem?

En la mayoría de los casos no. El módem debe ser compatible con la red del proveedor. Algunos proveedores (Izzi, Megacable) permiten módems propios en coaxial si son de una lista aprobada. En fibra (Totalplay, Telmex fibra), casi nunca. Lo que sí puedes comprar es un router propio.

### ¿Cómo sé si mi aparato es módem-router combinado?

Si tiene luces de WiFi y conexión de internet en el mismo aparato, es combinado. La mayoría de equipos que entregan los operadores en México son combos.

### ¿Cambiar el router mejora mi internet?

Si el problema es cobertura o número de dispositivos, sí. Si el problema es la velocidad que llega por cable del proveedor, no. Haz una prueba por cable directo al módem para descartar problemas del router.

### ¿Qué es el ONT de Totalplay?

El ONT (Optical Network Terminal) es el equivalente al módem para fibra óptica. Convierte la señal de luz en conexión de red. Necesitas un router separado o el ONT-router combinado que entrega Totalplay.

### ¿Cuánto cuesta un buen router en México?

Un router Wi-Fi 6 de gama media (TP-Link Archer AX55, Xiaomi AX3200) cuesta entre $1,200 y $2,000 MXN. Los de gama alta (ASUS RT-AX86U, Netgear Nighthawk) van de $3,500 a $7,000 MXN. Para la mayoría de hogares, un router de $1,500-$2,500 MXN es suficiente.

### ¿Mesh o router normal?

Para casas de más de 120 m² o de dos pisos, un sistema mesh (TP-Link Deco, Nest WiFi) da mejor cobertura que un solo router. Lee nuestra guía de [cómo mejorar el Wi-Fi en casa](/internet-en-casa/como-mejorar-wifi-casa-mexico.html).

Para más sobre esto, lee [cómo configurar tu router](/blog/como-configurar-router-mexico-2026.html).
:::

::: {.section related-block="" style="margin-top:18px"}
## Sigue aprendiendo

- Para elegir router, checa [mejor router WiFi para casa](/internet-en-casa/mejor-router-wifi-casa-mexico-2026.html).
- Para entender la velocidad, lee [qué significa la velocidad de internet](/blog/que-significa-la-velocidad-de-internet.html).
- Para arreglar problemas, revisa [qué hacer si tu internet está lento](/guias/que-hacer-si-internet-lento.html).
- Para proteger tu red, lee [seguridad WiFi en casa](/blog/seguridad-wifi-casa-proteger-2026.html).
:::

::: meta-row
**Última actualización:** agosto de 2026 • [Metodología](/metodologia.html)
:::
:::
