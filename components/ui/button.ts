/**
 * Clases de botones. Son strings (no componentes) para poder usarlas en
 * <a>, <button> y desde Server o Client Components por igual.
 * Todos los botones llevan la flecha ↗ (<BtnArrow />), que se corre 2px en
 * diagonal al hacer hover (CAMBIOS-v2 C).
 */
const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 ease-lente select-none";

export const button = {
  /** CTA principal: rojo ceibo, hover/pressed en rojo oscuro. */
  primary: `${base} bg-ceibo text-white hover:bg-ceibo-deep active:bg-ceibo-deep`,
  /** Sobre la sección roja: blanco con texto rojo. */
  inverse: `${base} bg-white text-ceibo hover:bg-paper active:bg-paper`,
  /** Secundario sobre fondos oscuros. */
  ghostDark: `${base} border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink`,
  /** Secundario sobre fondos claros. */
  ghostLight: `${base} border border-ink/20 text-ink hover:border-ceibo hover:bg-ceibo hover:text-white`,
  /** Variante compacta. */
  small: "min-h-10 px-5 text-sm",
} as const;

/** Clases de la flecha ↗ dentro de un botón con `group/btn`. */
export const btnArrow =
  "size-3.5 shrink-0 transition-transform duration-300 ease-lente group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5";

