---
title: "Por qué el internet corta las llamadas WiFi y cómo solucionarlo"
slug: "internet-corta-llamadas-wifi-mexico"
description: "Las llamadas WiFi se cortan en México por tres causas principales: (1) WiFi débil o saturado que no soporta el tráfico de voz, (2) router sin QoS que…"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/cat-wifi-router.webp"
keywords:
  - "llamadas wifi se cortan"
  - "whatsapp call corta internet"
  - "llamada wifi se escucha cortado"
  - "voip inestable mexico"
  - "llamadas whatsapp cortas"
---

## Respuesta Rápida

**Las llamadas WiFi se cortan en México por tres causas principales: (1) WiFi débil o saturado que no soporta el tráfico de voz, (2) router sin QoS que no prioriza el tráfico VoIP frente a Netflix o descargas, y (3) microcortes del proveedor de internet. Para arreglarlo: conecta por cable Ethernet si es posible, activa QoS en el router para priorizar tu teléfono, reduce la saturación de la red pausando descargas, y asegúrate de tener al menos 5 Mbps libres para llamadas de voz.**

- **WhatsApp, Zoom, Teams y Meet necesitan 1-3 Mbps estables por llamada. Si tu red está saturada, se cortan.**
- **El WiFi 2.4 GHz es más propenso a cortes en llamadas por interferencia; usa 5 GHz si es posible.**
- **Si las llamadas se cortan a la misma hora, es congestión de tu proveedor en horario pico.**

Relacionado: [por qué se cae el WiFi en casa](/blog/por-que-se-cae-wifi-casa-mexico.html) y [WiFi se desconecta solo](/blog/wifi-se-desconecta-y-reconecta-mexico.html).

## ¿Por qué las llamadas por internet son sensibles?

Las llamadas de voz por internet (WhatsApp, Zoom, Teams, Meet, Skype) usan el protocolo **VoIP (Voice over IP)**. A diferencia de navegar o descargar archivos, **la voz en tiempo real no tolera interrupciones**:

- Si un frame de YouTube llega 500 ms tarde, el player lo bufferiza y sigues viendo el video
- Si un paquete de voz llega 500 ms tarde, **se pierde**: se corta la palabra

Por eso, aunque tengas "200 Mbps de internet", las llamadas se cortan si la red es inestable o no prioriza el tráfico de voz.

### Requisitos de ancho de banda por servicio

| Servicio | Bajada mínima | Subida mínima | Notas |
|----------|---------------|---------------|-------|
| WhatsApp Call (voz) | 0.5 Mbps | 0.5 Mbps | Muy ligero |
| WhatsApp Video Call | 2 Mbps | 2 Mbps | Calidad HD |
| Zoom (voz+video) | 3 Mbps | 3 Mbps | 1:1, HD |
| Zoom group call | 4 Mbps | 4 Mbps | Multiconferencia |
| MS Teams call | 2 Mbps | 2 Mbps | Estándar |
| Google Meet | 3 Mbps | 3 Mbps | HD |
| Discord voz | 0.1 Mbps | 0.1 Mbps | Muy ligero |

**Importante:** estos son mínimos. Si alguien en casa está descargando algo o viendo Netflix 4K (que usa 25 Mbps), tu llamada sufre aunque tú tengas 3 Mbps asignados.

## Causa 1: WiFi débil o interferido

El WiFi de 2.4 GHz es muy susceptible a interferencia. Microondas, Bluetooth, otros routers vecinos y paredes gruesas generan cortes en llamadas.

### Soluciones

- **Conecta tu celular/tablet a la banda de 5 GHz** si tu router tiene dual-band (mucho más estable)
- **Acércate al router** durante llamadas importantes
- **Cambia el canal WiFi** del router a uno menos saturado (1, 6 u 11 en 2.4 GHz)
- Usa un **extensor WiFi** cerca de tu lugar de trabajo

Lee nuestra [comparativa de extensores WiFi](/blog/mejor-extensor-wifi-mexico-2026.html).

## Causa 2: Router sin QoS (sin prioridad para voz)

Por defecto, los routers básicos de Telmex, Izzi y Totalplay tratan todo el tráfico igual: un paquete de Netflix vale lo mismo que un paquete de tu llamada de Zoom. Cuando la red se satura, **la voz sufre primero**.

### Solución: activar QoS

QoS (Quality of Service) permite priorizar el tráfico sensible como voz y gaming sobre el resto.

1. Entra al panel del router (`192.168.1.1` o `192.168.0.1`)
2. Busca **QoS / Calidad de Servicio / Control de ancho de banda**
3. Activa y prioriza:
   - **Tu teléfono** (por MAC o IP) para llamadas WhatsApp/Zoom
   - **El puerto UDP 53** (DNS)
   - **Los puertos de la app** (WhatsApp usa UDP 3478, 5030-5060; Zoom usa UDP 8801-8810)
4. Guarda y reinicia el router

Lee nuestra guía completa de [cómo configurar QoS](/blog/configurar-qos-router-mexico.html).

## Causa 3: Saturación de la red local

Si tu hogar tiene:
- 3 celulares viendo TikTok/YouTube
- 1 Smart TV con Netflix 4K
- 1 laptop sincronizando Google Drive
- 2 consolas gaming online

...tu router no da abasto. La llamada de Zoom de papá se corta.

### Soluciones

- **Pausa descargas/sincronizaciones** durante llamadas importantes
- **Activa QoS** para priorizar el dispositivo de la llamada
- **Cambia a un router más potente** si tu hogar tiene 15+ dispositivos
- **Verifica tu velocidad:** si tu plan es 50 Mbps y tienes 5 personas usándolo, no alcanza

## Causa 4: Microcortes del proveedor

Si tu proveedor tiene microcortes de 1-2 segundos (muy comunes en algunas zonas de México), la llamada se corta o se cae del todo.

### Diagnóstico

1. Mide la estabilidad de tu internet con **PingPlotter** contra 8.8.8.8 durante 10 minutos
2. Si ves caídas puntuales (pérdida de paquetes), es tu proveedor
3. Llama a soporte con esos datos

## Causa 5: Velocidad de subida insuficiente

La mayoría de planes de internet en México son **asimétricos**: tienen mucha bajada y poca subida.

| Plan típico | Bajada | Subida | Llamadas simultáneas posibles |
|-------------|--------|--------|------------------------------|
| Telmex 50 Mbps | 50 Mbps | 5 Mbps | 2-3 videollamadas |
| Telmex 200 Mbps | 200 Mbps | 20 Mbps | 6-8 videollamadas |
| Totalplay 500/500 | 500 Mbps | 500 Mbps | Ilimitadas |
| Izzi 300 Mbps | 300 Mbps | 30 Mbps | 10+ videollamadas |

**Problema típico:** si tienes 5 Mbps de subida y subes fotos a Google Photos o iCloud, se saturan esos 5 Mbps y la llamada se corta.

### Solución

- **Pausa backups automáticos** (iCloud, Google Photos) durante videollamadas
- **Activa QoS** para reservar al menos 3 Mbps de subida para voz
- **Cambia a un plan con más subida** o un plan simétrico. Lee [qué es internet simétrico](/blog/que-es-internet-sim%C3%A9trico.html)

## Causa 6: Configuración NAT o firewall agresiva

Algunos routers bloquean puertos UDP necesarios para VoIP. Si tu llamada WhatsApp funciona a veces y otras no, puede ser firewall.

### Solución

1. Entra al panel del router
2. Ve a **Firewall / NAT**
3. Desactiva "SPI Firewall" o baja la seguridad a "Media" temporalmente
4. Si eso resuelve, mantén esa configuración

## Causa 7: El dispositivo tiene gestión de energía agresiva

iPhone y Android ahorran batería reduciendo la actividad WiFi en segundo plano. Si tu pantalla se apaga durante una llamada WhatsApp, puede cortar el WiFi.

### Solución

- **Android:** Ajustes → WiFi → Avanzado → "Mantener WiFi activo en reposo" → Siempre
- **iPhone:** desactiva "Low Power Mode" durante llamadas
- **WhatsApp Settings:** activa "Usar menos datos en llamadas" si tu conexión es mala

## Diagnóstico paso a paso

### Paso 1: Prueba por cable

Conecta una laptop al router por cable Ethernet y haz una llamada Zoom. Si por cable funciona perfecto pero por WiFi no, el problema es el WiFi.

### Paso 2: Mide la velocidad

Usa [Speedtest](https://www.speedtest.net) durante una llamada. Si tienes <3 Mbps de subida libres, ahí está el problema.

### Paso 3: Revisa el número de dispositivos

Si hay 15+ dispositivos activos en tu red, tu router básico no da abasto. Necesitas un router mejor o QoS.

### Paso 4: Haz PingPlotter

Mide la estabilidad de tu conexión durante 10 minutos. Si tienes pérdida de paquetes, es problema de red (no de la app).

### Paso 5: Reporta al proveedor si aplica

Si todo lo local está bien y sigues con cortes, llama al proveedor con datos de PingPlotter.

## Tabla: soluciones según el síntoma

| Síntoma | Causa probable | Solución rápida |
|---------|---------------|-----------------|
| Voz se escucha robótica | Packet loss o saturación | Cable Ethernet, QoS |
| Llamada se cae a los X minutos | Router saturado o firewall | Reinicia router, revisa firewall |
| Audio retrasado | Alta latencia | Cable Ethernet, elige servidor cercano |
| Video se congela | Baja subida o saturación | Pausa otros usos de red |
| Cortes en horario pico | Congestión del proveedor | Reporta, considera cambiar |
| Solo en WhatsApp, Zoom bien | App específica / permisos | Reinstala app, revisa permisos |

## Preguntas Frecuentes

{{< faq "¿Por qué WhatsApp se escucha cortado pero Zoom funciona bien?" >}}
WhatsApp tiene servidores y códecs distintos a Zoom. WhatsApp usa rutas menos eficientes y códecs más básicos. Si tu red tiene packet loss, WhatsApp sufre más. Prueba haciendo la llamada por WiFi 5 GHz o por datos móviles (si tienes buena señal LTE/5G).
{{< /faq >}}

{{< faq "¿Cuántos Mbps necesito para videollamadas estables?" >}}
Para videollamadas 1:1 (Zoom, Teams, Meet) en HD necesitas 3 Mbps de bajada y 3 Mbps de subida estables. Pero ojo: "estables" significa que esos 3 Mbps no estén siendo usados por Netflix, descargas u otros. Si tu plan es 50 Mbps compartido con 4 personas, no hay suficiente ancho de banda.
{{< /faq >}}

{{< faq "¿Un VPN mejora la calidad de las llamadas?" >}}
Generalmente no. Un VPN añade latencia y puede empeorar la llamada. Solo ayuda si tu proveedor bloquea o degrada VoIP intencionalmente (raro en México). En el 95% de los casos, un VPN empeora las llamadas.
{{< /faq >}}

{{< faq "¿Por qué las llamadas se cortan cuando alguien abre Netflix en casa?" >}}
Netflix 4K consume 25 Mbps. Si tu plan tiene 50 Mbps y alguien abre Netflix, solo quedan 25 Mbps para todo lo demás. Si tu router no tiene QoS para priorizar voz, la llamada sufre. Activa QoS o sube a un plan de mayor velocidad.
{{< /faq >}}

{{< faq "¿Es mejor usar datos móviles o WiFi para llamadas?" >}}
Depende. Si tienes WiFi estable de 5 GHz con buena señal, mejor WiFi (no gastas datos). Si tu WiFi es inestable y tienes buena cobertura LTE/5G, mejor datos móviles. Para trabajo importante, ten ambos como respaldo y cambia si uno falla.
{{< /faq >}}
