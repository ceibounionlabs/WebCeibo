import { howWeWork } from "@/lib/content";
import { inlineSvg } from "@/lib/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Cómo trabajamos: el ceibo crece. Fase 1: árbol completo (las hojas de
 * arriba ya en rojo, la "flor") junto a los cuatro pasos. En la Fase 2 el
 * árbol crece con el scroll y el paso activo queda nítido.
 *
 * El isotipo va inline para poder animar sus piezas: [data-part="tronco"],
 * [data-part="rama"] y [data-part="hoja-1"] … [data-part="hoja-8"].
 */
export function HowWeWork() {
  return (
    <section id="como-trabajamos" aria-labelledby="process-title" className="bg-paper py-section text-ink">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <Eyebrow className="text-muted">{howWeWork.eyebrow}</Eyebrow>
            <h2 id="process-title" className="mt-6 max-w-[15ch] text-title font-medium text-balance lg:mt-8" data-reveal>
              {howWeWork.title}
            </h2>
          </div>
          <p className="max-w-[30rem] text-lead text-muted text-pretty lg:col-span-4 lg:col-start-9" data-reveal>
            {howWeWork.lead}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <div className="flex justify-center lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:justify-start">
              <div
                className="tree-bloom h-60 text-ink sm:h-72 lg:h-[min(68vh,36rem)]"
                data-tree
                data-reveal
                dangerouslySetInnerHTML={{ __html: inlineSvg("ceibo-isotipo.svg", "h-full w-auto") }}
              />
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7" data-steps>
            {howWeWork.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-ink/15 py-8 last:border-b sm:grid-cols-[4rem_1fr] lg:py-12"
                data-reveal
                data-step
              >
                <span aria-hidden="true" data-step-line className="absolute -top-px left-0 h-px w-0 bg-ceibo" />
                <span aria-hidden="true" className="pt-1.5 text-sm font-medium text-ceibo tabular-nums lg:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[2rem] leading-none font-medium tracking-[-0.03em] lg:text-[2.75rem]">{step.title}</h3>
                  <p className="mt-4 max-w-[28rem] text-lead text-muted text-pretty">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
