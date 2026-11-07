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
