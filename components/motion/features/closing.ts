import { ease, footerLeaves, magnetic } from "@/lib/motion";
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

/**
 * 5.7: botones magnéticos (solo desktop con mouse). Dentro de un radio de
 * ~80px, el botón se corre hacia el cursor hasta 16px; al salir vuelve con
 * elastic.out(1, 0.4).
 */
export const magneticFeature: Feature = ({ gsap, desktop, finePointer }) => {
  if (!desktop || !finePointer) return;
  const buttons = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
  const items = buttons.map((el) => ({
    el,
    x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
    y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
    active: false,
  }));
  let frame = 0;
  let px = 0;
  let py = 0;
  const update = () => {
    frame = 0;
    for (const item of items) {
      const r = item.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = px - cx;
      const dy = py - cy;
      // Distancia al borde del botón (no al centro), para botones anchos.
      const edge = Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0));
      if (edge < magnetic.radius) {
        const pull = 1 - edge / magnetic.radius;
        const len = Math.hypot(dx, dy) || 1;
        const shift = Math.min(magnetic.maxShift, len * 0.25) * pull;
        item.x((dx / len) * shift);
        item.y((dy / len) * shift);
        item.active = true;
      } else if (item.active) {
        item.active = false;
        gsap.to(item.el, { x: 0, y: 0, duration: 1, ease: ease.elastic, overwrite: true });
      }
    }
  };
  const onMove = (e: PointerEvent) => {
    px = e.clientX;
    py = e.clientY;
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    gsap.set(buttons, { clearProps: "transform" });
  };
};
