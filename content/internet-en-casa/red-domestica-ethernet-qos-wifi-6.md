---
title: "Red domestica pro: cableado, switches, QoS y Wi-Fi 6"
slug: "red-domestica-ethernet-qos-wifi-6"
date: 2026-01-01
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
draft: false
image: "/images/generated/mejorconexion-mx-internet-en-casa-fibra-vs-coaxial-mexico-index-html-hero-575bb60a.webp"
keywords:
  - "internet lento mexico"
  - "internet mexico 2026"
  - "repetidor wifi"
  - "router wifi mexico"
  - "totalplay vs telmex vs izzi"
  - "wifi mesh mexico"

---

## Respuesta Rápida

Una red doméstica pro en México combina **cable Ethernet Cat 6** desde el módem al router principal, **WiFi 6** en las zonas de uso y **QoS** priorizando videollamadas y juegos; con un switch Gigabit de 8 puertos ($600-$1,200 MXN) y un router AX ($1,500-$2,500 MXN) eliminas el Wi-Fi inestable y el lag en home office.

- Conecta por **cable** la PC de home office, el Smart TV y la consola; deja solo celulares y tablets en Wi-Fi.
- Activa **QoS** en el router para que las videollamadas tengan prioridad sobre descargas y torrents.

Para más detalle, consulta [cómo elegir router Wi-Fi en México](/internet-en-casa/como-elegir-router-wifi-mexico.html).



::: section
## Comparativa rápida de proveedores

| Proveedor | Velocidad | Precio/mes | Tecnología | Mejor para |
|-----------|-----------|------------|------------|------------|
| Totalplay | 200-1000 Mbps | $399-$1,499 | Fibra óptica | Velocidad y simetría |
| Telmex Infinitum | 20-1000 Mbps | $299-$1,099 | Fibra/Cobre | Cobertura nacional |
| Izzi | 100-1000 Mbps | $349-$999 | Coaxial | Bundle con TV |
| Megacable | 80-600 Mbps | $299-$799 | Coaxial | Precio económico |

Para comparar en detalle, consulta nuestro [ranking de proveedores 2026](/blog/cual-es-el-mejor-internet-en-mexico-2026.html).
:::


## Preguntas Frecuentes

{{< faq "¿Cuál es el mejor proveedor de internet en México en 2026?" >}}
Totalplay lidera en velocidad y estabilidad con fibra óptica, seguido de Telmex Infinitum en cobertura nacional. La elección depende de tu zona: verifica cobertura con tu código postal antes de contratar.
{{< /faq >}}}

{{< faq "¿Cómo decido entre Telmex, Izzi, Totalplay y Megacable?" >}}
Compara tres factores: 1) Disponibilidad en tu zona (verifica con tu código postal), 2) Tecnología (fibra óptica > coaxial), 3) Precio real después de la promoción. Totalplay suele ganar en fibra, Izzi en zonas urbanas, Telmex en cobertura rural.
{{< /faq >}}}

{{< faq "¿Los precios promocionales duran para siempre?" >}}
No. Las promociones de bienvenida típicamente duran 6-12 meses y luego suben 30-50%. Exige precio fijo por escrito antes de firmar el contrato.
{{< /faq >}}}

{{< faq "¿Puedo cambiar de proveedor sin penalización?" >}}
Sí, la mayoría de contratos permite cancelación con 30 días de aviso. Algunos cobran penalización si cancelas antes de los 12 meses. Revisa la cláusula de permanencia antes de firmar.
{{< /faq >}}}


::: container
::: breadcrumbs
[Inicio](/) / [Internet en casa](/internet-en-casa/) / Red domestica pro
:::

# Red domestica pro: cableado Ethernet, switches, QoS y Wi-Fi 6/6E

Cuando todos en casa estan en videollamada, streaming y juegos, la red colapsa. La solucion no siempre es contratar mas Mbps. Muchas veces es ordenar la red con cableado correcto, buen router y QoS. Esta guia te lleva paso a paso con lenguaje claro.

::: {.ad-slot ad-slot="after-intro"}
:::

-   [Por que el cable sigue mandando](#por-que-cable)
-   [Tipos de cable y distancias](#tipos-cable)
-   [Arquitectura basica de red en casa](#arquitectura-red)
-   [Switches, VLAN y QoS](#switches-qos)
-   [Combinar cable y Wi-Fi sin conflictos](#combinar-cable-wifi)
-   [Pruebas, monitoreo y diagnostico](#pruebas-monitoreo)
-   [Diseno pro con pasos practicos](#diseno-pro)
-   [Checklist final de mejoras](#checklist-final)
-   [Preguntas frecuentes](#preguntas-frecuentes)

::: {#por-que-cable .section}
## Por que el cable sigue mandando

Ethernet no sufre interferencias como el Wi-Fi. Es mas estable, tiene menor latencia y no depende de paredes o distancia. Si tu trabajo depende de videollamadas o subes archivos grandes, el cable te da consistencia. No significa que debas cablear toda la casa, pero si asegurar que los equipos criticos tengan cable.

Si juegas online, el cable es casi obligatorio. Complementa con [internet para jugar online](/internet-en-casa/internet-para-jugar-online-mexico.html). Los picos de latencia en Wi-Fi son comunes cuando hay muchos dispositivos, y el cable los reduce casi por completo.

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Ethernet_RJ45_connector_p1160054.jpg" loading="lazy" decoding="async" width="1200" height="800" alt="Conector RJ45 de cable Ethernet" />
<figcaption>El RJ45 es la pieza clave para una conexion estable por cable.</figcaption>
</figure>

### Donde hace mas diferencia el cable

-   PC o laptop de trabajo con videollamadas frecuentes.
-   Consola de videojuegos.
-   TV principal para streaming.
-   Servidor de respaldo o NAS.
:::

::: {#tipos-cable .section}
## Tipos de cable y distancias

Elegir cable correcto evita cuellos de botella. Lo basico:

-   **Cat5e:** hasta 1 Gbps en distancias normales. Suficiente para la mayoria.
-   **Cat6:** mejor blindaje y menor interferencia. Recomendable si vas a renovar.
-   **Cat6A:** pensado para 10 Gbps en distancias mas largas.

#### Regla rapida

Si vas a cablear hoy, Cat6 es el equilibrio entre costo y futuro. Cat5e sigue siendo valido para la mayoria de hogares. Evita cables sin certificacion: suelen fallar y dan problemas intermitentes.

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Ethernet_Patch_Panel_20171121_130458.jpg" loading="lazy" decoding="async" width="1200" height="800" alt="Patch panel para cableado estructurado Ethernet" />
<figcaption>Un patch panel ordena el cableado cuando tienes varios puntos en casa.</figcaption>
</figure>

### Distancias reales

Para cable Cat5e o Cat6, la distancia maxima recomendada es 100 metros. En casa rara vez se llega a eso, pero si tienes un patio largo o taller, considera cableado exterior resistente a clima.
:::

::: {#arquitectura-red .section}
## Arquitectura basica de red en casa

La red domestica no es complicada si la entiendes en capas. El flujo basico es: modem/ONT, router, switch y puntos de acceso. Con esta estructura, la red es facil de escalar.

### Modem/ONT

Es la caja del proveedor. En fibra suele ser ONT. En cable, modem coaxial. Si no sabes que tienes, revisa [fibra vs coaxial](/internet-en-casa/fibra-vs-coaxial-mexico.html). El modem debe estar en un lugar ventilado y cerca de donde puedas conectar el router.

### Router

El router maneja la red local, asigna IP y controla el Wi-Fi. Si tu router es basico, puedes mejorarlo sin cambiar proveedor. Ve [como elegir router Wi-Fi](/internet-en-casa/como-elegir-router-wifi-mexico.html). Un buen router hace que la red responda mejor con muchos dispositivos.

### Switch

Si necesitas varios dispositivos por cable, el switch es la solucion. Para redes simples, uno de 5 u 8 puertos es suficiente. Si planeas cablear varias habitaciones, considera un switch con mas puertos.

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2550T-PWR-Front.jpg" loading="lazy" decoding="async" width="1200" height="800" alt="Switch de red con multiples puertos Ethernet" />
<figcaption>Un switch agrega puertos sin complicar la red.</figcaption>
</figure>

### Puntos de acceso

Si la casa es grande, conviene usar puntos de acceso o mesh. Un punto de acceso por cable suele ser mas estable que un repetidor. Si no quieres cablear, una malla Wi-Fi es alternativa valida.
:::

::: {.ad-slot ad-slot="mid-content"}
:::

::: {#switches-qos .section}
## Switches, VLAN y QoS

Cuando hay muchos dispositivos, el QoS ayuda a priorizar videollamadas, clases o gaming. En algunos routers es automatico; en otros se configura manualmente. Si hay descargas o actualizaciones de fondo, QoS evita que se lleven todo el ancho de banda.

### QoS en router

Identifica dispositivos clave y dales prioridad. Esto evita que una descarga grande afecte una reunion importante. Muchos routers permiten asignar prioridad por dispositivo o por tipo de trafico.

### VLAN para separar dispositivos

Si tienes camaras o IoT, puedes separarlos de tu red principal. No es obligatorio, pero mejora seguridad. Las VLAN tambien ayudan a que dispositivos antiguos no afecten a los mas nuevos.

#### Cuando vale la pena

Si tienes mas de 15 dispositivos activos o trafico sensible, QoS y VLAN comienzan a tener sentido. En casas pequenas con pocos dispositivos, probablemente no sea necesario.
:::

::: {#combinar-cable-wifi .section}
## Combinar cable y Wi-Fi sin conflictos

El mejor escenario es mixto: cable para equipos fijos (TV, consola, PC) y Wi-Fi para moviles. Si tu casa es grande, usa malla con backhaul cableado. Lee [Wi-Fi Mesh](/internet-en-casa/wifi-mesh-cobertura-total.html) para ubicacion ideal.

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/SC-APC_fiber_optic_cable.jpg" loading="lazy" decoding="async" width="1200" height="800" alt="Conector de fibra optica SC-APC" />
<figcaption>La fibra es base ideal; el cableado interno lleva estabilidad a cada cuarto.</figcaption>
</figure>

### Evita bucles y dobles routers

Si conectas un segundo router sin configurarlo bien, puedes crear doble NAT y problemas de latencia. Si necesitas ampliar cobertura, usa modo puente o un punto de acceso. Un diseño limpio evita dolores de cabeza.
:::

::: {#pruebas-monitoreo .section}
## Pruebas, monitoreo y diagnostico

Una red bien hecha se nota en pruebas reales. Haz tests por cable y Wi-Fi, y revisa latencia con ping. Si la velocidad por cable es buena pero por Wi-Fi mala, el problema no es el proveedor sino la cobertura.

Si quieres entender unidades y velocidad, revisa [diferencia entre Mbps y MB](/blog/cuanta-velocidad-internet-necesitas-2026.html).

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Coaxial_cable_cut.jpg" loading="lazy" decoding="async" width="1200" height="800" alt="Cable coaxial cortado comparado con cableado moderno" />
<figcaption>El coaxial sigue en muchos hogares, pero el cableado interno puede modernizarse.</figcaption>
</figure>

### Diagnostico rapido

1.  Prueba velocidad por cable directo al router.
2.  Prueba Wi-Fi cerca del router.
3.  Prueba Wi-Fi en la zona mas lejana.
4.  Si el cable es bueno y el Wi-Fi es malo, ajusta cobertura.
5.  Si el cable es malo, revisa al proveedor.
:::

::: {#diseno-pro .section}
## Diseno pro con pasos practicos

Si quieres una red estable por anos, sigue este enfoque:

### Paso 1: define puntos criticos

Marca en un plano donde necesitas estabilidad total: oficina, consola, TV, servidor. Esos puntos deben ser cableados si es posible.

### Paso 2: ubica el centro de red

El router y el switch deben estar en un lugar central, ventilado y con acceso a energia estable. Si el modem esta lejos, usa cableado para llevar la conexion al centro.

### Paso 3: planifica rutas de cable

Evita rutas con interferencia electrica fuerte y protege el cable en exteriores. Un ducto simple protege el cable de humedad y sol directo.

### Paso 4: configura QoS y Wi-Fi

Prioriza videollamadas y trabajo. Ajusta el Wi-Fi para que los dispositivos se conecten a la banda correcta. Si hay Wi-Fi 6, aprovecha OFDMA para muchos dispositivos.

### Paso 5: mide y ajusta

Despues de instalar, mide en varias horas del dia. Ajusta nodos o antenas si hay zonas con baja senal. Un cambio pequeno en ubicacion puede mejorar mucho.
:::

::: {#checklist-final .section}
## Checklist final de mejoras

1.  Conectar por cable los dispositivos clave.
2.  Actualizar router si es viejo.
3.  Agregar switch si faltan puertos.
4.  Configurar QoS para videollamadas.
5.  Medir velocidad real en horario pico.

Si aun te sientes perdido, vuelve a [mejor internet en casa en Mexico](/blog/mejor-internet-casa-mexico-2026.html) para alinear decisiones con tu presupuesto.
:::

::: {#presupuesto-niveles .section}
## Presupuesto por niveles: basico, balanceado y pro

Para mejorar tu red no necesitas gastar de golpe. Puedes avanzar por niveles. El nivel basico se enfoca en estabilidad sin obra: un buen router y cablear solo el equipo mas critico. El nivel balanceado agrega un switch y un par de puntos de cable. El nivel pro incluye cableado estructurado, patch panel y backhaul cableado para mesh.

### Nivel basico

Ideal si rentas o si no quieres abrir paredes. Cambia el router por uno estable, conecta por cable la TV o la PC principal y configura QoS. Con esto se reducen cortes en videollamadas y streaming.

### Nivel balanceado

Agrega un switch y cablea dos o tres puntos fijos. Esto libera el Wi-Fi y mejora latencia. Si la casa es grande, puedes sumar un nodo mesh con backhaul cableado parcial.

### Nivel pro

Recomendado si trabajas desde casa o si hay muchos usuarios simultaneos. Incluye cableado estructurado, patch panel y puntos de acceso por cable. La inversion es mayor, pero la estabilidad se vuelve similar a un entorno de oficina.
:::

::: {#errores-red .section}
## Errores comunes en redes domesticas

La mayoria de fallas no vienen del proveedor, sino de detalles locales. Un cable mal crimpado, un router escondido o un switch viejo pueden destruir la experiencia. Aqui algunos errores que vemos seguido:

-   Usar cables planos de baja calidad para conexiones largas.
-   Colocar el router dentro de un mueble cerrado.
-   Mezclar routers en modo normal y crear doble NAT.
-   No actualizar firmware por meses.
-   Conectar la TV por Wi-Fi cuando hay puerto Ethernet disponible.

Evitar estos errores suele mejorar mas que subir de plan. Si aun tienes problemas, revisa la guia de [que hacer si tu internet esta lento](/guias/que-hacer-si-internet-lento.html).
:::

::: {#seguridad-basica .section}
## Seguridad basica para no dejar la puerta abierta

Una red rapida sin seguridad es un riesgo. Cambia la contrasena del router, activa WPA2 o WPA3 y desactiva la administracion remota si no la usas. Si tienes visitas frecuentes, crea una red de invitados para que no accedan a tus equipos principales.

Si tienes dispositivos IoT, considera aislarlos en una red separada. Muchos de esos equipos no reciben actualizaciones y pueden ser la puerta de entrada. Separarlos reduce el riesgo sin complicar el uso diario.
:::

::: {#cableado-exterior .section}
## Cableado exterior y proteccion

Si necesitas llevar red a un cuarto exterior, taller o patio, usa cableado exterior resistente a humedad y sol. No uses cables interiores en el exterior: se degradan rapido y generan fallas intermitentes. Usa ducto o canaleta para proteger el cable de golpes y agua. En zonas con tormenta electrica, considera protectores contra picos en el extremo del cable.

Si la distancia es grande, revisa si un enlace punto a punto inalambrico seria mas practico. Para distancias cortas y estables, el cable suele ser mas confiable. La clave es proteger la instalacion para que dure anos sin fallas.
:::

::: {#herramientas-basicas .section}
## Herramientas basicas para mejoras simples

No necesitas un laboratorio, pero si algunas herramientas basicas: un probador de cable simple, un juego de conectores RJ45, una pinza de crimpado y un par de cables de repuesto. Con eso puedes detectar si un cable esta mal armado antes de culpar al proveedor.

Si no quieres armar cables, compra cables ya hechos de buena calidad. Para recorridos largos, evita cables planos baratos. Si vas a instalar varios puntos, etiqueta cada cable para no confundirte despues. Esto ahorra tiempo cuando agregas un switch o cambias el router.
:::

::: {#respaldo-energia .section}
## Respaldo de energia para evitar cortes

Si en tu zona hay variaciones de energia o cortes breves, un UPS pequeno puede salvar la red. Conecta el modem, el router y el switch a un respaldo basico para evitar reinicios. Esto mejora la estabilidad en videollamadas y evita que la red tarde minutos en volver. Tambien protege equipos sensibles y reduce reinicios diarios a largo plazo.

No necesitas un UPS grande; uno compacto suele dar tiempo suficiente para que pase el corte o para cerrar una llamada sin interrupcion. Si hay tormentas frecuentes, agrega un protector contra picos para proteger el equipo.
:::

\$faqMarker

## Preguntas frecuentes

### Necesito cableado en toda la casa?

No. Cablear solo donde mas lo necesitas ya mejora mucho.

### Cat6 vale la pena sobre Cat5e?

Si estas cableando desde cero, Cat6 es buena inversion. Si ya tienes Cat5e en buen estado, puedes mantenerlo.

### QoS realmente ayuda?

Si hay varias personas conectadas al mismo tiempo, si. Prioriza trafico sensible.

### Que hago si el internet se siente lento?

Revisa primero tu Wi-Fi y cableado, luego sigue [que hacer si tu internet esta lento](/guias/que-hacer-si-internet-lento.html).

### Necesito un switch gestionable?

Si solo quieres mas puertos, un switch simple basta. Si quieres VLAN o control avanzado, un switch gestionable es mejor.

::: {.section .callout related-block="" style="margin-top:18px"}
## Siguiente lectura

[Internet satelital y rural](/internet-en-casa/internet-satelital-rural-mexico.html)

Opciones reales para zonas con poca cobertura.
:::

::: {.section related-block="" style="margin-top:18px"}
## Articulos relacionados

::: {.grid .two}
[](/internet-en-casa/){.card}

### Internet en casa

Hub con comparativas y guias clave.

[](/internet-en-casa/wifi-mesh-cobertura-total.html){.card}

### Wi-Fi Mesh

Cobertura total sin zonas muertas.

[](/internet-en-casa/como-mejorar-wifi-casa-mexico.html){.card}

### Como mejorar tu Wi-Fi

Pasos reales antes de pagar un plan mas caro.
:::
:::

------------------------------------------------------------------------

::: meta-row
**Ultima actualizacion:** 27 de diciembre de 2025 \> [Metodologia](/metodologia.html)
:::
:::
