import { marquee, redOpen } from "@/lib/motion";
import type { Feature } from "../types";

/**
 * B6: la sección roja arranca como tarjeta (margen 24px, radio 32px) y se
 * abre hasta ocupar la pantalla, atada al scroll (de "top bottom" a "top top").
 * Se usa clip-path: no recalcula layout en cada frame.
 */
export const redOpenFeature: Feature = ({ gsap }) => {
  const el = document.querySelector<HTMLElement>("[data-red-open]");
  if (!el) return;
  const { inset, radius } = redOpen;
  gsap.fromTo(
    el,
    { clipPath: `inset(${inset}px ${inset}px 0px ${inset}px round ${radius}px)` },
    {
      clipPath: "inset(0px 0px 0px 0px round 0px)",
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true },
    },
  );
};

/**
 * 5.6: marquesina. Avanza sola y acelera con la velocidad del scroll; cambia
 * de dirección cuando el usuario sube o baja.
 */
export const marqueeFeature: Feature = ({ gsap, ScrollTrigger }) => {
  const track = document.querySelector<HTMLElement>("[data-marquee]");
  if (!track) return;
  const loop = gsap.to(track, { xPercent: -50, duration: marquee.baseDuration, ease: "none", repeat: -1 });
  let direction = 1;
  const trigger = ScrollTrigger.create({
    trigger: track,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      direction = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) * marquee.velocityFactor, marquee.maxBoost);
      gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.25, overwrite: true });
      gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.25, ease: "power2.out" });
    },
    onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
  });
  return () => trigger.kill();
};
