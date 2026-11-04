import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reveal, smoothScroll } from "@/lib/motion";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Motor de animación (se carga con import dinámico, fuera del bundle inicial):
 * - Lenis para el scroll suave, sincronizado con ScrollTrigger.
 * - Reveal estándar para todo lo marcado con `data-reveal`.
 *
 * Todo vive dentro de gsap.matchMedia: con `prefers-reduced-motion: reduce`
 * no se monta nada y el contenido queda estático.
 * Devuelve la función que desarma todo.
 */
export function startMotion(): () => void {
  const html = document.documentElement;
  // Si el failsafe ya mostró el contenido (JS que tardó demasiado), no lo
  // volvemos a ocultar para animarlo.
  const skipReveals = html.classList.contains("no-motion");
  html.classList.add("motion-ready");

  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Scroll suave
    const lenis = new Lenis({ lerp: smoothScroll.lerp });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    // Reveal estándar: los elementos que entran juntos se escalonan solos.
    if (!skipReveals) {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, reveal.from);
      ScrollTrigger.batch(items, {
        start: reveal.start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            ...reveal.to,
            duration: reveal.duration,
            ease: reveal.ease,
            stagger: reveal.stagger,
            overwrite: true,
            clearProps: "transform",
          }),
      });
    }

    // Las fuentes cambian alturas: recalcular posiciones cuando cargan.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      setLenis(null);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  });

  return () => mm.revert();
}
