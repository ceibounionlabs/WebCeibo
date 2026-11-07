import { hero } from "@/lib/content";
import { HeroLens } from "@/components/hero/HeroLens";

/**
 * Hero "La lente" (5.3), sobre el marrón corteza, plano.
 * El título es el LCP: se pinta al instante en HTML y queda siempre visible.
 * Encima flota la lente: primero una lupa DOM y, si el dispositivo puede, la
 * lente 3D, que refracta una copia del lema calcada del título.
 *
 * Capas: título (z-1) · lente, DOM o 3D (z-2) · resto del contenido (z-3).
 */
export function Hero() {
  return (
    <section id="top" data-header="dark" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-corteza text-white">
      <HeroLens lead={hero.titleLead} accent={hero.titleAccent} />

      <div className="wrap relative flex flex-1 flex-col justify-end pt-[calc(var(--spacing-header)+3.5rem)] pb-20 sm:pb-24 lg:justify-center lg:pb-28">
        <h1
          id="hero-title"
          className="relative z-[1] max-w-[17ch] text-display font-medium text-balance lg:max-w-[19ch]"
        >
          <span className="block" data-accent="false">
            {hero.titleLead}
          </span>{" "}
          <span className="block text-ceibo" data-accent="true">
            {hero.titleAccent}
          </span>
        </h1>

        <p className="relative z-[3] mt-8 max-w-[34rem] text-lead text-white/75 sm:mt-10 lg:mt-12">
          {hero.lead}
        </p>
      </div>
    </section>
  );
}
