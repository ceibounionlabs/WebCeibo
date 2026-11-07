import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isotipoPaths } from "./brand";

import { colors } from "./colors";

const CEIBO = colors.ceibo;

/** Isotipo como JSX para next/og (satori dibuja SVG inline). */
export function Isotipo({ height, color = "#FFFFFF" }: { height: number; color?: string }) {
  const { viewBox, paths } = isotipoPaths();
  const [, , w, h] = viewBox.split(/\s+/).map(Number);
  return (
    <svg viewBox={viewBox} width={(height * w) / h} height={height}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill={color} fillRule="evenodd" />
      ))}
    </svg>
  );
}

/**
 * Ícono: isotipo rojo ceibo. Sin fondo (transparente) para la pestaña; con
 * fondo blanco para el ícono de iPhone, que no admite transparencia.
 */
export function IconArt({ size, background, fill = 0.94 }: { size: number; background?: string; fill?: number }) {
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", background: background ?? "transparent" }}>
      <Isotipo height={size * fill} color={CEIBO} />
    </div>
  );
}

/** Google Sans Medium sin tabla GSUB (el parser de next/og no la soporta). Licencia OFL. */
export const googleSans = () => readFileSync(join(process.cwd(), "assets/fonts/google-sans-500-og.ttf"));
