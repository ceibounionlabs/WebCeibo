import Lenis from "lenis";
import { smoothScroll } from "@/lib/motion";
import { setLenis } from "@/lib/scroll";

/**
 * Scroll suave (Lenis). Se carga con import dinámico, después de hidratar,
 * y no se monta con `prefers-reduced-motion: reduce`.
 * La web no usa animaciones de aparición: el contenido está siempre a la
 * vista; solo hay interacciones (lente, menú, zoom de servicios, hovers).
 * Devuelve la función que lo desarma.
 */
export function startMotion(): () => void {
  const html = document.documentElement;
  const lenis = new Lenis({ lerp: smoothScroll.lerp, autoRaf: true });
  setLenis(lenis);
  // Si llega con el menú o un detalle abiertos, el scroll queda frenado.
  if (html.hasAttribute("data-menu-open") || html.hasAttribute("data-detail-open")) lenis.stop();
  return () => {
    setLenis(null);
    lenis.destroy();
  };
}
