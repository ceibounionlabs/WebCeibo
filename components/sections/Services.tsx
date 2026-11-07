import { services } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCards } from "@/components/services/ServiceCards";

/** Qué hacemos: tarjetas que se expanden (B3) con zoom al detalle (B3b). */
export function Services() {
  return (
    <section id="que-hacemos" data-header="light" data-nav="#que-hacemos" aria-labelledby="services-title" className="bg-white py-section text-ink">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <Eyebrow className="text-muted">{services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="mt-6 max-w-[16ch] text-title font-medium text-balance lg:mt-8" data-focus>
              {services.title}
            </h2>
          </div>
          <p className="max-w-[30rem] text-lead text-muted text-pretty lg:col-span-4 lg:col-start-9" data-reveal>
            {services.lead}
          </p>
        </div>
        <ServiceCards />
      </div>
    </section>
  );
}
