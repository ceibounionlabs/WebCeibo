import { depthOfField as dof, ease, tree as cfg } from "@/lib/motion";
import type { Feature } from "../types";

const CEIBO = "#C22640";

/**
 * Cómo trabajamos: el ceibo crece (5.5) + profundidad de campo en mobile (B2).
 * - Desktop: el bloque se pinea; el scroll avanza por los 4 pasos (el activo
 *   nítido con su línea creciendo, los demás al 30%) y el árbol crece por
 *   etapas: tronco, rama y hojas de abajo hacia arriba, y al final las hojas
 *   de arriba se tiñen de rojo (la flor del ceibo).
 * - Mobile: sin pin; el árbol queda pegado arriba y crece mientras pasan los
 *   pasos, que entran y salen de foco.
 */
export const treeFeature: Feature = ({ gsap, desktop, skipReveals }) => {
  const root = document.querySelector<HTMLElement>("[data-process]");
  const svg = root?.querySelector<SVGSVGElement>("[data-tree] svg");
  if (!root || !svg || skipReveals) return;
  const part = (id: string) => svg.querySelector<SVGGraphicsElement>(`[data-part="${id}"]`);
  const trunk = part("tronco");
  const branch = part("rama");
  const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
  const lines = steps.map((s) => s.querySelector<HTMLElement>("[data-step-line]"));
  if (!trunk || !branch) return;

  // Cada hoja brota desde su base, del lado de la rama.
  const trunkBox = trunk.getBBox();
  const trunkX = trunkBox.x + trunkBox.width / 2;
  const leaf = (id: string) => {
    const el = part(id)!;
    const b = el.getBBox();
    const dx = b.x + b.width / 2 - trunkX;
    const origin = Math.abs(dx) < b.width * 0.5 ? "50% 100%" : dx > 0 ? "0% 100%" : "100% 100%";
    gsap.set(el, { transformOrigin: origin, scale: 0 });
    return el;
  };
  const stages = cfg.stages.map((ids) => ids.map(leaf));
  const bloom = cfg.bloom.map((id) => part(id)!).filter(Boolean);

  gsap.set(trunk, { clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(branch, { clipPath: "inset(0% 100% 0% 0%)" });
  gsap.set(bloom, { fill: "currentColor" });

  // Crecimiento por etapas: una unidad de tiempo por paso.
  const grow = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  grow.to(trunk, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power2.out" }, 0);
  grow.to(branch, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.out" }, 1);
  stages.forEach((leaves, i) => {
    if (leaves.length) grow.to(leaves, { scale: 1, duration: 0.35, stagger: 0.15, ease: ease.pop }, i + (i === 1 ? 0.35 : 0.05));
  });
  grow.to(bloom, { fill: CEIBO, duration: 0.4, stagger: 0.08 }, 3.5);

  if (desktop) {
    root.classList.add("is-pinned");
    gsap.set(steps, { opacity: (i: number) => (i === 0 ? 1 : cfg.inactiveOpacity) });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "center center",
        end: () => `+=${steps.length * cfg.scrollPerStep * window.innerHeight}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(grow, { progress: 1, duration: steps.length }, 0);
    steps.forEach((step, i) => {
      if (i > 0) {
        tl.to(steps[i - 1], { opacity: cfg.inactiveOpacity, duration: 0.15 }, i);
        tl.to(step, { opacity: 1, duration: 0.15 }, i);
      }
      if (lines[i]) tl.to(lines[i], { width: "100%", duration: 0.5, ease: "power2.out" }, i);
    });
    return () => root.classList.remove("is-pinned");
  }

  // Mobile: el árbol crece con el paso de la lista.
  const list = root.querySelector<HTMLElement>(".process-steps");
  gsap.to(grow, {
    progress: 1,
    ease: "none",
    scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
  });
  // B2: los pasos entran y salen de foco, nítidos solo en la franja central.
  for (const step of steps) {
    gsap
      .timeline({ scrollTrigger: { trigger: step, start: "top 90%", end: "bottom 10%", scrub: dof.scrub } })
      .fromTo(step, dof.enter, { opacity: 1, scale: 1, yPercent: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out" })
      .to(step, { duration: 0.3 })
      .to(step, { ...dof.exit, duration: 0.35, ease: "power2.in" });
    lines[steps.indexOf(step)]?.style.setProperty("width", "100%");
  }
};
