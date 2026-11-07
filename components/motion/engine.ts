import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, CustomEase, Flip } from "@/lib/gsap";
import { smoothScroll } from "@/lib/motion";
import { setLenis } from "@/lib/scroll";
import { features } from "./features";

/**
 * Motor de animación. Se carga con import dinámico, después de hidratar.
 * Todo vive dentro de gsap.matchMedia: con `prefers-reduced-motion: reduce`
 * no se monta nada, y al cruzar el breakpoint de desktop se desarma y se
 * vuelve a armar con la variante que corresponde.
 * Devuelve la función que desarma todo.
 */
export function startMotion(): () => void {
  const html = document.documentElement;
  // Si el failsafe ya mostró el contenido (JS que tardó demasiado), no lo
  // volvemos a ocultar para animarlo.
  const skipReveals = html.classList.contains("no-motion");
  const stand = html.dataset.stand === "1";
  html.classList.add("motion-ready");

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 64rem)",
      finePointer: "(hover: hover) and (pointer: fine)",
    },
    (context) => {
      const { motion, desktop, finePointer } = context.conditions as Record<string, boolean>;
      if (!motion) return;

      // Scroll suave
      const lenis = new Lenis({ lerp: smoothScroll.lerp });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      const ctx = { gsap, ScrollTrigger, SplitText, CustomEase, Flip, desktop, finePointer, skipReveals, stand, lenis };
      const cleanups = features.map((feature) => feature(ctx)).filter((fn): fn is () => void => typeof fn === "function");

      // Calcular en el orden de la página (los pins de arriba corren a los de abajo)
      // y de nuevo cuando cargan las fuentes, que cambian alturas.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        cleanups.forEach((fn) => fn());
        setLenis(null);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    },
  );

  return () => mm.revert();
}
