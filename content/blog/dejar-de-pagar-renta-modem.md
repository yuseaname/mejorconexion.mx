---
title: "Cómo Dejar de Pagar la Renta del Módem en México: Guía Honesta 2026"
slug: "dejar-de-pagar-renta-modem"
description: "Antes de cambiar de equipo revisa tu recibo: si tu renta es de módem + extensor + decodificador ronda $180–$320 MXN/mes, y con tu propio router detrás del módem del proveedor (o módem propio en Izzi/Megacable) la inversión se recupera en 8–18 meses."
date: 2026-08-19
author: "Ing. Roberto Mendoza"
author_bio: "Ingeniero en telecomunicaciones (ESME-IPN) con 15 años en redes FTTH y optimización Wi-Fi."
author_slug: "roberto-mendoza"
keywords:
  - "dejar de pagar renta modem"
  - "renta de modem telmex"
  - "usar mi propio modem izzi"
  - "renta de modem totalplay"
  - "ahorrar renta de equipo internet"
  - "modem propio megacable"
  - "router detras del modem del proveedor"
draft: false
image: "/images/dejar-de-pagar-renta-modem/img-1.webp"
---

## Respuesta Rápida

**Antes de comprar nada, abre tu recibo: muchos usuarios de Telmex/Infinitum ya no pagan renta de módem por separado (equipo incluido); Izzi y Megacable suelen cobrar renta de equipo (~$50–$150 MXN/mes); Totalplay suele incluir el módem en el paquete, pero extensores y decodificadores se cobran aparte. Donde sí puedes dejar de pagar: tu propio router detrás del módem del proveedor (sirve universalmente) y, en Izzi/Megacable, módem DOCSIS propio registrado por MAC.**

- **Recuperación típica**: 8–18 meses con módem propio; 4–8 meses con sólo router detrás del módem del proveedor.
- **Acción inmediata**: desactiva la WiFi del router del proveedor y conecta tu propio router por Ethernet; si te cobran "renta de extensor", esa la eliminas hoy mismo.

Para entender cada línea de tu estado de cuenta, revisa primero la guía de [cómo leer tu recibo de internet](/blog/como-leer-recibo-internet-mexico.html).

Voy a ser honesto desde el inicio: el título "deja de pagar la renta del módem" suena igual para todos, pero la realidad es muy distinta según tu proveedor y según lo que venga en tu recibo. A algunos lectores de esta guía les voy a decir "ya estás pagando $0, no compres nada". A otros les voy a decir "estás dejando $1,800 MXN al año en la mesa". Este artículo te ayuda a saber en cuál de los dos grupos estás y, si aplica, cómo recortar esa renta sin romper tu servicio.

## ¿Cuánto Estás Pagando Realmente?

El primer error es asumir que "la renta del módem" es una sola cifra. En la práctica, en un recibo de Telmex, Izzi, Totalplay o Megacable te puedes encontrar hasta tres cargos distintos:

- **Renta de módem/ONT**: el equipo que termina la conexión (fibra o coaxial). A veces viene "incluido" sin desglose.
- **Renta de extensor Wi-Fi o repetidor**: te lo cobraron cuando pediste "mejor señal en el segundo piso". Aquí suele estar el cargo más fácil de eliminar.
- **Renta de decodificador de TV**: si tienes paquete de televisión; ese no lo puedes quitar si quieres ver los canales del proveedor.

Abre tu recibo (en papel o en la app) y busca las líneas con palabras como *renta equipo*, *arrendamiento*, *ONT*, *extensor*, *módem adicional*, *servicio adicional Wi-Fi*. Súmalas. Ese es tu número real.

| Concepto | Rango típico mensual |
|---|---|
| Renta de módem/ONT incluida en el plan | $0 MXN (Telmex/Infinitum; Totalplay suele incluirla en el paquete) |
| Renta de módem DOCSIS (Izzi/Megacable) | $80–$150 MXN |
| Renta de extensor o mesh del proveedor | $80–$170 MXN |
| Renta de decodificador de TV | $80–$180 MXN (no negociable si conservas TV) |

Si la suma total está entre $0 y $60 MXN, probablemente tu proveedor ya te incluye el equipo y este artículo sólo te servirá para entender qué podrías recortar en un próximo cambio de plan. Si está por encima de $150 MXN, sigue leyendo: tienes un ahorro real a la vista.

## La Tabla de Compatibilidad por Proveedor

Aquí va la verdad incómoda. No todos los proveedores te dejan usar tu propio módem, y los que sí lo permiten lo hacen bajo condiciones distintas. Según reportes de usuarios y políticas recientes, esta es la foto:

| Proveedor | Tecnología | ¿Módem propio funciona? | Truco viable | Notas |
|---|---|---|---|---|
| **Telmex / Infinitum** | Fibra GPON | NO (necesitas su ONT) | Router detrás de la ONT, modo bridge o doble NAT | El servicio está amarrado a su ONT; el ahorro está en quitar extensores/mesh rentados |
| **Izzi** | Cable coaxial DOCSIS 3.0/3.1 | SÍ, con módem DOCSIS propio (Motorola, Arris, Netgear) registrado por MAC | Módem propio + tu router; llamar a soporte para dar de alta la MAC | TV puede requerir su decodificador adicional aparte del módem |
| **Totalplay** | Fibra GPON | NO en la mayoría de planes (caja propietaria) | Router detrás de la caja del proveedor | En algunos planes recientes reportan mayor apertura; confirma por escrito antes de comprar |
| **Megacable** | Cable coaxial DOCSIS | SÍ, patrón similar a Izzi | Módem DOCSIS propio registrado | Confirma el nivel de DOCSIS de tu plan (3.0 vs 3.1) antes de comprar |

Dos observaciones importantes. Primero, en **fibra óptica (Telmex, Totalplay)** el módem de tu proveedor cumple un rol técnico que no puedes reemplazar fácilmente: convierte la señal de fibra en Ethernet. Eso se llama ONT y suele estar físicamente pegado a la roseta de pared. Segundo, en **cable coaxial (Izzi, Megacable)** la sustitución sí es viable porque el estándar DOCSIS está pensado para interoperar entre marcas, siempre que registres la MAC de tu equipo con el proveedor.

Por eso la frase correcta no es "compra tu propio módem", sino **"mata la renta donde sí puedes y mantén la renta donde es inevitable"**.

## El Truco Universal: Tu Router Detrás del Módem del Proveedor

Este es el consejo que aplica en el 100% de los casos, sin importar tu proveedor. Funciona con Telmex, Izzi, Totalplay y Megacable, y es donde la mayoría de la gente recupera dinero sin pelearse con soporte.

La idea es simple: dejas el módem/ONT del proveedor exactamente donde está (no lo devuelves, no tocas la fibra ni el coaxial), le desactivas su WiFi, y conectas tu propio router por cable Ethernet al puerto LAN del módem del proveedor. Tu router pasa a ser el cerebro de tu red Wi-Fi.

**Por qué funciona siempre:** el módem del proveedor y tu router pueden convivir. El módem se encarga de la "última milla" (fibra o coaxial hasta la calle); tu router se encarga del Wi-Fi, DHCP, NAT y todo lo que quieres configurar a tu gusto.

**Cuándo es la jugada más inteligente:**
- Cuando no puedes reemplazar el módem (todos los casos de fibra).
- Cuando el WiFi del proveedor es malo y estás pagando renta de extensor o mesh.
- Cuando quieres separar la red de invitados o configurar control parental sin pelearte con la interfaz del proveedor.

**Cómo se hace, paso rápido:**
1. Conecta tu router al puerto LAN del módem/ONT del proveedor con un cable Ethernet.
2. Entra a la configuración del módem del proveedor (normalmente `192.168.1.1`) y desactiva su WiFi.
3. Pon tu router en modo router (no modo bridge, salvo que sepas lo que haces) y listo.

El detalle fino de DHCP, doble NAT y WiFi está cubierto en [cómo configurar tu router en México](/blog/como-configurar-router-mexico-2026.html). Si lo que quieres es entender por qué importa tener un buen router en lugar del del proveedor, revisa [router vs módem: la diferencia real](/blog/router-vs-modem-diferencia-mexico.html).

## Cómo Elegir Tu Propio Equipo (Sin Caer en "Los 10 Mejores")

No te voy a dar una lista de productos. Esa lista ya existe y es genérica. Lo que sí te voy a dar es el método para que tu compra tenga sentido.

**Paso 1: identifica tu conexión.**

- ¿Tu módem actual tiene un cable de fibra óptica entrando directo? Es GPON/ONT. Tu única compra viable es un router detrás del ONT.
- ¿Tu módem tiene un cable coaxial redondo con tornillo? Es DOCSIS. Aquí sí tienes opción de comprar módem propio.

**Paso 2: anota velocidad y versión.**

- Para DOCSIS 3.0 necesitas un módem de al menos 8x4 canales (8 de bajada, 4 de subida). Para planes de 500 Mbps o más, exige DOCSIS 3.1.
- Para fibra no compres "módem", compra un router neutro Gigabit (o 2.5 GbE si tu plan pasa de 1 Gbps).

**Paso 3: mide tu problema real de WiFi.**

- Casa menor a 80 m² y un piso: un buen router WiFi 6 basta.
- Casa de 100–200 m² o dos pisos: vale la pena un mesh de 2 nodos.
- Casa grande o muros gruesos de concreto: 3 nodos o solución combinada con cable/Ethernet.

**Paso 4: cruza con tu presupuesto.**

No gastes de más en specs que tu plan no aprovecha. Si tienes 200 Mbps, un router WiFi 6 de $1,500–$2,500 MXN es suficiente. Si tienes 1 Gbps, sube el presupuesto a $3,500+ MXN. Las guías de [cómo elegir un router WiFi para casa en México](/blog/como-elegir-router-wifi-casa-mexico.html) y [mejores routers 2026 México](/blog/mejores-routers-2026-mexico-guia.html) aterrizan estas cifras con modelos concretos.

## El Proceso de Alta Paso a Paso

El error más caro no es comprar un equipo incompatible. Es devolver el equipo del proveedor sin pedir comprobante. Hazlo así:

1. **Compra el equipo compatible** (DOCSIS propio en Izzi/Megacable, o router neutro para todos).
2. **Llama a soporte antes de desconectar nada.** Pregunta exactamente qué necesitan: número de MAC, modelo, dirección MAC del equipo. En Izzi/Megacable te pedirán la MAC para darlo de alta. En Telmex/Totalplay te confirmarán que el procedimiento no aplica a fibra.
3. **Conecta y prueba.** Corre un [test de velocidad](/blog/medidor-internet-speedtest-mexico.html) antes y después; verifica que la velocidad contratada se mantenga.
4. **Devuelve el equipo del proveedor con acuse.** Ve a sucursal, pide tu comprobante de devolución con folio, fecha y sello. Sin este papel te pueden seguir cobrando la renta tres meses más "por seguridad".
5. **Revisa dos recibos posteriores.** Confirma que la línea de renta desapareció. Si no, reclama con el folio de devolución.

Saltarse el paso 4 es la forma más común de no ahorrar nada y seguir pagando doble.

## Los Riesgos Reales (Honestidad de Ingeniero)

No todo sale a favor. Estos son los escenarios donde la decisión NO conviene:

- **Vas a mudarte en menos de 6 meses.** El payback no se completa y dejas equipo sin usar.
- **Tu plan tiene promo con renta "gratis" los primeros 12 meses.** Comprar equipo hoy te hace pagar doble: la promo se acaba y te cobran la renta retroactiva o ya compraste sin necesitarla.
- **Tienes servicio捆绑 TV.** El decodificador de TV sí o sí viene del proveedor; eso no lo puedes reemplazar. Tu ahorro real se reduce a módem + extensor.
- **Soporte te deja de atender si reportas fallas.** Cuando llamas por "internet lento" te pueden decir "es tu equipo, no es problema del servicio". Tener a la mano la velocidad medida con cable directo al módem del proveedor (prueba clave) te protege.
- **Cambios de firmware y planes IPv6 edge cases**: en algunos planes nuevos, ciertas funciones (IP fija, IPv6, multicast para TV) sólo están disponibles con el equipo del proveedor.

Si caes en cualquiera de estos casos, el camino inteligente es el router detrás del módem, no el reemplazo total.

## Cuánto Ahorras: Tres Escenarios Reales

Usemos precios típicos. Todos los rangos marcados deben cotejarse con tu estado de cuenta actual.

| Escenario | Renta actual | Inversión única | Payback (meses) | Ahorro a 24 meses |
|---|---|---|---|---|
| Sólo renta de módem DOCSIS (Izzi/Megacable) | $120 MXN/mes | $1,800 MXN módem DOCSIS 3.1 + router | ~15 | $1,080 MXN |
| Renta de módem + extensor Wi-Fi | $120 + $150 = $270 MXN/mes | $2,500 MXN mesh 2 nodos detrás del módem | ~9 | $3,980 MXN |
| Familia grande con paquete TV + extensor mesh | $120 + $200 = $320 MXN/mes | $3,500 MXN mesh 3 nodos (no reemplaza TV) | ~11 | $4,180 MXN |

El segundo escenario es donde casi siempre duele más y se resuelve con menos inversión. El tercero es donde la gente se confunde: la renta de decodificador de TV sigue, pero la del extensor se va.

Para asegurarte de que la velocidad sigue siendo la contratada después del cambio, mide con [el medidor de velocidad de internet](/blog/medidor-internet-speedtest-mexico.html) o la guía de [velocidad contratada que no te llega](/blog/velocidad-contratada-no-me-llega-mexico.html).

## Preguntas Frecuentes

**¿Telmex cobra por usar mi propio módem?**
No puedes, porque el servicio de fibra de Telmex/Infinitum requiere su ONT para terminar la conexión. Tu opción real es poner tu propio router detrás de esa ONT y apagar la WiFi del equipo de Telmex.

**¿Pierdo la garantía del servicio si uso equipo propio?**
En cable (Izzi/Megacable), si registras tu módem DOCSIS con la MAC, el servicio sigue siendo del proveedor; la "garantía" aplica a la línea, no al equipo. En fibra, como no reemplazas la ONT, el tema no aplica.

**¿Puedo mezclar módem propio con TV del proveedor?**
En cable, sí: el decodificador de TV se conecta por cable coaxial o por Ethernet al módem (según el plan). Tener módem DOCSIS propio no te quita la TV, pero confirma en Izzi/Megacable que tu decodificador no quede atado al módem anterior.

**¿Qué hago con el equipo que devuelvo?**
Devuélvelo en sucursal con acuse de recibo escrito (folio, fecha, sello). No aceptes sólo el "ya quedó registrado en sistema". Guarda ese papel mínimo 6 meses.

**¿Y si quiero cambiar de proveedor y olvidarme del tema?**
Es válido. En zonas con cobertura de Totalplay o Izzi, moverte de proveedor puede ser más rápido que pelear la renta. Revisa [cómo cambiar de proveedor sin cortes](/blog/cambiar-de-proveedor-de-internet-sin-cortes.html).

---

## Prompts de Imágenes

**1. Recibo de internet con círculo rojo en la línea de "renta de equipo":** Ilustración plana, estilo editorial limpio, sobre fondo blanco con sombra suave, mostrando un recibo de Telmex/Izzi visto desde arriba con tres líneas resaltadas con marcador rojo: "renta módem", "renta extensor", "renta decodificador". A un lado, una mano sostiene un lápiz rojo. Texto pequeño y realista tipo CFDI. Composición cenital, encuadre cuadrado 1:1, paleta azul corporativo con acentos rojos y grises. Estilo infografía de revista de finanzas personales, sin rostros, sin marcas.

**2. Mapa de decisión de compatibilidad por proveedor:** Diagrama de cuatro columnas (Telmex, Izzi, Totalplay, Megacable) con íconos de fibra y coaxial, semáforo verde/amarillo/rojo indicando qué se puede reemplazar, flechas que llevan a un cuadro central "Router detrás del módem = solución universal". Tipografía sans-serif, iconografía plana moderna, fondo blanco, acentos en verde menta, amarillo y rojo apagado. Formato horizontal 16:9, espacio para sobreponer texto corto encima. Sin logos de proveedores, sólo íconos genéricos de módem y router.

**3. Cadena de conexión de red doméstica en casa mexicana:** Ilustración isométrica de una sala con paredes de colores cálidos, mostrando la roseta de fibra en la pared, un ONT/módem del proveedor sobre una repisa, un cable Ethernet saliendo hacia un router neutro moderno sobre una mesa, y tres dispositivos finales: laptop, Smart TV y smartphone con íconos WiFi. Líneas punteadas suaves indican la señal WiFi cubriendo la sala. Paleta cálida con tonos terracota, azul tecnológico y acentos verdes. Composición a tres cuartos, profundidad realista, sin rostros humanos, 4:3 horizontal.
