import type Lenis from "lenis";
import { smoothScroll } from "./motion";

/** Instancia activa de Lenis (null con reduced motion o antes de montar). */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/**
 * Lleva el scroll a un ancla (#id). Usa Lenis si está activo; si no, el
 * scroll nativo. Mueve el foco al destino para que la navegación por
 * teclado siga desde ahí.
 */
export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id ? document.getElementById(id) : document.body;
  if (!target) return false;

  if (lenis) {
    lenis.start();
    lenis.scrollTo(id ? target : 0, { offset: smoothScroll.anchorOffset });
  } else {
    target.scrollIntoView({ block: "start" });
  }

  if (id) {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.pushState(null, "", `#${id}`);
  } else {
    history.pushState(null, "", window.location.pathname);
  }
  return true;
}
