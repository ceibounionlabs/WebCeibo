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

export type LeafShape = { id: string; d: string; viewBox: string; aspect: number };

/**
 * Las hojas del isotipo (hoja-1 … hoja-8), cada una con su propio viewBox
 * ajustado (para el footer, B8). El bounding box sale de los puntos del path
 * (comandos absolutos M/C/L/Z, que es lo que tiene el SVG vectorizado).
 */
export const leafShapes = cache((): LeafShape[] => {
  const svg = read("ceibo-isotipo.svg");
  const leaves: LeafShape[] = [];
  for (let n = 1; n <= 8; n++) {
    const match = svg.match(new RegExp(`id="hoja-${n}"[^>]*\\sd="([^"]+)"`)) ?? svg.match(new RegExp(`d="([^"]+)"[^>]*id="hoja-${n}"`));
    if (!match) continue;
    const d = match[1];
    const nums = (d.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []).map(Number);
    const xs = nums.filter((_, i) => i % 2 === 0);
    const ys = nums.filter((_, i) => i % 2 === 1);
    const pad = 1;
    const x = Math.min(...xs) - pad;
    const y = Math.min(...ys) - pad;
    const w = Math.max(...xs) - x + pad;
    const h = Math.max(...ys) - y + pad;
    leaves.push({ id: `hoja-${n}`, d: d.replace(/(\d+\.\d)\d+/g, "$1"), viewBox: `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`, aspect: w / h });
  }
  return leaves;
});

/** Paths del isotipo y su viewBox, para dibujarlo en imágenes generadas (OG, íconos). */
export const isotipoPaths = cache(() => {
  const svg = read("ceibo-isotipo.svg");
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 100";
  const paths = Array.from(svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)).map((m) => m[1].replace(/(\d+\.\d)\d+/g, "$1"));
  return { viewBox, paths };
});

/**
 * Un subconjunto de piezas del isotipo, con el viewBox recortado a esas
 * piezas (para dibujar las etapas de la planta en "Cómo trabajamos").
 */
export const isotipoParts = cache((ids: readonly string[]) => {
  const svg = read("ceibo-isotipo.svg");
  const paths: { id: string; d: string }[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  for (const id of ids) {
    const match = svg.match(new RegExp(`id="${id}"[^>]*\\sd="([^"]+)"`)) ?? svg.match(new RegExp(`d="([^"]+)"[^>]*id="${id}"`));
    if (!match) continue;
    const nums = (match[1].match(/-?\d*\.?\d+/g) ?? []).map(Number);
    nums.forEach((n, i) => (i % 2 ? ys : xs).push(n));
    paths.push({ id, d: match[1].replace(/(\d+\.\d)\d+/g, "$1") });
  }
  const pad = 1;
  const x = Math.min(...xs) - pad;
  const y = Math.min(...ys) - pad;
  const w = Math.max(...xs) - x + pad;
  const h = Math.max(...ys) - y + pad;
  return { viewBox: `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`, aspect: w / h, paths };
});
