# WebCeibo

Web de **Ceibo Union Labs**. La especificación está en [`BRIEF.md`](./BRIEF.md) y [`CAMBIOS-v2.md`](./CAMBIOS-v2.md) (si chocan, manda CAMBIOS-v2). El plan que une los dos, con el orden de implementación y las decisiones tomadas, está en [`PLAN.md`](./PLAN.md).

**Estado:** implementado todo lo del brief (Fases 1, 2 y 3) y de CAMBIOS-v2 (bloques A, B y C), salvo lo que depende de ustedes: los datos **[CONFIRMAR]**, las respuestas de las preguntas frecuentes (B9) y las fotos del equipo (B10).

## Paleta

Rojo ceibo `#CE313D` (principal, en bloques grandes con texto blanco), blanco, paper `#F7F3F1` y, como único fondo oscuro, el marrón corteza `#2B1E19` (hero, "Cómo trabajamos" y footer; no se usa negro). El hero lleva un glow rojo suave; el resto de los fondos son planos. Los tintes `ceibo-100/200/300` solo se usan en las etapas de "Cómo trabajamos". Todo está en el bloque `@theme` de `app/globals.css` y, para el código JS (3D, imágenes generadas), en `lib/colors.ts`.

## Correr el proyecto

Requiere Node 20.9 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export en out/
npm run start      # sirve out/ como en producción
npm run typecheck
```

`dev` y `build` regeneran solos los archivos de marca a partir de `assets/logo/` (ver abajo). Para ver el modo stand: `http://localhost:3000/?stand=1`.

## Dónde se toca cada cosa

| Qué | Dónde |
|---|---|
| Textos de todas las secciones (incluidos los borradores de CAMBIOS-v2) | `lib/content.ts` |
| Datos de contacto y pendientes: dominio, WhatsApp, mail, redes, ciudad | `lib/site.ts` |
| Colores, tipografía, escala de textos, radios, espaciado y eases en CSS | `app/globals.css`, bloque `@theme` |
| Eases, duraciones y distancias de todas las animaciones | `lib/motion.ts` |
| Logos | `assets/logo/*.svg` |
| Color de las hojas del footer (blanco 8% o rojo) | `LEAF_TONE` en `components/Footer.tsx` |
| Colores para JS (lente 3D, OG, íconos) | `lib/colors.ts` |

## Pendientes de ustedes ([CONFIRMAR])

Mientras un dato de `lib/site.ts` siga pendiente, la web muestra `[CONFIRMAR …]` con borde punteado. Para encontrarlos en el código, buscá `CONFIRMAR`.

- **`lib/site.ts`:** dominio, número de WhatsApp, mail y LinkedIn. (Instagram y ciudad ya están cargados.)
- **`lib/content.ts`, borradores de CAMBIOS-v2 que hay que revisar:** los tres enunciados de Nosotros (B1), el contenido del detalle de cada servicio (B3b) y la lista de "Lo que resolvemos" (B5).
- **B9 (preguntas frecuentes) y B10 (equipo):** no se hicieron porque faltan las respuestas y las fotos.

## Estructura

```
app/
  layout.tsx              fuentes, metadata/SEO, boot script (.js, stand, vidrio)
  page.tsx                orden de las secciones
  globals.css             tokens de marca y estilos de cada bloque
  icon.svg                favicon (generado)
  favicon-32.png/, apple-touch-icon.png/, og.png/   imágenes generadas en build (next/og)
components/
  Header.tsx              header en píldoras de vidrio, lupita y menú diafragma (A1, A2, A4)
  FloatingCta.tsx         CTA de WhatsApp en mobile (A6)
  Footer.tsx              footer con las hojas del ceibo (B8)
  StandMode.tsx, StandQr.tsx   modo stand con QR (5.8)
  SeedFall.tsx            la hoja que cae del ceibo hasta Contacto
  hero/                   lente 3D (LensScene) y lupa DOM (5.3)
  services/               lista de servicios y zoom al detalle (B3b)
  sections/               Hero, Manifesto, Services, Solves, HowWeWork, Future, Contact
  motion/
    MotionRoot.tsx        anclas accesibles; carga el motor después de hidratar
    engine.ts             Lenis + ScrollTrigger dentro de gsap.matchMedia
  ui/                     Logo, Eyebrow, Confirmable, botones, íconos
lib/
  content.ts  site.ts  motion.ts  scroll.ts  brand.ts  gsap.ts  load-gsap.ts  ui-flags.ts
assets/logo/              logos fuente
assets/fonts/             Google Sans para las imágenes generadas (OFL)
public/fonts/             Google Sans en TTF para el texto 3D del hero (OFL)
scripts/sync-brand.mjs
```

## Rendimiento y accesibilidad

- Sin animaciones de aparición: el contenido está siempre a la vista. Solo hay interacciones (la lente, el menú, el zoom de servicios, los hovers), el scroll suave y una única animación narrativa: la hoja que se cae del ceibo hasta Contacto ("¿Se te cayó una idea?", `components/SeedFall.tsx`).
- El título del hero se pinta al instante en HTML (es el LCP). Lenis se carga después de hidratar; GSAP solo cuando se abre un servicio; three.js (la lente 3D, ~310 KB comprimido) se carga aparte: en desktop cuando el navegador está libre y en mobile con la primera interacción. Antes de eso hay una lupa DOM.
- `prefers-reduced-motion`: sin Lenis ni lente; el detalle de servicio abre con un fundido corto.
- Sin JS, todo el contenido se lee.
- Lighthouse mobile medido localmente: Performance 96–97, Accesibilidad 100, Buenas prácticas 100, SEO 100 (CLS 0).
- Probado en Chromium a 360, 390, 768, 1024 y 1440 px, con teclado, con reduced motion y sin JS. **Falta probar en un iPhone (Safari) y en Android reales**, sobre todo el vidrio del header, el zoom de servicios y la lente.

## Deploy en Vercel

1. En [vercel.com/new](https://vercel.com/new), importar el repo `ceibounionlabs/WebCeibo`. Vercel detecta Next.js solo.
2. Cada rama genera su propio preview; `main` es producción.
3. Para el dominio: *Settings → Domains*, agregar el dominio y cargar los registros DNS que indique Vercel. Después, completar `site.domain` en `lib/site.ts` (lo usan el QR del modo stand y la imagen OG).
