---
title: "Cómo configurar tu router paso a paso (México, 2026)"
slug: "como-configurar-router-mexico-2026"
date: 2026-08-09
description: "Guía para configurar tu router desde cero: entrar al panel, cambiar contraseña WiFi, canal, bandas, DNS y QoS. Paso a paso y sin tecnicismos para México."
draft: false
image: "/images/topic-router-wifi.webp"
---

::: container
::: breadcrumbs
[Inicio](/) / [Blog](/blog.html) / Configurar router
:::

Configurar tu router es la diferencia entre un internet que "funciona" y uno que de verdad rinde. El 80% de los problemas de velocidad y cobertura se arreglan cambiando la contraseña, el canal, las bandas y la ubicación. Aquí está cómo hacerlo en 20 minutos.

::: {.ad-slot ad-slot="after-intro"}
:::

::: section
## Paso 1: Entrar al panel del router

1. Conecta tu computadora al router (por WiFi o cable).
2. Abre un navegador y escribe la dirección del router:
   - Totalplay: 192.168.100.1
   - Telmex: 192.168.1.254 o 192.168.1.1
   - Izzi: 10.0.0.1 o 192.168.0.1
   - Megacable: 192.168.0.1 o 192.168.1.1
3. Si no funciona, busca "puerta de enlace predeterminada" en los ajustes de red de tu computadora.
4. Ingresa usuario y contraseña (suele ser admin/admin o admin/contraseña impresa en el router).

**Cambia la contraseña de administración inmediatamente** si sigue siendo "admin". Es un riesgo de seguridad.
:::

<!-- ADSENSE_BREAK -->

::: section
## Paso 2: Cambiar nombre y contraseña del WiFi

Busca la sección "Wireless", "WiFi" o "Red inalámbrica".

- **SSID (nombre de red):** ponle un nombre que reconozcas, sin incluir datos personales.
- **Contraseña:** mínimo 12 caracteres, con mayúsculas, números y símbolos.
- **Cifrado:** WPA2 o WPA3 (nunca WEP, que es inseguro).

Si tu router tiene banda dual (2.4 GHz y 5 GHz), pon nombres distintos a cada una para que puedas elegir cuál usar.

Para entender las bandas, lee [cómo mejorar el Wi-Fi en casa](/internet-en-casa/como-mejorar-wifi-casa-mexico.html).
:::

::: {.ad-slot ad-slot="mid-content"}
:::

<!-- ADSENSE_BREAK -->

::: section
## Paso 3: Cambiar el canal WiFi

En la sección "Wireless" busca "Channel" o "Canal".

| Banda | Canales recomendados |
|---|---|
| 2.4 GHz | 1, 6 u 11 (los que menos se traslapan) |
| 5 GHz | Cualquiera (hay menos interferencia) |

Busca "WiFi Analyzer" en tu celular para ver qué canales usan tus vecinos. Elige el menos saturado.

Si tu router tiene "Auto" en el canal, puede estar cambiando constantemente. Mejor ponlo fijo en el mejor canal.
:::

::: section
## Paso 4: Configurar QoS (priorizar tráfico)

QoS (Quality of Service) le dice al router qué tráfico es más importante. Si lo configuras bien, tus videollamadas no se van a congelar cuando alguien abra Netflix.

1. Busca "QoS", "Prioridad" o "Control de ancho de banda" en el panel.
2. Prioriza:
   - Tu computadora de trabajo (para videollamadas).
   - Tu consola (para gaming).
3. Deprioriza descargas automáticas.

No todos los routers del proveedor tienen QoS. Si el tuyo no lo tiene, considera comprar uno propio. Lee [cómo elegir router WiFi](/internet-en-casa/como-elegir-router-wifi-mexico.html).
:::

::: section
## Paso 5: Cambiar DNS (opcional pero útil)

El DNS (Sistema de Nombres de Dominio) es lo que traduce nombres de páginas a direcciones IP. Cambiarlo puede hacer que las páginas abran un poco más rápido.

| DNS | Primario | Secundario |
|---|---|---|
| Cloudflare (rápido) | 1.1.1.1 | 1.0.0.1 |
| Google | 8.8.8.8 | 8.8.4.4 |

Busca "DNS" en el panel del router y cambia los valores. Reinicia el router después.

**Nota:** cambiar DNS no aumenta tu velocidad de descarga. Solo hace que las páginas se resuelvan un poco más rápido.
:::

::: section
## Paso 6: Actualizar firmware

Busca "Firmware", "Actualización" o "System Update" en el panel. Si hay una versión nueva, instálala. El firmware actualizado mejora la estabilidad y corrige vulnerabilidades de seguridad.

Después de actualizar, reinicia el router y verifica que todo siga funcionando.
:::

::: section
## Preguntas frecuentes

### ¿Puedo dañar mi router configurándolo mal?

Es difícil dañarlo permanentemente. Si algo sale mal, hay un botón de reset (un pequeño hoyo) que lo devuelve a la configuración de fábrica.

### ¿Cambiar DNS acelera mi internet?

No exactamente. Cambiar DNS puede hacer que las páginas abran 100-200 ms más rápido, pero no aumenta la velocidad de descarga. Lee [qué significa la velocidad de internet](/blog/que-significa-la-velocidad-de-internet.html).

### ¿Debo reiniciar el router después de configurarlo?

Sí, siempre. Algunos cambios solo surten efecto después de un reinicio completo (30 segundos apagado).

### ¿Si tengo Totalplay puedo configurar el router?

Sí, pero Totalplay usa un ONT (no un módem tradicional). El acceso al panel puede ser distinto. Si no encuentras la opción, llama a soporte.
:::

::: {.section related-block="" style="margin-top:18px"}
## Sigue aprendiendo

- Para optimizar a fondo, checa [cómo ajustar tu router para mejorar la velocidad](/blog/ajustes-router-mejorar-velocidad-internet.html).
- Para arreglar caídas, lee [por qué se cae el WiFi](/blog/por-que-se-cae-wifi-casa-mexico.html).
- Para elegir router nuevo, revisa [mejor router WiFi para casa](/internet-en-casa/mejor-router-wifi-casa-mexico-2026.html).
:::

::: meta-row
**Última actualización:** agosto de 2026 • [Metodología](/metodologia.html)
:::
:::
