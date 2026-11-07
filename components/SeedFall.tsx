"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/load-gsap";

/**
 * Cómo vuela cada hoja.
 * - `release`: altura de pantalla (0 arriba, 1 abajo) a la que se suelta: cuando
 *   su lugar en el árbol sube hasta ahí. Así primero se ve el árbol entero y
 *   las hojas se sueltan de a una, en momentos distintos.
 * - `anchor`: altura de pantalla a la que aterriza en Contacto. En el medio la
 *   hoja baja despacio por la pantalla mientras la página sube, así que planea
 *   mucho más de lo que cae. La principal (hoja-1) va por el centro: el foco
 *   está en ella.
 * - `drift`: recorrido serpenteante en X, en fracciones del ancho de pantalla.
 * - `bob`: subidas y bajadas suaves, en px (como si el aire la sostuviera).
 * - `spin` / `flip`: giro en el plano y aleteo en 3D, en grados.
 */
type Flight = { release: number; anchor: number; zoom: number; drift: number[]; bob: number[]; spin: number[]; flip: number[] };

const FALL: Record<string, Flight> = {
  "hoja-1": {
    release: 0.2,
    anchor: 0.5,
    zoom: 1.6,
    drift: [0, 0.1, -0.08, 0.13, -0.05, 0.09, -0.04, 0],
    bob: [0, -34, 12, -26, 8, -18, 4, 0],
    spin: [0, 40, -30, 55, -20, 35, -10, 0],
    flip: [0, 55, 0, -45, 0, 40, 0, 0],
  },
  "hoja-3": {
    release: 0.15,
    anchor: 0.34,
    zoom: 1.35,
    drift: [0, -0.16, 0.06, -0.2, 0.1, -0.12, 0.04, 0],
    bob: [0, 24, -18, 30, -10, 16, -6, 0],
    spin: [0, -80, 20, -120, 40, -60, 15, 0],
    flip: [0, -60, 0, 50, 0, -40, 0, 0],
  },
  "hoja-5": {
    release: 0.27,
    anchor: 0.66,
    zoom: 1.45,
    drift: [0, 0.18, -0.06, 0.22, -0.1, 0.14, -0.03, 0],
    bob: [0, -28, 16, -36, 10, -20, 6, 0],
    spin: [0, 95, -35, 140, -40, 80, -15, 0],
    flip: [0, 50, 0, -60, 0, 45, 0, 0],
  },
  "hoja-6": {
    release: 0.23,
    anchor: 0.44,
    zoom: 1.25,
    drift: [0, -0.12, 0.15, -0.08, 0.18, -0.06, 0.08, 0],
    bob: [0, 20, -26, 14, -30, 10, -8, 0],
    spin: [0, -50, 70, -110, 60, -40, 20, 0],
    flip: [0, -45, 0, 55, 0, -35, 0, 0],
  },
};

/**
 * "¿Se te cayó una idea?": cuatro hojas del ceibo (sección roja) se sueltan
 * y planean hasta Contacto: serpentean, suben y bajan, giran y aletean. Al
 * cruzar al fondo blanco pasan de blanco a rojo y aterrizan desparramadas.
 * Mientras está activo, la sección roja suma un tramo libre debajo del árbol
 * (clase `seedfall` en <html>) para que tengan aire.
 * Sin JS o con reduced motion no se monta: las hojas ya están en Contacto.
 * GSAP se pide recién cuando la sección roja se acerca a la pantalla.
 */
export function SeedFall() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const html = document.documentElement;
    const section = document.getElementById("hacia-donde");
    const contact = document.getElementById("hablemos");
    if (!section || !contact) return;
    html.classList.add("seedfall");

    let cleanup: (() => void) | undefined;
    let cancelled = false;

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
            const restEl = slot.querySelector<HTMLElement>("[data-seed-rest]");
            const leaf = slot.querySelector<SVGElement>("[data-seed-leaf]");
            if (!cfg || !origin || !seed || !zoom || !restEl || !leaf) continue;
            // Ángulo con el que queda apoyada (lo aplica su contenedor, fijo).
            const rest = parseFloat(restEl.dataset.seedRest ?? "0");

            // Medidas en coordenadas del documento (se recalculan en cada refresh).
            const m = { dx: 0, dy: 0, s0: 1, start: 0, end: 1 };
            const measure = () => {
              const o = origin.getBoundingClientRect();
              const s = slot.getBoundingClientRect();
              const vh = window.innerHeight;
              const oy = o.top + window.scrollY + o.height / 2;
              const sy = s.top + window.scrollY + s.height / 2;
              m.dx = o.left + o.width / 2 - (s.left + s.width / 2);
              m.dy = oy - sy;
              m.s0 = Math.max(o.width / s.width, o.height / s.height);
              // Aterrizan, como tarde, cuando Contacto queda entero a la vista
              // (ahí se suele frenar el scroll); si el tramo queda corto, la hoja
              // se suelta un poco antes.
              const c = contact.getBoundingClientRect();
              const settled = c.bottom + window.scrollY - window.innerHeight;
              // Entre los dos puntos el recorrido es lineal en el documento: en
              // pantalla, la hoja baja de `release` a `anchor`, ya en su lugar.
              m.end = Math.min(sy - vh * cfg.anchor, settled);
              m.start = Math.min(oy - vh * cfg.release, m.end - vh * 0.5);
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
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                  onRefreshInit: measure,
                  onRefresh: paint,
                  onLeave: paint,
                  onLeaveBack: paint,
                },
              })
              // Recorrido base: del árbol a su lugar, al ritmo del scroll.
              .fromTo(seed, { x: () => m.dx, y: () => m.dy, scale: () => m.s0 }, { x: 0, y: 0, scale: 1, duration: 1 }, 0)
              // Vuelo: serpentea, sube y baja, aletea y se acerca un poco.
              .fromTo(
                zoom,
                { x: 0, y: 0, scale: 1, rotationY: 0, transformPerspective: 600 },
                {
                  keyframes: {
                    x: cfg.drift.map((f) => f * Math.min(window.innerWidth, 1440)),
                    y: cfg.bob,
                    rotationY: cfg.flip,
                    scale: [1, cfg.zoom * 0.85, cfg.zoom, cfg.zoom, cfg.zoom * 0.9, cfg.zoom * 0.8, 1.1, 1],
                    easeEach: "sine.inOut",
                  },
                  duration: 1,
                },
                0,
              )
              // Giro: arranca con la orientación que tenía en el árbol (−reposo)
              // y termina apoyada con su ángulo de reposo (0 propio).
              .fromTo(
                leaf,
                { rotation: -rest },
                {
                  keyframes: { rotation: cfg.spin.map((r, i, all) => r - rest * (1 - i / (all.length - 1))), easeEach: "sine.inOut" },
                  duration: 1,
                },
                0,
              );

            paint();
          }
        });

        ScrollTrigger.refresh();
        // Ya están en el árbol y pintadas: se muestran en lugar de las originales.
        requestAnimationFrame(() => !cancelled && html.classList.add("seedfall-ready"));
        cleanup = () => {
          ctx.revert();
          html.classList.remove("seedfall-ready");
        };
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
      html.classList.remove("seedfall");
    };
  }, []);

  return null;
}
