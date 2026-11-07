/**
 * Lenguaje de movimiento de Ceibo Union Labs.
 *
 * Todos los valores de movimiento (eases, duraciones, distancias) viven acá:
 * para ajustar el "feel" de toda la web, se toca este archivo y nada más.
 * Las animaciones que corren en CSS puro (loader, header, menú, tarjetas)
 * usan los mismos valores, espejados como tokens en app/globals.css
 * (`--ease-lente`, `--ease-cortina`, etc.).
 */

/** Curvas propias (CAMBIOS-v2). Se registran con CustomEase en lib/gsap.ts. */
export const customEases = {
  /** UI: nav, tarjetas, menú. Arranca rápido y frena largo. CSS: cubic-bezier(0.17, 0.84, 0.44, 1). */
  lente: "M0,0 C0.17,0.84 0.44,1 1,1",
  /** Cortinas y aperturas grandes. CSS: cubic-bezier(0.05, 0.55, 0.15, 1). */
  cortina: "M0,0 C0.05,0.55 0.15,1 1,1",
} as const;

export const ease = {
  /** Desaceleración larga (equivale a outQuart). Reveals y títulos. */
  main: "power4.out",
  /** Rebote corto, solo para cosas chicas que "brotan" (hojas, chips). */
  pop: "back.out(1.7)",
  /** Vuelta de los botones magnéticos a su lugar. */
  elastic: "elastic.out(1, 0.4)",
  /** UI (CAMBIOS-v2). */
  lente: "lente",
  /** Aperturas grandes (CAMBIOS-v2). */
  cortina: "cortina",
  /** Entradas del hero y del header. */
  soft: "power3.out",
} as const;

export const duration = {
  /** Reveals y títulos: entre 1 y 1.2 s. */
  reveal: 1.2,
  /** Hovers de tarjetas y botones. */
  hover: 0.3,
} as const;

/** Scroll suave (Lenis) y anclas (A5). */
export const smoothScroll = {
  lerp: 0.1,
  /** Duración del salto a un ancla. */
  anchorDuration: 1.4,
} as const;

/** Reveal estándar (5.1): sube 50px y aparece, una sola vez, al 85% del viewport. */
export const reveal = {
  from: { y: 50, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: duration.reveal,
  ease: ease.main,
  /** Escalonado entre elementos que entran juntos (0.08–0.12 s). */
  stagger: 0.1,
  start: "top 85%",
} as const;

/** Firma "enfocar" (5.2) en títulos de sección. */
export const focusTitle = {
  from: { filter: "blur(10px)", opacity: 0, y: 30 },
  duration: duration.reveal,
  ease: ease.main,
  stagger: 0.1,
  start: "top 85%",
} as const;

/** Header (A1). */
export const header = {
  /** A partir de cuántos px de scroll se puede ocultar al bajar. */
  hideAfter: 120,
  /** Px mínimos de movimiento para cambiar de estado (evita parpadeos). */
  tolerance: 6,
} as const;

/** Zoom al detalle de servicio (B3b). */
export const serviceZoom = {
  duration: 0.9,
  contentDelay: 0.4,
  contentStagger: 0.06,
  /** La página de atrás se aleja y se desenfoca. */
  backdrop: { scale: 0.96, filter: "blur(4px)", opacity: 0.6 },
  /** Cambio entre servicios sin cerrar. */
  switchX: 40,
  switchDuration: 0.5,
  /** Con prefers-reduced-motion: fundido simple. */
  reducedFade: 0.2,
} as const;

/** Grilla con linterna (B5). */
export const flashlight = {
  radius: 160,
  enter: { scale: 0.9, opacity: 0 },
  /** Escalonado total, repartido en orden aleatorio entre las celdas. */
  staggerAmount: 0.6,
} as const;

/** Footer con hojas (B8). */
export const footerLeaves = { rise: 30, stagger: 0.06, sway: 2 } as const;

/** Botones magnéticos (5.7). */
export const magnetic = { maxShift: 16, radius: 80 } as const;

/** Lente del hero (5.3). */
export const lens = {
  ior: 1.5,
  thickness: 0.4,
  chromaticAberration: 0.04,
  distortion: 0.1,
  /** Amortiguación al seguir el puntero. */
  damp: 0.1,
  /** Lupa DOM de respaldo. */
  magnifier: { scale: 1.15, size: 220 },
} as const;

/** Modo stand (5.8). */
export const stand = { secondsPerSection: 8, pauseOnInteraction: 20 } as const;
