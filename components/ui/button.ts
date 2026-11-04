/**
 * Clases de botones. Son strings (no componentes) para poder usarlas en
 * <a>, <button> y desde Server o Client Components por igual.
 */
const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 ease-[var(--ease-main)] select-none";

export const button = {
  /** CTA principal: rojo ceibo, hover/pressed en rojo oscuro. */
  primary: `${base} bg-ceibo text-white hover:bg-ceibo-deep active:bg-ceibo-deep`,
  /** Secundario sobre fondos oscuros. */
  ghostDark: `${base} border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink`,
  /** Secundario sobre fondos claros. */
  ghostLight: `${base} border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white`,
  /** Variante compacta para el header. */
  small: "min-h-10 px-5 text-sm",
} as const;
