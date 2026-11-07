import { howWeWork } from "@/lib/content";
import { inlineSvg } from "@/lib/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listNumber } from "@/components/ui/button";

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
    <section id="como-trabajamos" data-header="light" data-nav="#como-trabajamos" aria-labelledby="process-title" className="bg-paper py-section text-ink">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <Eyebrow className="text-muted">{howWeWork.eyebrow}</Eyebrow>
            <h2 id="process-title" className="mt-6 max-w-[15ch] text-title font-medium text-balance lg:mt-8" data-focus>
              {howWeWork.title}
            </h2>
          </div>
          <p className="max-w-[30rem] text-lead text-muted text-pretty lg:col-span-4 lg:col-start-9" data-reveal>
            {howWeWork.lead}
          </p>
        </div>

        <div data-process className="process relative mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <div className="process-tree sticky top-0 z-10 -mx-4 flex justify-center bg-paper px-4 pt-4 pb-6 lg:static lg:col-span-5 lg:mx-0 lg:justify-start lg:p-0">
            <div
              className="tree-bloom h-44 text-ink sm:h-60 lg:h-[min(64vh,34rem)]"
              data-tree
              dangerouslySetInnerHTML={{ __html: inlineSvg("ceibo-isotipo.svg", "h-full w-auto overflow-visible") }}
            />
          </div>

          <ol className="process-steps lg:col-span-6 lg:col-start-7">
            {howWeWork.steps.map((step, i) => (
              <li
                key={step.title}
                className="process-step relative grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-ink/15 py-8 last:border-b sm:grid-cols-[4rem_1fr]"
                data-step
              >
                <span aria-hidden="true" data-step-line className="absolute -top-px left-0 h-px w-0 bg-ceibo" />
                <span aria-hidden="true" className="pt-1.5 text-sm font-medium text-muted tabular-nums lg:pt-2.5">
                  {listNumber(i)}
                </span>
                <div>
                  <h3 className="text-[2rem] leading-none font-medium tracking-[-0.03em] lg:text-[2.5rem]">{step.title}</h3>
                  <p className="mt-3 max-w-[28rem] text-lead text-muted text-pretty">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
