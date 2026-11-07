import { future } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Hacia dónde vamos (sección roja). Fase 1: marquesina estática. En la
 * Fase 2 se mueve según la velocidad y dirección del scroll.
 */
export function Future() {
  const phrase = future.marquee.replace(/\s*·\s*$/, "");
  return (
    <section id="hacia-donde" data-header="red" aria-labelledby="future-title" className="overflow-hidden bg-ceibo py-section text-white">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-8">
          <Eyebrow className="text-white">{future.eyebrow}</Eyebrow>
          <h2 id="future-title" className="mt-6 text-title font-medium text-balance lg:mt-8" data-focus>
            <span className="block">{future.titleLead}</span> <span className="block">{future.titleAccent}</span>
          </h2>
        </div>
        <p className="max-w-[24rem] text-lead text-white text-pretty lg:col-span-4 lg:col-start-9" data-reveal>
          {future.body}
        </p>
      </div>

      <p className="sr-only">{phrase}</p>
      <div aria-hidden="true" className="mt-16 flex select-none lg:mt-24" data-marquee>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 text-marquee font-medium whitespace-nowrap" data-marquee-copy>
            {[0, 1].map((n) => (
              <span key={n} className="pr-[0.3em]">
                {future.marquee}
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
