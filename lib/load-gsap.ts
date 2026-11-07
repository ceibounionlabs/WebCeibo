/** Carga diferida de GSAP (un solo chunk compartido por todo el sitio). */
export const loadGsap = () => import("./gsap");

export type GsapModule = Awaited<ReturnType<typeof loadGsap>>;

/** true si el usuario pidió menos movimiento. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
