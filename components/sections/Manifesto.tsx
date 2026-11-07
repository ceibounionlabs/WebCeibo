import { manifesto } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";

const total = String(manifesto.statements.length).padStart(2, "0");

/**
 * Nosotros (B1): tres enunciados. En desktop, con el motor activo, la
 * sección se pinea y pasan de a uno, con contador "01 / 03" y línea de
 * progreso (components/motion/features/statements.ts). En mobile, con
 * reduced motion o sin JS, quedan apilados y legibles.
 * Después, el texto "Como el ceibo…" como bajada.
 */
export function Manifesto() {
  return (
    <section id="nosotros" data-header="light" data-nav="#nosotros" aria-labelledby="manifesto-title" className="section-rounded z-[3] bg-paper text-ink">
      <div data-statements className="statements wrap flex flex-col pt-section">
        <div className="flex items-center justify-between gap-6">
          <Eyebrow className="text-muted">{manifesto.eyebrow}</Eyebrow>
          <p className="statements-counter text-sm leading-none font-medium text-muted tabular-nums" aria-hidden="true">
            <span className="flex items-center">
              0
              <span className="inline-block h-[1em] overflow-hidden">
                <span data-counter-roll className="flex flex-col">
                  {manifesto.statements.map((_, i) => (
                    <span key={i} className="block h-[1em] leading-none">
                      {i + 1}
                    </span>
                  ))}
                </span>
              </span>
              <span className="px-1.5">/</span>
              {total}
            </span>
          </p>
        </div>
        <div className="statements-progress relative mt-5 h-px bg-ink/10" aria-hidden="true">
          <span data-statements-progress className="absolute inset-0 origin-left scale-x-0 bg-ceibo" />
        </div>

        <ol className="statements-list mt-12 space-y-12 lg:mt-16 lg:space-y-16">
          {manifesto.statements.map((text, i) => (
            <li key={i} data-statement className="statement">
              <p className="max-w-[24ch] text-statement font-medium text-balance">
                <span className="mr-4 align-top text-sm font-medium tracking-normal text-muted tabular-nums lg:hidden">{String(i + 1).padStart(2, "0")}.</span>
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap grid gap-y-8 pt-section pb-section lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-9 lg:col-start-4">
          <h2 id="manifesto-title" className="max-w-[20ch] text-title font-medium text-balance" data-focus>
            {manifesto.title}
          </h2>
          <p className="mt-8 max-w-[44rem] text-lead text-muted text-pretty lg:mt-10" data-reveal>
            {manifesto.body}
          </p>
          <div className="mt-12 flex items-start gap-5 border-t border-ink/10 pt-8 lg:mt-16 lg:gap-6 lg:pt-10" data-reveal>
            <Logo variant="isotipo" label={null} className="h-12 shrink-0 text-ceibo lg:h-14" />
            <p className="max-w-[36rem] text-lead text-muted text-pretty">{manifesto.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
