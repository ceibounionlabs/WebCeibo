"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/load-gsap";

/**
 * "¿Se te cayó una idea?": la hoja de la punta del ceibo (sección roja) se
 * suelta cuando llega al centro de la pantalla y cae hasta Contacto.
 * - Mientras cae baja a la misma velocidad que el scroll, así queda fija en
 *   el centro (el foco está en la hoja), meciéndose, girando y creciendo.
 * - Al cruzar al fondo blanco pasa de blanco a rojo y aterriza sobre el título.
 * Sin JS o con reduced motion no se monta: la hoja ya está en Contacto.
 * GSAP se pide recién cuando la sección roja se acerca a la pantalla.
 */
export function SeedFall() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const section = document.getElementById("hacia-donde");
    if (!section) return;

    const start = () => loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const origin = document.querySelector<SVGGraphicsElement>("[data-seed-origin]");
      const slot = document.querySelector<HTMLElement>("[data-seed-slot]");
      const seed = slot?.querySelector<HTMLElement>("[data-seed]");
      const zoom = slot?.querySelector<HTMLElement>("[data-seed-zoom]");
      const leaf = slot?.querySelector<SVGElement>("[data-seed-leaf]");
      const contact = document.getElementById("hablemos");
      if (!origin || !slot || !seed || !zoom || !leaf || !contact) return;

      // Medidas en coordenadas del documento (se recalculan en cada refresh).
      const m = { dx: 0, dy: 0, s0: 1, start: 0, end: 1, boundary: 0 };
      const measure = () => {
        const o = origin.getBoundingClientRect();
        const s = slot.getBoundingClientRect();
        const half = window.innerHeight / 2;
        const oy = o.top + window.scrollY + o.height / 2;
        const sy = s.top + window.scrollY + s.height / 2;
        m.dx = o.left + o.width / 2 - (s.left + s.width / 2);
        m.dy = oy - sy;
        m.s0 = o.height / s.height;
        m.start = oy - half;
        m.end = sy - half;
        m.boundary = contact.getBoundingClientRect().top + window.scrollY - half;
      };
      measure();

      const ctx = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              start: () => m.start,
              end: () => m.end,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: measure,
            },
          })
          // Baja al ritmo del scroll: queda quieta en el centro de la pantalla.
          .fromTo(seed, { x: () => m.dx, y: () => m.dy, scale: () => m.s0 }, { x: 0, y: 0, scale: 1, duration: 1 }, 0)
          // Se acerca (foco) y vuelve a su tamaño al aterrizar.
          .fromTo(zoom, { scale: 1 }, { keyframes: { scale: [1, 1.7, 1.7, 1], easeEach: "sine.inOut" }, duration: 1 }, 0)
          // Se mece y gira como una hoja que cae.
          .fromTo(
            leaf,
            { x: 0, rotation: 0 },
            { keyframes: { x: [0, 26, -20, 22, -10, 0], rotation: [0, 38, -24, 30, -12, 6], easeEach: "sine.inOut" }, duration: 1 },
            0,
          );

        // Blanca sobre el rojo, roja sobre el blanco de Contacto: cambia cuando
        // la hoja (en el centro de la pantalla) cruza el borde entre secciones.
        const paint = () => leaf.classList.toggle("is-over-red", window.scrollY < m.boundary);
        ScrollTrigger.create({
          start: () => m.boundary,
          onEnter: paint,
          onLeaveBack: paint,
          onRefresh: paint,
        });
        paint();
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
