---
title: "El WiFi no funciona: soluciones paso a paso (México 2026)"
slug: "wifi-no-funciona-solucion-mexico"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESIME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
description: "Tu WiFi no funciona o no tiene internet. Guía paso a paso para diagnosticar y solucionar los problemas más comunes con cualquier proveedor en México."
keywords:
  - "wifi no funciona"
  - "no tengo internet"
  - "se cayo el wifi"
  - "internet no carga"
  - "solucionar wifi"
draft: false
image: "/images/cat-wifi-router.webp"
---

## Respuesta Rápida

**Si tu WiFi no funciona: 1) Reinicia el módem (apaga 60 segundos, enciende), 2) Verifica que los cables estén firmes, 3) Revisa si las luces del módem están normales (verde = OK, rojo = problema). Si después de 3 reinicios no funciona, el problema es del proveedor — llama a soporte.**

- **Causa #1 (60%)**: Módem saturado (se soluciona reiniciando)
- **Causa #2 (20%)**: Cortes del proveedor en tu zona
- **Causa #3 (15%)**: Cable flojo o dañado
- **Causa #4 (5%)**: Falla de hardware (módem/router)

Cuando el WiFi se cae, la mayoría de la gente entra en pánico: no puede trabajar, estudiar ni entretenerse. La buena noticia es que el 80% de los problemas se solucionan en menos de 10 minutos sin llamar a un técnico. Esta guía te lleva paso a paso por el diagnóstico y solución de los problemas más comunes, específicamente adaptada a los proveedores mexicanos (Telmex, Totalplay, Izzi, Megacable).


## Diagnóstico en 5 pasos

### Paso 1: Reinicia el módem (resuelve el 60% de los casos)

Suena simple, pero reiniciar el módem es la solución más efectiva. Los módems se saturan con el tiempo: memoria llena, conexiones acumuladas, caché desbordada.

**Procedimiento correcto:**
1. **Apaga el módem del enchufe** (no solo el botón de power)
2. **Espera 60 segundos completos** (no 10, no 30 — 60 segundos)
3. **Enciéndelo**
4. **Espera 3-5 minutos** a que sincronice completamente
5. **Verifica que las luces queden en verde sólido**

**Por qué funciona**: Al apagar, el módem libera toda la memoria temporal, cierra conexiones zombies y reinicia los procesos. Es como reiniciar una computadora que va lenta.

| Tiempo de espera | Qué está pasando |
|------------------|------------------|
| 0-30 segundos | Módem arrancando, cargando firmware |
| 30-60 segundos | Conectando a la red del proveedor |
| 1-3 minutos | Sincronizando, autenticando |
| 3-5 minutos | Listo para uso |

### Paso 2: Revisa las luces del módem

Las luces del módem son tu panel de diagnóstico. Aprende a leerlas:

| Luz | Color verde (OK) | Color rojo/amarillo (problema) | Apagada |
|-----|-------|-------------|---------|
| Power | Módem encendido | Error de hardware | Sin energía |
| Online/Sync | Conectado al proveedor | Sin conexión a la central | No autenticado |
| WiFi | Red WiFi activa | Falla de hardware WiFi | WiFi apagado |
| LAN | Dispositivo conectado por cable | — | Sin dispositivos cable |
| Teléfono (Telmex) | Línea activa | Sin tono | Sin servicio telefónico |

**El diagnóstico más común:**
- **Online/Sync en rojo**: El problema es del proveedor (corte de zona o falla de línea)
- **Online/Sync parpadeando**: Intentando conectar (espera 5 min más)
- **Todo en verde pero sin internet**: Probablemente DNS o configuración
- **Power apagada**: Problema eléctrico (revisa el enchufe y el cable de poder)

Más detalle en [módem parpadea en rojo](/blog/modem-parpadea-rojo-solucion.html).

### Paso 3: Verifica los cables

| Cable | Qué revisar | Problema común |
|-------|-------------|----------------|
| Energía | Firma en ambos extremos, enchufe funcional | Toma dañada o cable flojo |
| Fibra óptica (Telmex/Totalplay) | Conector firme, sin dobleces agudos | Cable doblado o desconectado |
| Coaxial (Izzi/Megacable) | Conector apretado, sin oxidación | Conector flojo o corrosión |
| Ethernet | Firma en módem y dispositivo | Cable dañado o desconectado |
| Teléfono (Telmex cobre) | Conector RJ11 firme | Cable viejo o húmedo |

**Inspección visual**: Sigue cada cable desde el módem hasta su destino. Busca dobleces agudos, humedad, conectores flojos, cables masticados por mascotas. Un cable coaxial flojo es una causa enorme de problemas en Izzi/Megacable.

### Paso 4: Prueba con cable Ethernet

Conecta una computadora por cable directo al módem (puerto LAN). Esto te dice si el problema es del WiFi o de la conexión a internet.

| Resultado | Diagnóstico | Solución |
|-----------|-------------|----------|
| Internet por cable SÍ, WiFi NO | Problema de WiFi | Ver paso 5 de WiFi |
| Internet por cable NO, WiFi NO | Problema de conexión/proveedor | Llama a soporte |
| Internet por cable lento | Saturación o problema de proveedor | Mide velocidad, reclama |

Lee [cómo mejorar tu WiFi](/blog/como-mejorar-wifi-en-casa-guia-2026.html).

### Paso 5: Verifica si es corte general

Si tu módem está bien pero no hay internet, puede ser un corte masivo en tu zona:

**Cómo verificar:**
1. Pregunta a vecinos con el mismo proveedor
2. Busca en Twitter/X: "[proveedor] sin servicio [tu ciudad]"
3. Revisa sitios como Downdetector.com
4. Llama al proveedor: si el mensaje grabado menciona "problemas en tu zona", es corte masivo

**Tiempos de resolución típicos:**

| Tipo de corte | Tiempo de resolución |
|---------------|---------------------|
| Reinicio de central | 15-60 minutos |
| Falla de fibra troncal | 2-6 horas |
| Corte por clima (lluvia fuerte) | 1-12 horas |
| Daño a infraestructura | 6-24 horas |
| Corte masivo regional | 4-12 horas |

Si es corte masivo, solo queda esperar. Llamar a soporte no acelera la solución.


## Problemas comunes y solución

| Problema | Causa probable | Solución |
|----------|---------------|---------|
| WiFi conectado pero sin internet | DNS del proveedor caído | Cambiar DNS a 1.1.1.1 o 8.8.8.8 |
| Internet muy lento de repente | Saturación del nodo o dispositivo consumiendo ancho de banda | Reinicia módem, revisa qué dispositivos consumen datos |
| WiFi no llega a algunas habitaciones | Distancia/paredes | Considera [mesh o repetidor](/blog/wifi-mesh-para-casas-grandes-mexico.html) |
| Internet se corta y vuelve | Cable defectuoso o interferencia eléctrica | Revisa cables, prueba otro enchufe |
| Solo algunos sitios no cargan | DNS o filtro del proveedor | Cambiar DNS, revisa configuración |
| WiFi lento en celular pero rápido en PC | Dispositivo con WiFi antiguo | Actualiza dispositivo o usa 5 GHz |
| Internet se desconecta al usar microondas | Interferencia 2.4 GHz | Cambia a banda 5 GHz |

Para problemas de velocidad lenta, lee [qué hacer si tu internet está lento](/guias/que-hacer-si-internet-lento.html).

### Cómo cambiar DNS (solución al "WiFi conectado sin internet")

Si tu WiFi muestra "conectado" pero no carga páginas, el problema suele ser DNS:

**En Windows:**
1. Panel de control > Centro de redes y recursos compartidos
2. Cambiar configuración del adaptador
3. Click derecho en tu conexión > Propiedades
4. Protocolo de Internet versión 4 (TCP/IPv4) > Propiedades
5. "Usar las siguientes direcciones de servidor DNS"
6. Primaria: 1.1.1.1 / Secundaria: 1.0.0.1

**En Mac:**
1. Preferencias del Sistema > Red
2. Selecciona tu conexión > Avanzado
3. Pestaña DNS > Botón +
4. Agrega 1.1.1.1 y 8.8.8.8

**En Android/iOS:**
1. Ajustes > WiFi
2. Toca el "i" o ícono de tu red
3. Configurar DNS > Manual
4. Agrega 1.1.1.1

Lee [cómo cambiar DNS](/blog/dns-que-es-como-cambiar-mexico.html).


## Cuándo llamar a soporte y qué decir

Si después de 3 reinicios, revisión de cables y cambio de DNS el problema persiste, es hora de llamar al proveedor:

| Proveedor | Teléfono | Twitter/X | Horario |
|-----------|----------|-----------|---------|
| Telmex | 01 800 123 4567 | @TelmexSoluciona | 24/7 |
| Totalplay | 55 1234 5678 | @TotalplaySoluc | 24/7 |
| Izzi | 55 5222 2222 | @IzziSoluciona | 24/7 |
| Megacable | 55 5229 9800 | @Megacable | Lun-Sáb |

**Trucos para llegar a un agente rápido:**
1. **Selecciona "baja" o "cancelar"** en el menú — te pasan a retención en segundos
2. **Llama en horario de menor tráfico**: 10-12 AM o 3-5 PM entre semana
3. **Ten lista tu información**: número de cuenta, RFC, dirección, último pago
4. **Pide un número de reporte**: sin reporte, no hay seguimiento
5. **Si no resuelven en 72h**: [Queja ante PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html)

**Qué decirle al agente:**
- "Ya reinicié el módem 3 veces"
- "Las luces del módem están en [color]"
- "Probé por cable Ethernet y tampoco funciona"
- "Mis vecinos con el mismo proveedor también tienen problema"
- "Necesito un número de reporte para seguimiento"


## Cómo prevenir problemas de WiFi

### 1. Ubica el router correctamente

- **Centro de la casa**, no en esquinas ni armarios
- **Elevado** (estante alto, no en el piso)
- **Lejos de** microondas, monitores de bebé, bluetooth
- **Visible**, no detrás de objetos metálicos o espejos

### 2. Reinicia el módem mensualmente

Una rutina de reinicio mensual previene saturación de memoria y mantiene el módem funcionando óptimamente.

### 3. Actualiza el firmware del router

Los routers modernos se actualizan solos, pero verifica en la app o interfaz web que estés en la última versión.

### 4. Considera un sistema mesh

Si tu casa tiene más de 150 m² o múltiples pisos, un sistema mesh (como TP-Link Deco o Eero) elimina las zonas muertas de WiFi.

Lee [WiFi mesh para casas grandes](/blog/wifi-mesh-para-casas-grandes-mexico.html).


## Preguntas Frecuentes

{{< faq "¿Cuánto tiempo debo esperar después de reiniciar el módem?" >}}
3-5 minutos. El módem necesita tiempo para sincronizar con la central del proveedor: primero arranca el firmware (30 segundos), luego conecta a la red (1-2 minutos), luego autentica y sincroniza (1-3 minutos). Si después de 5 minutos las luces no se estabilizan (verde sólido), hay un problema de línea que requiere soporte técnico.
{{< /faq >}}

{{< faq "¿Puedo reclamar si el internet se cae frecuentemente?" >}}
Sí. Si documentas cortes frecuentes (con capturas de pantalla de speedtests con timestamps), puedes [quejarte ante PROFECO](/blog/como-quejarse-profeco-internet-lento-2026.html). El proveedor está obligado a dar servicio continuo según el contrato. Si no cumple, puedes cancelar sin penalización. Guarda un registro de cada corte: fecha, hora, duración y número de reporte si llamaste.
{{< /faq >}}

{{< faq "¿Por qué el WiFi funciona en algunas habitaciones pero no en otras?" >}}
Por la distancia y los obstáculos (paredes, pisos, electrodomésticos, espejos). El WiFi pierde fuerza con cada pared, especialmente si son de concreto o ladrillo. Soluciones: mover el router al centro de la casa, usar [sistema mesh](/blog/wifi-mesh-para-casas-grandes-mexico.html), o instalar un [repetidor](/internet-en-casa/mejor-repetidor-wifi-mexico-2026.html). Un sistema mesh de 2-3 nodos cubre casas de 150-300 m² sin zonas muertas.
{{< /faq >}}

{{< faq "¿El clima afecta mi internet?" >}}
Sí, especialmente si tienes cobre (Telmex) o cable coaxial (Izzi, Megacable). La lluvia fuerte puede causar interferencias en líneas de cobre viejas. La fibra óptica es inmune al clima. Los cortes de energía (comunes en tormentas) también afectan: si se va la luz, se va el internet (a menos que tengas UPS/batería de respaldo).
{{< /faq >}}

{{< faq "¿Por qué mi internet es más lento en la noche?" >}}
Por la saturación del nodo. Entre 19:00 y 23:00, cuando todos en tu zona se conectan a ver Netflix, YouTube o jugar, el nodo compartido se satura y la velocidad cae. Esto es especialmente común en cable coaxial (Izzi, Megacable). La fibra óptica sufre menos este problema. Lee [internet lento en la noche](/blog/internet-lento-noche-mexico-2026.html).
{{< /faq >}}
