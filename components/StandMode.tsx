"use client";

import { useEffect } from "react";
import { stand } from "@/lib/motion";
import { getLenis } from "@/lib/scroll";

const SECTIONS = ["top", "nosotros", "que-hacemos", "lo-que-resolvemos", "como-trabajamos", "hacia-donde", "hablemos", "pie"];
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * 5.8 Modo stand (?stand=1): la web corre sola en una pantalla del stand.
 * Recorre las secciones con un auto-scroll lento (~8 s por sección) y vuelve
 * al principio en loop. Si alguien toca la pantalla o mueve el mouse, se
 * pausa 20 s. Sin header ni CTA flotante (CSS), con QR fijo (StandQr).
 */
export function StandMode() {
  useEffect(() => {
    if (document.documentElement.dataset.stand !== "1") return;
    const ms = stand.secondsPerSection * 1000;
    let index = 0;
    let timer = 0;
    let resume = 0;
    let paused = false;

    const targets = () => SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const go = (to: HTMLElement | number, seconds: number) => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(to, { duration: seconds, easing: easeInOut });
      else window.scrollTo({ top: typeof to === "number" ? to : to.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    };
    const step = () => {
      if (paused) return;
      const list = targets();
      index = (index + 1) % list.length;
      go(index === 0 ? 0 : list[index], index === 0 ? 3 : stand.secondsPerSection * 0.75);
      timer = window.setTimeout(step, ms);
    };
    const pause = () => {
      if (!paused) {
        paused = true;
        window.clearTimeout(timer);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(lenis.scroll, { immediate: true });
      }
      window.clearTimeout(resume);
      resume = window.setTimeout(() => {
        paused = false;
        // Retoma desde la sección más cercana.
        const list = targets();
        const y = window.scrollY + 10;
        index = Math.max(0, list.findLastIndex((el) => el.getBoundingClientRect().top + window.scrollY <= y));
        step();
      }, stand.pauseOnInteraction * 1000);
    };

    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, pause, { passive: true }));
    timer = window.setTimeout(step, ms);
    return () => {
      events.forEach((e) => window.removeEventListener(e, pause));
      window.clearTimeout(timer);
      window.clearTimeout(resume);
    };
  }, []);
  return null;
}
