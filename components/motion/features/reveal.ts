import { reveal } from "@/lib/motion";
import type { Feature } from "../types";

/** Reveal estándar (5.1) para todo lo marcado con `data-reveal`. */
export const revealFeature: Feature = ({ gsap, ScrollTrigger, skipReveals }) => {
  if (skipReveals) return;
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  if (!items.length) return;
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
};
