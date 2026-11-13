/**
 * Estados globales de la interfaz como atributos en <html>
 * (`data-menu-open`). Así cualquier pieza (header,
 * CTA flotante, progreso) reacciona por CSS sin acoplarse en React.
 */
export type UiFlag = "menu";

export function setUiFlag(flag: UiFlag, on: boolean) {
  document.documentElement.toggleAttribute(`data-${flag}-open`, on);
}

/** Deja inerte todo lo que no es el elemento activo (el menú). */
export function setPageInert(on: boolean, except: string[] = []) {
  const ids = ["cabecera", "contenido", "pie", "cta-flotante"].filter((id) => !except.includes(id));
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) el.inert = on;
  }
}

/** Atrapa el foco dentro de `getItems()` mientras esté activo. */
export function trapFocus(event: KeyboardEvent, items: HTMLElement[]) {
  if (event.key !== "Tab" || items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (event.shiftKey && (active === first || !items.includes(active!))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !items.includes(active!))) {
    event.preventDefault();
    first.focus();
  }
}

export const focusables = (root: ParentNode) =>
  Array.from(root.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex='-1'])")).filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
  );
