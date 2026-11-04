/**
 * Prepara los archivos de marca a partir de assets/logo (la única fuente).
 * Corre sola al arrancar `npm run dev` y `npm run build`. Si mañana llega el vector oficial,
 * se reemplazan los SVG de assets/logo y listo: no hay que tocar código.
 *
 *  - public/brand/*.svg  copia de los logos, para usarlos como máscara CSS.
 *  - app/icon.svg        favicon: isotipo blanco sobre un cuadrado rojo ceibo.
 */
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "assets/logo");
const out = join(root, "public/brand");

mkdirSync(out, { recursive: true });
for (const file of readdirSync(src).filter((f) => f.endsWith(".svg"))) {
  copyFileSync(join(src, file), join(out, file));
}

// Favicon
const iso = readFileSync(join(src, "ceibo-isotipo.svg"), "utf8");
const [vx, vy, vw, vh] = iso.match(/viewBox="([^"]+)"/)[1].split(/[\s,]+/).map(Number);
const inner = iso
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title>[\s\S]*?<\/title>/g, "")
  .replace(/\sid="[^"]*"/g, "");
const size = 512;
const scale = (size * 0.74) / Math.max(vw, vh);
const tx = (size - vw * scale) / 2 - vx * scale;
const ty = (size - vh * scale) / 2 - vy * scale;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="112" fill="#C22640"/><g fill="#FFFFFF" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">${inner.trim()}</g></svg>\n`;
writeFileSync(join(root, "app/icon.svg"), icon);

console.log("✓ marca sincronizada desde assets/logo");
