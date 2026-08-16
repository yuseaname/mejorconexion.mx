---
title: "Cómo abrir puertos del router en México: guía paso a paso (2026)"
slug: "como-abrir-puertos-router-mexico"
description: "**Abrir puertos del router (port forwarding) en México es necesario para:-hostear juegos, acceder a cámaras de seguridad desde fuera de casa, mejorar el…"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/cat-wifi-router.webp"
keywords:
  - "abrir puertos router mexico"
  - "abrir puertos nat abierto"
  - "port forwarding telmex"
  - "abrir puertos izzi"
  - "configurar puertos totalplay"
---

## Respuesta Rápida

**Abrir puertos del router (port forwarding) en México es necesario para:-hostear juegos, acceder a cámaras de seguridad desde fuera de casa, mejorar el NAT en consolas (PlayStation, Xbox), usar servidores caseros (Plex, NAS) y mejorar la conexión P2P. El proceso: entra al panel del router (192.168.1.1), busca la sección "Port Forwarding" o "Virtual Server", introduce la IP local del dispositivo destino, el puerto a abrir, protocolo (TCP/UDP) y guarda. Debes asignar una IP estática al dispositivo primero para que no cambie.**

- **Para NAT abierto en PlayStation/Xbox, abre los puertos 80, 443, 3074, 3478-3480 y 53.**
- **Los routers de Telmex, Izzi y Megacable tienen una sección llamada "Port Forwarding", "Virtual Server" o "NAT".**
- **Para abrir puertos necesitas una IP pública dinámica o estática. Algunos planes de CGNAT (Totalplay) impiden abrir puertos.**

Relacionado: [cómo configurar QoS](/blog/configurar-qos-router-mexico.html) y [mejor router gaming](/blog/router-gaming-mexico-2026.html).

## ¿Qué significa "abrir puertos"?

Un puerto es como una "extensión telefónica" dentro de una dirección IP. Tu router bloquea por defecto las conexiones entrantes a todos los puertos para seguridad. "Abrir un puerto" significa decirle al router: **"si llega una conexión por este puerto, reenvíala a este dispositivo específico de mi red local"**.

### Casos donde necesitas abrir puertos

| Uso | Puertos comunes | Protocolo |
|-----|----------------|-----------|
| **PlayStation (NAT abierto)** | 80, 443, 3478, 3479, 3480 | TCP+UDP |
| **Xbox (NAT abierto)** | 53, 80, 88, 500, 3074, 3544, 4500 | UDP |
| **Nintendo Switch** | 1-65535 (o UPnP) | TCP+UDP |
| **Cámaras IP (acceso remoto)** | 37777, 8000, 8080 | TCP |
| **Plex Media Server** | 32400 | TCP |
| **Minecraft server** | 25565 | TCP |
| **Counter-Strike 2 server** | 27015 | UDP |
| **Escritorio remoto (RDP)** | 3389 | TCP |
| **FTP server** | 20, 21 | TCP |
| **Home Assistant** | 8123 | TCP |

### Casos donde NO necesitas abrir puertos

- Navegar por internet
- Ver Netflix, Disney+, YouTube
- Jugar online en servidores de otras personas (solo si hosteas tú)
- Hacer videollamadas (Zoom, Teams)
- Descargar archivos

## Preparación: IP estática y UPnP

### Opción 1: Activar UPnP (recomendado para gaming)

**UPnP (Universal Plug and Play)** permite que los dispositivos soliciten automáticamente los puertos que necesitan al router. Es lo más fácil para consolas y juegos.

1. Entra al panel del router
2. Busca **UPnP** (suele estar en Security o NAT)
3. **Actívalo**
4. Reinicia el router y las consolas

**Para el 90% de los gamers, activar UPnP es suficiente** y no necesitan abrir puertos manualmente.

### Opción 2: Asignar IP estática al dispositivo (para port forwarding manual)

Antes de abrir puertos manualmente, necesitas que el dispositivo destino tenga una IP fija:

1. En el dispositivo (PC/consola), mira su IP actual (ej: 192.168.1.50)
2. En el router, ve a **DHCP → Asignación estática / IP reservada**
3. Reserva esa IP para la MAC del dispositivo
4. Así, aunque reinicies el router, la IP no cambia

## Cómo abrir puertos en routers por proveedor

### Router Telmex Infinitum (Huawei, ZTE, Nokia)

1. Entra a `192.168.1.1` o `192.168.1.254`
2. Usuario: **PPP** o **admin** / Contraseña: la del sticker o `admin`
3. Ve a **Internet → Port Forwarding** o **Security → NAT**
4. Click **"New"** o **"+"**
5. Configura:
   - **Nombre:** (ej: "PlayStation")
   - **IP interna:** la IP de tu consola (ej: 192.168.1.50)
   - **Puerto externo e interno:** ej: 3074
   - **Protocolo:** TCP/UDP
6. Guarda

### Router Izzi (Arris, Technicolor, Ubee)

1. Entra a `192.168.0.1` o `192.168.1.1`
2. Usuario: **admin** / Contraseña: `password` o la del sticker
3. Ve a **Advanced → Port Forwarding** o **Firewall → Port Forwarding**
4. Click **"Add"** o **"New Rule"**
5. Configura:
   - **Internal IP:** la IP de tu dispositivo
   - **Internal Port:** el puerto
   - **External Port:** el mismo puerto
   - **Protocol:** TCP/UDP
6. Guarda

### Router Totalplay (varios modelos)

1. Entra a `192.168.100.1` o `192.168.1.1`
2. Usuario: **admin** / Contraseña: `admin` o la del sticker
3. Ve a **Network → NAT → Port Forwarding** o **Security → Port Forwarding**
4. Click **"Add"** o **"+ Add"**
5. Configura igual que los anteriores

**Importante sobre Totalplay:** algunos planes de Totalplay usan **CGNAT** (Carrier-Grade NAT), que impide abrir puertos porque no tienes una IP pública real. Si este es tu caso, debes:
- Llamar a Totalplay y solicitar **IP pública dinámica** (a veces sin costo extra, a veces $50-$100 MXN/mes)
- O cambiar a un plan que incluya IP pública

### Router Megacable

1. Entra a `192.168.1.1` o `192.168.0.1`
2. Usuario: **admin** / Contraseña: `admin` o `megacable`
3. Ve a **Advanced → NAT → Port Forwarding** o **Security → Virtual Server**
4. Configura igual que los anteriores

### Router propio (TP-Link, ASUS, Netgear)

Los routers propios tienen interfaces mucho más claras:

**TP-Link:**
1. Entra a `192.168.0.1` o `tplinkwifi.net`
2. Ve a **Advanced → NAT Forwarding → Port Forwarding**
3. Click **"Add"**

**ASUS:**
1. Entra a `192.168.1.1` o `router.asus.com`
2. Ve a **WAN → Virtual Server / Port Forwarding**
3. Activa "Enable Port Forwarding" y añade reglas

**Netgear:**
1. Entra a `192.168.1.1` o `routerlogin.net`
2. Ve a **Advanced → Port Forwarding / Port Triggering**

## Guía paso a paso: NAT abierto en PlayStation

1. En la PS4/PS5, ve a **Ajustes → Red → Estado de la conexión**
2. Anota la **IP** (ej: 192.168.1.50)
3. Entra al router y asigna esa IP como **estática**
4. Abre estos puertos hacia esa IP:

| Puerto | Protocolo | Uso |
|--------|-----------|-----|
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
| 3478 | TCP+UDP | PSN |
| 3479 | TCP+UDP | PSN |
| 3480 | TCP | PSN |

5. Reinicia la PS4/PS5
6. En **Estado de conexión**, el NAT debe decir **"Tipo 2"** (NAT moderado, correcto para la mayoría)

## Guía paso a paso: NAT abierto en Xbox

1. En la Xbox, ve a **Ajustes → Red → Configuración de red**
2. Anota la IP
3. En el router, abre:

| Puerto | Protocolo |
|--------|-----------|
| 53 | UDP+TCP |
| 80 | TCP |
| 88 | UDP |
| 500 | UDP |
| 3074 | UDP+TCP |
| 3544 | UDP |
| 4500 | UDP |

4. Reinicia la Xbox
5. El NAT debe decir **"Abierto"**

## ¿Qué es CGNAT y por qué me impide abrir puertos?

El **CGNAT (Carrier-Grade NAT)** es una tecnología que usan algunos proveedores (especialmente Totalplay y algunos planes de Telmex/Izzi) para compartir una IP pública entre muchos clientes. Con CGNAT, **no puedes abrir puertos** porque tu router no tiene una IP pública real.

### Cómo saber si tienes CGNAT

1. Entra a [cual-es-mi-ip.net](https://www.cual-es-mi-ip.net)
2. Anota tu IP pública visible
3. Entra al panel del router y mira la **WAN IP**
4. **Si las dos IPs coinciden:** tienes IP pública real (puedes abrir puertos)
5. **Si son distintas:** tienes CGNAT (no puedes abrir puertos)

### Solución a CGNAT

- **Llama al proveedor** y solicita "IP pública dinámica" o "deshabilitar CGNAT"
- **Totalplay:** suelen cambiarlo sin costo si insistes
- **Telmex:** generalmente lo hacen
- **Izzi/Megacable:** depende de la zona

## Seguridad al abrir puertos

Abrir puertos expone tu dispositivo a internet. Sigue estas prácticas:

- **Solo abre los puertos que necesitas**, no todo el rango
- **Usa contraseñas fuertes** en el dispositivo expuesto
- **Mantén el firmware actualizado** del dispositivo
- **Cierra los puertos cuando no los uses** (ej: si dejas de hostear un servidor Minecraft)
- **No abras el puerto 3389 (RDP)** sin usar VPN: es el más atacado por hackers

## Preguntas Frecuentes

{{< faq "¿Por qué no puedo abrir puertos en Totalplay?" >}}
Probablemente tienes CGNAT (IP compartida). Totalplay usa CGNAT en muchos planes para ahorrar IPs públicas. Llama al soporte y solicita "IP pública dinámica" o "deshabilitar CGNAT". Suelen hacerlo sin costo si insistes, aunque a veces piden $50-$100 MXN/mes extra.
{{< /faq >}}

{{< faq "¿Activar UPnP es peligroso?" >}}
UPnP tiene algunos riesgos teóricos de seguridad, pero para uso doméstico es generalmente seguro y mucho más cómodo que abrir puertos manualmente. Si tienes un Smart TV, consola o juegos que requieren puertos específicos, UPnP los abre automáticamente. Para gaming doméstico, úsalo sin problema.
{{< /faq >}}

{{< faq "¿Cómo saber si abrí bien un puerto?" >}}
Usa [canyouseeme.org](https://canyouseeme.org) desde el dispositivo con el puerto abierto. Introduce el puerto y te dirá si es accesible desde internet. Asegúrate de que la app que usa ese puerto esté corriendo (ej: el servidor de Minecraft debe estar encendido para que el test pase).
{{< /faq >}}

{{< faq "¿Abrir puertos baja la latencia en juegos?" >}}
No directamente. Abrir puertos mejora el NAT (de "estricto" a "abierto"), lo que te permite conectarte a más jugadores y ser host de partida, pero no reduce tu ping. Para reducir ping, lee nuestra guía de [ping alto en gaming](/blog/ping-alto-gaming-mexico-solucion.html).
{{< /faq >}}

{{< faq "¿Puedo ver mis cámaras de seguridad desde fuera de casa sin abrir puertos?" >}}
Sí, usando un servicio de DDNS o P2P. La mayoría de cámaras modernas (Tapo, Reolink, Hikvision) tienen una app con servidor P2P que no requiere abrir puertos. Solo abre puertos si quieres acceso directo vía IP, que es más rápido pero menos seguro.
{{< /faq >}}
