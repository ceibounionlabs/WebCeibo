import { manifesto } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";

/**
 * Manifiesto "Enfoque". En la Fase 2 el párrafo se enfoca palabra por
 * palabra atado al scroll (data-focus-scrub).
 */
export function Manifesto() {
  return (
    <section id="nosotros" data-header="light" data-nav="#nosotros" aria-labelledby="manifesto-title" className="bg-paper py-section text-ink">
      <div className="wrap grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
        <Eyebrow className="text-muted lg:col-span-3 lg:pt-4">{manifesto.eyebrow}</Eyebrow>

        <div className="lg:col-span-9">
          <h2 id="manifesto-title" className="max-w-[20ch] text-title font-medium text-balance" data-focus>
            {manifesto.title}
          </h2>

          <p className="mt-10 text-manifesto text-pretty lg:mt-14" data-reveal data-focus-scrub>
            {manifesto.body}
          </p>

          <div className="mt-14 flex items-start gap-5 border-t border-ink/10 pt-8 lg:mt-20 lg:gap-6 lg:pt-10" data-reveal>
            <Logo variant="isotipo" label={null} className="h-12 shrink-0 text-ceibo lg:h-14" />
            <p className="max-w-[36rem] text-lead text-muted text-pretty">{manifesto.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
