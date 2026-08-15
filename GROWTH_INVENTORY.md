# MejorConexion.mx — Inventario Vivo de Crecimiento

> Fuente de verdad: repositorio actual, build local y baselines Rybbit del 2026-08-10 y 2026-08-15. Actualizado: 2026-08-15.
> Regla: consultar este archivo antes de tocar contenido para evitar repetir trabajo o alterar URLs existentes.

## Estado y restricciones confirmadas

- Dominio/stack: `https://mejorconexion.mx/`, Hugo 0.141.0, `uglyURLs = true`; las canónicas publicadas terminan en `.html`.
- Infraestructura preservada: AdSense `ca-pub-5566942094411042`, ads.txt, Rybbit, sitemap, robots y GitHub Actions → Hostinger.
- Live check inicial: raíz, ads.txt, robots.txt y sitemap devolvieron HTTP 200; AdSense y Rybbit están presentes en el HTML.
- Analítica fresca: consultada el 2026-08-15 con Rybbit API; el snapshot saneado está en `RYBBIT_BASELINE_2026-08-15.json`. La credencial no se guarda en el repositorio.
- Git al inicio: `main` estaba 4 commits por delante de `origin/main`; no se mezclan cambios ajenos.

## Baseline disponible (90 días terminados 2026-08-10)

| Sesiones | Usuarios | Pageviews | Rebote | Págs/sesión | Duración media | Orgánico | Móvil |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 324 | 305 | 468 | 80.56% | 1.44 | 40.45 s | 223 (68.83%) | 128 (39.51%) |

### Snapshot Rybbit fresco (consultado 2026-08-15)

| Sesiones | Usuarios | Pageviews | Rebote | Págs/sesión | Duración media |
|---:|---:|---:|---:|---:|---:|
| 1,269 | 1,202 | 1,828 | 82.51% | 1.44 | 39.59 s |

La API devolvió este mismo agregado ante ventanas solicitadas de 7, 30 y 90 días; por ello **no debe usarse para comparar periodos** hasta resolver ese comportamiento. El desglose pathname de la solicitud de 30 días sí identifica demanda actual: móvil comparativo 293 sesiones (89.42% rebote), inicio 214 (80.37%), CDMX 190 (71.05%), guía de velocidad 66 (66.67%), Telmex/Izzi/Totalplay 48 (62.5%), Guadalajara 36 (72.22%), Mbps vs MB 31 (80.65%) y Puebla 30 (90%).

### Landing pages con evidencia histórica

| Ruta histórica | Sesiones | Rebote | Tiempo | Estado al iniciar este ciclo |
|---|---:|---:|---:|---|
| `/planes-moviles/telcel-vs-att-vs-movistar/` | 102 | 90.2% | 29.1 s | 404 por migración trailing-slash → .html; corregido en ciclo 1 y verificado live: HTTP 301 exacto a la canónica |
| `/` | 35 | 74.3% | 6.4 s | Inicio existe |
| `/cobertura/cdmx/mejor-internet-cdmx/` | 34 | 67.7% | 6.0 s | 404 por migración trailing-slash → .html; corregido en ciclo 1 y verificado live: HTTP 301 exacto a la canónica |
| `/blog/que-significa-la-velocidad-de-internet.html` | 33 | 69.7% | 17.4 s | Canónica existe |
| `/planes-internet/telmex-vs-izzi-vs-totalplay-mexico/` | 13 | 92.3% | 0.23 s | 404 por migración trailing-slash → .html; corregido en ciclo 1 y verificado live: HTTP 301 exacto a la canónica |
| `/cobertura/monterrey/` | 8 | 75.0% | 50.8 s | Canónica existe |
| `/blog/que-son-los-datos-moviles.html` | 7 | 71.4% | 19.4 s | Canónica existe |
| `/cobertura/guadalajara/` | 7 | 85.7% | 1.7 s | Canónica existe |
| `/blog/que-es-el-ping.html` | 6 | 83.3% | 0.67 s | Canónica existe |
| `/blog/cuanto-cuesta-internet-en-mexico-2026.html` | 5 | 60.0% | 13.6 s | Canónica existe |

## Resumen de inventario actual

- Páginas Markdown: **268**; páginas HTML en build limpio: **317**; URLs de sitemap: **261**.
- Por sección: `authors` 1, `authors/daniel-cruz` 1, `authors/equipo` 1, `authors/patricia-nunez` 1, `authors/roberto-mendoza` 1, `blog` 198, `ciudades` 1, `cobertura` 1, `cobertura/cdmx` 1, `cobertura/guadalajara` 1, `cobertura/monterrey` 1, `cobertura/puebla` 1, `cobertura/queretaro` 1, `esim` 2, `esim-viajeros` 2, `guias` 5, `herramientas` 2, `internet-en-casa` 29, `planes-internet` 4, `planes-moviles` 4, `root` 10.
- Señales automáticas de oportunidad: **20** contenidos publicados de menos de 700 palabras, **45** sin descripción y **0** páginas de 300+ palabras sin enlace interno. Las páginas institucionales e índices se excluyen de la prioridad de expansión.
- Schema en build inicial: JSON-LD 282 páginas, FAQPage 102 y BreadcrumbList 281.
- Auditoría de artefacto inicial: 77 objetivos locales ausentes (67 assets y 10 rutas). El inventario debe priorizar las rutas o imágenes de páginas con tráfico probado; no se rellenará la deuda histórica con placeholders.

## Ciclo 1 — preservación de demanda + experiencia visual

- **Baseline/hipótesis:** 149 sesiones históricas (102 + 34 + 13) aterrizaban en tres URLs trailing-slash que ahora daban 404. Recuperarlas puede restablecer acceso al contenido canónico y reducir rebote sin cambiar slugs ni destinos.
- **Cambios realizados:** reglas Apache 301 exactas para los tres URLs históricos; corrección de 7 referencias de imagen rotas en las dos páginas con mayor volumen histórico; meta description añadida a la guía CDMX.
- **Verificación:** build Hugo limpio pasa; las dos páginas modificadas no tienen `src` locales ausentes. El deploy CI de `732b80c` terminó exitosamente y los tres URLs históricos devuelven HTTP 301 exacto; las 7 imágenes reemplazadas, AdSense y Rybbit devolvieron/están presentes en producción.
- **Riesgo:** las métricas de engagement no pueden compararse hasta contar con datos post-despliegue y una clave Rybbit vigente.

## Ciclo 2 — retención en guía de velocidad + legibilidad de FAQ

- **Baseline/hipótesis:** la guía `que-significa-la-velocidad-de-internet.html` conserva demanda actual (66 sesiones; 66.67% rebote; 26.7 s). Su FAQ era contenido genérico de proveedores, la meta description estaba truncada y el shortcode compartido usaba texto oscuro heredado que era casi ilegible en el tema oscuro.
- **Cambios realizados:** metadata y keywords alineados con Mbps/descarga/subida/latencia; reemplazo por cuatro FAQ específicas y verificables; dos fuentes IFT enlazadas; shortcode FAQ migrado a las clases de diseño oscuro existentes para reparar la legibilidad de las FAQ en todo el sitio.
- **Verificación:** build Hugo limpio pasa; cuatro shortcodes FAQ balanceados; no hay assets locales ausentes; revisión visual local confirmó enlaces limpios, FAQ legibles, tabla/hero legibles y sin overflow de escritorio. La prueba de navegador móvil no fue necesaria para esta modificación de contenido/CSS responsivo; el HTML conserva `viewport` y las tarjetas FAQ son de una columna.
- **Riesgo/medición:** FAQPage JSON-LD no se emite en esta página porque el partial del `<head>` se procesa antes de que los shortcodes poblen `Page.Store`. Es un defecto técnico separado, no se fuerza schema inválido. Medir rebote, duración y páginas/sesión de esta URL tras el despliegue.

## Inventario por página

| Archivo | Sección / cluster | Propósito | Intento | Título | Palabras | Enlaces internos | Señales |
|---|---|---|---|---|---:|---:|---|
| `404.md` | root | Página institucional o de navegación | Entender / investigar | Página no encontrada | 0 | 0 | — |
| `about.md` | root | Página institucional o de navegación | Comparar y elegir | Acerca de Mejor Conexión | 192 | 3 | — |
| `authors/_index.md` | authors | Confianza editorial | Entender / investigar | Autores | 15 | 0 | — |
| `authors/daniel-cruz/index.md` | authors/daniel-cruz | Confianza editorial | Entender / investigar | Mtro. Daniel Cruz | 132 | 1 | thin |
| `authors/equipo/index.md` | authors/equipo | Confianza editorial | Comparar y elegir | Equipo Mejor Conexión | 72 | 1 | thin |
| `authors/patricia-nunez/index.md` | authors/patricia-nunez | Confianza editorial | Entender / investigar | Lic. Patricia Núñez | 135 | 1 | thin |
| `authors/roberto-mendoza/index.md` | authors/roberto-mendoza | Confianza editorial | Entender / investigar | Ing. Roberto Mendoza | 146 | 1 | thin |
| `blog/_index.md` | blog | Guía o respuesta específica | Entender / investigar | Blog | 146 | 0 | — |
| `blog/ajustes-router-mejorar-velocidad-internet.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo Ajustar Tu Router para Mejorar la Velocidad de Internet (Guía 2026) | 1606 | 13 | — |
| `blog/atencion-cliente-internet-mexico-numeros.md` | blog | Guía o respuesta específica | Resolver / hacer | Atención al cliente de internet: números y cómo llamar (México 2026) | 1674 | 6 | — |
| `blog/auditoria-red-domestica-detectar-intrusos-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Auditoría de red doméstica: detectar intrusos en México | 2277 | 9 | — |
| `blog/buffering-netflix-mexico-solucion.md` | blog | Guía o respuesta específica | Resolver / hacer | Buffering en Netflix, Disney+ y Prime Video: solución definitiva México 2026 | 1449 | 4 | — |
| `blog/cable-coaxial-vs-fibra-optica.md` | blog | Guía o respuesta específica | Comparar y elegir | Cable coaxial vs fibra óptica: ¿Cuál es la mejor opción para tu hogar en México? | 1866 | 3 | — |
| `blog/cambiar-contrasena-wifi-telmex-izzi-totalplay.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo cambiar la contraseña del WiFi en Telmex, Izzi y Totalplay (2026) | 1450 | 3 | — |
| `blog/cambiar-de-proveedor-de-internet-sin-cortes.md` | blog | Guía o respuesta específica | Resolver / hacer | Guía completa: [cambiar de proveedor](/blog/cambiar-de-proveedor-de-internet-sin-cortes.html) de internet sin cortes 2026 | 2745 | 8 | — |
| `blog/cambiar-proveedor-internet-sin-perder-numero.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo cambiar de proveedor de internet sin perder tu número: Guía completa para hogares en México | 1674 | 3 | — |
| `blog/cancelar-izzi-sin-cargos.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo cancelar Izzi sin pena patrimonial ni cargos ocultos (2026) | 1577 | 9 | — |
| `blog/cancelar-servicio-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Guía Definitiva para Cancelar Servicio de Internet en México: Evita Complicaciones y Cargos Innecesarios | 1908 | 3 | — |
| `blog/cancelar-telmex-sin-penalizacion.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo cancelar Telmex/Infinitum sin penalización (2026) | 1456 | 9 | — |
| `blog/cancelar-totalplay-sin-cargos.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo cancelar Totalplay sin cargos ni penalizaciones (2026) | 1432 | 7 | — |
| `blog/como-abrir-puertos-router-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo abrir puertos del router en México: guía paso a paso (2026) | 1473 | 3 | — |
| `blog/como-ahorrar-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo ahorrar en tu recibo de internet en México: 10 trucos reales (2026) | 345 | 5 | thin |
| `blog/como-aumentar-velocidad-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo aumentar la velocidad de tu internet en México: 10 trucos reales | 1146 | 11 | — |
| `blog/como-compartir-internet-celular-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo compartir internet de tu celular (hotspot) en México: guía | 1897 | 10 | — |
| `blog/como-configurar-router-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo configurar tu router paso a paso (México, 2026) | 973 | 9 | — |
| `blog/como-contratar-internet-en-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Guía completa: cómo contratar internet en México 2026 2026 | 1853 | 8 | — |
| `blog/como-elegir-router-wifi-casa-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Como elegir un router WiFi para casa en Mexico (guia realista) | 2149 | 12 | — |
| `blog/como-leer-recibo-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo leer tu recibo de internet en México (y qué cobran de más) | 1765 | 12 | — |
| `blog/como-mejorar-wifi-en-casa-guia-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo Mejorar la Señal Wi-Fi en Casa: Guía Completa 2026 | 1592 | 1 | — |
| `blog/como-quejarse-profeco-internet-lento-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo quejarse en PROFECO por internet lento: paso a paso (2026) | 917 | 7 | — |
| `blog/como-saber-si-tengo-fibra-optica-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo saber si tengo fibra óptica en mi casa (México, 2026) | 970 | 9 | — |
| `blog/comparativa-totalplay-vs-izzi-vs-telmex-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Totalplay vs Izzi vs Telmex: comparativa real 2026 (con datos) | 1644 | 9 | — |
| `blog/configurar-qos-router-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo configurar QoS en tu router para priorizar tráfico (México 2026) | 1434 | 5 | — |
| `blog/control-parental-internet-hogar-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Control parental en el router y dispositivos en Mexico | 2677 | 14 | — |
| `blog/cual-es-el-mejor-internet-en-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Cuál es el Mejor Internet en México 2026: [Ranking de Proveedores](/blog/cual-es-el-mejor-internet-en-mexico-2026.html) | 1050 | 3 | — |
| `blog/cuanta-velocidad-internet-necesitas-2026.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Cuánta Velocidad de Internet Necesitas en 2026? (Guía por Uso Real) | 1577 | 1 | — |
| `blog/cuanto-consume-netflix-mexico.md` | blog | Guía o respuesta específica | Precio / costo | Cuánto consume Netflix en GB: tabla real para México (2026) | 1508 | 8 | — |
| `blog/cuanto-consume-spotify-youtube-mexico.md` | blog | Guía o respuesta específica | Precio / costo | Cuánto consumen Spotify, YouTube y TikTok en GB (México 2026) | 1855 | 2 | — |
| `blog/cuanto-cuesta-instalacion-internet-mexico.md` | blog | Guía o respuesta específica | Precio / costo | ¿Cuánto cuesta la instalación de internet en México? (2026) | 324 | 3 | thin |
| `blog/cuanto-cuesta-internet-en-mexico-2026.md` | blog | Guía o respuesta específica | Precio / costo | ¿Cuánto Cuesta Internet en México en 2026? Precios Reales por ISP | 1988 | 5 | — |
| `blog/cuanto-tarda-instalar-internet-mexico.md` | blog | Guía o respuesta específica | Precio / costo | ¿Cuánto tarda en instalarse el internet en México? (2026) | 272 | 2 | thin |
| `blog/cuantos-dispositivos-conectar-router-mexico.md` | blog | Guía o respuesta específica | Precio / costo | ¿Cuántos dispositivos puedo conectar a mi router? (Límites reales) | 195 | 1 | thin |
| `blog/cuantos-gb-necesitas-al-mes.md` | blog | Guía o respuesta específica | Precio / costo | Cuántos GB necesitas al mes en México (2026) | 2256 | 10 | — |
| `blog/cuantos-megas-necesito-para-netflix-4k.md` | blog | Guía o respuesta específica | Precio / costo | Cuántos megas necesito para Netflix 4K y HD en México (2026) | 1809 | 3 | — |
| `blog/datos-moviles-que-son-cuanto-consumes-2026.md` | blog | Guía o respuesta específica | Precio / costo | Datos móviles: qué son y cuánto consumes en México (2026) | 962 | 9 | — |
| `blog/diferencia-4g-lte-y-5g-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | 4G LTE vs 5G en México: diferencias reales y cuándo cambia (2026) | 1409 | 5 | — |
| `blog/diferencia-internet-residencial-empresarial-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet residencial vs empresarial en México: ¿cuál necesitas? (2026) | 205 | 1 | thin |
| `blog/diferencia-mbps-mbps-guia-facil-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Diferencia entre Mbps y MB: explicación fácil (México, 2026) | 1644 | 4 | — |
| `blog/dns-lento-mexico-cambiar.md` | blog | Guía o respuesta específica | Resolver / hacer | DNS lento en México: cómo cambiarlo y acelerar tu internet (2026) | 1280 | 2 | — |
| `blog/dns-que-es-como-cambiar-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | DNS: qué es y cómo cambiarlo para que tu internet abra más rápido | 1658 | 12 | — |
| `blog/dns-seguro-filtros-malware-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | DNS seguro y filtros de malware en México: guía 2026 | 2247 | 13 | — |
| `blog/fibra-optica-que-es-y-como-saber-si-tienes.md` | blog | Guía o respuesta específica | Resolver / hacer | Fibra óptica: qué es, ventajas y cómo saber si la tienes en casa | 1374 | 12 | — |
| `blog/fibra-optica-vs-cable-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Fibra óptica vs cable en México: diferencias reales y cuál conviene (2026) | 2380 | 19 | — |
| `blog/glosario-internet-telecomunicaciones.md` | blog | Guía o respuesta específica | Entender / investigar | Glosario de términos de internet y telecomunicaciones (México) | 1586 | 44 | — |
| `blog/indice-calidad-internet-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Índice de Calidad de Internet en México 2026: estudio con datos reales | 1255 | 7 | — |
| `blog/infinitum-vs-izzi-opiniones-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Infinitum vs izzi 2026: Opiniones Reales, Precios y Cuál Elegir | 1492 | 3 | — |
| `blog/instalar-internet-mi-mismo-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Puedo instalar internet yo mismo en México? (Guía 2026) | 1639 | 7 | — |
| `blog/internet-ai-6g-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet 6G y AMD Intel en México: lo que viene en 2026-2027 | 1592 | 8 | — |
| `blog/internet-barato-menos-300-mxnm-mexico.md` | blog | Guía o respuesta específica | Precio / costo | Internet barato en México: opciones por menos de $300 MXN (2026) | 1546 | 14 | — |
| `blog/internet-barato-mexico-2026.md` | blog | Guía o respuesta específica | Precio / costo | ¿Cuál es el Internet Más Barato en México? Guía Completa (Marzo 2026) | 3153 | 3 | — |
| `blog/internet-camaras-seguridad-videovigilancia.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para cámaras de seguridad: qué necesitas en México (2026) | 883 | 9 | — |
| `blog/internet-cancun-quintana-roo-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet en Cancún: mejor proveedor para zona hotelera y residencial (2026) | 1155 | 6 | — |
| `blog/internet-casa-inteligente-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para casa inteligente en México: lo que necesitas (2026) | 922 | 8 | — |
| `blog/internet-cfe-mexico-existe-2026.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Existe internet de CFE en México? Lo que necesitas saber (2026) | 1950 | 17 | — |
| `blog/internet-chihuahua-ciudad-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet en Chihuahua: proveedores y precios (2026) | 1104 | 5 | — |
| `blog/internet-con-telefono-incluido.md` | blog | Guía o respuesta específica | Entender / investigar | Planes de internet con teléfono incluido: ¿Vale la pena el paquete? | 1911 | 4 | — |
| `blog/internet-corta-llamadas-wifi-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Por qué el internet corta las llamadas WiFi y cómo solucionarlo | 1551 | 5 | — |
| `blog/internet-culiacan-sinaloa-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en Culiacán Sinaloa: proveedores y cobertura (2026) | 1153 | 6 | — |
| `blog/internet-en-cdmx-por-colonia-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en CDMX por zona: las mejores opciones por alcaldía (2026) | 1436 | 9 | — |
| `blog/internet-en-monterrey-mejores-opciones-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet en Monterrey: mejor proveedor por zona (2026) | 1417 | 9 | — |
| `blog/internet-fibra-optica-vs-cobre-guia-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet de Fibra Óptica vs Cobre: ¿Cuál Es Mejor en 2026? | 1347 | 1 | — |
| `blog/internet-gobierno-federal-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet gratuito del gobierno en México: programas 2026 | 1665 | 3 | — |
| `blog/internet-guadalajara-mejores-opciones-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en Guadalajara: mejores opciones (2026) | 1821 | 15 | — |
| `blog/internet-izzi-planes-precios-opiniones-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet Izzi en México: planes, precios y opiniones (2026) | 1827 | 15 | — |
| `blog/internet-lento-en-la-noche-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Internet Lento en la Noche: Por Qué Pasa y Cómo Solucionarlo | 1429 | 2 | — |
| `blog/internet-lento-en-la-noche-solucion.md` | blog | Guía o respuesta específica | Resolver / hacer | Guía completa: internet lento en la noche solución 2026 | 2326 | 9 | — |
| `blog/internet-lento-noche-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Por qué mi internet es lento en la noche (y cómo solucionarlo) | 1117 | 13 | — |
| `blog/internet-leon-guanajuato-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en León Guanajuato: proveedores y cobertura (2026) | 1206 | 5 | — |
| `blog/internet-mas-barato-en-mexico.md` | blog | Guía o respuesta específica | Precio / costo | Internet Más Barato en México: Guía 2026 | 3862 | 5 | — |
| `blog/internet-merida-yucatan-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet en Mérida Yucatán: opciones y precios (2026) | 1162 | 5 | — |
| `blog/internet-negocios-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para negocios en México: qué contratar (2026) | 961 | 9 | — |
| `blog/internet-para-airbnb-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Internet para Airbnb: qué plan necesitas como anfitrión (México 2026) | 1384 | 4 | — |
| `blog/internet-para-casas-inteligentes-en-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Guía completa: internet para casas inteligentes en México 2026 | 2909 | 6 | — |
| `blog/internet-para-clinica-consultorio-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para clínica o consultorio en México: qué necesitas (2026) | 1167 | 3 | — |
| `blog/internet-para-coworking-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para coworking en México: velocidad y redundancia (2026) | 1205 | 3 | — |
| `blog/internet-para-dispositivos-iot-casa-inteligente.md` | blog | Guía o respuesta específica | Precio / costo | Internet para casa inteligente: cuántos Mbps necesitan tus dispositivos IoT (2026) | 338 | 3 | thin |
| `blog/internet-para-escuela-colegio-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para escuela o colegio en México: conectividad educativa (2026) | 1203 | 5 | — |
| `blog/internet-para-estudiantes-universitarios-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para estudiantes universitarios en México: qué plan necesitas (2026) | 363 | 3 | thin |
| `blog/internet-para-eventos-congresos-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet temporal para eventos y congresos en México (2026) | 1279 | 2 | — |
| `blog/internet-para-familia-numerosa-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para familia numerosa: qué plan necesitas en México (2026) | 431 | 6 | thin |
| `blog/internet-para-gym-gimnasio-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para gimnasio en México: WiFi clientes y música streaming (2026) | 1183 | 4 | — |
| `blog/internet-para-hotel-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para hotel en México: WiFi huéspedes y sistema de gestión (2026) | 1190 | 3 | — |
| `blog/internet-para-jubilados-pensionados-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para jubilados y personas mayores en México: guía 2026 | 463 | 3 | thin |
| `blog/internet-para-negocio-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para negocio en México: planes empresariales y PyME (2026) | 1829 | 3 | — |
| `blog/internet-para-netflix-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para Netflix en México: qué velocidad necesitas (2026) | 929 | 9 | — |
| `blog/internet-para-oficina-en-casa-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para oficina en casa: qué plan necesitas según tu trabajo (2026) | 1456 | 10 | — |
| `blog/internet-para-personas-mayores.md` | blog | Guía o respuesta específica | Comparar y elegir | Guía Completa: Cómo elegir el mejor internet para personas mayores en México | 1800 | 4 | — |
| `blog/internet-para-restaurante-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para restaurante en México: TPV, WiFi clientes y streaming (2026) | 1219 | 3 | — |
| `blog/internet-para-streaming-twitch-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para hacer streaming en Twitch desde México: guía 2026 | 1709 | 5 | — |
| `blog/internet-para-tienda-retail-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para tienda o comercio en México: TPV y WiFi clientes (2026) | 1095 | 3 | — |
| `blog/internet-para-tiktok-y-redes-sociales.md` | blog | Guía o respuesta específica | Precio / costo | Internet para TikTok y redes sociales: cuántos Mbps necesitas | 1432 | 8 | — |
| `blog/internet-para-trabajadores-digitales-nomadas-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para nómadas digitales en México: guía completa 2026 | 177 | 5 | thin |
| `blog/internet-para-youtube-creadores-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para creadores de YouTube en México: subir videos y streaming (2026) | 1124 | 5 | — |
| `blog/internet-para-zoom-y-videollamadas-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para Zoom y videollamadas: qué velocidad necesitas en México (2026) | 1538 | 10 | — |
| `blog/internet-puebla-mejores-opciones-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en Puebla: mejores opciones por zona (2026) | 1330 | 5 | — |
| `blog/internet-queretaro-mejores-opciones-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet en Querétaro: mejor proveedor por zona (2026) | 1234 | 6 | — |
| `blog/internet-residencial-vs-datos-moviles.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet Residencial vs. Datos Móviles: Guía Completa para Elegir la Mejor Conectividad en tu Hogar | 2069 | 2 | — |
| `blog/internet-roku-fire-tv-stick-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para Roku y Fire TV Stick: qué necesitas en México (2026) | 840 | 10 | — |
| `blog/internet-satelital-vs-inalambrico-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet satelital vs inalámbrico fijo: cuál conviene en México | 1436 | 7 | — |
| `blog/internet-saturado-mexico-solucion.md` | blog | Guía o respuesta específica | Resolver / hacer | Internet saturado en México: por qué pasa y cómo solucionarlo | 1831 | 7 | — |
| `blog/internet-se-desconecta-solo-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Por qué internet se desconecta solo y cómo arreglarlo (México 2026) | 1408 | 4 | — |
| `blog/internet-sin-contrato-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Internet sin Contrato en México 2026: Opciones, Precios y Cómo Elegir | 1233 | 3 | — |
| `blog/internet-telcel-hogar-mexico-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet Telcel Hogar: planes, precios y cobertura (2026) | 869 | 11 | — |
| `blog/internet-telmex-infinitum-planes-precios-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet Telmex Infinitum: planes, precios y cobertura (2026) | 1694 | 16 | — |
| `blog/internet-tijuana-proveedores-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en Tijuana: proveedores y cobertura (2026) | 1245 | 4 | — |
| `blog/internet-toluca-estado-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet en Toluca y Estado de México: mejores opciones (2026) | 1175 | 5 | — |
| `blog/internet-totalplay-planes-precios-2026.md` | blog | Guía o respuesta específica | Precio / costo | Internet Totalplay: planes, precios y cobertura (2026) | 1645 | 18 | — |
| `blog/internet-trabajo-remoto-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para Trabajo Remoto en México: Lo Que Realmente Necesitas en 2026 | 1431 | 2 | — |
| `blog/internet-veracruz-puerto-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Internet en Veracruz: mejor proveedor y cobertura (2026) | 1300 | 5 | — |
| `blog/izzi-todo-lo-que-necesitas-saber.md` | blog | Guía o respuesta específica | Precio / costo | Izzi: planes, precios, cobertura y opiniones (2026) | 1649 | 9 | — |
| `blog/izzi-vs-totalplay-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | izzi vs Totalplay 2026: Comparativa Definitiva de Precios, Velocidad y Cobertura | 1195 | 3 | draft |
| `blog/izzi-vs-totalplay-telmex-megacable-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Izzi vs Totalplay vs Telmex vs Megacable: Comparativa 2026 (Con Datos Reales) | 1538 | 2 | — |
| `blog/izzi-vs-totalplay-vs-telmex-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Izzi vs Totalplay vs Telmex en 2026: cuál conviene según tu tipo de uso | 2515 | 2 | draft |
| `blog/medidor-internet-speedtest-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo medir tu internet correctamente: guía Speedtest México 2026 | 1905 | 7 | — |
| `blog/megacable-opiniones-precios-cobertura-2026.md` | blog | Guía o respuesta específica | Precio / costo | Megacable en México: opiniones, precios y cobertura (2026) | 1982 | 12 | — |
| `blog/megacable-vs-telmex-comparativa-directa-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Megacable vs Telmex: cuál conviene de verdad (2026) | 856 | 11 | — |
| `blog/megacable-vs-totalplay-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Megacable vs totalplay 2026: comparativa definitiva 2026 | 1986 | 8 | draft |
| `blog/megacable-vs-totalplay-comparativa-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Megacable vs Totalplay: cuál conviene en 2026 | 983 | 10 | — |
| `blog/mejor-cable-ethernet-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor cable Ethernet Cat6/Cat7 en México: cuál comprar y por qué | 1500 | 2 | — |
| `blog/mejor-esim-para-viajeros-mexicanos-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor eSIM para Viajeros Mexicanos: Guía Completa 2026 | 1496 | 1 | — |
| `blog/mejor-extensor-wifi-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor extensor WiFi en México: comparativa 2026 por precio y alcance | 1470 | 5 | — |
| `blog/mejor-internet-casa-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para casa en México (2026): guía real por ciudad, velocidad y presupuesto | 2349 | 4 | — |
| `blog/mejor-internet-clases-en-linea-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Internet para clases en línea en México: qué necesitas (2026) | 904 | 11 | — |
| `blog/mejor-internet-estudiantes-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Guía Completa: Cómo elegir el mejor internet para estudiantes en México | 1959 | 1 | — |
| `blog/mejor-internet-home-office-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para home office en México (2026): latencia, estabilidad y costo real | 2029 | 5 | — |
| `blog/mejor-internet-para-casa-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor Internet para Casa 2026: Guía Completa de Proveedores y Precios en México | 1013 | 2 | draft |
| `blog/mejor-internet-para-clases-en-linea.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para clases en línea (estabilidad primero) | 1060 | 18 | — |
| `blog/mejor-internet-para-estudiantes-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para estudiantes méxico: comparativa definitiva 2026 | 4105 | 6 | — |
| `blog/mejor-internet-para-familias-grandes-en-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Guía completa: mejor internet para familias grandes en México 2026 2026 | 2011 | 7 | — |
| `blog/mejor-internet-para-gaming-en-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para gaming en méxico: comparativa definitiva 2026 | 2634 | 6 | — |
| `blog/mejor-internet-para-trabajo-remoto-en-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor Internet para Trabajo Remoto en México 2026 | 3813 | 5 | — |
| `blog/mejor-internet-para-wfh-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor internet para trabajo desde casa (WFH): comparativa 2026 | 1476 | 11 | — |
| `blog/mejor-internet-rural-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Guía completa: mejor internet rural mexico 2026 2026 | 2282 | 8 | — |
| `blog/mejor-velocidad-para-gaming.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor velocidad para gaming (Mbps, ping y estabilidad) | 2266 | 18 | — |
| `blog/mejores-opciones-esim-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Mejores opciones eSIM en México 2026 (cómo elegir) | 2281 | 10 | — |
| `blog/mejores-routers-2026-mexico-guia.md` | blog | Guía o respuesta específica | Entender / investigar | Los Mejores Routers para Internet en México 2026 | 1564 | 1 | — |
| `blog/mejores-routers-wifi-6-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Guía completa: mejores routers wifi 6 mexico 2026 2026 | 2222 | 10 | — |
| `blog/mejores-routers-wifi-6e-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Guía completa: mejores routers WiFi 6E México 2026 2026 | 2052 | 7 | — |
| `blog/modem-parpadea-rojo-solucion-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | El módem parpadea en rojo: qué hacer (Guía México) | 2175 | 10 | — |
| `blog/modo-bridge-router-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Modo bridge del router: qué es y cuándo usarlo en México (2026) | 1518 | 4 | — |
| `blog/mudanza-cambiar-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Mudanza: cómo llevar tu internet a tu nueva casa en México | 1597 | 4 | — |
| `blog/paquetes-perdidos-internet-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Pérdida de paquetes (packet loss) en México: diagnóstico y solución | 1339 | 5 | — |
| `blog/pilar-internet-casa-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Guía definitiva: Internet para casa en México 2026 | 3182 | 74 | — |
| `blog/pilar-planes-moviles-datos-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Guía definitiva: Planes móviles y datos en México 2026 | 473 | 20 | thin |
| `blog/pilar-seguridad-red-hogar-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Seguridad de red en casa en México: guía pilar 2026 | 2279 | 19 | — |
| `blog/pilar-solucionar-problemas-internet-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Solucionar problemas de internet: guía maestra (México 2026) | 427 | 29 | thin |
| `blog/pilar-velocidad-internet-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Velocidad de internet en México: guía completa para entender y medir tus Mbps | 2946 | 67 | — |
| `blog/pilar-wifi-red-casa-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Guía completa: Red Wi-Fi y router para casa en México 2026 | 3196 | 70 | — |
| `blog/ping-alto-gaming-mexico-solucion.md` | blog | Guía o respuesta específica | Resolver / hacer | Ping alto en juegos online: cómo bajarlo en México (2026) | 1464 | 6 | — |
| `blog/por-que-el-internet-es-lento-a-veces.md` | blog | Guía o respuesta específica | Entender / investigar | Por qué el internet es lento a veces: causas y soluciones reales (2026) | 2303 | 13 | — |
| `blog/por-que-hay-lag-internet-rapido.md` | blog | Guía o respuesta específica | Entender / investigar | Por qué hay lag con internet rápido: causas reales y soluciones | 2322 | 15 | — |
| `blog/por-que-internet-esta-caro-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Por qué el internet está caro en México? (Explicación real 2026) | 271 | 2 | thin |
| `blog/por-que-internet-telmex-es-lento.md` | blog | Guía o respuesta específica | Resolver / hacer | Por qué Telmex/Infinitum es lento (y cómo acelerarlo) 2026 | 1551 | 7 | — |
| `blog/por-que-se-cae-wifi-casa-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Por qué se cae el WiFi en casa y cómo arreglarlo (2026) | 1093 | 15 | — |
| `blog/por-que-tus-datos-van-lentos-5g.md` | blog | Guía o respuesta específica | Entender / investigar | Por qué tus datos van lentos en 5G en México | 2265 | 9 | — |
| `blog/portabilidad-numeraria-mexico-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Portabilidad numérica en México: cómo cambiar sin perder tu número | 904 | 8 | — |
| `blog/powerline-adaptador-red-electrica-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Adaptador Powerline: usar el cable eléctrico como red (México) | 842 | 9 | — |
| `blog/proteger-red-casa-hackers-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo proteger tu red de casa de hackers en México: guía 2026 | 1534 | 5 | — |
| `blog/que-es-el-ancho-de-banda.md` | blog | Guía o respuesta específica | Entender / investigar | Qué es el ancho de banda y por qué se agota tu internet | 2037 | 13 | — |
| `blog/que-es-el-jitter-y-por-que-importa.md` | blog | Guía o respuesta específica | Entender / investigar | Qué es el jitter y por qué arruina tu internet (explicación fácil) | 1793 | 11 | — |
| `blog/que-es-el-ping.md` | blog | Guía o respuesta específica | Entender / investigar | Qué es el ping y por qué importa (latencia, jitter y juegos) | 2467 | 10 | — |
| `blog/que-es-internet-simetrico.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Qué es internet simétrico? La guía definitiva para mejorar tu conexión en casa | 1905 | 3 | — |
| `blog/que-es-una-esim.md` | blog | Guía o respuesta específica | Resolver / hacer | Qué es una eSIM y cómo saber si te conviene en México | 1842 | 8 | — |
| `blog/que-internet-falla-menos-en-mexico-ranking-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | ¿Qué Internet Falla Menos en México? Ranking 2026 | 3392 | 4 | — |
| `blog/que-pasa-si-no-pago-internet-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Qué pasa si no pago mi internet en México? (Consecuencias reales) | 251 | 2 | thin |
| `blog/que-significa-la-velocidad-de-internet.md` | blog | Guía o respuesta específica | Entender / investigar | Qué significa la velocidad de internet: Mbps, subida, bajada y latencia | 1191 | 12 | — |
| `blog/que-son-los-datos-moviles.md` | blog | Guía o respuesta específica | Resolver / hacer | Qué son los datos móviles (4G/5G) y cómo se consumen | 2284 | 12 | — |
| `blog/queja-profeco-internet-guia-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Cómo levantar una queja en PROFECO por mal internet en 2026 (paso a paso) | 1869 | 2 | — |
| `blog/red-estable-home-office-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Red estable para home office en México: guía completa (2026) | 2468 | 20 | — |
| `blog/red-invitados-iot-segura-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Red de invitados e IoT seguro en casa en Mexico | 2560 | 20 | — |
| `blog/router-gaming-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Mejor router gaming en México: comparativa 2026 para latencia mínima | 1478 | 6 | — |
| `blog/router-lento-reiniciar-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | Router lento o saturado: cuándo y cómo reiniciarlo correctamente (México) | 1391 | 5 | — |
| `blog/router-modem-integrado-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Router modem integrado en México: ¿Es suficiente para tu hogar o necesitas una actualización? | 1894 | 2 | — |
| `blog/router-vs-modem-diferencia-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | Router vs módem: cuál es la diferencia y para qué sirve cada uno | 1759 | 13 | — |
| `blog/seguridad-wifi-casa-como-proteger-2026.md` | blog | Guía o respuesta específica | Resolver / hacer | Seguridad WiFi en casa: cómo proteger tu red en México (2026) | 1953 | 13 | — |
| `blog/seguridad-wifi-casa-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Seguridad WiFi en casa en Mexico: guia completa | 2828 | 14 | — |
| `blog/starlink-mexico-precio-cobertura-2026.md` | blog | Guía o respuesta específica | Precio / costo | Starlink en México: precio, cobertura y ¿vale la pena? (2026) | 975 | 9 | — |
| `blog/streaming-sin-cortes-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Streaming sin cortes en México: guía real para evitar buffering (2026) | 2324 | 15 | — |
| `blog/switch-ethernet-casa-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Switch Ethernet para casa en México: cuándo necesitas uno y cuál comprar | 1543 | 4 | — |
| `blog/telcel-hogar-internet-fijo-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Telcel Hogar: internet fijo inalámbrico en México (2026) | 1831 | 5 | — |
| `blog/telmex-vs-megacable-2026-comparativa.md` | blog | Guía o respuesta específica | Comparar y elegir | Telmex vs Megacable 2026: ¿cuál conviene más? (comparativa) | 215 | 2 | thin |
| `blog/telmex-vs-totalplay-mexico-2026.md` | blog | Guía o respuesta específica | Comparar y elegir | Telmex vs Totalplay 2026: precio real, velocidad y cuál conviene más | 1727 | 3 | draft |
| `blog/totalplay-vs-izzi-2026-comparativa.md` | blog | Guía o respuesta específica | Comparar y elegir | Totalplay vs Izzi 2026: ¿cuál conviene más? (comparativa directa) | 336 | 4 | thin |
| `blog/velocidad-contratada-no-me-llega-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Por qué no me llega la velocidad contratada de internet en México | 906 | 12 | — |
| `blog/velocidad-de-subida-importancia.md` | blog | Guía o respuesta específica | Entender / investigar | ¿Tu internet se traba al hablar? Descubre la importancia de la velocidad de subida en tu hogar | 1946 | 3 | — |
| `blog/velocidad-necesaria-para-streaming-4k-en-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Guía completa: velocidad necesaria para streaming 4k en mexico 2026 | 2338 | 6 | — |
| `blog/velocidad-necesaria-videollamadas-mexico-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Velocidad de internet para videollamadas en México (Zoom, Meet, Teams) | 982 | 9 | — |
| `blog/vpn-gratis-mexico-mejores-2026.md` | blog | Guía o respuesta específica | Entender / investigar | Mejores VPN gratis para México 2026: seguridad y velocidad | 1338 | 3 | — |
| `blog/vpn-pagada-vs-gratis-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | VPN pagada vs gratis en México: cuál conviene realmente (2026) | 1430 | 2 | — |
| `blog/wifi-5-vs-wifi-6-vale-cambiar-mexico.md` | blog | Guía o respuesta específica | Comparar y elegir | WiFi 5 vs WiFi 6: ¿vale la pena cambiar de router? (2026) | 840 | 9 | — |
| `blog/wifi-7-mexico-disponibilidad-2026.md` | blog | Guía o respuesta específica | Entender / investigar | WiFi 7 en México: disponibilidad, routers compatibles y si vale la pena (2026) | 1415 | 3 | — |
| `blog/wifi-mesh-para-casas-grandes-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | Wi‑Fi Mesh para casas grandes en México: guía real (2026) | 2501 | 9 | — |
| `blog/wifi-no-funciona-solucion-mexico.md` | blog | Guía o respuesta específica | Entender / investigar | El WiFi no funciona: soluciones paso a paso (México 2026) | 1731 | 11 | — |
| `blog/wifi-se-desconecta-y-reconecta-mexico.md` | blog | Guía o respuesta específica | Resolver / hacer | WiFi se desconecta y se reconecta solo: causas y solución (México 2026) | 1203 | 4 | — |
| `blog/wifi-vs-ethernet-para-jugar.md` | blog | Guía o respuesta específica | Comparar y elegir | Wi‑Fi vs Ethernet para jugar: cuál conviene en México | 2245 | 12 | — |
| `buscar.md` | root | Página institucional o de navegación | Entender / investigar | Buscar | 0 | 0 | — |
| `ciudades/_index.md` | ciudades | Índice geográfico | Disponibilidad local | Ciudades: cobertura y opciones por zona en México | 632 | 12 | sin meta |
| `cobertura/_index.md` | cobertura | Guía de cobertura por ciudad | Disponibilidad local | Cobertura por ciudad | 2050 | 7 | sin meta |
| `cobertura/cdmx/mejor-internet-cdmx.md` | cobertura/cdmx | Guía de cobertura por ciudad | Comparar y elegir | Mejor internet en CDMX: cómo elegir por zona (2026) | 2631 | 20 | — |
| `cobertura/guadalajara/_index.md` | cobertura/guadalajara | Guía de cobertura por ciudad | Disponibilidad local | Internet en Guadalajara: qué conviene por zona (2026) | 2193 | 11 | — |
| `cobertura/monterrey/_index.md` | cobertura/monterrey | Guía de cobertura por ciudad | Disponibilidad local | Internet en Monterrey: qué conviene por zona (2026) | 2414 | 14 | — |
| `cobertura/puebla/_index.md` | cobertura/puebla | Guía de cobertura por ciudad | Disponibilidad local | Internet en Puebla: qué conviene por zona (2026) | 2076 | 5 | sin meta |
| `cobertura/queretaro/_index.md` | cobertura/queretaro | Guía de cobertura por ciudad | Disponibilidad local | Internet en Querétaro: qué conviene por zona (2026) | 2098 | 5 | sin meta |
| `contact.md` | root | Página institucional o de navegación | Entender / investigar | Contacto | 153 | 2 | — |
| `contacto.md` | root | Página institucional o de navegación | Entender / investigar | Contacto | 47 | 0 | — |
| `corrections.md` | root | Página institucional o de navegación | Entender / investigar | Política de correcciones | 74 | 0 | — |
| `editorial-policy.md` | root | Página institucional o de navegación | Entender / investigar | Política editorial | 64 | 1 | — |
| `esim/_index.md` | esim | Guía de eSIM | Comparar y elegir | eSIM en México: guías y comparativas | 593 | 10 | sin meta |
| `esim/mejor-esim-mexico.md` | esim | Guía de eSIM | Comparar y elegir | Mejor eSIM en México: cómo elegir la que sí funciona (2026) | 969 | 10 | sin meta |
| `esim-viajeros/_index.md` | esim-viajeros | Conectividad para viajeros | Elegir conectividad móvil | eSIM y conectividad para viajar | 491 | 7 | sin meta |
| `esim-viajeros/mejor-esim-para-mexico.md` | esim-viajeros | Conectividad para viajeros | Comparar y elegir | Mejor eSIM para México: cómo elegir sin pagar de más (2026) | 901 | 9 | sin meta |
| `guias/_index.md` | guias | Guía fundamental | Entender / investigar | Guías de conectividad y datos | 576 | 14 | sin meta |
| `guias/como-medir-velocidad-real-internet.md` | guias | Guía fundamental | Resolver / hacer | Cómo medir la velocidad real de tu internet (sin engañarte) | 897 | 10 | sin meta |
| `guias/cuantos-mbps-necesito.md` | guias | Guía fundamental | Precio / costo | ¿Cuántos Mbps necesito? (guía fácil en México, 2025) | 988 | 13 | sin meta |
| `guias/diferencia-mbps-vs-mb.md` | guias | Guía fundamental | Entender / investigar | Diferencia entre Mbps y MB: explicación fácil (México, 2026) | 976 | 9 | sin meta |
| `guias/que-hacer-si-internet-lento.md` | guias | Guía fundamental | Resolver / hacer | Qué hacer si tu internet está lento: checklist sin pánico | 1168 | 11 | sin meta |
| `herramientas/_index.md` | herramientas | Herramienta práctica | Herramienta / cálculo | Herramientas | 32 | 1 | — |
| `herramientas/calculadora-velocidad-internet.md` | herramientas | Herramienta práctica | Herramienta / cálculo | Calculadora de Velocidad de Internet | 721 | 5 | — |
| `internet-en-casa/_index.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet en casa en México | 818 | 27 | sin meta |
| `internet-en-casa/celulares-compatibles-con-esim-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Celulares compatibles con eSIM en México: cómo comprobarlo antes de contratar | 1161 | 5 | sin meta |
| `internet-en-casa/como-activar-esim-en-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Cómo activar una eSIM en México: pasos seguros y qué revisar antes | 1082 | 7 | sin meta |
| `internet-en-casa/como-cambiar-proveedor-internet-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Cómo [cambiar de proveedor](/blog/cambiar-de-proveedor-de-internet-sin-cortes.html) de internet en México sin sufrir (2026) | 1063 | 8 | sin meta |
| `internet-en-casa/como-elegir-router-wifi-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Cómo elegir router Wi-Fi para tu casa (México, 2026) | 1080 | 10 | sin meta |
| `internet-en-casa/como-mejorar-wifi-casa-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Cómo mejorar el Wi-Fi en casa (México): pasos que sí funcionan | 1249 | 11 | sin meta |
| `internet-en-casa/companias-internet-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Compañías de internet en México: cómo comparar sin caer en trampas | 919 | 10 | sin meta |
| `internet-en-casa/fibra-vs-coaxial-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Fibra vs coaxial en México: diferencias y cuál conviene (2026) | 959 | 8 | sin meta |
| `internet-en-casa/fibra-vs-inalambrico-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Fibra óptica vs internet inalámbrico en México: cuál conviene | 1026 | 10 | sin meta |
| `internet-en-casa/instalacion-internet-en-casa-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Instalación de internet en casa en México: qué esperar (2026) | 1063 | 10 | sin meta |
| `internet-en-casa/internet-barato-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Internet barato en México: cómo ahorrar sin comprar un problema | 1090 | 9 | sin meta |
| `internet-en-casa/internet-inalambrico-fijo-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet inalámbrico fijo en México (4G/5G): guía 2026 | 1199 | 10 | sin meta |
| `internet-en-casa/internet-para-estudiantes-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet para estudiantes en México: qué conviene (2026) | 915 | 7 | sin meta |
| `internet-en-casa/internet-para-home-office-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet para home office en México: qué contratar (2026) | 919 | 10 | sin meta |
| `internet-en-casa/internet-para-jugar-online-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet para jugar online en México: qué importa de verdad (2026) | 1242 | 11 | sin meta |
| `internet-en-casa/internet-para-streaming-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Precio / costo | Internet para streaming en México: [cuántos Mbps necesitas](/blog/cuanta-velocidad-internet-necesitas-2026.html) de verdad (2026) | 1174 | 11 | sin meta |
| `internet-en-casa/internet-satelital-rural-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet satelital y opciones rurales en Mexico: guia 2025 | 2821 | 22 | sin meta |
| `internet-en-casa/internet-sin-contrato-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Internet sin contrato en México: qué conviene y qué revisar | 916 | 7 | sin meta |
| `internet-en-casa/izzi-vs-totalplay-2026-comparativa.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Izzi vs Totalplay 2026: Comparativa Completa de Precios, Velocidad y Contratos | 3078 | 13 | draft |
| `internet-en-casa/megacable-vs-telmex-comparativa.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Megacable vs Telmex: cómo comparar internet en tu domicilio | 1104 | 10 | draft |
| `internet-en-casa/mejor-internet-en-casa-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Mejor internet en casa en México (guía 2025) | 1139 | 12 | draft |
| `internet-en-casa/mejor-internet-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Mejor internet en México: cómo elegir el que sí te conviene (2026) | 985 | 15 | sin meta |
| `internet-en-casa/mejor-repetidor-wifi-mexico-2026.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Mejor repetidor WiFi calidad precio en México (2026) | 1170 | 11 | sin meta |
| `internet-en-casa/mejor-router-wifi-casa-mexico-2026.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Mejor router WiFi para casa en México (2026): cuál comprar | 922 | 8 | sin meta |
| `internet-en-casa/red-domestica-ethernet-qos-wifi-6.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Red domestica pro: cableado, switches, QoS y Wi-Fi 6 | 2504 | 16 | sin meta |
| `internet-en-casa/starlink-vs-fibra-optica-mexico-2026.md` | internet-en-casa | Decisión o solución para internet doméstico | Comparar y elegir | Starlink vs Fibra Óptica en México 2026: ¿Cuál Conviene Más? | 2654 | 13 | sin meta |
| `internet-en-casa/test-velocidad-internet-mexico.md` | internet-en-casa | Decisión o solución para internet doméstico | Resolver / hacer | Velocidad de internet: cómo medirla bien y qué significan los resultados | 998 | 12 | sin meta |
| `internet-en-casa/wifi-mesh-cobertura-total.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | Wi-Fi Mesh en casa: cobertura total sin zonas muertas | 2605 | 19 | sin meta |
| `internet-en-casa/wifi-mesh-mexico-vale-pena-2026.md` | internet-en-casa | Decisión o solución para internet doméstico | Entender / investigar | WiFi mesh en México: ¿vale la pena? (2026) | 1012 | 7 | sin meta |
| `metodologia.md` | root | Página institucional o de navegación | Entender / investigar | Metodología | 130 | 0 | — |
| `planes-internet/_index.md` | planes-internet | Comparativa de planes de internet | Comparar y elegir | Planes de internet y comparativas en México | 692 | 16 | sin meta |
| `planes-internet/internet-barato-mexico-opciones-reales.md` | planes-internet | Comparativa de planes de internet | Precio / costo | Internet barato en México: opciones reales sin trampas (2026) | 2343 | 15 | sin meta |
| `planes-internet/plan-internet-casa-segun-personas-mexico.md` | planes-internet | Comparativa de planes de internet | Entender / investigar | Qué plan de internet necesito en casa según cuántas personas somos (2026) | 2291 | 21 | sin meta |
| `planes-internet/telmex-vs-izzi-vs-totalplay-mexico.md` | planes-internet | Comparativa de planes de internet | Comparar y elegir | Telmex vs Izzi vs Totalplay: cuál conviene según tu uso real (2026) | 2786 | 31 | — |
| `planes-moviles/_index.md` | planes-moviles | Comparativa de conectividad móvil | Elegir conectividad móvil | Planes móviles en México | 823 | 13 | — |
| `planes-moviles/mejores-planes-mexico.md` | planes-moviles | Comparativa de conectividad móvil | Resolver / hacer | Mejores planes móviles en México: cómo elegir (2026) | 1258 | 9 | sin meta |
| `planes-moviles/mejores-planes-prepago-mexico.md` | planes-moviles | Comparativa de conectividad móvil | Resolver / hacer | Mejores planes prepago en México: cómo elegir (2026) | 971 | 10 | sin meta |
| `planes-moviles/telcel-vs-att-vs-movistar.md` | planes-moviles | Comparativa de conectividad móvil | Comparar y elegir | Telcel vs AT&amp;T vs Movistar: ¿cuál conviene en México? (2026) | 3005 | 18 | sin meta |
| `privacy.md` | root | Página institucional o de navegación | Entender / investigar | Privacidad | 165 | 2 | — |
| `transparencia.md` | root | Página institucional o de navegación | Entender / investigar | Transparencia | 80 | 0 | — |

## Backlog priorizado siguiente

1. Verificar en producción los tres 301 después de CI y medir rutas recuperadas al contar con Rybbit vigente.
2. Corregir imágenes/rutas ausentes de los siguientes landing pages con tráfico probado, sin inventar imágenes ni repetir la misma pieza visual.
3. Atender contenido delgado con intención distinta, empezando por páginas con 300–700 palabras y no por institucionales.
4. Resolver las 46 metas ausentes, priorizando páginas indexables con tráfico o cluster estratégico.
5. Auditar las 10 rutas locales ausentes: crear contenido sólo si la intención corresponde al sitio; de lo contrario, enlazar al recurso existente o retirar el enlace.
