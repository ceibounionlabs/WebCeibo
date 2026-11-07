import { howWeWork } from "@/lib/content";
import { isotipoParts } from "@/lib/brand";

/**
 * Las cuatro etapas de la planta, armadas con piezas del isotipo:
 * semilla (la hoja de la punta), brote (las tres de arriba), árbol chico
 * (tronco con sus hojas) y el ceibo completo, que florece con un glow.
 */
const TOP = ["hoja-1", "hoja-2", "hoja-3"];
const stages = [
  { parts: ["hoja-1"], height: "h-12 lg:h-14", tone: "text-ceibo-100" },
  { parts: TOP, height: "h-20 lg:h-24", tone: "text-ceibo-200" },
  { parts: ["tronco", ...TOP, "hoja-4", "hoja-6"], height: "h-32 lg:h-40", tone: "text-ceibo-300" },
  { parts: ["tronco", "rama", ...TOP, "hoja-4", "hoja-5", "hoja-6", "hoja-7", "hoja-8"], height: "h-44 lg:h-56", tone: "text-ceibo" },
] as const;

/**
 * Cómo trabajamos: de la semilla a la flor (5.5, formato de la referencia).
 * Todo visible de entrada, sin pin ni animaciones de aparición. El único
 * brillo es el del ceibo florecido.
 */
export function HowWeWork() {
  return (
    <section
      id="como-trabajamos"
      data-header="dark"
      data-nav="#como-trabajamos"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-corteza py-section text-white"
    >
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="process-title" className="max-w-[16ch] text-title font-medium text-balance lg:col-span-7">
            {howWeWork.title}
          </h2>
          <p className="max-w-[32rem] text-lead text-white/75 text-pretty lg:col-span-5 lg:justify-self-end">
            {howWeWork.lead}
          </p>
        </div>

        <ol className="relative mt-14 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-24 lg:grid-cols-4 lg:gap-x-10">
          {/* Línea de suelo compartida (desktop). */}
          <span aria-hidden="true" className="process-ground absolute inset-x-0 top-56 hidden h-0.5 origin-left lg:block" />
          {howWeWork.steps.map((step, i) => {
            const stage = stages[i];
            const art = isotipoParts(stage.parts);
            const last = i === stages.length - 1;
            return (
              <li key={step.title} className="relative">
                <div className="relative flex items-end border-b-2 border-white/15 pt-4 sm:h-44 sm:pt-0 lg:h-56 lg:border-0">
                  {last && <span aria-hidden="true" className="process-glow" />}
                  <svg
                    aria-hidden="true"
                    viewBox={art.viewBox}
                    className={`relative w-auto ${stage.height} ${stage.tone} ${last ? "process-bloom" : ""}`}
                  >
                    {art.paths.map((p) => (
                      <path key={p.id} d={p.d} fill="currentColor" fillRule="evenodd" />
                    ))}
                  </svg>
                </div>
                <div className="mt-8 lg:mt-10">
                  <span aria-hidden="true" className="text-sm font-medium tracking-[0.18em] text-ceibo-200 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.75rem] leading-tight font-medium tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-[22rem] text-white/75 text-pretty">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
