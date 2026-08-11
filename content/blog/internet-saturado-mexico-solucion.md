---
title: "Internet saturado en México: por qué pasa y cómo solucionarlo"
slug: "internet-saturado-mexico-solucion"
date: 2026-08-10
author: "Equipo Mejor Conexión"
author_bio: "Comparamos internet y datos en México con criterio real, sin promesas raras."
author_slug: "equipo"
description: "Tu internet se satura en horas pico. Explicamos por qué pasa en México y cómo solucionarlo con router, QoS y horarios."
keywords:
  - "internet saturado"
  - "internet lento horas pico"
  - "saturacion red"
  - "internet lento noche"
draft: false
image: "/images/topic-provider-comparison.webp"
---

## Respuesta Rápida

**La saturación de internet en México ocurre cuando el nodo de tu zona recibe más demanda de la que puede manejar, típicamente entre 19:00 y 23:00. Tu plan de 100 Mbps puede caer a 15-30 Mbps en horas pico. Soluciones: migrar a fibra óptica, usar QoS en tu router, o cambiar de proveedor.**

- **Causa**: Nodo compartido con demasiados usuarios
- **Síntomas**: Velocidad cae 50-85% en la noche
- **Solución real**: Fibra óptica (Totalplay, Telmex fibra)
- **Mitigación**: QoS en router, programar descargas nocturnas

Si tu internet funciona bien de día pero se vuelve insoportablemente lento en la noche, no es tu imaginación: es la saturación del nodo. Es uno de los problemas más comunes en México y afecta especialmente a usuarios de cable coaxial (Izzi, Megacable). Esta guía explica exactamente por qué ocurre, cómo diagnosticarlo y qué soluciones reales existen.

::: section
## Por qué se satura el internet en México

Los proveedores de internet usan un modelo de **nodo compartido**: varias casas se conectan al mismo nodo que luego va a la central. Cuando todos navegan al mismo tiempo (tarde-noche), el nodo se satura.

### Cómo funciona un nodo compartido

Imagina que el nodo es una tubería de agua que alimenta a 50-200 casas. Si solo tú abres el grifo (6 AM), tienes toda el agua a máxima presión. Pero si las 50 casas abren el grifo a la vez (8 PM), el agua llega a poca presión para todos. Eso es la saturación del nodo.

| Tecnología | Tamaño típico de nodo | Saturación típica |
|-----------|----------------------|-------------------|
| Cable coaxial (Izzi, Megacable) | 200-500 hogares | Alta |
| Fibra GPON (Totalplay, Telmex) | 32-64 hogares | Media-baja |
| Fibra dedicada | 1 hogar (exclusiva) | Nula |
| 4G/5G (Telcel Hogar) | Miles por torre | Variable |

**Por qué el coaxial satura más**: El cable coaxial comparte ancho de banda entre muchos más hogares por nodo. Además, la tecnología DOCSIS tiene límites de capacidad que se reparten entre todos los usuarios del nodo. La fibra GPON, en cambio, reparte entre menos usuarios y tiene más capacidad.

Lee más sobre [por qué tu internet es lento en la noche](/blog/internet-lento-noche-mexico-2026.html).

### El patrón de saturación por hora

| Hora del día | Estado del nodo | Velocidad esperada (100 Mbps contratados) |
|-------------|-----------------|------------------------------------------|
| 6-9 AM | Libre | 80-95 Mbps |
| 9 AM - 5 PM | Normal | 75-90 Mbps |
| 5-7 PM | Empieza a saturar | 60-80 Mbps |
| 7-9 PM | Saturado | 30-60 Mbps |
| 9-11 PM | Muy saturado | 20-40 Mbps |
| 11 PM - 1 AM | Recuperándose | 50-80 Mbps |
| 1-6 AM | Libre | 80-95 Mbps |

**Nota**: Este patrón varía por zona. En zonas residenciales (familias), la saturación es fuerte desde las 6 PM. En zonas comerciales/oficinas, la saturación puede ser de día.

### ¿Por qué los proveedores no solucionan esto?

Porque es caro y el modelo de negocio no lo incentiva. Repartir ancho de banda entre muchos usuarios (overselling) es rentable: la mayoría no usa internet al máximo simultáneamente. Solo cuando TODOS usan al mismo tiempo (horas pico), se nota. Solucionarlo requiere dividir nodos grandes en pequeños, lo que cuesta millones en infraestructura.
:::

::: section
## Cómo diagnosticar la saturación

### Prueba de saturación en 3 pasos

1. **Mide a las 10 AM** (nodo libre): Ejecuta [speedtest.net](https://www.speedtest.net) por cable Ethernet. Anota el resultado.
2. **Mide a las 8-9 PM** (nodo saturado): Misma prueba, mismo dispositivo, mismo método.
3. **Compara**: Si la diferencia es mayor al 50%, tienes saturación confirmada.

| Escenario | Velocidad 10 AM | Velocidad 8 PM | Diagnóstico |
|-----------|----------------|----------------|-------------|
| A | 95 Mbps | 90 Mbps | Sin saturación (fibra) |
| B | 90 Mbps | 45 Mbps | Saturación moderada |
| C | 85 Mbps | 20 Mbps | Saturación severa (coaxial típico) |
| D | 90 Mbps | 90 Mbps pero con lag | Problema de router, no de nodo |

### Documenta para reclamar

Si vas a reclamar al proveedor o a PROFECO, documenta:

- **3 mediciones en 3 días diferentes** (mínimo)
- **Capturas de pantalla** con fecha y hora visible
- **Misma metodología**: por cable Ethernet, mismo dispositivo, mismo servidor de Speedtest
- **Registro de la velocidad contratada** vs recibida

## Soluciones prácticas

### 1. Migra a fibra óptica (solución más efectiva)

La fibra óptica sufre mucho menos saturación que el cable coaxial. Si tienes Totalplay o Telmex fibra disponible en tu zona, cambia.

| Proveedor | Tecnología | Saturación típica | Velocidad en horas pico |
|-----------|-----------|-------------------|------------------------|
| Totalplay | Fibra FTTH | Baja | 80-90% de lo contratado |
| Telmex fibra | Fibra FTTH/FTTC | Baja-media | 75-85% |
| Telmex cobre | Cobre VDSL | Alta | 40-70% |
| Izzi | Coaxial DOCSIS | Alta | 40-70% |
| Megacable | Coaxial DOCSIS | Muy alta | 30-60% |

Lee [Telmex vs Totalplay](/blog/telmex-vs-totalplay-mexico-2026.html) para comparar opciones de fibra.

### 2. Activa QoS en tu router

QoS (Quality of Service) prioriza cierto tráfico. Configura tu router para dar prioridad a videollamadas y gaming sobre descargas y streaming.

**Cómo configurar QoS**:
1. Entra a la interfaz de tu router (generalmente 192.168.1.1 o 192.168.0.1)
2. Busca la sección "QoS" o "Traffic Management"
3. Prioriza: Zoom/Meet, gaming, videollamadas
4. De-prioriza: Descargas grandes, backups, streaming de fondo

**Routers con QoS fácil**:
- TP-Link (con Adaptive QoS)
- ASUS (con QoS adaptativo)
- Google Nest WiFi (priorización automática)

### 3. Programa descargas pesadas para la madrugada

Descargas grandes (actualizaciones, películas, juegos) a las 2-6 AM cuando el nodo está libre.

| Qué programar de noche | Cómo |
|------------------------|------|
| Actualizaciones Windows | Windows Update > Opciones avanzadas > Horas activas |
| Actualizaciones Steam | Steam > Settings > Downloads > Schedule |
| Netflix descargas | Netflix > App > Descargas automáticas |
| Backups en la nube | Google Drive/iCloud > Programar nocturno |
| Actualizaciones de consola | PS5/Xbox > Configuración de descargas |

### 4. Usa cable Ethernet para dispositivos críticos

El WiFi pierde velocidad con distancia y obstáculos. Conecta por cable tu TV (Netflix), PC de trabajo (Zoom) y consola (gaming) para asegurar velocidad estable incluso cuando el nodo está saturado.

### 5. Considera cambiar de proveedor

Si la saturación es insostenible y tu proveedor no mejora, cambia:

| Tu situación actual | Proveedor recomendado | Razón |
|---------------------|----------------------|-------|
| Izzi/Megacable muy saturado | Totalplay (si llega) | Fibra, menos saturación |
| Telmex cobre saturado | Totalplay o Telmex fibra | Fibra, sin cobre |
| Totalplay saturado (raro) | Telmex fibra | Alternativa de fibra |
| Zona sin fibra | Starlink | Satelital, sin nodo compartido |

### 6. Mide y documenta para reclamar

Corre [speedtest](/guias/como-medir-velocidad-real-internet.html) 3 noches seguidas a la misma hora. Si consistentemente recibes menos del 50%, tienes base para [quejarte a PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html).

| Lo que contratas | Mínimo aceptable | Si recibes menos |
|-----------------|-----------------|-----------------|
| 100 Mbps | 80 Mbps | Documenta y reclama |
| 200 Mbps | 160 Mbps | Documenta y reclama |
| 500 Mbps | 400 Mbps | Documenta y reclama |
:::

::: section
## Saturación por proveedor: qué esperar

### Izzi y Megacable (coaxial)

La saturación más severa. Es común perder 50-70% de velocidad en horas pico.

**Qué hacer**: Si la saturación es insostenible, migra a fibra. Si no hay fibra en tu zona, usa QoS y programa descargas para la madrugada.

### Telmex cobre (VDSL)

La saturación es moderada-alta. El cobre tiene límites técnicos que se agravan con muchos usuarios.

**Qué hacer**: Exige migración a fibra. Si Telmex no tiene fibra en tu zona, considera Totalplay o Starlink.

### Telmex fibra y Totalplay (fibra óptica)

La saturación es baja. La fibra GPON reparte entre menos usuarios y tiene más capacidad.

**Qué hacer**: Si aun con fibra notas saturación, puede ser problema de tu router o de dispositivos consumiendo ancho de banda. Verifica con QoS y monitoreo de tráfico.

### Telcel Hogar (4G/5G)

La saturación es variable: depende de la torre celular. En zonas densamente pobladas, la torre puede saturarse en horas pico.

**Qué hacer**: Si la torre de tu zona se satura, poco puedes hacer excepto cambiar de tecnología. Verifica si hay fibra disponible.
:::

::: section
## Datos clave del mercado de internet en México 2026

El mercado de internet en México ha cambiado significativamente en los últimos años. La fibra óptica se ha expandido a más ciudades, Totalplay ha consolidado su posición como líder en velocidad, y la competencia ha bajado los precios de entrada. Esto significa que cada vez más zonas tienen alternativa a la saturación del coaxial.

Sin embargo, todavía existen problemas comunes:

1. **Promociones engañosas**: Los precios suben 30-50% después del periodo promocional
2. **Velocidad real vs contratada**: Muchos usuarios reciben menos de lo que pagan, especialmente en horas pico
3. **Soporte técnico deficiente**: Tiempos de espera largos y resolución lenta
4. **Cobertura desigual**: La calidad varía enormemente entre zonas de la misma ciudad

Para evitar caer en estas trampas, siempre verifica: disponibilidad en tu código postal, precio real post-promoción, tecnología (fibra vs coaxial), y condiciones de cancelación antes de firmar cualquier contrato.

Si experimentas problemas con tu proveedor, recuerda que tienes derechos como consumidor. PROFECO y el IFT pueden ayudarte a resolver disputas. Lee nuestra guía de [cómo quejarse en PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html).
:::

## Preguntas Frecuentes

{{< faq "¿Es normal que mi internet sea más lento en la noche?" >}}
Hasta cierto punto sí, por la saturación del nodo. Pero si pierdes más del 50% de tu velocidad contratada, no es aceptable. La fibra óptica sufre menos este problema que el cable coaxial. Si consistentemente pierdes más del 50% en horas pico, documenta y reclama ante tu proveedor o PROFECO.
{{< /faq >}}

{{< faq "¿Puedo exigir al proveedor que arregle la saturación?" >}}
Sí. Si documentas que consistentemente recibes mucho menos de lo contratado (menos del 80% de la velocidad), el proveedor está incumpliendo. Puedes [reclamar ante PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html). En algunos casos, puedes cancelar sin penalización por incumplimiento del proveedor. La clave es la documentación: speedtests con fecha y hora.
{{< /faq >}}

{{< faq "¿La fibra óptica también se satura?" >}}
Mucho menos que el coaxial. La fibra GPON reparte el ancho de banda entre menos usuarios (32-64 vs 200-500 del coaxial) y tiene más capacidad total. En la práctica, la fibra de Totalplay mantiene 80-90% de la velocidad contratada incluso en horas pico, mientras que el coaxial puede caer a 30-60%. La fibra dedicada, al ser exclusiva, no se satura nunca.
{{< /faq >}}

{{< faq "¿Por qué mi vecino con el mismo proveedor no tiene saturación?" >}}
Puede estar conectado a un nodo diferente (los nodos no siguen exactamente la división geográfica que imaginas), tener un plan de menor velocidad (que se satura menos), o usar el internet en diferentes horarios. También puede tener fibra mientras tú tienes coaxial, aunque sea el mismo proveedor.
{{< /faq >}}

{{< faq "¿Vale la pena cambiar de proveedor por la saturación?" >}}
Si la saturación es severa (pierdes más del 50% de velocidad consistentemente) y hay un proveedor con fibra disponible en tu zona, sí vale la pena cambiar. La diferencia entre coaxial saturado y fibra es enorme. Usa nuestra guía de [cómo cambiar de proveedor sin cortes](/blog/cambiar-de-proveedor-de-internet-sin-cortes.html).
{{< /faq >}}
