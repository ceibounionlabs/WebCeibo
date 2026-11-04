import { services } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Qué hacemos. Fase 1: grilla (1 columna en mobile, 2 en tablet, 4 en
 * desktop). En la Fase 2, en desktop la fila se pinea y se desplaza en X.
 */
export function Services() {
  return (
    <section id="que-hacemos" aria-labelledby="services-title" className="bg-white py-section text-ink">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <Eyebrow className="text-muted">{services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="mt-6 max-w-[16ch] text-title font-medium text-balance lg:mt-8" data-reveal>
              {services.title}
            </h2>
          </div>
          <p className="max-w-[30rem] text-lead text-muted text-pretty lg:col-span-4 lg:col-start-9" data-reveal>
            {services.lead}
          </p>
        </div>

        {/* subgrid: número, título y texto quedan alineados entre tarjetas */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5" data-cards-track>
          {services.cards.map((card, i) => (
            <li
              key={card.title}
              data-reveal
              className="group row-span-3 grid grid-rows-subgrid gap-y-0 rounded-[1.75rem] bg-paper p-7 transition-colors duration-300 ease-[var(--ease-main)] hover:bg-ceibo hover:text-white lg:p-8"
            >
              <span
                aria-hidden="true"
                className="min-h-[7.5rem] origin-top-left text-[3.25rem] leading-none font-medium tracking-[-0.04em] text-ceibo tabular-nums transition-[color,scale] duration-300 ease-[var(--ease-main)] group-hover:scale-115 group-hover:text-white sm:min-h-[10rem] lg:min-h-[13rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="self-end text-[1.5rem] leading-tight font-medium tracking-[-0.02em] lg:text-[1.625rem]">{card.title}</h3>
              <p className="mt-3 text-muted transition-colors duration-300 group-hover:text-white">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
