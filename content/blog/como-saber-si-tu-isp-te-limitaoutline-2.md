---
title: "¿Tu ISP Te Está Limitando la Velocidad? Cómo Descubrirlo"
slug: como-saber-si-tu-isp-te-limitaoutline-2
description: "Aprende a detectar si tu proveedor de internet te está haciendo throttling, cómo confirmarlo con pruebas y qué hacer en México para resolverlo."
date: 2026-04-17
lang: es-MX
---

# ¿Tu ISP Te Está Limitando la Velocidad? Cómo Descubrirlo

Pagas por 200 Mbps pero Netflix se ve borroso a las 8 de la noche. Los videos de YouTube tardan en cargar. Las videollamadas se congelan. ¿Es tu conexión o tu proveedor te está frenando a propósito?

El throttling (limitación intencional de velocidad) es real y ocurre en México. Aquí te enseñamos a detectarlo y qué hacer al respecto.

## ¿Qué Es el Throttling?

El throttling es cuando tu proveedor de internet reduce intencionalmente la velocidad de ciertos tipos de tráfico. Los motivos más comunes:

- **Gestión de congestión:** Reducen velocidad en horas pico para que todos tengan "algo" de servicio
- **Priorización de servicios:** Algunos ISPs priorizan su propio contenido sobre el de competidores
- **Límites de uso justo:** Reducen tu velocidad si consumes "demasiados" datos
- **Tráfico específico:** Netflix, YouTube, torrents o juegos online pueden ser limitados selectivamente

## Prueba #1: Speed Test Normal vs VPN

Esta es la prueba más reveladora.

### Paso a paso:
1. **Sin VPN:** Haz un speed test en [speedtest.net](https://speedtest.net) o [fast.com](https://fast.com) — anota los resultados
2. **Con VPN:** Activa una VPN (NordVPN, ExpressVPN, o cualquiera con trial gratis)
3. **Repite el speed test** con la VPN activa

### Interpretación:
- Si la velocidad **sube significativamente** con VPN → Tu ISP está limitando tráfico específico
- Si la velocidad **baja** con VPN → Tu ISP no está haciendo throttling (la VPN añade overhead normal)
- Si la velocidad es **igual** → Probablemente no hay throttling

**¿Por qué funciona?** La VPN encripta tu tráfico, entonces tu ISP no puede ver qué tipo de contenido estás accediendo y no puede aplicar filtros.

## Prueba #2: Compara fast.com vs speedtest.net

- **fast.com** mide la velocidad usando los servidores de Netflix
- **speedtest.net** usa servidores genéricos optimizados

Si fast.com muestra velocidades mucho menores que speedtest.net, es una señal fuerte de que tu ISP está limitando el tráfico de video.

## Prueba #3: Mide a Diferentes Horarios

Haz speed tests a estas horas y compara:

| Hora | Velocidad | Situación |
|------|-----------|-----------|
| 7:00 AM | ? | Red vacía |
| 2:00 PM | ? | Tráfico medio |
| 9:00 PM | ? | Hora pico |
| 2:00 AM | ? | Red vacía |

Si tu velocidad a las 9 PM es un 50%+ menor que a las 7 AM, tu ISP está saturado (no necesariamente throttling intencional, pero el resultado es el mismo para ti).

## Lo que Hacen los Proveedores en México

### Telmex/Telcel
- Reportan "uso justo" en planes residenciales — si consumes demasiado, pueden reducir velocidad
- En horas pico, la velocidad puede bajar significativamente en zonas saturadas

### Izzi
- Históricamente ha tenido reportes de limitación de tráfico P2P/torrents
- Los planes con promoción pueden tener velocidades reales menores al terminar el periodo promocional

### Totalplay
- Al ser fibra directa, tiene menos problemas de throttling
- Pero en zonas con muchos usuarios en la misma ONT, la velocidad puede compartirse

### AT&T / Movistar (móvil)
- Los planes "ilimitados" casi siempre tienen un límite de datos a velocidad completa (generalmente 10-30 GB)
- Después de ese límite, la velocidad baja a 1-3 Mbps

## Qué Hacer si Te Están Limitando

### 1. Usa una VPN
La solución más rápida. Una buena VPN evita que tu ISP pueda identificar y limitar tu tráfico.

### 2. Cambia tus DNS
A veces la lentitud no es throttling sino DNS lento. Prueba con 1.1.1.1 (Cloudflare) o 8.8.8.8 (Google).

### 3. Llama a tu Proveedor
- Pregunta directamente: "¿Están limitando mi velocidad?"
- Pide que verifiquen tu línea
- Si tu velocidad es consistentemente menor al 80% de lo contratado, están incumpliendo el contrato

### 4. Presenta una Queja ante PROFECO
Si tu proveedor no resuelve:
1. Documenta: capturas de speed tests a diferentes horas
2. Guarda facturas donde pagas por una velocidad que no recibes
3. Presenta la queja en [profeco.gob.mx](https://profeco.gob.mx) o al teléfono del consumidor
4. Los proveedores suelen resolver rápido cuando PROFECO se involucra

### 5. Cambia de Proveedor
Si en tu zona hay opciones, un cambio de ISP puede resolver el problema. La competencia entre Telmex, Izzi y Totalplay en ciudades grandes es real.

## Preguntas Frecuentes

### ¿Es legal que mi ISP limite mi velocidad?
Depende. La gestión de red es legal, pero no informar que lo hacen o vender "velocidades hasta X" que nunca se alcanzan puede violar normas de PROFECO.

### ¿La VPN me da más velocidad?
Solo si tu ISP estaba limitando tu tráfico. Una VPN por sí sola no hace tu internet más rápido — de hecho, normalmente añade un poco de latencia.

### ¿Cuánta velocidad "debo" recibir de lo que pago?
Como regla general, deberías recibir al menos el 80% de la velocidad contratada por WiFi, y 90%+ por cable Ethernet, en la mayoría de horas del día.

### ¿Los speed tests son confiables?
En su mayoría sí, pero usa varios (speedtest.net, fast.com, speed.cloudflare.com) para comparar. Un solo test no es suficiente evidencia.

### ¿PROFECO realmente ayuda con problemas de internet?
Sí. PROFECO tiene un proceso de conciliación que obliga al proveedor a responder. En muchos casos, el proveedor ofrece una solución antes de que el caso progrese.

## Enlaces Relacionados

- [¿Por Qué los Speed Tests Mienten?](/blog/por-que-los-speed-tests-mientenoutline-2/)
- [¿El Internet Ilimitado Realmente Es Ilimitado?](/blog/internet-ilimitado-realmenteoutline-2/)
- [Cargos Ocultos en Planes de Internet](/blog/cargos-ocultos-planes-internetoutline-2/)
- [Internet Lento Incluso con Fibra Óptica](/blog/internet-lento-incluso-con-fibraoutline-2/)
