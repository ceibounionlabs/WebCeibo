# Web de Ceibo Union Labs: brief para Claude Code

> **Cómo usar este archivo.** Creá la carpeta del proyecto, copiá adentro este `BRIEF.md` y la carpeta `assets/`, abrí Claude Code ahí y pegá esto:
>
> ```
> Leé BRIEF.md completo y mirá los SVG de assets/logo. Antes de escribir código,
> armá un plan para la Fase 1 y mostrámelo. Trabajá fase por fase: al terminar
> cada una, levantá el sitio, revisalo en 1440px y en 375px, y esperá mi OK
> antes de pasar a la siguiente.
> ```
>
> Lo marcado con **[CONFIRMAR]** es un dato que tienen que completar ustedes. Claude Code debe dejarlo como un placeholder fácil de encontrar, sin inventarlo.

---

## 1. Contexto

**Quiénes somos.** Ceibo Union Labs es un grupo de amigos, estudiantes avanzados de Ingeniería en Sistemas y cerca de recibirse, que trabajan juntos en proyectos de software. Por ahora todos los proyectos son del rubro óptico (ópticas y laboratorios), y la idea es expandirse a otros rubros. Queremos estar lo más cerca posible de la vanguardia en cómo se produce software, IA incluida.

**Para qué es la web.** Nos vamos a presentar en una feria del rubro y ya tenemos el dominio **[CONFIRMAR dominio]**. Necesitamos una web que nos represente y diga qué hacemos.

**La decisión central: la web es la demo.** Todavía no mostramos proyectos (la demo del sistema de gestión no está lista y el resto no luce lo suficiente). La web en sí tiene que provocar un "wow" y demostrar que sabemos de diseño y de tecnología. Cada animación está para eso.

**Público.** Dueños y empleados de ópticas, laboratorios ópticos y gente del rubro. La mayoría va a entrar **desde el celular, escaneando un QR en el stand**, así que el diseño es mobile first.

**Objetivo.** Que nos contacten. El CTA principal es "Hablemos" (WhatsApp, mail o formulario).

---

## 2. Marca

| | |
|---|---|
| Nombre | **Ceibo Union Labs**. En el logotipo va en minúsculas: "ceibo union labs" |
| Lema | **"Construimos las herramientas que el rubro óptico necesita, con la tecnología que viene."** |
| Rojo ceibo (principal) | `#C22640` |
| Blanco | `#FFFFFF` |
| Tipografía | **Google Sans** (400 / 500 / 700), la misma del logo y del comparador de paletas, cargada desde Google Fonts. Si no carga, usar **Figtree** de fallback. |

**Neutrales derivados** (definirlos como tokens; no sumar otros colores):

- `--ink: #141113`: casi negro cálido, para fondos oscuros y texto.
- `--paper: #F7F3F1`: blanco roto cálido, para alternar secciones claras.
- `--muted: #6B6366`: texto secundario sobre claro.
- `--ceibo-deep: #8F1B2F`: rojo oscuro, solo para estados hover/pressed.

**Contraste verificado:** blanco sobre `#C22640` da 5.8:1 (cumple AA para cualquier tamaño). En cambio, `#C22640` sobre `--ink` da apenas 3.3:1: ese rojo sobre fondo oscuro se usa **solo en títulos grandes** (≥ 24px), nunca en texto corrido.

**Uso del rojo.** El rojo va en bloques grandes, con secciones enteras rojas y texto blanco, porque es donde vive el logo. No usar degradados de colores ni arcoíris. La paleta es rojo, blanco y los neutrales de arriba.

**Concepto.** La marca se apoya en dos metáforas:

1. **Enfocar** (lo óptico): lentes, refracción, pasar de borroso a nítido.
2. **Crecer** (el ceibo): el ceibo es resistente, generoso y florece en lugares inesperados. Tenemos raíces en la óptica y ramas hacia otros rubros. Y su flor es roja, como el color de la marca.

### Logo (`assets/logo/`)

Son SVG **provisorios**, vectorizados automáticamente desde un PNG. Cuando exista el vector oficial, se reemplazan sin tocar el código.

- `ceibo-logo-horizontal.svg`: isotipo y logotipo. Usa `fill="currentColor"`, así que toma el color del CSS.
- `ceibo-isotipo.svg`: solo el árbol, con piezas separadas para animarlas: `#tronco`, `#rama` y `#hoja-1` a `#hoja-8`. `hoja-1` es la de la punta; el resto sigue de arriba hacia abajo.
- `ceibo-logo-sobre-rojo.svg`: versión de referencia (blanco sobre `#C22640`). Sirve para la imagen OG.

Generar a partir del isotipo el favicon (SVG y PNG), el `apple-touch-icon` y la imagen Open Graph de 1200×630 (logo sobre rojo y el lema).

---

## 3. Stack

- **Next.js** (App Router) con **TypeScript**, en la versión estable actual. Static export si nada lo impide.
- **Tailwind CSS**, con los tokens de color, tipografía y espaciado definidos en un solo lugar.
- **GSAP** con **ScrollTrigger** y **SplitText**. Todos los plugins de GSAP son gratuitos.
- **Lenis** (paquete `lenis`) para el scroll suave.
- **three.js** vía **React Three Fiber** y **@react-three/drei**, solo para la lente del hero. Se carga con import dinámico, `ssr: false` y después del primer render.
- **Deploy en Vercel** (plan gratuito), conectando el dominio.
- **Contacto:** link a WhatsApp y `mailto` como canal principal. El formulario se resuelve con Resend o Formspree en la Fase 3.

Todos los valores de movimiento (eases, duraciones, distancias) van centralizados en `lib/motion.ts`, para ajustar el "feel" de toda la web desde un solo archivo.

---

## 4. Estructura (one-page)

Orden de las secciones; el color de fondo de cada una va entre paréntesis.

0. **Header** (transparente, se vuelve sólido al hacer scroll): logo a la izquierda, anclas (Nosotros · Qué hacemos · Cómo trabajamos) y botón "Hablemos". En mobile, menú hamburguesa.
1. **Hero: "La lente"** (`--ink`).
2. **Manifiesto: "Enfoque"** (`--paper`).
3. **Qué hacemos** (blanco).
4. **Cómo trabajamos: el ceibo crece** (`--paper`).
5. **Hacia dónde vamos** (rojo `#C22640`).
6. **Hablemos** (`--ink`).
7. **Footer** (`--ink`).

El detalle de los efectos de cada sección está en el punto 5 y los textos en el punto 6.

---

## 5. Animaciones y efectos

### 5.1 El lenguaje de movimiento (sale de analizar la web de Renaiss)

Tomamos como referencia de movimiento la web de Renaiss (software factory rosarina). **Copiamos el lenguaje de movimiento, no su diseño ni su código.** Los valores medidos en su sitio:

- **Scroll suave** con Lenis, `lerp: 0.1`. Integración con ScrollTrigger:
  ```ts
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **Ease principal:** `power4.out` (equivale a su `outQuart`), con duraciones de 1 a 1.2 s. Esa desaceleración larga es la que da sensación de calidad.
- **Ease con rebote:** `back.out(1.7)`, solo para cosas chicas que "brotan" (hojas, chips).
- **Reveal estándar:** `{ y: 50, opacity: 0 }` → `{ y: 0, opacity: 1 }`, 1.2 s `power4.out`, escalonado de 0.08 a 0.12 s entre elementos, disparado cuando el elemento llega al 85% del viewport y una sola vez.
- **Filas que se corren de costado** mientras el scroll es vertical (sección pineada).
- **Paso activo nítido y los demás atenuados** (opacity 0.3).
- **Botones magnéticos** que siguen un poco al cursor.

### 5.2 Firma de la marca: "enfocar"

Es el efecto que nos distingue: **el contenido pasa de desenfocado a nítido, como al ponerse los anteojos.**

- **Títulos de sección:** con SplitText por líneas, `{ filter: 'blur(10px)', opacity: 0, y: 30 }` → `{ filter: 'blur(0px)', opacity: 1, y: 0 }`, 1.2 s `power4.out`, stagger 0.1 s. Al terminar, `clearProps: 'filter'`, porque dejar el blur aplicado le cuesta rendimiento al navegador.
- **Manifiesto (sección 2), efecto scrubbed:** SplitText por palabras. Cada palabra arranca en `blur(6px)` y `opacity: 0.15` y se va enfocando **atada al scroll** (`scrub: true`), de izquierda a derecha, mientras la sección está pineada. Cuando termina el párrafo, todo queda nítido.
- **Usar con moderación:** solo en títulos y en el manifiesto. Si todo se desenfoca, el efecto pierde fuerza.

### 5.3 Hero: la lente 3D

**Idea.** Una lente de vidrio flota sobre el título y sigue al cursor. Lo que queda detrás (el lema) se ve refractado, como si miraras la web a través de la lente.

**Implementación recomendada:**

- Canvas de R3F a pantalla completa detrás del contenido del hero.
- El lema se dibuja como texto 3D con `<Text>` de drei, usando el archivo de Google Sans. Además, el `<h1>` real queda en el HTML (`sr-only`) para SEO y lectores de pantalla, y el canvas lleva `aria-hidden`.
- La lente es una lente biconvexa: una esfera aplanada en Z (`scale [1, 1, 0.25]`) o un `LatheGeometry` con perfil de lente. Opcionalmente, un aro fino blanco como montura.
- Material: `MeshTransmissionMaterial` con `ior: 1.5` (el índice del CR-39, un guiño para ópticos), `thickness: 0.4`, `roughness: 0`, `chromaticAberration: 0.04`, `distortion: 0.1`, `backside: true`. Ajustar los valores a ojo.
- **Movimiento:** la lente sigue al puntero con amortiguación (`damp`, factor ~0.1) y se inclina levemente hacia la dirección del movimiento. Si el mouse no se mueve, flota sola en una trayectoria lenta en forma de 8.
- **Mobile:** sin hover. La lente flota sola y se puede arrastrar con el dedo. Con `dpr` máximo de 1.5, `samples` 4–6 y `resolution` 512.
- **Carga:** el hero tiene que verse **al instante** con el título en HTML. El 3D se monta después y hace un fundido sobre él, para no empeorar el LCP.
- **Fallback** (sin WebGL, con `prefers-reduced-motion` o en un dispositivo lento): un efecto lupa en puro DOM. Es un círculo que sigue al cursor y muestra una copia del título escalada ×1.15, recortada con `clip-path: circle()`. Es barato y mantiene la idea.

**Easter egg opcional (Fase 2+):** chips "1.50 · 1.60 · 1.67 · 1.74" debajo del hero. Al tocar uno, la lente anima su `ior` y se vuelve más fina cuanto más alto es el índice, igual que una lente real. Cualquier óptico lo entiende al instante.

**El "prisma" (idea 2), en versión controlada:** nada de arcoíris. El guiño al prisma es solo la aberración cromática sutil en los bordes de la lente. Si queda bien, se puede probar más adelante un haz de luz blanco y rosado en la sección roja. Queda como opcional y se evalúa visualmente.

### 5.4 Qué hacemos: tarjetas horizontales

- **Desktop (≥ 1024px):** la sección se pinea y la fila de 4 tarjetas se desplaza en X mientras el usuario scrollea en vertical (como la fila de tarjetas de Renaiss, aprox. −55% a −75% según el ancho).
- **Mobile:** sin pin ni desplazamiento lateral. Las tarjetas se apilan con el reveal estándar.
- **Hover (desktop):** la tarjeta pasa a fondo `#C22640` con texto blanco en 300 ms, y el número de la tarjeta crece un poco.

### 5.5 Cómo trabajamos: el ceibo crece

Es el efecto que conecta la marca con el proceso.

- Sección pineada en dos columnas. A la izquierda va `ceibo-isotipo.svg` en grande; a la derecha, los 4 pasos.
- El scroll avanza por los pasos. El paso activo queda en opacity 1 con una línea divisoria que crece de 0 a 100% de ancho, y los otros quedan en 0.3.
- **El árbol crece con el scroll:**
  1. **Sembrar:** aparece `#tronco`, revelado de abajo hacia arriba con `clip-path: inset(100% 0 0 0)` → `inset(0)`.
  2. **Germinar:** aparece `#rama` y brotan las dos hojas más bajas.
  3. **Crecer:** brotan tres hojas más.
  4. **Florecer:** brotan las últimas, terminando en `#hoja-1` (la punta). Después, las hojas de arriba se tiñen de rojo `#C22640`, porque la flor del ceibo es roja.
- Cada hoja brota con `scale: 0` → `1`, `back.out(1.7)`, y el `transform-origin` en su base, del lado de la rama.
- **Mobile:** sin pin. El árbol queda arriba, pegajoso (`sticky`), y crece mientras pasan los pasos debajo.

### 5.6 Hacia dónde vamos: marquesina

- Sección roja a todo ancho. Una frase gigante en blanco cruza la pantalla: "Donde las ideas echan raíces · ".
- Su velocidad depende del scroll y cambia de dirección cuando el usuario sube o baja. Se implementa con `ScrollTrigger` y `getVelocity()`.

### 5.7 Detalles

- **Botones magnéticos** (solo desktop): el CTA se desplaza hacia el cursor como máximo 16px dentro de un radio de ~80px, y vuelve a su lugar con `elastic.out(1, 0.4)`.
- **Intro de carga** (≤ 1.2 s): el isotipo pasa de borroso a nítido y se abre el hero. No debe bloquear el contenido y solo se muestra en la primera visita (flag en `sessionStorage` dentro de un try/catch).
- **Header:** se oculta al bajar y reaparece al subir.

### 5.8 Modo stand (Fase 3)

Con `?stand=1`, la web corre sola en una pantalla o TV del stand:

- Sin header. La lente se mueve sola.
- Recorre las secciones en un auto-scroll lento (Lenis `scrollTo`, unos 8 s por sección) y vuelve al principio en loop.
- En una esquina hay un QR fijo que apunta al dominio, con la leyenda "Escaneá y hablemos".
- Si alguien toca la pantalla o mueve el mouse, el loop se pausa 20 s.

---

## 6. Textos

Escritos en español rioplatense, con voseo y un tono cercano pero profesional. Algunas frases vienen del comparador de paletas que armamos antes; están adaptadas.

> ⚠️ **No reutilizar del comparador:** las métricas (+40 proyectos, 15 especialistas, 6 países, 98%), el testimonio de "Lucía Fernández / Nodo Salud", los proyectos de ejemplo (Agro, Salud, Educación) ni los widgets de "Sprint 04". Eran relleno inventado y en la feria serían afirmaciones falsas.

### Hero
- Eyebrow: `laboratorio de software · rubro óptico`
- H1: **Construimos las herramientas que el rubro óptico necesita,** *con la tecnología que viene.* La segunda línea va en rojo.
- Bajada: Software a medida para ópticas y laboratorios, hecho por un equipo joven que trabaja con las herramientas que están cambiando cómo se construye software.
- CTA principal: `Hablemos` · CTA secundario: `Conocé el lab`
- Indicador: `Deslizá`

### Manifiesto, "Enfoque" (el párrafo que se enfoca palabra por palabra)
- Título: **Como el ceibo, crecemos en comunidad**
- Párrafo: Somos un grupo de amigos a punto de recibirnos de ingenieros en sistemas. Nos juntamos para construir software que se use de verdad, y elegimos empezar por el rubro óptico. Trabajamos con las prácticas y herramientas más nuevas de la industria, IA incluida, para llegar más rápido sin resignar calidad.
- Cierre: El ceibo es resistente, generoso y florece en los lugares más inesperados. Así queremos crecer.

### Qué hacemos
- Título: **Herramientas que entienden cómo trabaja el rubro**
- Bajada: Un mismo equipo para pensar, diseñar y desarrollar, así no tenés que coordinar a diez proveedores distintos.
- Tarjetas:
  1. **Gestión para ópticas:** Ventas, compras, historias clínicas, recetas y el seguimiento de cada trabajo, en un solo sistema.
  2. **Pedidos a laboratorio:** Ópticas y laboratorios intercambiando pedidos sin papeles, sin llamadas y sin mensajes perdidos.
  3. **Automatización y datos:** Listas de precios, planillas y tareas repetitivas: que las haga la máquina y vos decidas con datos claros.
  4. **Software a medida:** Si la herramienta que necesitás no existe, la construimos.

### Cómo trabajamos
- Título: **De la semilla a la flor, en cuatro etapas**
- Bajada: Un proceso claro, con avances visibles. Siempre sabés en qué punto está tu proyecto y qué viene después.
- 01 **Sembrar:** Escuchamos y entendemos tu desafío, cómo trabaja tu equipo y qué necesita resolver.
- 02 **Germinar:** Bajamos la idea a un prototipo rápido y lo validamos con quienes lo van a usar.
- 03 **Crecer:** Desarrollamos en ciclos cortos, con entregas frecuentes que podés probar.
- 04 **Florecer:** Lanzamos, acompañamos y seguimos mejorando juntos para que dé frutos.

### Hacia dónde vamos (sección roja)
- Título: **Empezamos por la óptica. Vamos por más.**
- Texto: Raíces en el rubro óptico, ramas hacia todo lo que viene.
- Marquesina: `Donde las ideas echan raíces ·`

### Hablemos
- Título: **¿Tenés una idea? Hagámosla crecer juntos.**
- Texto: Contanos qué necesita tu óptica o tu laboratorio. Te respondemos en menos de 48 horas **[CONFIRMAR plazo]**.
- Botones: `Escribinos por WhatsApp` **[CONFIRMAR número]** · `hola@[dominio]` **[CONFIRMAR mail]**
- Formulario: Nombre · Email · Óptica, laboratorio o empresa · ¿Qué te gustaría resolver? · `Enviar`
- Redes: **[CONFIRMAR Instagram / LinkedIn]**

### Footer
- Logo, anclas, contacto, `© 2026 Ceibo Union Labs` y la ciudad **[CONFIRMAR]**.

### SEO
- `lang="es-AR"`
- Title: `Ceibo Union Labs · Software para el rubro óptico`
- Description: el lema.
- Open Graph y Twitter card con la imagen OG generada.

---

## 7. Requisitos de calidad

- **Mobile first.** Probar en 360px, 390px, 768px, 1024px y 1440px, sin scroll horizontal. Los efectos pineados y laterales solo van en desktop.
- **Rendimiento:**
  - Lighthouse mobile ≥ 90 en Performance.
  - LCP < 2.5 s en 4G.
  - El 3D se carga diferido y no forma parte del bundle inicial.
  - Imágenes (si las hay) en AVIF/WebP y fuentes con `display: swap`.
  - El objetivo es 60 fps en una notebook común y que se sienta fluido en un Android de gama media.
- **`prefers-reduced-motion`:** sin Lenis, sin blur, sin pins ni marquesina. Todo el contenido visible y estático, con la lupa DOM en lugar de la lente 3D.
- **Accesibilidad:** HTML semántico, un solo `h1`, foco visible, navegación completa por teclado, `alt` y `aria-label` donde corresponda, y contraste AA (ver sección 2).
- **Sin JS el contenido se tiene que poder leer.** Las animaciones parten de estados ocultos que se aplican solo cuando hay JS (clase `.js` en `<html>`).
- **No hacer:** fotos de stock, números o testimonios inventados, colores fuera de la paleta, degradados arcoíris, sonido, ni scroll-jacking en mobile.

---

## 8. Fases y criterios de aceptación

**Fase 1: Base**
- Setup, tokens, tipografía, todas las secciones con los textos finales, layout responsive, Lenis y los reveals estándar (5.1).
- Deploy de preview en Vercel.
- ✅ **Listo cuando:** la web se ve prolija y completa en el celular aun sin ningún efecto especial.

**Fase 2: Wow**
- Lente 3D con su fallback (5.3), efecto enfoque (5.2), árbol que crece (5.5), tarjetas horizontales (5.4), marquesina (5.6) y botones magnéticos (5.7).
- ✅ **Listo cuando:** corre fluido en desktop y mobile, `prefers-reduced-motion` funciona, y Lighthouse mobile sigue ≥ 90.

**Fase 3: Feria**
- Modo stand (5.8), QR, favicon, imagen OG, dominio conectado, formulario funcionando y todos los **[CONFIRMAR]** completados.
- QA final en iPhone (Safari) y Android (Chrome), también con 4G lento.
- ✅ **Listo cuando:** se puede escanear el QR en el stand y la web carga rápido y se ve impecable.
