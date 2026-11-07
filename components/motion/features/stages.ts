import { ease } from "@/lib/motion";
import type { Feature } from "../types";

/**
 * Cómo trabajamos: la primera vez que la sección entra en pantalla, la línea
 * de suelo se dibuja de izquierda a derecha y las plantas brotan en orden,
 * de la semilla a la flor; al final aparece el glow del ceibo. Sin pin:
 * todo queda visible y quieto después.
 */
export const stagesFeature: Feature = ({ gsap, ScrollTrigger, skipReveals }) => {
  const root = document.querySelector<HTMLElement>("[data-stages]");
  if (!root || skipReveals) return;
  const plants = gsap.utils.toArray<SVGElement>("[data-plant]", root);
  const ground = root.querySelector("[data-ground]");
  const glow = root.querySelector("[data-glow]");

  gsap.set(plants, { scale: 0, transformOrigin: "50% 100%" });
  if (glow) gsap.set(glow, { opacity: 0 });
  if (ground) gsap.set(ground, { scaleX: 0 });

  const tl = gsap.timeline({ paused: true });
  if (ground) tl.to(ground, { scaleX: 1, duration: 1.2, ease: "lente" }, 0);
  tl.to(plants, { scale: 1, duration: 0.9, ease: ease.pop, stagger: 0.28 }, 0.2);
  if (glow) tl.to(glow, { opacity: 1, duration: 1.2, ease: "power2.out" }, ">-0.3");

  ScrollTrigger.create({ trigger: root, start: "top 75%", once: true, onEnter: () => tl.play() });
};
