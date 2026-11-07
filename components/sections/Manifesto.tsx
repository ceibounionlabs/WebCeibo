import { manifesto } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

/**
 * Nosotros (B1, simplificado): título y texto, y los tres enunciados en una
 * fila. Sin pin ni contador: se lee de un vistazo.
 */
export function Manifesto() {
  return (
    <section
      id="nosotros"
      data-header="light"
      data-nav="#nosotros"
      aria-labelledby="manifesto-title"
      className="section-rounded z-[3] bg-paper py-section text-ink"
    >
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="manifesto-title" className="max-w-[18ch] text-title font-medium text-balance lg:col-span-7" data-focus>
            {manifesto.title}
          </h2>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lead text-muted text-pretty" data-reveal>
              {manifesto.body}
            </p>
            <div className="mt-8 flex items-start gap-4" data-reveal>
              <Logo variant="isotipo" label={null} className="h-10 shrink-0 text-ceibo" />
              <p className="text-ink/80 text-pretty">{manifesto.closing}</p>
            </div>
          </div>
        </div>

        <ol className="mt-16 grid gap-10 border-t border-ink/10 pt-12 lg:mt-24 lg:grid-cols-3 lg:gap-x-10">
          {manifesto.statements.map((text, i) => (
            <li key={i} data-reveal>
              <span aria-hidden="true" className="text-sm font-medium tracking-[0.18em] text-ceibo tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[1.375rem] leading-snug font-medium tracking-[-0.015em] text-pretty lg:text-[1.5rem]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
