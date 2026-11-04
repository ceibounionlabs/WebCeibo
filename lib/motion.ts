/**
 * Lenguaje de movimiento de Ceibo Union Labs.
 *
 * Todos los valores de movimiento (eases, duraciones, distancias) viven acá:
 * para ajustar el "feel" de toda la web, se toca este archivo y nada más.
 * Las pocas animaciones que corren en CSS puro (entrada del hero, indicador
 * "Deslizá") usan los mismos valores, espejados como tokens en app/globals.css.
 */

export const ease = {
  /** Desaceleración larga (equivale a outQuart). La base de todo. */
  main: "power4.out",
  /** Rebote corto, solo para cosas chicas que "brotan" (hojas, chips). */
  pop: "back.out(1.7)",
  /** Vuelta de los botones magnéticos a su lugar. */
  elastic: "elastic.out(1, 0.4)",
} as const;

export const duration = {
  /** Reveals y títulos: entre 1 y 1.2 s. */
  reveal: 1.2,
  /** Hovers de tarjetas y botones. */
  hover: 0.3,
} as const;

/** Scroll suave (Lenis). */
export const smoothScroll = {
  lerp: 0.1,
  /** Corrimiento al saltar a un ancla, en px (el header se oculta al bajar). */
  anchorOffset: 0,
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

/** Header: se oculta al bajar y reaparece al subir. */
export const header = {
  /** A partir de cuántos px de scroll el header se vuelve sólido. */
  solidAfter: 24,
  /** A partir de cuántos px de scroll se puede ocultar. */
  hideAfter: 160,
  /** Px mínimos de movimiento para cambiar de estado (evita parpadeos). */
  tolerance: 6,
} as const;

/* --------------------------------------------------------------------------
   Fase 2: definidos acá para que la "firma" de la marca ya tenga su lugar.
   -------------------------------------------------------------------------- */

/** Firma "enfocar" (5.2) en títulos de sección. */
export const focusTitle = {
  from: { filter: "blur(10px)", opacity: 0, y: 30 },
  duration: duration.reveal,
  ease: ease.main,
  stagger: 0.1,
} as const;

/** Manifiesto scrubbed (5.2): cada palabra arranca así y se enfoca con el scroll. */
export const focusManifesto = { blur: 6, opacity: 0.15 } as const;

/** Botones magnéticos (5.7). */
export const magnetic = { maxShift: 16, radius: 80 } as const;
