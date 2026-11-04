# WebCeibo

Web de **Ceibo Union Labs**. La especificación completa está en [`BRIEF.md`](./BRIEF.md).

**Estado:** Fase 1 (Base) implementada, a la espera del OK para pasar a la Fase 2 (Wow).

## Correr el proyecto

Requiere Node 20.9 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export en out/
npm run start      # sirve out/ como en producción
npm run typecheck
```

`dev` y `build` regeneran solos los archivos de marca a partir de `assets/logo/` (ver abajo).

## Dónde se toca cada cosa

| Qué | Dónde |
|---|---|
| Textos de todas las secciones | `lib/content.ts` |
| Datos pendientes (**[CONFIRMAR]**): dominio, WhatsApp, mail, plazo, redes, ciudad | `lib/site.ts` |
| Colores, tipografía, escala de textos y espaciado (tokens) | `app/globals.css`, bloque `@theme` |
| Eases, duraciones y distancias de animación | `lib/motion.ts` |
| Logos | `assets/logo/*.svg` |

**Datos a confirmar.** Mientras un dato de `lib/site.ts` siga pendiente, la web muestra el placeholder `[CONFIRMAR …]` con un borde punteado, así se ven todos de un vistazo. Para encontrarlos en el código, buscá `CONFIRMAR`.

**Logos.** `assets/logo/` es la única fuente. `scripts/sync-brand.mjs` copia los SVG a `public/brand/` (el header y el footer los usan como máscara CSS, así toman el color del texto) y genera `app/icon.svg` (favicon). El isotipo de "Cómo trabajamos" va inline para poder animar sus piezas (`[data-part="tronco"]`, `[data-part="rama"]`, `[data-part="hoja-1"]` … `[data-part="hoja-8"]`). Cuando llegue el vector oficial, se reemplazan los archivos y no hay que tocar código.

## Estructura

```
app/
  layout.tsx          fuentes (Google Sans + Figtree de respaldo), metadata SEO, clase .js
  page.tsx            orden de las secciones
  globals.css         tokens de marca y estilos base
components/
  Header.tsx          header fijo + menú mobile
  Footer.tsx
  ContactForm.tsx
  sections/           Hero, Manifesto, Services, HowWeWork, Future, Contact
  motion/
    MotionRoot.tsx    anclas con scroll suave; carga el motor después de hidratar
    engine.ts         Lenis + ScrollTrigger + reveal estándar (import dinámico)
  ui/                 Logo, Eyebrow, Confirmable, botones, íconos
lib/
  content.ts  site.ts  motion.ts  scroll.ts  brand.ts
assets/logo/          logos fuente
scripts/sync-brand.mjs
```

## Fase 1: qué incluye

- Next.js 16 (App Router, TypeScript) con static export, Tailwind CSS 4 con paleta cerrada (solo los colores de marca).
- Google Sans autoalojada vía `next/font` (se baja de Google Fonts en el build), con un fallback métrico propio para evitar saltos de layout.
- Todas las secciones con los textos finales, layout mobile first y responsive (probado en 360, 390, 768, 1024 y 1440 px, sin scroll horizontal).
- Header transparente → sólido al scrollear, se oculta al bajar y reaparece al subir; menú mobile accesible (foco, Escape, resto de la página inerte).
- Lenis (`lerp: 0.1`) sincronizado con ScrollTrigger, y reveal estándar (`y: 50 → 0`, 1.2 s `power4.out`, stagger 0.1 s, al 85 % del viewport, una vez).
- GSAP, ScrollTrigger y Lenis se cargan con import dinámico después de hidratar, fuera del bundle inicial.
- `prefers-reduced-motion`: sin Lenis ni reveals, contenido estático (el motor ni se descarga).
- Sin JS el contenido se lee completo: los estados ocultos solo existen con la clase `.js`, y un failsafe muestra todo si el motor no arranca en 4 s.
- Formulario: por ahora arma un mail y abre la app de correo (`mailto`). En la Fase 3 se conecta a Formspree (al ser static export no hay backend propio, así que Resend necesitaría una función aparte).

Lighthouse mobile medido localmente: Performance 97–99, Accesibilidad 100, Buenas prácticas 100, SEO 100.

## Deploy en Vercel

1. En [vercel.com/new](https://vercel.com/new), importar el repo `ceibounionlabs/WebCeibo`. Vercel detecta Next.js solo; no hace falta configurar nada.
2. Cada push genera un preview; `main` es producción.
3. Para el dominio: *Settings → Domains*, agregar el dominio y cargar los registros DNS que indique Vercel. Después, completar `site.domain` en `lib/site.ts`.
