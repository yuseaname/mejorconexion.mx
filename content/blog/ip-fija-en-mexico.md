---
title: "IP Fija en México 2026: Por Qué Casi Nadie la Necesita y Qué Usar en Su Lugar"
slug: "ip-fija-en-mexico"
description: "La IP fija residencial prácticamente desapareció en México: Telmex solo la ofrece en planes empresariales y la mayoría de los proveedores la reservan para negocios. Para 9 de cada 10 usos caseros (cámaras, NAS, escritorio remoto) NO la necesitas: un DNS dinámico gratis o una red tipo Tailscale/ZeroTier resuelven lo mismo, y a veces mejor."
date: 2026-08-19
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
keywords:
  - "ip fija mexico"
  - "ip fija telmex"
  - "ip fija izzi totalplay megacable"
  - "dns dinamico ddns mexico"
  - "tailscale zerotier mexico"
  - "cgnat mexico como saber"
  - "abrir puertos router mexico"
  - "ip publica dinamica residencial"
  - "ip fija empresarial mexico"
  - "acceder camaras desde fuera casa mexico"
draft: false
image: "/images/ip-fija-en-mexico/img-1.webp"
---

## Respuesta Rápida

**La IP fija residencial prácticamente desapareció en México: Telmex/Infinitum solo la ofrece en planes empresariales, Izzi y Totalplay la reservan a cuentas de negocio, Megacable históricamente fue el más flexible pero con costo. Para el 90% de los usos caseros (cámaras, NAS, escritorio remoto) NO la necesitas: un DNS dinámico gratuito apunta tu hostname a tu IP actual cada vez que cambia, y Tailscale o ZeroTier resuelven mejor y sin abrir puertos.**

- **Cámaras desde el celular**: DDNS + un puerto abierto. Gratis o ~$50 MXN/mes.
- **Entrar a tu red como si estuvieras en casa**: Tailscale o ZeroTier (VPN malla), sin abrir nada.
- **IP fija de verdad** (servidor, geolocalización, cámaras empresariales): plan empresarial, $1,500–$3,500 MXN/mes.
- **Trampa que nadie te dice**: muchos planes residenciales ya vienen con **CGNAT** — tu IP "fija" puede no ser accesible desde internet aunque la contrates.

Para entender cómo se enchufa esto con tu router, revisa [cómo abrir puertos en un router en México](/blog/como-abrir-puertos-router-mexico.html) y, si tu objetivo es entrar a tus cámaras, [internet para cámaras de seguridad y videovigilancia](/blog/internet-camaras-seguridad-videovigilancia.html). ## IP Fija vs Dinámica en 2 Minutos

Tu **dirección de casa** es como una IP fija: nunca cambia. Una **casilla rotativa en una oficina de correos** es como una IP dinámica: el número cambia. Un **DNS dinámico** es un letrero luminoso afuera que dice "hoy estoy en la casilla 47B".

- **IP fija**: dirección pública que no cambia.
- **IP dinámica**: cambia cuando reinicias el módem.
- **IP privada detrás de CGNAT**: tu proveedor pone a decenas o cientos de suscriptores detrás de una sola IP pública. Aquí ni con IP "fija" resuelves.

Muchos proveedores residenciales —sobre todo en planes nuevos o zonas saturadas— te entregan una IP que NO es única: tu casa vive detrás de una capa de **Carrier-Grade NAT (CGNAT)** que comparte una IP pública entre muchos usuarios.

**¿Cómo saber si estás en CGNAT?** Entra a tu módem/ONT (`192.168.1.1` o `192.168.0.1`) y busca la IP de la WAN. Si empieza con `100.64.x.x`, `10.x.x.x` o `172.16.x.x`–`172.31.x.x`, casi seguro es CGNAT. Compárala con [el medidor de velocidad](/blog/medidor-internet-speedtest-mexico.html): si NO coinciden, ningún DDNS ni apertura de puerto va a funcionar hasta que salgas.

## ¿De Verdad Necesitas IP Fija?

Antes de gastar un peso, haz el triage honesto.

| Uso que quieres dar | ¿Necesitas IP fija de verdad? | Solución más barata |
|---|---|---|
| Ver mis cámaras WiFi desde el celular | NO en la mayoría de los casos | DDNS + 1 puerto, o nube del fabricante |
| Entrar al NAS o servidor casero desde fuera | NO obligatorio | Tailscale/ZeroTier (VPN malla), o DDNS + VPN propia |
| Escritorio remoto a una PC de casa (RDP, VNC, SSH) | NO | Tailscale/ZeroTier resuelve sin abrir nada |
| Servidor web, Minecraft o similar expuesto a internet | CASI SIEMPRE sí | Plan con IP fija o servicio cloud |
| Juegos online (consola/PC) | NO (IP fija ayuda poco) | Abrir puertos específicos para el juego, NAT tipo 1 |
| Home office básico (Zoom, Teams, Drive) | NO | Ningún cambio necesario |
| Apps por geolocalización/región (trading, banca, streaming) | CASI SIEMPRE sí | IP fija dedicada o VPN comercial con IP fija de la región |
| Cámara IP profesional con NVR remoto para negocio | SÍ recomendado | Plan empresarial con IP fija + monitoreo |
| Acceso a un DVR local desde fuera sin servicio de nube | SÍ en muchos modelos viejos | IP fija o DDNS (si NO estás en CGNAT) |

**Lectura honesta:** el 70% dice "NO" — sigue leyendo sin comprar nada. El 30% dice "CASI SIEMPRE sí" o "SÍ recomendado" — ahí sí tienes que evaluar.

**Confirma qué tipo de IP tienes hoy:**

1. Anota la IP WAN de tu módem.
2. Entra a una página tipo whatismyip desde tu casa.
3. Si coinciden, NO estás en CGNAT. Un DDNS te sirve perfectamente.
4. Si NO coinciden y la del módem es privada (10.x, 100.64.x, 172.16–31.x), estás detrás de CGNAT. Antes de pagar nada, llama a tu proveedor: "¿mi plan tiene IP pública dedicada o estoy en CGNAT?".

## La Alternativa #1: DNS Dinámico (DDNS) Explicado Sin Tecnicismos

Si NO estás en CGNAT, el DDNS resuelve el 90% de lo que la gente busca cuando pide "IP fija". Y es gratis o cuesta muy poco.

**Qué hace:** un proveedor DDNS te asigna un hostname fijo tipo `tu-casa.ddns.net`. Tu router le avisa al servicio DDNS cada vez que tu IP cambia. Cuando escribes `tu-casa.ddns.net` desde afuera, el servicio te lleva a tu IP actual.

**Costos típicos:** DuckDNS (gratuito), No-IP (gratis con renovación mensual o desde ~$5 USD/mes), DynDNS (~$8 USD/mes), afraid.org (gratis limitado). La mayoría de routers modernos traen cliente DDNS integrado.

**Limitaciones serias:**

1. **CGNAT mata el DDNS.** El hostname apunta a la IP del pool, no a tu casa.
2. **Necesitas abrir al menos un puerto** (ver [cómo abrir puertos en un router en México](/blog/como-abrir-puertos-router-mexico.html)).
3. **Algunos proveedores rotan la IP cada pocas horas.** Hay pequeños periodos donde el hostname puede no apuntar correctamente.

**Cuándo sí te conviene:** tienes IP pública real; quieres ver tus cámaras o entrar a un servidor casero de vez en cuando; no quieres pagar IP fija; aceptas abrir 1-2 puertos con seguridad correcta.

**Cuándo NO te conviene:** estás en CGNAT y tu proveedor no te saca; necesitas IP fija para geolocalización; abrir un puerto público te preocupa (mejor VPN malla).

## La Alternativa #2: Redes Malla Virtual (Tailscale, ZeroTier y similares)

La mayoría de artículos sobre IP fija se quedan cortos: no mencionan que existe una categoría de herramientas que resuelven "entrar a mi casa desde afuera" sin abrir ni un solo puerto público.

**Qué son:** Tailscale y ZeroTier son de la misma familia — software que crea una VPN entre tus dispositivos usando infraestructura de relay en la nube. Tus dispositivos se identifican con claves criptográficas y se ven entre sí como si estuvieran en la misma LAN. Funciona sobre NAT, CGNAT, IPv6, 4G/5G.

**Qué resuelven:** escritorio remoto sin abrir RDP; NAS sin abrir SMB; panel web de cámaras o Home Assistant; archivos cifrados.

**Qué NO resuelven:**
- **No reemplazan una IP fija pública.** Si necesitas exponer un servidor web a usuarios externos, NO es lo que buscas.
- Requieren instalar software en cada dispositivo que conectes.
- El tráfico pasa por relays de terceros, con la latencia y políticas de privacidad que eso implica.
- **No son servicio de marca recomendada por este artículo.**

**Cuándo tiene sentido:** tienes varios dispositivos propios y quieres entrar a ellos sin abrir puertos; estás en CGNAT y DDNS no te sirve; tu cámara/NAS no tiene app de nube.

**Cuándo NO vale la pena:** solo quieres ver tus cámaras desde el celular — la app del fabricante es más fácil y barata; necesitas exponer un servicio a terceros.

## La Alternativa #3: Servicios de Nube del Fabricante (Cámaras, NAS)

Si tu cámara o tu NAS tienen app propia con nube, probablemente ya resuelven tu problema sin IP fija, sin DDNS, sin Tailscale y sin abrir nada.

- **Cámaras Xiaomi, Ezviz, Tapo, Reolink**: la app hace relay por la nube del fabricante. Abres la app y ves la cámara, sin abrir ni configurar nada. Costo: $0 con microSD local, ~$50–200 MXN/mes en nube según almacenamiento.
- **NAS Synology/QNAP**: QuickConnect o myQNAPcloud hacen lo mismo sin abrir puertos.

**Limitaciones:** dependes del fabricante (si quiebra o sube precios, te quedas sin acceso); el video viaja por sus servidores; latencia ligeramente mayor.

Para el 90% de usuarios caseros que solo quieren ver la cámara cuando salen de viaje, es la respuesta más simple. Lo cubrimos a detalle en [internet para cámaras de seguridad y videovigilancia](/blog/internet-camaras-seguridad-videovigilancia.html).

## Cómo Pedir IP Fija Si Realmente la Necesitas

**Paso 1: confirma primero que NO estás en CGNAT.** Si lo estás, no tiene caso pedir IP fija en el mismo plan: te la cobran y seguirá sin ser accesible. Primero hay que salir.

**Paso 2: identifica qué plan la incluye.**

- **Telmex/Infinitum**: NO como add-on residencial. Solo en planes empresariales.
- **Izzi**: en planes residenciales selectos (con costo); más sencillo en planes de negocio.
- **Totalplay**: predominantemente en planes de negocio; en residencial suele no estar disponible.
- **Megacable**: históricamente el más flexible; permite IP fija como add-on en algunos planes residenciales, pero cada vez menos.

**Paso 3: qué pedirle al ejecutivo.** Di una de estas dos:

- Si quieres que tu dirección pública NUNCA cambie: **"necesito activación de IP fija pública dedicada en mi WAN"**.
- Si con que no cambie entre reinicios del módem te basta: **"necesito IP reservada por DHCP"**.

La diferencia importa: algunos ofrecen la segunda opción sin cobrar extra; la primera suele tener costo adicional o requerir plan empresarial.

**Paso 4: pide la confirmación por escrito.** Sin esto, el ejecutivo puede decir "se la dimos" sin que figure, y te la cambian sin avisar.

El desglose está en [diferencia entre internet residencial y empresarial en México](/blog/diferencia-internet-residencial-empresarial-mexico.html). Si tu uso es profesional, conviene irse directo al plan empresarial.

## Precios y Trampas (Lo Que Realmente Pagas)

| Concepto | Rango típico mensual | Notas |
|---|---|---|
| IP fija como add-on residencial (donde aún existe) | $80–$250 MXN | Disponibilidad cada vez menor |
| Plan residencial con IP fija incluida | No existe en la mayoría de proveedores actuales | Hoy es territorio empresarial |
| Plan empresarial básico (IP fija + SLA + soporte prioritario) | $1,500–$3,500 MXN | Telmex, Izzi, Totalplay, Megacable |
| Plan empresarial avanzado (IP fija + IP adicional + soporte 24/7) | $3,500–$8,000 MXN | Varios servicios expuestos |
| Costo único de instalación / cambio de plan | $0–$1,500 MXN | A veces lo condonan en promoción |

**Trampas antes de firmar:**

- **Permanencia mínima.** Algunos planes empresariales exigen 12 o 18 meses.
- **IP fija "compartida" vs "dedicada".** Una dedicada es solo para ti; una "compartida" sigue detrás de un NAT.
- **Cambio de IP cada X meses.** Si la necesitas por años, pide cláusula explícita de no rotación.
- **Costo de cambio residencial → empresarial.** Pueden aplicar instalación + diferencia de equipo.

**La matemática que la gente no hace:** un dominio propio cuesta ~$200–$400 MXN/año y un DDNS es gratis. Antes de firmar, calcula 12, 24 y 36 meses y compara con dominio + DDNS de paga. Muchas veces la decisión correcta es NO pagar IP fija.

## Configurar Tu Conexión y Seguridad (Una Vez Que Tienes IP Fija)

Si ya pagaste y te la activaron, **en la mayoría de los casos NO tienes que configurar nada en tu router.** El proveedor activa la IP fija en su lado y tu módem/ONT la recibe por DHCP.

**Cómo comprobar que la tienes de verdad:**

1. Entra a la configuración de tu módem y anota la IP WAN.
2. Entra a [el medidor de velocidad](/blog/medidor-internet-speedtest-mexico.html) y revisa qué IP pública reporta.
3. Las dos deben coincidir. Si la del módem es privada (10.x, 100.64.x) y la pública cambia cada vez que reinicias, NO te dieron IP fija real. Reclama con folio.
4. Reinicia el módem tres veces, con 5 minutos de separación. Si la IP WAN cambia, NO es fija.

**UPnP: peligro encendido por default.** Muchos módems y routers traen UPnP de fábrica: las aplicaciones de tu LAN pueden abrir puertos sin tu intervención. Es un vector de ataque real. Si no lo necesitas, apágalo.

**Reglas de oro para abrir puertos:**

- Abre SOLO los puertos que necesites, hacia una IP local fija.
- Cambia el puerto default si tu dispositivo lo permite (8080 en lugar del 80; 2222 en lugar del 22).
- Limita por IP de origen cuando puedas.
- Apaga lo que no uses: cada puerto abierto es una puerta.

El detalle fino está en [cómo abrir puertos en un router en México](/blog/como-abrir-puertos-router-mexico.html).

## Seguridad: Lo Que Nadie Te Dice Al Abrir Tu Casa a Internet

La mitad de las cámaras IP hackeables en México (botnets Mirai) fueron comprometidas porque alguien abrió un puerto sin tomar cinco minutos de precauciones.

**Checklist de 5 minutos antes de abrir un puerto al público:**

- [ ] **Contraseña default cambiada** en el dispositivo. Si no, ya estás comprometido.
- [ ] **Firmware actualizado** a la última versión estable.
- [ ] **Dispositivo en red de invitados aislada**, no en la misma red que tu laptop y celular.
- [ ] **Acceso remoto por HTTPS activado**, NO por HTTP plano.
- [ ] **Tienes un log** de quién entra y desde dónde. Revísalo una vez al mes.
- [ ] **Puerto NO default** (8080 en lugar de 80, 2222 en lugar de 22) si tu dispositivo lo permite.
- [ ] **Si no lo usas todos los días, no lo dejes abierto**. Apaga el reenvío cuando no lo uses.

Red de invitados IoT está en [red de invitados IoT segura en México](/blog/red-invitados-iot-segura-mexico.html). El resto del hardening lo cubrimos a fondo en [seguridad WiFi en casa: cómo proteger tu red 2026](/blog/seguridad-wifi-casa-como-proteger-2026.html).

**Tres errores comunes en campo:**

1. **Cámara WiFi con contraseña default** (admin/admin) abierta al público vía puerto 80. El atacante la encuentra con un escaneo masivo en menos de una hora.
2. **NAS Synology accesible por QuickConnect** pero sin 2FA. Llega ransomware que cifra todos los archivos.
3. **Router del proveedor con interfaz de administración expuesta** porque alguien abrió el puerto 80 "para ver las cámaras". El atacante entra al router, cambia el DNS, te redirige a phishing. Las guías de [cambiar contraseña WiFi Telmex/Izzi/Totalplay](/blog/cambiar-contrasena-wifi-telmex-izzi-totalplay.html) y de [proteger tu red de casa contra hackers en México](/blog/proteger-red-casa-hackers-mexico.html) son obligatorias antes de seguir.

Es lo que pasa cuando se abre la puerta de la casa sin cambiar la chapa.

## Árbol de Decisión: ¿De Verdad Necesitas IP Fija?

**Pregunta 1: ¿Para qué la quieres?**
- Ver cámaras, entrar a NAS, escritorio remoto → **Salta a Pregunta 2.**
- Exponer servidor web/Minecraft, geolocalización, NVR profesional → **Salta a Pregunta 3.**

**Pregunta 2: ¿Estás en CGNAT?**
- NO (mi IP pública coincide con la WAN del módem) → **DDNS + 1 puerto + checklist de seguridad. Probablemente no compres nada.**
- SÍ (estoy detrás de CGNAT) → **Salta a Pregunta 2b.**

**Pregunta 2b: ¿Tu cámara/NAS tiene app de nube del fabricante?**
- SÍ (Xiaomi Home, Ezviz, Tapo, Synology QuickConnect, etc.) → **Usa la app del fabricante. No compres nada.**
- NO → **Evalúa Tailscale/ZeroTier u otro VPN malla. NO abras puertos al público.**

**Pregunta 3: ¿Cuánto vale tu tiempo / tu servicio por hora caída o por incidente de seguridad?**
- <$200 MXN/hora → **Plan residencial + DDNS + VPN malla.**
- $200–$1,000 MXN/hora → **Plan empresarial con IP fija + SLA + soporte prioritario. Vale la pena.**
- >$1,000 MXN/hora → **Plan empresarial con IP fija dedicada + monitoreo + seguro.**

**Lectura final:** si tu cámara tiene app del fabricante, el costo total es $0. Si llegaste a la pregunta 3 con una PyME facturando $200/hora, $2,500 MXN/mes se paga con que te ahorres una caída.

## Preguntas Frecuentes

**¿La IP fija acelera mi internet?** 
No. La velocidad depende del plan y la tecnología. La IP fija solo cambia que tu dirección pública no rota; no sube ni baja Mbps.

**¿Pierdo anonimato si tengo IP fija?**
Tu IP fija va asociada a tu nombre y dirección en los registros del proveedor (por ley, deben tenerlos). Si te importa el anonimato, IP fija es lo contrario: IP dinámica + navegación normal + no compartir P2P es más privado. Para casos sensibles, la herramienta correcta es una VPN comercial con servidores fuera de México o una red tipo Tor.

**¿CGNAT me bloquea la IP fija?**
Sí, en muchos casos. Si te ponen en CGNAT y encima te cobraron por IP fija como add-on, probablemente te cobraron por una IP "reservada" dentro del pool, que sigue sin ser accesible. Antes de pagar, valida que NO estás en CGNAT (IP WAN del módem coincide con la IP pública del medidor, y NO es 10.x / 100.64.x / 172.16–31.x).

**¿Y qué hay del IPv6? ¿No resuelve esto?**
IPv6 sí podría resolver el problema de CGNAT porque cada dispositivo podría tener una dirección pública única. Pero su despliegue en México es desigual: Telmex/Infinitum y Totalplay han avanzado; Izzi y Megacable van más atrás. Aunque tuvieras IPv6, muchas apps asumen IPv4, así que no confíes solo en IPv6 en 2026.

---

## Prompts de Imágenes

**1. Gráfico "dirección de casa vs casilla rotativa" para IP fija vs dinámica:** Ilustración plana, fondo blanco, dos mitades verticales. Izquierda: casita con buzón fijo, etiqueta "IP fija — tu casa siempre en la misma dirección". Derecha: oficina de correos con casillas y globo luminoso ("Casilla 47B → 82C → 13A"), etiqueta "IP dinámica — la casilla rota". Flecha inferior conecta con "DNS dinámico = letrero luminoso que actualiza la casilla". Paleta azul y verde menta, sans-serif, 16:9, sin rostros, sin marcas de proveedores.

**2. Diagrama de capas de CGNAT (casa, capa compartida, internet):** Ilustración técnica limpia, fondo blanco, tres capas horizontales. Capa 1 (casa): ícono de casa con tres dispositivos detrás de un router, etiqueta "Tu LAN 192.168.1.x". Capa 2 (proveedor): caja gris grande con texto "CGNAT — IP compartida 187.190.x.x" y cuatro íconos de casas pequeñas ("múltiples suscriptores"). Capa 3 (internet): globo terráqueo con flecha tachada, etiqueta "tráfico entrante bloqueado". Paleta azul técnico con acentos rojos, 1:1, iconografía plana, sin rostros.

**3. Árbol de decisión visual "¿de verdad necesito IP fija?":** Diagrama de flujo vertical, fondo crema, cinco nodos conectados por flechas. Nodo 1 (verde): "Pregunta 1: ¿para qué la quieres?" con dos ramas. Rama cámaras/NAS (verde) lleva a Nodo 2: "¿estás en CGNAT?". Rama servidor/geolocalización (ámbar) lleva a Nodo 3: "costo por hora caída". Nodo 2 bifurca a Nodo 2a (verde): "DDNS + 1 puerto" y Nodo 2b (ámbar): "app del fabricante o VPN malla". Nodo 3 bifurca a tres niveles de plan empresarial. Cada nodo con ícono pequeño. Paleta verde menta/ámbar/rojo apagado según veredicto. Sans-serif, 9:16, sin rostros, sin logos de proveedores.
