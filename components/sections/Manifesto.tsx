import { manifesto } from "@/lib/content";

/**
 * Nosotros: la idea del ceibo en una frase y, en una fila, sus tres partes
 * (raíces, tronco, ramas) contadas como la historia del equipo.
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
          <h2 id="manifesto-title" className="max-w-[18ch] text-title font-medium text-balance lg:col-span-7">
            {manifesto.title}
          </h2>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lead text-muted text-pretty">{manifesto.body}</p>
          </div>
        </div>

        <ol className="mt-16 grid gap-10 border-t border-ink/10 pt-12 lg:mt-24 lg:grid-cols-3 lg:gap-x-10">
          {manifesto.parts.map((part) => (
            <li key={part.label}>
              <h3 className="text-sm font-medium text-ceibo">{part.label}</h3>
              <p className="mt-4 text-[1.375rem] leading-snug font-medium tracking-[-0.015em] text-pretty lg:text-[1.5rem]">{part.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
