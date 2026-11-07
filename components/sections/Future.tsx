import { future } from "@/lib/content";

/**
 * Hacia dónde vamos: una franja roja, simple, con el mensaje.
 */
export function Future() {
  return (
    <section id="hacia-donde" data-header="red" aria-labelledby="future-title" className="bg-ceibo py-section text-white">
      <div className="wrap grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <h2 id="future-title" className="text-title font-medium text-balance lg:col-span-8" data-focus>
          <span className="block">{future.titleLead}</span> <span className="block">{future.titleAccent}</span>
        </h2>
        <p className="max-w-[24rem] text-lead text-white text-pretty lg:col-span-4 lg:justify-self-end" data-reveal>
          {future.body}
        </p>
      </div>
    </section>
  );
}
