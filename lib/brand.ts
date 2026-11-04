import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";

/**
 * Lectura de los logos de assets/logo en build (Server Components).
 * Nada del código depende de las coordenadas del SVG: si se reemplaza el
 * archivo por el vector oficial, todo se recalcula solo.
 */

export type LogoFile = "ceibo-logo-horizontal.svg" | "ceibo-isotipo.svg" | "ceibo-logo-sobre-rojo.svg";

const read = cache((file: LogoFile) => readFileSync(join(process.cwd(), "assets/logo", file), "utf8"));

/** Ancho / alto según el viewBox del archivo. */
export const logoAspect = cache((file: LogoFile) => {
  const box = read(file).match(/viewBox="([^"]+)"/)?.[1].split(/[\s,]+/).map(Number);
  return box && box.length === 4 ? box[2] / box[3] : 1;
});

/**
 * SVG listo para insertar inline y animar:
 * - los `id` pasan a `data-part` (así se puede usar más de una vez sin ids repetidos);
 * - se quita el <title> y la accesibilidad la decide quien lo usa;
 * - las coordenadas se redondean a 1 decimal para alivianar el HTML.
 */
export const inlineSvg = cache((file: LogoFile, className = "") =>
  read(file)
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/\sid="/g, ' data-part="')
    .replace(/(\d+\.\d)\d+/g, (_m, n: string) => n)
    .replace(/<svg\b([^>]*)>/, (_m, attrs: string) => {
      const kept = attrs.replace(/\s(?:role|aria-[\w-]+|class|width|height|focusable)="[^"]*"/g, "");
      return `<svg${kept} class="${className}" aria-hidden="true" focusable="false">`;
    })
    .trim(),
);
