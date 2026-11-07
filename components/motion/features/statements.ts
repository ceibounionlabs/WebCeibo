import { focusTitle, statements as cfg } from "@/lib/motion";
import type { Feature } from "../types";

/**
 * Nosotros en tres enunciados (B1).
 * - Desktop: la sección se pinea; cada frase entra enfocándose (línea por
 *   línea) y sale desenfocándose hacia arriba. El contador rueda y la línea
 *   de progreso se llena.
 * - Mobile: sin pin; cada frase tiene su reveal de enfoque.
 */
export const statementsFeature: Feature = ({ gsap, ScrollTrigger, SplitText, desktop, skipReveals }) => {
  const root = document.querySelector<HTMLElement>("[data-statements]");
  if (!root) return;
  const items = gsap.utils.toArray<HTMLElement>("[data-statement]", root);
  if (!items.length) return;

  if (skipReveals) {
    gsap.set(items, { opacity: 1 });
    return;
  }

  if (!desktop) {
    for (const item of items) {
      ScrollTrigger.create({
        trigger: item,
        start: focusTitle.start,
        once: true,
        onEnter: () => {
          const split = SplitText.create(item.querySelector("p")!, { type: "lines" });
          gsap.set(item, { opacity: 1 });
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
    return;
  }

  root.classList.add("is-pinned");
  gsap.set(items, { opacity: 1 });
  const splits = items.map((item) => SplitText.create(item.querySelector("p")!, { type: "lines" }));
  splits.forEach((split) => gsap.set(split.lines, cfg.enter));
  const roll = root.querySelector("[data-counter-roll]");
  const progress = root.querySelector("[data-statements-progress]");
  const n = items.length;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${n * cfg.scrollPerStatement * window.innerHeight}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  splits.forEach((split, i) => {
    tl.to(split.lines, { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" }, i + 0.02);
    if (i > 0 && roll) tl.to(roll, { yPercent: -(100 / n) * i, duration: 0.12, ease: "power2.inOut" }, i);
    if (i < n - 1) tl.to(split.lines, { ...cfg.exit, duration: 0.25, stagger: 0.04, ease: "power2.in" }, i + 0.72);
  });
  if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: n }, 0);

  return () => {
    splits.forEach((split) => split.revert());
    root.classList.remove("is-pinned");
  };
};
