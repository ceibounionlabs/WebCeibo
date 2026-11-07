"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/load-gsap";

/**
 * Cómo cae cada hoja. `anchor` es la altura de pantalla (0 arriba, 1 abajo)
 * a la que queda mientras cae: cada hoja se suelta cuando su lugar en el
 * árbol llega a esa altura y baja a la velocidad del scroll, así quedan
 * desparramadas y se sueltan en momentos distintos. La principal (hoja-1)
 * cae en el centro: el foco está en ella.
 */
const FALL: Record<string, { anchor: number; zoom: number; sway: number[]; spin: number[] }> = {
  "hoja-1": { anchor: 0.5, zoom: 1.7, sway: [0, 26, -20, 22, -10, 0], spin: [0, 38, -24, 30, -12, 0] },
  "hoja-3": { anchor: 0.3, zoom: 1.35, sway: [0, -46, 30, -38, 18, 0], spin: [0, -70, 25, -60, 20, 0] },
  "hoja-5": { anchor: 0.68, zoom: 1.45, sway: [0, 54, -34, 40, -16, 0], spin: [0, 90, -40, 70, -10, 0] },
  "hoja-6": { anchor: 0.4, zoom: 1.25, sway: [0, -30, 44, -26, 20, 0], spin: [0, -45, 60, -90, 30, 0] },
};

/**
 * "¿Se te cayó una idea?": cuatro hojas del ceibo (sección roja) se sueltan
 * y caen hasta Contacto, meciéndose, girando y creciendo un poco. Al cruzar
 * al fondo blanco pasan de blanco a rojo y aterrizan desparramadas.
 * Sin JS o con reduced motion no se monta: las hojas ya están en Contacto.
 * GSAP se pide recién cuando la sección roja se acerca a la pantalla.
 */
export function SeedFall() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const section = document.getElementById("hacia-donde");
    const contact = document.getElementById("hablemos");
    if (!section || !contact) return;

    const start = () =>
      loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const slots = Array.from(document.querySelectorAll<HTMLElement>("[data-seed-slot]"));

        const ctx = gsap.context(() => {
          for (const slot of slots) {
            const id = slot.dataset.seedSlot ?? "";
            const cfg = FALL[id];
            const origin = document.querySelector<SVGGraphicsElement>(`[data-seed-origin="${id}"]`);
            const seed = slot.querySelector<HTMLElement>("[data-seed]");
            const zoom = slot.querySelector<HTMLElement>("[data-seed-zoom]");
            const leaf = slot.querySelector<SVGElement>("[data-seed-leaf]");
            if (!cfg || !origin || !seed || !zoom || !leaf) continue;
            const rest = parseFloat(leaf.style.rotate || "0");

            // Medidas en coordenadas del documento (se recalculan en cada refresh).
            const m = { dx: 0, dy: 0, s0: 1, start: 0, end: 1 };
            const measure = () => {
              const o = origin.getBoundingClientRect();
              const s = slot.getBoundingClientRect();
              const at = window.innerHeight * cfg.anchor;
              const oy = o.top + window.scrollY + o.height / 2;
              const sy = s.top + window.scrollY + s.height / 2;
              m.dx = o.left + o.width / 2 - (s.left + s.width / 2);
              m.dy = oy - sy;
              m.s0 = Math.max(o.width / s.width, o.height / s.height);
              // Todas aterrizan, como tarde, cuando Contacto queda entero a la vista
              // (ahí se suele frenar el scroll); si el tramo queda corto, la hoja
              // se suelta un poco antes.
              const c = contact.getBoundingClientRect();
              const settled = c.bottom + window.scrollY - window.innerHeight;
              m.end = Math.min(sy - at, settled);
              m.start = Math.min(oy - at, m.end - window.innerHeight * 0.35);
            };
            measure();

            // Blanca sobre el rojo, roja sobre el blanco de Contacto: según dónde
            // está la hoja en pantalla respecto del borde de la sección.
            const paint = () => {
              const r = leaf.getBoundingClientRect();
              leaf.classList.toggle("is-over-red", r.top + r.height / 2 < contact.getBoundingClientRect().top);
            };

            gsap
              .timeline({
                defaults: { ease: "none" },
                onUpdate: paint,
                scrollTrigger: {
                  start: () => m.start,
                  end: () => m.end,
                  scrub: true,
                  invalidateOnRefresh: true,
                  onRefreshInit: measure,
                  onRefresh: paint,
                  onLeave: paint,
                  onLeaveBack: paint,
                },
              })
              // Baja al ritmo del scroll: queda quieta a su altura de pantalla.
              .fromTo(seed, { x: () => m.dx, y: () => m.dy, scale: () => m.s0 }, { x: 0, y: 0, scale: 1, duration: 1 }, 0)
              // Se acerca un poco y vuelve a su tamaño al aterrizar.
              .fromTo(zoom, { scale: 1 }, { keyframes: { scale: [1, cfg.zoom, cfg.zoom, 1], easeEach: "sine.inOut" }, duration: 1 }, 0)
              // Se mece y gira; arranca con la orientación que tenía en el árbol.
              .fromTo(
                leaf,
                { x: 0, rotation: -rest },
                { keyframes: { x: cfg.sway, rotation: cfg.spin.map((r, i, all) => (i === all.length - 1 ? 0 : r - rest * (1 - i / (all.length - 1)))), easeEach: "sine.inOut" }, duration: 1 },
                0,
              );
            paint();
          }
        });

        ScrollTrigger.refresh();
        cleanup = () => ctx.revert();
      });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return null;
}
