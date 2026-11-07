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

/** Ícono: isotipo blanco sobre un cuadrado rojo ceibo. */
export function IconArt({ size, radius }: { size: number; radius: number }) {
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", background: CEIBO, borderRadius: radius }}>
      <Isotipo height={size * 0.74} />
    </div>
  );
}

/** Google Sans Medium sin tabla GSUB (el parser de next/og no la soporta). Licencia OFL. */
export const googleSans = () => readFileSync(join(process.cwd(), "assets/fonts/google-sans-500-og.ttf"));
