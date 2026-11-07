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

/** Manifiesto en tres enunciados (B1). */
export const statements = {
  /** Scroll por frase, en viewports (la referencia usa 2; acá 1.2). */
  scrollPerStatement: 1.2,
  enter: { filter: "blur(10px)", opacity: 0, y: 30 },
  exit: { filter: "blur(6px)", opacity: 0, y: -20 },
} as const;

/** Profundidad de campo (B2). */
export const depthOfField = {
  enter: { opacity: 0, scale: 0.9, yPercent: 15, filter: "blur(6px)" },
  exit: { opacity: 0.5, scale: 0.95, filter: "blur(4px)" },
  scrub: 0.6,
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

/** "Ver más +" que sigue al cursor (B4). */
export const cursorFollow = { lerp: 0.2 } as const;

/** Grilla con linterna (B5). */
export const flashlight = {
  radius: 160,
  enter: { scale: 0.9, opacity: 0 },
  /** Escalonado total, repartido en orden aleatorio entre las celdas. */
  staggerAmount: 0.6,
} as const;

/** Árbol que crece (5.5). */
export const tree = {
  /** Scroll por paso en desktop, en viewports. */
  scrollPerStep: 0.8,
  inactiveOpacity: 0.3,
  /** Hojas por etapa, de abajo hacia arriba (hoja-1 es la punta). */
  stages: [[], ["hoja-8", "hoja-7"], ["hoja-6", "hoja-5", "hoja-4"], ["hoja-3", "hoja-2", "hoja-1"]] as string[][],
  /** Hojas que se tiñen de rojo al florecer. */
  bloom: ["hoja-1", "hoja-2", "hoja-3"],
} as const;

/** Sección roja que se abre (B6). */
export const redOpen = { inset: 24, radius: 32 } as const;

/** Marquesina (5.6). */
export const marquee = {
  /** Segundos que tarda en recorrer una copia de la frase a velocidad base. */
  baseDuration: 28,
  /** Cuánto acelera con la velocidad del scroll. */
  velocityFactor: 1 / 250,
  maxBoost: 6,
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
  /** Índices de los chips (easter egg). Más índice = lente más fina. */
  indices: [1.5, 1.6, 1.67, 1.74],
  /** Lupa DOM de respaldo. */
  magnifier: { scale: 1.15, size: 220 },
} as const;

/** Modo stand (5.8). */
export const stand = { secondsPerSection: 8, pauseOnInteraction: 20 } as const;
