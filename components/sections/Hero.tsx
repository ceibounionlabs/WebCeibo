import { hero } from "@/lib/content";
import { button } from "@/components/ui/button";
import { BtnArrow } from "@/components/ui/icons";
import { HeroLens } from "@/components/hero/HeroLens";
import { LensChips } from "@/components/hero/LensChips";

/**
 * Hero "La lente" (5.3).
 * El título es el LCP: se pinta al instante en HTML y queda siempre visible.
 * Encima flota la lente: primero una lupa DOM y, si el dispositivo puede, la
 * lente 3D, que refracta una copia del lema calcada del título.
 *
 * Capas: título (z-1) · lente, DOM o 3D (z-2) · resto del contenido (z-3).
 */
export function Hero() {
  return (
    <section
      id="top"
      data-header="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      <HeroLens lead={hero.titleLead} accent={hero.titleAccent} />

      <div className="wrap relative flex flex-1 flex-col justify-end pt-[calc(var(--spacing-header)+3.5rem)] pb-28 sm:pb-32 lg:justify-center lg:pb-36">
        <p className="hero-in relative z-[3] flex items-center gap-3 text-xs font-medium tracking-[0.12em] text-white/70 uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="hero-rise relative z-[1] mt-6 max-w-[17ch] text-display font-medium text-balance sm:mt-8 lg:max-w-[19ch]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <span className="block" data-accent="false">
            {hero.titleLead}
          </span>{" "}
          <span className="block text-ceibo" data-accent="true">
            {hero.titleAccent}
          </span>
        </h1>

        <div className="relative z-[3] mt-8 flex flex-col gap-8 sm:mt-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-in max-w-[34rem] text-lead text-white/70" style={{ "--i": 2 } as React.CSSProperties}>
            {hero.lead}
          </p>
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="hero-in flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <a href="#hablemos" className={button.primary} data-magnetic>
                {hero.ctaPrimary}
                <BtnArrow />
              </a>
              <a href="#nosotros" className={button.ghostDark} data-magnetic>
                {hero.ctaSecondary}
                <BtnArrow />
              </a>
            </div>
            <LensChips />
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        className="hero-in absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-3 py-1 text-xs font-medium tracking-[0.08em] text-white/60 transition-colors hover:text-white lg:bottom-8"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        {hero.scrollCue}
        <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 bg-white motion-safe:animate-scroll-cue" />
        </span>
      </a>
    </section>
  );
}
