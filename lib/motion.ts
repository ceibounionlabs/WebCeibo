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

/** Zoom al detalle de servicio (B3b). */
export const serviceZoom = {
  duration: 0.9,
  contentDelay: 0.4,
  /** La página de atrás se aleja y se desenfoca. */
  backdrop: { scale: 0.96, filter: "blur(4px)", opacity: 0.6 },
  /** Cambio entre servicios sin cerrar. */
  switchX: 40,
  switchDuration: 0.5,
  /** Con prefers-reduced-motion: fundido simple. */
  reducedFade: 0.2,
} as const;

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
