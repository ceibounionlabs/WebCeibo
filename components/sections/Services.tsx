import { services } from "@/lib/content";

/**
 * Qué hacemos: los tres tipos de software que hacemos, cada uno con un
 * ejemplo real, y un puente (en rojo) al sistema para ópticas.
 */
export function Services() {
  return (
    <section
      id="que-hacemos"
      data-header="light"
      data-nav="#que-hacemos"
      aria-labelledby="services-title"
      className="section-rounded z-[2] bg-white py-section text-ink"
    >
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="services-title" className="max-w-[18ch] text-title font-medium text-balance lg:col-span-7">
            {services.title}
          </h2>
          <p className="max-w-[28rem] text-lead text-muted text-pretty lg:col-span-5">{services.lead}</p>
        </div>

        <ul className="mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:pt-12">
          {services.items.map((item) => (
            <li key={item.title}>
              <h3 className="text-[1.625rem] leading-tight font-medium tracking-[-0.02em] lg:text-[2rem]">{item.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted text-pretty">{item.body}</p>
              <p className="mt-5 text-[0.9375rem] font-medium text-ceibo text-pretty">{item.note}</p>
            </li>
          ))}
        </ul>

        {/* Puente al sistema para ópticas */}
        <a
          href="#sistema"
          className="group mt-14 flex flex-col gap-5 rounded-card bg-ceibo px-6 py-7 text-white transition-colors duration-300 hover:bg-ceibo-deep sm:flex-row sm:items-center sm:justify-between lg:mt-20 lg:px-10 lg:py-9"
        >
          <span className="text-[1.5rem] leading-tight font-medium tracking-[-0.02em] text-balance lg:text-[2.25rem]">
            {services.bridge.lead}
          </span>
          <span className="inline-flex shrink-0 items-center gap-3 text-[0.9375rem] font-medium">
            {services.bridge.cta}
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full border border-white/40 transition-transform duration-300 ease-lente group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
