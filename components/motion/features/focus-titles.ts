import { focusTitle } from "@/lib/motion";
import type { Feature } from "../types";

/**
 * Firma "enfocar" (5.2): los títulos marcados con `data-focus` pasan de
 * desenfocados a nítidos, línea por línea. El split se hace recién al entrar
 * (con el layout definitivo) y se deshace al terminar: no queda blur aplicado
 * ni DOM extra.
 */
export const focusTitlesFeature: Feature = ({ gsap, ScrollTrigger, SplitText, skipReveals }) => {
  if (skipReveals) return;
  for (const el of gsap.utils.toArray<HTMLElement>("[data-focus]")) {
    ScrollTrigger.create({
      trigger: el,
      start: focusTitle.start,
      once: true,
      onEnter: () => {
        const split = SplitText.create(el, { type: "lines", linesClass: "focus-line" });
        gsap.set(el, { opacity: 1 });
        gsap.from(split.lines, {
          ...focusTitle.from,
          duration: focusTitle.duration,
          ease: focusTitle.ease,
          stagger: focusTitle.stagger,
          onComplete: () => split.revert(),
        });
      },
    });
  }
};
