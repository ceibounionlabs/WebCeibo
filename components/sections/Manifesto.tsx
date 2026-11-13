import { manifesto } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

/**
 * Nosotros: el nombre en grande ("union" en rojo, la unión es el equipo) y,
 * al lado, una carta corta en primera persona, firmada.
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
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <p
          aria-hidden="true"
          className="text-[clamp(3.25rem,1rem+6vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.05em] lg:col-span-5"
        >
          <span className="block">ceibo</span>
          <span className="block text-ceibo">union</span>
          <span className="block">labs</span>
        </p>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="manifesto-title" className="max-w-[16ch] text-title font-medium text-balance">
            {manifesto.title}
          </h2>
          <p className="mt-6 max-w-[34rem] text-lead text-muted text-pretty">{manifesto.body}</p>
          <p className="mt-10 flex items-center gap-3 text-muted">
            <Logo variant="isotipo" label={null} className="h-9 shrink-0 text-ceibo" />
            {manifesto.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
