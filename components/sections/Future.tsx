import { future } from "@/lib/content";
import { isotipoParts } from "@/lib/brand";

const TREE = ["tronco", "rama", "hoja-1", "hoja-2", "hoja-3", "hoja-4", "hoja-5", "hoja-6", "hoja-7", "hoja-8"] as const;

/**
 * Hacia dónde vamos: franja roja con el mensaje y el ceibo en blanco.
 * La hoja de la punta (hoja-1) es la "idea" que se cae hasta Contacto
 * (components/SeedFall.tsx). Acá queda su lugar marcado, invisible: es el
 * punto de partida de la caída.
 */
export function Future() {
  const tree = isotipoParts(TREE);
  return (
    <section id="hacia-donde" data-header="red" aria-labelledby="future-title" className="bg-ceibo py-section text-white">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-7">
          <h2 id="future-title" className="text-title font-medium text-balance">
            <span className="block">{future.titleLead}</span> <span className="block">{future.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-[24rem] text-lead text-white text-pretty">{future.body}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          <svg aria-hidden="true" viewBox={tree.viewBox} className="h-56 w-auto lg:h-80" style={{ aspectRatio: tree.aspect }}>
            {tree.paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="currentColor"
                fillRule="evenodd"
                {...(p.id === "hoja-1" ? { "data-seed-origin": "", opacity: 0 } : {})}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
