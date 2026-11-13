import { services } from "@/lib/content";

/**
 * Qué hacemos: qué hacemos y, en tres puntos, por qué con nosotros (lo
 * probamos en el laboratorio, hablás con quien programa, conocemos el rubro).
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
          {services.points.map((point) => (
            <li key={point.title}>
              <h3 className="text-[1.625rem] leading-tight font-medium tracking-[-0.02em] text-balance lg:text-[2rem]">{point.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted text-pretty">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
