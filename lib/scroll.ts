import type Lenis from "lenis";
import { smoothScroll } from "./motion";
import { prefersReducedMotion } from "./load-gsap";

/** Instancia activa de Lenis (null con reduced motion o antes de montar). */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Alto que ocupa el header flotante (para no tapar el título al llegar). */
function headerOffset() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header ? header.offsetTop + header.offsetHeight : 0;
}

/**
 * Anclas suaves y accesibles (A5).
 * - Lenis con offset del header y 1.4 s; salto inmediato con reduced motion.
 * - El hash se actualiza con replaceState (no llena el historial).
 * - Al llegar, el foco pasa al título de la sección.
 */
export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id && id !== "top" ? document.getElementById(id) : null;
  if (id && id !== "top" && !target) return false;

  const reduced = prefersReducedMotion();
  const offset = target ? -headerOffset() : 0;

  if (lenis && !reduced) {
    lenis.start();
    lenis.scrollTo(target ?? 0, { offset, duration: smoothScroll.anchorDuration });
  } else {
    const top = target ? target.getBoundingClientRect().top + window.scrollY + offset : 0;
    window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
  }

  const base = window.location.pathname + window.location.search;
  history.replaceState(history.state, "", target ? `${base}#${id}` : base);

  const focusTarget = target?.querySelector<HTMLElement>("h1, h2") ?? target ?? document.getElementById("hero-title");
  if (focusTarget) {
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
  }
  return true;
}
