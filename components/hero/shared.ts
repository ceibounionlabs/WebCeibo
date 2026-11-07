/** Estado compartido entre el movimiento de la lente (HeroLens) y la escena 3D. Se muta en cada frame, sin renders de React. */
export type LensShared = {
  /** Centro de la lente, en px relativos al hero. */
  x: number;
  y: number;
  /** Velocidad en px/s (para inclinar la lente hacia donde se mueve). */
  vx: number;
  vy: number;
  /** Radio de la lente en px. */
  radius: number;
  /** Índice de refracción elegido con los chips. */
  index: number;
  /** El hero está a la vista (si no, la escena no renderiza). */
  visible: boolean;
};

/** Una línea del título, medida en el DOM. `baseline` en px relativos al hero. */
export type TitleLine = { text: string; x: number; baseline: number; accent: boolean };

export type TitleLayout = { lines: TitleLine[]; fontSize: number; width: number; height: number };

/** Proporción del ascendente de Google Sans (hhea 966 / 1000): de la caja del texto a la línea de base. */
const ASCENT = 0.966;

/**
 * Corta el título en las líneas que realmente pinta el navegador, palabra por
 * palabra, para dibujarlas igual en 3D.
 */
export function measureTitle(h1: HTMLElement, container: HTMLElement): TitleLayout {
  const box = container.getBoundingClientRect();
  const fontSize = parseFloat(getComputedStyle(h1).fontSize);
  const lines: TitleLine[] = [];
  const range = document.createRange();

  for (const span of Array.from(h1.children) as HTMLElement[]) {
    const accent = span.dataset.accent === "true";
    const node = span.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) continue;
    const text = node.textContent ?? "";
    let current: { top: number; words: string[]; x: number } | null = null;
    for (const match of text.matchAll(/\S+/g)) {
      range.setStart(node, match.index!);
      range.setEnd(node, match.index! + match[0].length);
      const rect = range.getClientRects()[0];
      if (!rect) continue;
      const top = rect.top - box.top;
      if (!current || Math.abs(top - current.top) > fontSize * 0.5) {
        if (current) lines.push({ text: current.words.join(" "), x: current.x, baseline: current.top + ASCENT * fontSize, accent });
        current = { top, words: [], x: rect.left - box.left };
      }
      current.words.push(match[0]);
    }
    if (current) lines.push({ text: current.words.join(" "), x: current.x, baseline: current.top + ASCENT * fontSize, accent });
  }
  return { lines, fontSize, width: box.width, height: box.height };
}
