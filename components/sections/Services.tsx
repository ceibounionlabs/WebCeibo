import { services } from "@/lib/content";
import { ServiceCards } from "@/components/services/ServiceCards";

/**
 * Qué hacemos: título a la izquierda (fijo al scrollear en desktop) y los
 * cuatro servicios como lista. Cada uno abre su detalle con un zoom (B3b).
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
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
            <h2 id="services-title" className="max-w-[15ch] text-title font-medium text-balance">
              {services.title}
            </h2>
            <p className="mt-6 max-w-[26rem] text-lead text-muted text-pretty">
              {services.lead}
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}
