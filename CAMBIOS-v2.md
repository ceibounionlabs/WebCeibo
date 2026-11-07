# Ceibo Union Labs · Cambios v2: navegación y diseño

> **Cómo usar este archivo.** Copialo a la raíz del proyecto, al lado de `BRIEF.md`, y en Claude Code pegá:
>
> ```
> Leé CAMBIOS-v2.md completo. Empezá por el Paso 0 (auditoría): revisá cómo está
> hoy la demo y armame la tabla que pide. No cambies código hasta que te dé el OK.
> Después avanzá por bloques (A, B, C), levantando el sitio y revisándolo en
> 1440px y 375px al terminar cada bloque.
> ```
>
> Este documento **complementa** a `BRIEF.md`; no lo reemplaza. Si algo choca, manda este. Los datos marcados con **[CONFIRMAR]** los completamos nosotros: no hay que inventarlos.

---

## Paso 0: auditoría (antes de tocar nada)

1. Recorré la demo actual y listá sus secciones, la navegación y los efectos que ya están implementados.
2. Armá una tabla con cada cambio de este documento (A1, A2, …) y marcá uno de estos estados: **ya existe**, **existe pero hay que cambiarlo** o **nuevo**.
3. Señalá lo que hoy funciona bien y no conviene tocar. Por ejemplo: la lente del hero y el árbol que crece, si ya están.
4. Proponé un orden de trabajo y esperá el OK.

---

## De dónde salen estas ideas

La referencia es la web de **Klimt Creations**, un estudio de diseño para deep tech. De ella tomamos **patrones de navegación y de movimiento**, no su diseño. Lo que nos sirve:

- Header flotante en "píldoras" de vidrio con distorsión (estilo *liquid glass*).
- Loader con un anillo de progreso, seguido de una cortina que sube.
- Enunciados pineados con un contador `01 / 03` y una línea de progreso.
- Tarjetas que entran y salen de foco con el scroll, como profundidad de campo.
- Tarjetas que se expanden al hover, con un número grande que sube.
- Grilla con bordes que se iluminan cerca del cursor.
- Un botón que sigue al cursor dentro de cada tarjeta.
- Un bloque que se "abre" a pantalla completa al scrollear.
- Footer oscuro con formas grandes del logo recortadas en el borde inferior.

**Lo que NO tomamos de la referencia:** el sonido, las métricas, los logos de clientes, los testimonios, el violeta y el video controlado por scroll. Tampoco el sello de Webflow.

---

## Tokens de movimiento nuevos (`lib/motion.ts`)

Se suman a los que ya define el brief; los existentes no se tocan.

```ts
gsap.registerPlugin(CustomEase);
// UI: nav, tarjetas, menú. Arranca rápido y frena largo.
CustomEase.create('lente', 'M0,0 C0.17,0.84 0.44,1 1,1');
// Cortinas y aperturas grandes.
CustomEase.create('cortina', 'M0,0 C0.05,0.55 0.15,1 1,1');
// En CSS, 'lente' equivale a cubic-bezier(0.17, 0.84, 0.44, 1).
```

Los reveals siguen con `power4.out`, como dice el brief.

---

## Bloque A: Navegación (prioridad alta)

### A1. Header "lente flotante"

**Qué es.** El header deja de ser una barra y pasa a ser **tres píldoras flotantes de vidrio**, con 16–24px de margen superior:

1. **Logo:** isotipo y wordmark.
2. **Links:** Nosotros · Qué hacemos · Cómo trabajamos.
3. **CTA:** "Hablemos ↗" en rojo `#C22640`.

**Por qué.** Es la pieza que más se ve de toda la web, y el vidrio es nuestro material: somos del rubro óptico.

**Cómo:**

- **Vidrio base (todos los navegadores):**
  - `backdrop-filter: blur(18px) saturate(140%)`.
  - Fondo `rgba(255,255,255,.10)` sobre secciones oscuras o rojas, y `rgba(20,17,19,.06)` sobre secciones claras.
  - `border-radius: 9999px`.
  - Brillo interno, igual al de la referencia: `box-shadow: inset -1px -1px 1px -.3px rgba(255,255,255,.3), inset 2px 2px 1px -1.3px rgba(255,255,255,.3);`
- **Distorsión de lente (solo Chromium):** una capa absoluta detrás del contenido de cada píldora, con `filter: url(#lente-distorsion)` y `backdrop-filter: blur(3px)`. El SVG va oculto una sola vez en el layout:

  ```html
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="lente-distorsion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="1" seed="5" result="ruido"/>
      <feComponentTransfer in="ruido" result="mapa">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5"/>
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0"/>
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5"/>
      </feComponentTransfer>
      <feGaussianBlur in="mapa" stdDeviation="3" result="mapaSuave"/>
      <feDisplacementMap in="SourceGraphic" in2="mapaSuave" scale="60" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </svg>
  ```

  Safari y Firefox no soportan esta distorsión. Ahí la capa con el filtro **no se aplica** y queda solo el blur: hay que detectarlo y agregar una clase `.glass-distort` únicamente en Chromium. **Verificar en un iPhone que el header se vea bien sin la distorsión**, porque en la feria va a haber muchos iPhone.
- **Color según la sección:**
  - Cada `<section>` lleva `data-header="light" | "dark" | "red"`.
  - Un IntersectionObserver ubicado a la altura del header (`rootMargin: '-40px 0px -95% 0px'`) cambia el tema: texto `--ink` sobre secciones claras y blanco sobre oscuras o rojas.
  - Transición de 300 ms.
  - Sobre la sección roja, el CTA pasa a blanco con texto rojo.
- **Comportamiento:**
  - Se esconde al bajar (después de 120px) con `yPercent: -130` y reaparece al subir, ambas con 0.6 s `lente`.
  - Siempre está visible arriba de todo y cuando el menú está abierto.
- **Entrada:** después del loader (A7) cae desde `y: -20%`, `opacity: 0`, en 1.5 s `power3.out`.

### A2. Indicador de sección activa ("la lupita")

- Una píldora de fondo (blanca al 14% o roja al 10%, según el tema) se **desliza y cambia de ancho** para quedar detrás del link de la sección que se está viendo, en 0.5 s `lente`. Es como una lente que se mueve sobre el menú.
- La sección activa se detecta con un ScrollTrigger por sección (`onToggle`).
- Al hacer hover sobre otro link, la lupita se mueve a ese link como vista previa, y vuelve al soltar.
- El link activo lleva `aria-current="true"`.

### A3. Progreso de lectura

- Una línea de 2px en el borde superior del viewport, color `#C22640`, que crece con `scaleX` desde la izquierda según el progreso total del scroll.
- No se muestra en `?stand=1`.

### A4. Menú mobile "diafragma"

**Qué es.** El menú se abre como el **diafragma de una cámara**: un círculo rojo que se expande desde el botón hasta cubrir la pantalla.

- **Botón:** dos líneas que se transforman en ×.
- **Apertura:** overlay `#C22640` a pantalla completa, con `clip-path: circle(0% at X Y)` → `circle(150% at X Y)`, donde X Y es el centro del botón. 0.7 s `lente`.
- **Links:**
  - Grandes (40–48px), en blanco y numerados: `01 Nosotros`, `02 Qué hacemos`, `03 Cómo trabajamos`, `04 Hablemos`.
  - Entran desenfocados: `blur(8px)` → `0`, `y: 30` → `0`, con un stagger de 0.06 s.
- **Abajo:** botones de WhatsApp y mail **[CONFIRMAR datos]** y el wordmark chico.
- **Cierre:** la misma animación en reversa, más rápida (0.45 s).
- **Accesibilidad:**
  - Mientras está abierto: `lenis.stop()`, Esc lo cierra y el foco queda atrapado dentro del menú.
  - Al cerrar, el foco vuelve al botón.
  - El botón lleva `aria-expanded` y `aria-controls`.
- **Al tocar un link:** primero se cierra el menú y después hace scroll a la sección (A5).

### A5. Anclas suaves y accesibles

- Scroll con `lenis.scrollTo(target, { offset: -alturaHeader, duration: 1.4 })`.
- El hash se actualiza con `history.replaceState`.
- Al llegar, el foco pasa al título de la sección (`tabindex="-1"`).
- Con `prefers-reduced-motion`, el salto es inmediato.

### A6. CTA flotante en mobile

En la feria, la gente entra desde el celular y lo más útil es poder escribirnos en un toque.

- Una píldora fija abajo y centrada: **"Hablemos por WhatsApp"** **[CONFIRMAR número]**. Respeta `env(safe-area-inset-bottom)`.
- Aparece cuando el hero sale de pantalla (`yPercent: 100` → `0`).
- Se esconde cuando están visibles la sección Hablemos o el footer, y mientras el menú está abierto.
- No se muestra en desktop.

### A7. Loader de primera visita (reemplaza el intro del brief)

1. Pantalla `--ink` con el isotipo al centro, en `blur(12px)`.
2. Alrededor, un anillo SVG fino (stroke blanco al 30%) se completa de 0 a 100% en unos 1.2 s (`stroke-dashoffset`). A la par, el isotipo **se enfoca hasta quedar nítido**: "graduando el enfoque".
3. La cortina sube (`yPercent: -100`, 1.1 s `cortina`) y deja ver el hero.
4. Cae el nav (A1) y los textos del hero entran escalonados (`y: 20`, `opacity: 0`, 1.4 s `power3.out`, stagger 0.2 s).

**Reglas:**

- No puede durar más de 2 s en total.
- El hero ya está en el DOM debajo; el loader solo lo tapa.
- Se muestra solo en la primera visita (flag en `sessionStorage` dentro de un try/catch).
- No se muestra con reduced motion ni en `?stand=1`.

---

## Bloque B: Secciones

### B1. Manifiesto en tres enunciados (pineado, contador `01 / 03`)

**Qué es.** La sección se pinea y pasan **tres frases cortas**, una tras otra:

- Cada frase **entra enfocándose**: SplitText por líneas, de `blur(10px)` a nítida.
- **Sale desenfocándose** hacia arriba (`y: -20`, `blur(6px)`, `opacity: 0`).
- Arriba hay una línea de progreso que se va llenando y un contador `01 / 03`. El número cambia con un rodillo vertical.

**Duración y mobile:**

- Desktop: 120% de viewport por frase. La referencia usa 200%; acá lo acortamos para que no se haga eterno.
- Mobile: **sin pin**. Las tres frases quedan apiladas, cada una con su reveal de enfoque.

**Textos** (tono a revisar **[CONFIRMAR]**):

1. *El rubro óptico trabaja con precisión. Su software también debería.*
2. *Diseñamos y construimos sistemas para ópticas y laboratorios, con las herramientas que están cambiando cómo se hace software.*
3. *El resultado: herramientas claras, rápidas y hechas a la medida de cómo trabajás.*

El texto actual de "Como el ceibo, crecemos en comunidad" se mantiene y pasa a ser la bajada de Nosotros, después de los enunciados.

### B2. Profundidad de campo en tarjetas

**Qué es.** Las tarjetas se ven **nítidas solo en la franja central** de la pantalla. Al entrar y al salir están levemente desenfocadas, como el foco de una cámara.

**Valores** (scrub 0.6, de `top 90%` a `bottom 10%`):

- Entrada: `{ opacity: 0, scale: .9, yPercent: 15, filter: 'blur(6px)' }` → nítida.
- Salida: `{ opacity: .5, scale: .95, filter: 'blur(4px)' }`. La referencia baja la opacidad a 0, pero así se pierde demasiado contenido.

**Dónde:** en las tarjetas de servicios y los pasos del proceso **en mobile**, donde no hay pins.

**Rendimiento:**

- No más de 6 elementos con blur al mismo tiempo.
- Si un Android de gama media baja de unos 45 fps, se saca el blur y quedan solo la escala y la opacidad.
- Desactivado con reduced motion.

### B3. Qué hacemos: tarjetas que se expanden (desktop)

**Qué es.** Si hoy la sección es una fila horizontal pineada, **se reemplaza** por una fila de 4 tarjetas que se expanden. La razón es de navegación: el usuario controla qué ve, no hay "secuestro" del scroll y los 4 servicios se ven de un vistazo. En la feria, la gente escanea rápido.

**Comportamiento:**

- Fila flex. La tarjeta activa tiene `flex-grow: 3` y las demás `flex-grow: 1` con `opacity: .5`.
- En la activa, el número grande (`01`…`04`) sube de `y: 60%` a `0` y aparecen el título y la descripción (`y: 10` → `0`, stagger 0.08 s). Todo con 0.6–0.8 s `lente`.
- La activa por defecto es la primera.
- Se activa con hover, **focus y click**: cada tarjeta es un `<button>` con `aria-expanded`, para que funcione con teclado.

**Mobile:** acordeón vertical, con una sola tarjeta abierta a la vez y el mismo contenido.

### B3b. Zoom al detalle del servicio (idea de Nico)

**Qué es.** Una transición de **elemento compartido**. Al hacer clic en una tarjeta de servicio, la tarjeta **crece desde su lugar hasta ocupar toda la pantalla** y se convierte en la "página" de detalle de ese servicio. Es literalmente hacer zoom con una lente sobre una parte de la web. Al cerrar, la tarjeta se achica y vuelve a su lugar en la fila.

**Cómo se dispara:**

- **Desktop:**
  - Hover o focus sobre una tarjeta la expande (B3).
  - Clic en la tarjeta ya activa, o en su botón "Ver más" (B4), abre el zoom.
- **Mobile:**
  - Un primer toque abre el ítem del acordeón.
  - El botón **"Ver detalle"** de ese ítem abre el zoom.
- **Teclado:** Enter sobre una tarjeta la expande; Enter sobre "Ver más" abre el detalle.

**Implementación con GSAP Flip** (gratuito y funciona en todos los navegadores, incluido Safari de iPhone):

1. `const state = Flip.getState([tarjeta, numero, titulo])`.
2. La tarjeta pasa a un contenedor fijo a pantalla completa (o recibe una clase `.is-zoomed` con `position: fixed; inset: 0`).
3. `Flip.from(state, { duration: 0.9, ease: 'lente', absolute: true })`. A la vez, el radio de la tarjeta anima de 20px a 0.
4. **El número grande y el título son los elementos compartidos.** Viajan de la tarjeta al encabezado del detalle sin desaparecer, y eso es lo que da la sensación de continuidad.
5. **El resto del contenido** del detalle entra después, enfocándose: `blur(8px)` → `0`, `y: 20` → `0`, stagger 0.06 s, con un delay de 0.4 s.
6. **Profundidad de campo:** mientras la tarjeta crece, la página de atrás se aleja y se desenfoca (`scale: .96`, `filter: blur(4px)`, `opacity: .6`). Así el zoom se siente óptico.

La View Transitions API también sirve para esto, pero Flip da más control y un resultado parejo en todos los navegadores. Usar Flip.

**Navegación (lo más importante del efecto):**

- **URL propia por servicio:** al abrir se hace `history.pushState` a `#servicio-gestion`, `#servicio-pedidos`, `#servicio-automatizacion` o `#servicio-a-medida`.
- **El botón "atrás" del celular cierra el detalle** en vez de sacar al usuario de la web (escuchar `popstate`).
- **Link directo:** si alguien entra con el hash en la URL, el detalle se abre directamente, sin animación de zoom (fundido simple). Eso permite, por ejemplo, un QR por servicio en el stand.
- **Formas de cerrar:** botón × arriba a la derecha, Esc, el botón atrás o, en mobile, deslizar hacia abajo (opcional).
- **Al cerrar:** se hace el Flip inverso, la tarjeta vuelve a su lugar en la fila, el scroll de la página queda donde estaba y el foco vuelve a la tarjeta.
- **Pasar de un servicio a otro sin cerrar:** abajo del detalle, "← Anterior" y "Siguiente →". El cambio es un fundido horizontal corto (`x: ±40`, 0.5 s `lente`) y se actualiza el hash.

**Mientras el detalle está abierto:**

- `lenis.stop()` en la página. El detalle tiene su propio scroll interno, con `data-lenis-prevent` si el contenido es largo.
- El header (A1) y el CTA flotante (A6) se esconden.
- Accesibilidad: `role="dialog"`, `aria-modal="true"` y `aria-labelledby` apuntando al título. El foco queda atrapado en el detalle y el resto de la página va con `inert`.
- Con `prefers-reduced-motion`, en vez del zoom hay un fundido de 200 ms.

**Contenido del detalle** (borrador a revisar **[CONFIRMAR]**; si algo no lo hacemos, se saca):

Estructura común de cada detalle:

- Número y título (los compartidos con la tarjeta) más una bajada de una línea.
- **Qué resuelve:** 3–4 puntos.
- **Para quién:** ópticas, laboratorios o ambos.
- **CTA principal:** "Consultar por WhatsApp", con el mensaje ya escrito sobre ese servicio:
  ```ts
  `https://wa.me/${NUMERO}?text=${encodeURIComponent(`¡Hola Ceibo! Quiero saber más sobre ${servicio}.`)}`
  ```
- **CTA secundario:** "Volver a servicios".
- Opcional: una ilustración abstracta en línea con la marca (hojas, lente, líneas). **Sin capturas de proyectos**, porque todavía no los mostramos.

Borrador por servicio:

1. **Gestión para ópticas.** *Todo lo de tu óptica, en un solo sistema.*
   - Fichas de pacientes con su historia clínica.
   - Recetas, graduaciones y datos de cada trabajo, incluidos los lentes de contacto.
   - Seguimiento de cada trabajo: en qué estado está y a qué laboratorio se pidió.
   - Ventas y compras en el mismo lugar.
   - *Para quién:* ópticas.
2. **Pedidos a laboratorio.** *Del mostrador al laboratorio, sin papeles.*
   - Cargar el pedido con la receta y el tipo de lente.
   - Ver el estado del pedido sin llamar ni mandar mensajes.
   - Historial de pedidos por óptica y por paciente.
   - *Para quién:* ópticas y laboratorios.
3. **Automatización y datos.** *Lo repetitivo, que lo haga la máquina.*
   - Leer y ordenar las listas de precios de los laboratorios.
   - Comparar precios entre laboratorios.
   - Cargar planillas automáticamente y armar reportes.
   - *Para quién:* ópticas y laboratorios.
4. **Software a medida.** *Si no existe, lo construimos.*
   - Entendemos cómo trabajás antes de proponer nada.
   - Arrancamos con un prototipo rápido para validar la idea.
   - Desarrollamos en ciclos cortos y seguimos acompañando después de entregar.
   - *Para quién:* el rubro óptico y lo que venga.

### B4. Botón que sigue al cursor ("Ver más")

- Dentro de la tarjeta activa de B3, un botón redondo rojo, **"Ver más +"**, sigue al cursor con suavizado (`lerp 0.2`, como la referencia). Aparece al entrar a la tarjeta y se va al salir.
- Al hacer clic abre el **zoom al detalle** (B3b). El botón de WhatsApp vive adentro del detalle.
- En mobile es el botón normal "Ver detalle" al final de cada ítem del acordeón.

### B5. Grilla "Lo que resolvemos" con linterna

**Qué es.** Una grilla de 3×3 en desktop (2 columnas en mobile) con cosas concretas que resolvemos. Al mover el mouse, **los bordes de las celdas se iluminan en rojo cerca del cursor**, como un haz de luz pasando por una lente.

**Ítems** (lista a revisar **[CONFIRMAR]**):

- Historias clínicas
- Recetas y graduaciones
- Seguimiento de trabajos
- Pedidos a laboratorio
- Listas de precios
- Stock
- Ventas y compras
- Reportes
- Automatización de planillas

**Implementación** (más liviana que la de la referencia, que usa un canvas por celda):

- Un único `pointermove` sobre la grilla actualiza `--mx` y `--my`.
- Cada celda tiene un `::before` que dibuja el borde de 1px con `background: radial-gradient(160px circle at var(--mx) var(--my), rgba(194,38,64,.9), transparent 70%)`. Ese gradiente se recorta al borde con `mask` y `mask-composite: exclude`.
- Hover sobre una celda: fondo `#C22640` al 6%.
- Entrada de las celdas: `scale .9 → 1` y `opacity 0 → 1`, con stagger de 0.6 s en orden aleatorio (`from: 'random'`).

**Mobile:** sin cursor. La luz va al punto que se toca; si no se toca nada, los bordes quedan sutiles y estáticos.

**Dónde va:** entre Qué hacemos y Cómo trabajamos.

### B6. Hacia dónde vamos: la sección roja "se abre"

- Al entrar en pantalla, la sección roja arranca como una tarjeta con margen interno (`padding: 24px` y `border-radius: 32px` en el contenedor) y **se expande hasta ocupar toda la pantalla**: padding 0 y radius 0, como un diafragma que se abre.
- El scrub va de `top bottom` a `top top`.
- La marquesina del brief sigue como está.

### B7. Transiciones entre secciones (prioridad baja)

- Las secciones claras terminan con las esquinas inferiores redondeadas (40px) y se superponen a la siguiente (`margin-bottom: -40px` y `z-index`).
- Opcional: una **muesca** suave en el centro del borde inferior, como en la referencia, que invita a seguir bajando.

### B8. Footer con hojas del ceibo

**Contenido:**

- Fondo `--ink` con tres columnas: Contacto **[CONFIRMAR]**, Navegación y un CTA ("Construyamos lo que viene" con su botón).
- Abajo, una línea legal: `© 2026 Ceibo Union Labs`.

**Las hojas:**

- Las 8 hojas de `ceibo-isotipo.svg` (`#hoja-1`…`#hoja-8`), **gigantes** (unos 30vh de alto), alineadas y **recortadas por el borde inferior** de la pantalla.
- Color: blanco al 8% o rojo `#C22640`. Probar las dos opciones.
- Al entrar el footer, suben (`yPercent: 30` → `0`) con stagger.
- En desktop se mecen apenas (±2°) con el mouse.

### B9. Preguntas frecuentes (opcional)

- Acordeón numerado (`01.`, `02.` …) con un `+` que rota a `×`.
- Preguntas sugeridas:
  - ¿Trabajan solo con ópticas?
  - ¿Se puede integrar con lo que ya uso?
  - ¿Cuánto tarda un proyecto?
  - ¿Dan soporte después de entregar?
- Respuestas: **[COMPLETAR NOSOTROS]**. No hay que inventarlas.

### B10. Equipo (opcional)

- Solo si tenemos **fotos reales [CONFIRMAR]**: en blanco y negro, pasan a color al hacer hover, con nombre y rol.
- Si no hay fotos, esta sección no se hace.

---

## Bloque C: Detalles de diseño

- **Eyebrows:** encima de cada título va una etiqueta como `— QUÉ HACEMOS`, en 12px, mayúsculas, con `letter-spacing: .12em` y una línea de 32px a la izquierda.
- **Numeración:** los ítems de las listas llevan `01.` en color `--muted`.
- **Radios:** 20px para las tarjetas y 9999px para píldoras y botones.
- **Botones:** todos con flecha `↗`, que se desplaza 2px en diagonal al hacer hover.
- **Aire:** más espacio vertical entre secciones (al menos `clamp(96px, 14vh, 180px)`) y un solo foco visual por pantalla.

---

## Criterios de aceptación

- [ ] Toda la navegación funciona con teclado. El menú mobile atrapa el foco y se cierra con Esc.
- [ ] El header se lee bien sobre secciones claras, oscuras y rojas, **también en Safari de iPhone** (sin la distorsión).
- [ ] El CTA de WhatsApp en mobile no tapa contenido importante y desaparece en Hablemos y en el footer.
- [ ] El zoom de servicios (B3b) va y vuelve sin saltos y la tarjeta regresa exactamente a su lugar. El botón atrás del celular cierra el detalle y entrar con `#servicio-…` lo abre directo. Probado en Safari de iPhone.
- [ ] Ningún pin en mobile. En desktop, los pins se sienten fluidos y no "trabados".
- [ ] `prefers-reduced-motion`: sin loader, sin blur, sin pins ni efectos de cursor, y con todo el contenido visible.
- [ ] Lighthouse mobile sigue ≥ 90 en Performance. El header no genera layout shift.
- [ ] Probado en iPhone (Safari), Android (Chrome) y desktop (Chrome y Safari).

---

## Ideas de Nico (completar)

> Si agregás ideas acá antes de pasarle el archivo a Claude Code, las suma al plan del Paso 0.

- **Zoom de tarjeta a pantalla completa:** ya está especificado en **B3b**.
-
