import { flashlight } from "@/lib/motion";
import type { Feature } from "../types";

/**
 * Grilla con linterna (B5).
 * Un único pointermove sobre la grilla actualiza --mx/--my; cada celda sabe
 * su desplazamiento (--cx/--cy) y dibuja la luz en su borde con un gradiente
 * radial recortado por máscara (ver globals.css). En touch, la luz va al
 * punto que se toca. Entrada: escala y opacidad en orden aleatorio.
 */
export const flashlightFeature: Feature = ({ gsap, ScrollTrigger, skipReveals }) => {
  const grid = document.querySelector<HTMLElement>("[data-flashlight]");
  if (!grid) return;
  const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", grid);

  const measure = () => {
    for (const cell of cells) {
      cell.style.setProperty("--cx", `${cell.offsetLeft}px`);
      cell.style.setProperty("--cy", `${cell.offsetTop}px`);
    }
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(grid);

  const move = (e: PointerEvent) => {
    const r = grid.getBoundingClientRect();
    grid.style.setProperty("--mx", `${e.clientX - r.left}px`);
    grid.style.setProperty("--my", `${e.clientY - r.top}px`);
    grid.classList.add("is-lit");
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") grid.classList.remove("is-lit");
  };
  grid.addEventListener("pointermove", move);
  grid.addEventListener("pointerdown", move);
  grid.addEventListener("pointerleave", leave);

  if (!skipReveals) {
    gsap.set(cells, flashlight.enter);
    ScrollTrigger.create({
      trigger: grid,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(cells, {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "lente",
          stagger: { amount: flashlight.staggerAmount, from: "random" },
          clearProps: "transform",
        }),
    });
  }

  return () => {
    ro.disconnect();
    grid.removeEventListener("pointermove", move);
    grid.removeEventListener("pointerdown", move);
    grid.removeEventListener("pointerleave", leave);
    grid.classList.remove("is-lit");
  };
};
