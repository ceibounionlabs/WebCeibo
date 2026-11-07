import { footerLeaves } from "@/lib/motion";
import type { Feature } from "../types";

/** B8: las hojas del footer suben al entrar y, en desktop, se mecen apenas con el mouse. */
export const footerLeavesFeature: Feature = ({ gsap, desktop, finePointer, skipReveals }) => {
  const wrap = document.querySelector<HTMLElement>("[data-leaves]");
  if (!wrap) return;
  const leaves = gsap.utils.toArray<SVGElement>("[data-leaf]", wrap);
  if (!skipReveals) {
    gsap.from(leaves, {
      yPercent: footerLeaves.rise,
      duration: 1.2,
      ease: "lente",
      stagger: footerLeaves.stagger,
      scrollTrigger: { trigger: wrap, start: "top bottom", once: true },
    });
  }
  if (!desktop || !finePointer) return;
  const rotate = leaves.map((leaf) => gsap.quickTo(leaf, "rotation", { duration: 1.2, ease: "power3.out" }));
  const onMove = (e: PointerEvent) => {
    const t = (e.clientX / window.innerWidth) * 2 - 1;
    rotate.forEach((to, i) => to(t * footerLeaves.sway * (i % 2 ? -1 : 1)));
  };
  const footer = wrap.closest("footer")!;
  footer.addEventListener("pointermove", onMove);
  return () => footer.removeEventListener("pointermove", onMove);
};
