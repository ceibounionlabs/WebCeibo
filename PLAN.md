# Plan de implementación unificado

Une lo que quedaba pendiente de [`BRIEF.md`](./BRIEF.md) (Fases 2 y 3) con [`CAMBIOS-v2.md`](./CAMBIOS-v2.md).
Cuando algo choca, manda `CAMBIOS-v2.md`.

## Qué reemplaza a qué

| Del brief | Queda | Motivo |
|---|---|---|
| 5.4 Tarjetas horizontales pineadas | Reemplazado por **B3** (tarjetas que se expanden) | CAMBIOS-v2: sin secuestro del scroll |
| 5.2 Manifiesto enfocándose palabra por palabra | Reemplazado por **B1** (tres enunciados pineados) | CAMBIOS-v2 |
| 5.7 Intro de carga | Reemplazado por **A7** (loader con anillo y cortina) | CAMBIOS-v2 |
| 5.7 Header que se oculta | Absorbido por **A1** | CAMBIOS-v2 |
| 5.2 Títulos que se enfocan | Se mantiene | No choca |
| 5.3 Lente 3D + lupa DOM + chips de índice | Se mantiene | No choca |
| 5.5 Árbol que crece | Se mantiene (+ **B2** en mobile) | No choca |
| 5.6 Marquesina por velocidad | Se mantiene, dentro de **B6** | No choca |
| 5.7 Botones magnéticos | Se mantiene | Convive con **B4** |
| 5.8 Modo stand, QR, favicon PNG, OG, formulario | Se mantiene (Fase 3) | No choca |

Quedan fuera hasta tener contenido: **B9** (faltan las respuestas) y **B10** (faltan las fotos).

## Orden

Estado: **todo implementado**, salvo B9 y B10 (falta contenido). Cada bloque tiene su commit.

1. **Fundamentos** — tokens de C (eyebrows, numeración, radios, botones ↗, aire), eases `lente` y `cortina`, motor de animación por módulos, títulos que se enfocan (5.2).
2. **Navegación (A)** — header en píldoras de vidrio con tema por sección (A1), lupita (A2), progreso (A3), anclas (A5), menú diafragma (A4), CTA flotante (A6), loader + entrada del hero (A7).
3. **Hero** — lente 3D con carga diferida, lupa DOM de respaldo y chips de índice (5.3).
4. **Nosotros** — tres enunciados pineados con contador (B1).
5. **Qué hacemos** — tarjetas que se expanden / acordeón (B3), "Ver más +" que sigue al cursor (B4), zoom al detalle con Flip y URL propia (B3b).
6. **Lo que resolvemos** — grilla con linterna (B5).
7. **Cómo trabajamos** — árbol que crece pineado (5.5) y profundidad de campo en mobile (B2).
8. **Hacia dónde vamos** — sección roja que se abre (B6) y marquesina por velocidad (5.6).
9. **Cierre** — footer con hojas (B8), bordes redondeados entre secciones (B7), botones magnéticos (5.7).
10. **Feria (Fase 3)** — modo stand con QR (5.8), favicon PNG, apple-touch-icon, imagen OG, formulario listo para Formspree.
11. **QA** — 360 / 390 / 768 / 1024 / 1440 px, teclado, `prefers-reduced-motion`, sin JS, Lighthouse mobile ≥ 90.

## Decisiones tomadas

- **Rendimiento primero.** GSAP y sus plugins viven en un motor que se carga después de hidratar. La lente 3D se carga aparte: en desktop cuando el navegador está libre; en mobile arranca con la lupa DOM y pasa al 3D con la primera interacción.
- **Loader en CSS puro** (A7): corre antes de que llegue el JS y dura menos de 2 s. El `h1` queda pintado debajo y solo se mueve, no se desvanece, para no castigar el LCP.
- **Distorsión del vidrio** (A1) solo en Chromium de escritorio: en Android también es Chromium, pero es el dispositivo más justo.
- **B2 en mobile** solo en los pasos del proceso: las tarjetas de servicios son un acordeón (B3).
- **B5:** el escalonado de 0.6 s se reparte entre las 9 celdas, en orden aleatorio.
- **Borradores** (enunciados de B1, detalles de B3b, ítems de B5): se usan tal cual y quedan marcados como [CONFIRMAR] en `lib/content.ts`.

## Pendiente

- Datos [CONFIRMAR] y borradores a revisar: ver la sección "Pendientes de ustedes" del README.
- QA en dispositivos reales: iPhone (Safari) y Android (Chrome), también con 4G lento. En este
  entorno solo se pudo probar con Chromium (escritorio y emulación de celular).
- Elegir el color de las hojas del footer (`LEAF_TONE` en components/Footer.tsx).

## Ronda de ajustes (feedback del equipo)

- **Paleta:** rojo ceibo `#CE313D`; sin fondos negros. El hero pasa a rojo, "Lo que resolvemos" y "Hablemos" a fondo claro, y el footer y "Cómo trabajamos" a un vino oscuro derivado del rojo (el de la referencia).
- **Sin volantas** (`— QUÉ HACEMOS`) en ninguna sección.
- **Hero:** sin botones ni chips de índice; título, bajada y la lente.
- **Nosotros:** sin pin ni contador; los tres enunciados en una fila.
- **Qué hacemos:** nueva propuesta, lista editorial (número, título, texto, flecha); cada fila abre el detalle con el zoom.
- **Cómo trabajamos:** formato de la referencia, cuatro etapas visibles de entrada (semilla, brote, árbol chico, ceibo con glow) sobre una línea de suelo; brotan en orden la primera vez, sin pin.
- **Hacia dónde vamos:** franja roja simple, sin marquesina ni apertura.
- **Footer:** sin el CTA repetido (Hablemos queda justo arriba).
- Se quitaron: tarjetas que se expandían y "Ver más +" que seguía al cursor (B3, B4), enunciados pineados (B1), sección que se abría y marquesina (B6, 5.6), chips de índice.

## Segunda ronda de ajustes

- Sin barra de progreso de lectura (A3) ni indicador "Deslizá".
- Header siempre visible (ya no se oculta al bajar).
- Hero con el estilo de "Cómo trabajamos": fondo vino con glow rojo, título blanco y el acento en rojo que brilla. El loader también pasa a vino, con el isotipo rojo que se enfoca y brilla.
- Sin botones magnéticos (5.7).

## Tercera ronda de ajustes

- Fuera todas las animaciones de aparición y las que cambian con el scroll: reveals, títulos que se enfocan, plantas que brotan, entrada del hero y del header, linterna de la grilla, hojas del footer que suben y se mecen, links del menú desenfocados. También el loader de primera visita (A7).
- Quedan las interacciones (lente, menú diafragma, zoom de servicios, lupita, hovers) y el scroll suave.
- Fondo oscuro: de vino con glow a marrón corteza `#2B1E19` plano. El acento del hero en rojo liso. El único brillo que queda es el del ceibo florecido en "Cómo trabajamos".

## "¿Se te cayó una idea?"

- La franja roja suma el ceibo en blanco. La hoja de la punta se suelta al llegar al centro de la pantalla y cae hasta Contacto a la velocidad del scroll (queda fija en el centro: el foco está en la hoja), meciéndose y creciendo; al cruzar al blanco pasa a rojo y aterriza sobre el título nuevo, "¿Se te cayó una idea? Contactanos.".
- Es la única animación ligada al scroll. Sin JS o con reduced motion, la hoja ya está en Contacto. GSAP se carga recién cuando la sección roja se acerca.
- Ahora caen cuatro hojas (hoja-1, la "idea", más hoja-3, hoja-5 y hoja-6), cada una a su altura de pantalla y con su propio vaivén, así caen desparramadas y en momentos distintos. Todas aterrizan, como tarde, cuando Contacto queda entero a la vista, repartidas por la sección. El color cambia según dónde está cada hoja respecto del borde rojo/blanco.
- Ajuste: las hojas que esperan en el árbol ahora calzan exacto (el ángulo de reposo lo lleva un contenedor que GSAP no toca) y el árbol original se cambia por las animadas recién cuando están listas, sin parpadeo. El vuelo es más largo y libre: cada hoja se suelta recién cuando se vio el árbol entero, baja despacio por la pantalla mientras serpentea, sube y baja, gira y aletea en 3D, y aterriza en Contacto. La franja roja suma un tramo libre debajo del árbol (solo con la animación activa) para que tengan aire. Los parámetros de cada hoja están en `FALL`, en `components/SeedFall.tsx`.

## Textos con la historia real

- **Origen:** Ceibo nació como el área de I+D de Laboratorio Elena y se nombra en la web. El hero, Nosotros y la descripción del sitio cuentan eso. Ceibo es la marca del software; Elena, la del laboratorio.
- **Producto:** "Qué hacemos" pasa a ser: 1) Sistema para ópticas (sin nombre por ahora; funciona con cualquier laboratorio), 2) Conectado con Laboratorio Elena (precios en tiempo real, pedidos que entran solos al sistema, seguimiento vinculado a la venta y link de seguimiento para el cliente final), 3) Automatización y datos, 4) Software a medida. Los dos primeros ofrecen "Pedir una demo" por WhatsApp.
- **Afuera, por ahora:** sistemas para otros laboratorios, la sección de equipo (B10) y contenido sobre la feria. También se sacó "a punto de recibirnos" y la IA como argumento de venta.

## Una sola idea: el ceibo

- Todo el sitio cuenta lo mismo: Ceibo es un árbol con **raíces** en el rubro óptico (nació en Laboratorio Elena), un **tronco** que es la unión del equipo y **ramas**, que son el software que hacen. Hacen software de todo tipo y el rubro óptico es su especialidad, dicho sin forzarlo ("para todo lo que venga", "cualquier negocio que quiera crecer" quedaron afuera).
- Hero: "Software con precisión de laboratorio." La bajada cuenta el origen (Laboratorio Elena, "donde un cuarto de dioptría hace la diferencia") y dice una sola vez que hacen software de todo tipo con especialidad en el rubro óptico. Ramas cuenta lo que fueron construyendo, para no repetir el hero.
- Nosotros: la idea en una frase y sus tres partes (Raíces, Tronco, Ramas) contadas como la historia del equipo. Sin la frase suelta sobre el ceibo como planta.
- Qué hacemos, Cómo trabajamos, la franja roja y el footer siguen la misma idea.
- Se sacó "Lo que resolvemos" (la grilla de cuadrados).

## Quiénes somos y Qué hacemos, de nuevo

- **Quiénes somos:** el nombre en grande ("ceibo / union / labs", con "union" en rojo) y, al lado, una carta corta firmada: "Somos tres amigos y hacemos software." Reemplaza Raíces / Tronco / Ramas.
- **Qué hacemos:** "¿Te suena alguna?": frases típicas de una óptica y qué hacen con cada una (sistema para ópticas, conexión con Laboratorio Elena, automatización, software a medida). Cierra con "Pedir una demo" y "Contanos la tuya".
- Se sacó la lista de servicios con el zoom al detalle (B3b) y todo su código (GSAP Flip, estados del diálogo).
