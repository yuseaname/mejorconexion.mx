---
title: "WiFi se desconecta y se reconecta solo: causas y solución (México 2026)"
slug: "wifi-se-desconecta-y-reconecta-mexico"
description: "Cuando el WiFi se desconecta y se reconecta solo, las causas más comunes son: interferencia de canales, administración de energía del dispositivo (esp…"
date: 2026-08-10
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/cat-wifi-router.webp"
keywords:
  - "wifi se desconecta y reconecta solo"
  - "wifi inestable mexico"
  - "se cae el wifi celular"
  - "wifi intermitente android"
  - "wifi salta iphone"
---

## Respuesta Rápida

**Cuando el WiFi se desconecta y se reconecta solo, las causas más comunes son: interferencia de canales, administración de energía del dispositivo (especialmente en Android), driver del adaptador WiFi desactualizado, router con DHCP conflictivo o señal débil. El 80% de los casos se resuelve cambiando el canal WiFi, desactivando el ahorro de batería para la red o acercándose al router. Si solo pasa en un dispositivo, el problema es de ese equipo, no de tu red.**

- **Si el WiFi se cae solo en tu celular pero la Smart TV funciona, el problema es del celular, no del router.**
- **Android y iPhone tienen gestión agresiva de energía que corta el WiFi en reposo; desactivar el ahorro de batería suele resolverlo.**
- **Si el WiFi se cae en toda la casa, es problema del router o del proveedor.**

Relacionado: [por qué se cae el WiFi en casa](/blog/por-que-se-cae-wifi-casa-mexico.html).

## Causa 1: Interferencia y saturación de canales WiFi

En México, especialmente en departamentos y condominios de CDMX, Guadalajara y Monterrey, la banda de 2.4 GHz está saturadísima. Si tu vecino tiene un router potente en el mismo canal que el tuyo, la señal salta constantemente.

### Cómo diagnosticar

1. Descarga **WiFi Analyzer** (Android) o usa **AirPort Utility** (iPhone, modo analizador)
2. Mira qué canales están más saturados en tu zona
3. Si tu canal es el más concurrido, ese es tu problema

### Solución

Cambia el canal del router:

1. Entra a `192.168.1.1` o `192.168.0.1` (usuario: admin, contraseña: la del sticker)
2. Ve a **Configuración inalámbrica → Canal**
3. Para 2.4 GHz: usa **1, 6 u 11** (los únicos que no se solapan)
4. Para 5 GHz: casi cualquier canal está bien, usa **36, 40, 44 o 149**

**Mejor opción:** si tu router y dispositivos soportan 5 GHz, conecta todo lo que puedas a esa banda. Está mucho menos saturada.

## Causa 2: Gestión de energía del dispositivo (Android/iPhone)

Los smartphones modernos apagan el WiFi cuando entran en reposo para ahorrar batería. Esto causa desconexiones aparentes que el usuario percibe como "se cae el WiFi".

### En Android

1. Ve a **Ajustes → WiFi → Avanzado**
2. Desactiva **"Conmutar a datos móviles"** (o "WiFi inactivo")
3. En Android 10+: busca **"Usar WiFi en suspensión"** y selecciona **"Siempre"**
4. En Samsung: **Ajustes → Conexiones → WiFi → Avanzado → Mantener WiFi activo durante el sueño → Siempre**

**Xiaomi/Redmi específico:** tienen una gestión aún más agresiva. Ve a **Ajustes → Apps → Seguridad (o Limpiador) → Restricciones de datos → WiFi en segundo plano** y verifica que tus apps críticas no estén restringidas.

### En iPhone (iOS)

1. Ve a **Ajustes → WiFi**
2. Verifica que **"Preguntar para unirse"** esté activado pero no salte redes
3. Ve a **Ajustes → General → Actualización en segundo plano** y revisa que tus apps importantes tengan permiso
4. En iOS 17+: **Ajustes → WiFi → (i) de tu red → Renovar IP** si sigue saltando

### En Windows

1. **Administrador de dispositivos → Adaptadores de red → (tu WiFi)**
2. Botón derecho → **Propiedades → Administración de energía**
3. **Desactiva** "Permitir que el equipo apague este dispositivo para ahorrar energía"

## Causa 3: Router con DHCP generando conflictos de IP

Si el router asigna la misma IP a dos dispositivos, ambos se desconectan y reconectan constantemente.

### Solución

1. Entra al panel del router
2. Ve a **DHCP → Lista de clientes conectados**
3. Si hay IPs duplicadas, **reinicia el router** para que reasigne
4. Para evitarlo: asigna **IPs estáticas** a tus dispositivos críticos (Smart TV, consola, computadora)

## Causa 4: Señal débil — el dispositivo está lejos del router

Parece obvio, pero muchos usuarios esperan que el WiFi llegue a través de 3 paredes de concreto. Las paredes de ladrillo, concreto y metal reducen la señal WiFi drásticamente.

| Material | Reducción de señal WiFi |
|----------|------------------------|
| Pared de tabique/drywall | 10-20% |
| Pared de concreto reforzado | 40-60% |
| Pared con varilla metálica | 50-70% |
| Espejo grande | 60-80% |
| Microondas (encendido) | 80-100% en 2.4 GHz |
| Nevera/lavadora (metal) | 40-60% |

**Solución:** mueve el router al centro de la casa, elevado (1.5 m), o instala un [extensor WiFi](/blog/mejor-extensor-wifi-mexico-2026.html).

## Causa 5: Firmware del router o driver del dispositivo viejos

Un router con firmware de hace 3 años tiene bugs conocidos de estabilidad. Un adaptador WiFi de laptop con driver viejo también se desconecta.

### Solución router

Entra al panel del router y actualiza firmware. Si el router no tiene esa opción, es muy viejo: considera comprar uno nuevo.

### Solución computadora

- **Windows:** Administrador de dispositivos → Adaptadores de red → botón derecho → **Actualizar driver**
- **Mac:** actualiza macOS a la última versión

## Causa 6: Demasiados dispositivos conectados

Los routers básicos de los proveedores mexicanos (Telmex, Izzi, Totalplay) manejan bien 5-8 dispositivos. Con 15+, empiezan a fallar.

**Solución:** un router propio Wi-Fi 6 de $1,500-$3,000 MXN maneja 30+ dispositivos sin problema. Consulta nuestra [guía de routers Wi-Fi 6](/blog/mejores-routers-wifi-6-mexico-2026.html).

## Tabla: diagnóstico según el síntoma

| Síntoma | Causa probable | Solución rápida |
|---------|---------------|-----------------|
| Se cae solo en un dispositivo | Gestión energía / driver | Desactiva ahorro batería WiFi |
| Se cae en toda la casa | Router/proveedor | Reinicia módem, revisa luces |
| Se cae solo en la noche | Interferencia vecinos | Cambia canal WiFi |
| Se cae al alejarte del router | Señal débil | Mueve router o usa extensor |
| Se cae cuando conectas un equipo nuevo | DHCP conflictivo | Reinicia router, asigna IP estática |
| Se cae cuando llueve | Humedad en cables coaxiales | Revisa cables exteriores, llama a soporte |

## Cuando el problema es el proveedor

Si ya probaste todo lo anterior y el WiFi sigue saltando, el problema puede ser del módem del proveedor. Llama y solicita:

1. **Cambio de módem** si el tuyo tiene más de 3 años
2. **Visita técnica** para revisar niveles de señal
3. **Cambio de proveedor** si no mejoran tras 2 reportes

## Preguntas Frecuentes

{{< faq "¿Por qué mi celular se desconecta del WiFi cuando se bloquea la pantalla?" >}}
Es la gestión de energía del dispositivo. En Android: Ajustes → WiFi → Avanzado → "Mantener WiFi activo durante el sueño" → Siempre. En iPhone no se puede desactivar completamente, pero asegurarte de tener iOS actualizado reduce el problema.
{{< /faq >}}

{{< faq "¿Por qué el WiFi salta en mi Xiaomi o Redmi?" >}}
Xiaomi/Redmi tienen MIUI con gestión agresiva de energía. Ve a Ajustes → Apps → selecciona las apps importantes → Ahorro de batería → "Sin restricciones". También ve a Ajustes → Batería → Desactiva "Optimización de batería" para tu red WiFi.
{{< /faq >}}

{{< faq "¿Un repetidor WiFi ayuda con las desconexiones?" >}}
Solo si el problema es señal débil. Un repetidor amplifica la señal pero si la causa es interferencia o router saturado, no ayuda. Primero diagnostica la causa. Si necesitas cobertura extra, lee nuestra [comparativa de extensores WiFi](/blog/mejor-extensor-wifi-mexico-2026.html).
{{< /faq >}}

{{< faq "¿Por qué el WiFi funciona bien por cable pero salta por WiFi?" >}}
El problema es el entorno WiFi, no tu conexión de internet. Cambia el canal del router, mueve el router de ubicación y verifica que no esté saturado de dispositivos. Si persiste, un router propio de mejor calidad resuelve el problema.
{{< /faq >}}

{{< faq "¿El WiFi 6 tiene menos desconexiones que el WiFi 5?" >}}
Sí, con muchos dispositivos. Wi-Fi 6 (802.11ax) usa OFDMA, que maneja mejor múltiples conexiones simultáneas y reduce la latencia. Si tienes 10+ dispositivos, un router Wi-Fi 6 reduce significativamente las desconexiones.
{{< /faq >}}
