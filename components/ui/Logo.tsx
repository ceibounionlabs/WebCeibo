import type { CSSProperties } from "react";
import { logoAspect, type LogoFile } from "@/lib/brand";

type Props = {
  variant?: "horizontal" | "isotipo";
  className?: string;
  /** Texto alternativo. Pasar `null` si el logo es decorativo. */
  label?: string | null;
};

/**
 * Logo como máscara CSS: el SVG se descarga una vez, queda en caché y toma
 * el color del texto (`currentColor`). El alto lo define `className`; el
 * ancho sale del viewBox del archivo.
 */
export function Logo({ variant = "horizontal", className = "", label = "Ceibo Union Labs" }: Props) {
  const file: LogoFile = variant === "horizontal" ? "ceibo-logo-horizontal.svg" : "ceibo-isotipo.svg";
  const style = {
    "--logo-src": `url(/brand/${file})`,
    aspectRatio: logoAspect(file),
  } as CSSProperties;

  return label ? (
    <span role="img" aria-label={label} className={`logo-mask inline-block ${className}`} style={style} />
  ) : (
    <span aria-hidden="true" className={`logo-mask inline-block ${className}`} style={style} />
  );
}
