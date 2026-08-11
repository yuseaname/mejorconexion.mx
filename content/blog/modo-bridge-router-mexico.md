---
title: "Modo bridge del router: qué es y cuándo usarlo en México (2026)"
slug: "modo-bridge-router-mexico"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/topic-provider-comparison.webp"
keywords:
  - "modo bridge router"
  - "router en modo bridge mexico"
  - "configurar router propio proveedor"
  - "doble nat solucion"
  - "bridge mode telmex izzi"
---

## Respuesta Rápida

**El modo bridge del router desactiva las funciones de router (NAT, DHCP, firewall) del módem del proveedor y lo convierte en un simple "passthrough" de internet, dejando que tu router propio haga todo el trabajo. Se usa cuando tienes tu propio router (gaming, mesh, o de gama alta) y quieres evitar el doble NAT, que causa problemas en gaming, videollamadas y accesos remotos. Para activarlo: llama a tu proveedor (Telmex, Izzi, Totalplay, Megacable) y solicita "modo bridge" o "modo módem", o configúralo en el panel del router si está disponible.**

- **El doble NAT causa: NAT estricto en consolas, problemas con videollamadas, imposibilidad de abrir puertos correctamente y latencia extra.**
- **Si tienes un router propio de más de $1,500 MXN, necesitas modo bridge en el módem del proveedor.**
- **Algunos proveedores mexicanos no permiten modo bridge directamente: pídelo con insistencia al soporte.**

Relacionado: [mejores routers Wi-Fi 6](/blog/mejores-routers-wifi-6-mexico-2026.html) y [cómo abrir puertos](/blog/como-abrir-puertos-router-mexico.html).

## ¿Qué es el modo bridge?

### Sin modo bridge (configuración típica)

En una red doméstica típica en México, el módem del proveedor hace **todo**:

```
[Internet] → [Módem del proveedor con router integrado] → [Tus dispositivos]
```

El módem del proveedor (Telmex, Izzi, Totalplay) hace NAT, asigna IPs, tiene firewall y WiFi. Si le conectas **otro router** propio:

```
[Internet] → [Módem proveedor con router] → [Tu router propio] → [Tus dispositivos]
```

Esto crea **doble NAT**: el módem hace NAT una vez, tu router hace NAT otra vez. Es problemático.

### Con modo bridge

```
[Internet] → [Módem en modo bridge] → [Tu router propio] → [Tus dispositivos]
```

El módem pasa el tráfico "en bruto" (la IP pública de internet) directamente a tu router. Solo tu router hace NAT. Sin doble NAT, sin conflictos.

## Problemas del doble NAT

Tener dos routers en cascada (módem del proveedor + tu router propio) causa:

### 1. NAT estricto en consolas

PlayStation muestra "NAT Tipo 3" (estricto) y Xbox muestra "NAT estricto". Esto impide:
- Ser host de partida
- Hablar por chat de voz con algunos jugadores
- Conectar con jugadores que también tienen NAT estricto

### 2. Problemas con videollamadas

Zoom, Teams y Meet pueden no conectar o tener audio/video entrecortado por los puertos bloqueados por doble NAT.

### 3. Imposibilidad de abrir puertos correctamente

Si abres un puerto en tu router propio, el módem del proveedor sigue bloqueándolo. Necesitas abrir el puerto en **ambos** routers ( Forward → DMZ → Bridge ), que es complicado.

### 4. Latencia adicional

Cada capa de NAT añade 1-5 ms de latencia. En gaming competitivo, cada ms cuenta.

### 5. IP duplicada o conflictos

Si ambos routers usan el mismo rango de IP (192.168.1.x), hay conflictos. Necesitas cambiar el rango de uno.

## Cuándo necesitas modo bridge

### Necesitas modo bridge si:

1. **Tienes un router propio** (gaming, mesh, o de gama alta) conectado al módem del proveedor
2. **Tienes NAT estricto** en consola a pesar de abrir puertos
3. **Tienes un sistema mesh** (TP-Link Deco, ASUS AiMesh, Netgear Orbi) que quieres que gestione toda la red
4. **Necesitas abrir puertos** y no funciona bien
5. **Tienes un servidor casero** (NAS, Plex, cámaras IP) que quieres acceder desde fuera

### NO necesitas modo bridge si:

1. Solo usas el módem/router del proveedor (sin router propio)
2. Tu uso es básico: navegar, Netflix, WhatsApp, gaming casual
3. No tienes problemas de NAT o puertos

## Cómo activar modo bridge por proveedor

### Telmex Infinitum

#### Opción 1: Llamar a soporte

1. Llama al **800 123 2222**
2. Dile al operador: **"Quiero activar el modo bridge de mi módem"**
3. Te pueden pedir el número de cuenta y datos de verificación
4. El operador lo configura remotamente o te guía

#### Opción 2: Por el panel del router

1. Entra a `192.168.1.1`
2. Ve a **Internet → Connection Settings** o **Advanced → Routing**
3. Busca **"Bridge Mode"** o **"Bridge"**
4. Actívalo
5. Guarda y reinicia

**Nota:** no todos los modelos de router Telmex permiten modo bridge desde el panel. Si no lo encuentras, llama a soporte.

### Izzi

#### Llamar a soporte

1. Llama al **800 120 5000**
2. Solicita "modo bridge" o "modo módem"
3. **Izzi** suele aceptar sin problema para planes de alta velocidad
4. El operador lo configura remotamente

#### Por panel

1. Entra a `192.168.0.1`
2. Ve a **Connection → Local IP**
3. Desactiva **"Residential Gateway Function"** o busca "Bridge Mode"
4. Guarda

### Totalplay

#### Llamar a soporte

1. Llama al **800 101 0101**
2. Solicita "modo bridge"
3. **Importante:** Totalplay también debe desactivar CGNAT (lee [cómo abrir puertos](/blog/como-abrir-puertos-router-mexico.html)) si quieres abrir puertos
4. El operador configura remotamente

#### Por panel

Algunos modelos de Totalplay lo permiten:
1. Entra a `192.168.100.1`
2. Ve a **Network → WAN → Bridge**
3. Actívalo
4. Guarda

### Megacable

#### Llamar a soporte

1. Llama al **800 264 4444**
2. Solicita "modo bridge" o "poner módem en modo transparente"
3. Megacable puede ser reacio; insiste
4. Si no aceptan, considera cambiar de proveedor

## Configuración posterior al modo bridge

Después de activar modo bridge en el módem del proveedor:

### Paso 1: Conectar tu router

1. **Conecta el puerto WAN de tu router** (generalmente azul o marcado como WAN/Internet) al puerto Ethernet del módem del proveedor
2. Enciende tu router
3. Espera 2-3 minutos a que sincronice

### Paso 2: Configurar tu router

1. Entra al panel de tu router (ej: `192.168.1.1` o `192.168.0.1`)
2. **Configura tu nueva red WiFi** (nombre y contraseña)
3. Configura DHCP (generalmente activado por defecto)
4. Si necesitas QoS, puertos abiertos, o DNS: configúralos en tu router
5. Reinicia el router para asegurar

### Paso 3: Verificar IP pública

1. En tu router, ve a **WAN Status**
2. La **IP WAN** debe ser tu IP pública (la misma que ves en [cual-es-mi-ip.net](https://www.cual-es-mi-ip.net))
3. Si la IP WAN es del rango 192.168.x.x o 100.64.x.x, todavía hay doble NAT o CGNAT

### Paso 4: Reconectar dispositivos

Conecta todos tus dispositivos a la red WiFi de tu router propio (no a la del módem del proveedor).

## Tabla: ventajas del modo bridge

| Característica | Con doble NAT | Con modo bridge |
|---------------|---------------|-----------------|
| NAT consola | Estricto | Abierto/Moderado |
| Abrir puertos | Difícil/incompleto | Funciona |
| Latencia | +2-5 ms extra | Óptima |
| IP pública accesible | No | Sí |
| Servidor casero | Imposible | Posible |
| Videollamadas | Problemas | Estables |
| Firewall | Doble (confuso) | Uno solo (claro) |

## Problemas comunes al activar modo bridge

### El proveedor no lo permite

**Solución:** insiste, pide hablar con un supervisor. Si no aceptan, amenaza con cambiar de proveedor. Muchos ceden ante la posibilidad de pérdida de cliente.

### Sigo con doble NAT

**Diagnóstico:**
1. En tu router propio, verifica la IP WAN
2. Entra a [cual-es-mi-ip.net](https://www.cual-es-mi-ip.net) desde un dispositivo conectado a tu router
3. Si las IPs coinciden: no hay doble NAT (modo bridge correcto)
4. Si son distintas: sigue habiendo doble NAT

**Solución:** vuelve a llamar al proveedor y confirma que activaron modo bridge correctamente.

### Pierdo el WiFi del módem

Es normal. En modo bridge, el WiFi del módem se desactiva (para eso pusiste tu router propio). Tu red WiFi es la de tu router propio.

### CGNAT sigue activo

Si tienes Totalplay con CGNAT, modo bridge **no resuelve** el problema de puertos. Necesitas que Totalplay desactive el CGNAT también. Lee [cómo abrir puertos](/blog/como-abrir-puertos-router-mexico.html) para más detalle.

## Alternativa: DMZ (si no puedes activar bridge)

Si tu proveedor no permite modo bridge, la alternativa es configurar **DMZ** en el módem del proveedor hacia tu router propio:

1. Entra al panel del módem del proveedor
2. Ve a **Security → DMZ**
3. Introduce la **IP WAN de tu router propio**
4. Activa DMZ

Esto hace que el módem del proveedor reenvíe **todos los puertos** a tu router, simulando un bridge. No es tan limpio como bridge pero resuelve la mayoría de problemas de doble NAT.

## Preguntas Frecuentes

{{< faq "¿El modo bridge es peligroso para la seguridad?" >}}
No, si tienes tu propio router con firewall. De hecho, es más seguro: solo un firewall (el de tu router propio) en lugar de dos. Tu router propio generalmente tiene mejor firewall que el del módem del proveedor.
{{< /faq >}}

{{< faq "¿Pierdo la garantía del servicio al activar bridge?" >}}
No. El modo bridge es una funcionalidad legítima del módem. No te cancelan el servicio ni pierdes garantía. Solo cambias cómo funciona el equipo. Si tienes problemas, el proveedor puede revertir el cambio fácilmente.
{{< /faq >}}

{{< faq "¿Puedo volver al modo router si me arrepiento?" >}}
Sí. Llama al proveedor y solicita revertir el modo bridge, o entra al panel del módem y desactívalo. El proceso es reversible en cualquier momento sin perder datos ni configuraciones previas.
{{< /faq >}}

{{< faq "¿Necesito un router propio para usar modo bridge?" >}}
Sí. En modo bridge, el módem del proveedor pierde su función de router. Necesitas un router propio conectado para que gestione tu red WiFi, DHCP, firewall, etc. Si no tienes router propio, no actives bridge.
{{< /faq >}}

{{< faq "¿Mi proveedor me va a cobrar extra por modo bridge?" >}}
La mayoría no cobra extra por modo bridge: es una funcionalidad estándar del módem. Algunos proveedores pueden requerir que tengas un plan específico o cobrar si pides IP pública fija. Pero el modo bridge en sí (sin IP pública fija) es generalmente gratuito.
{{< /faq >}}
