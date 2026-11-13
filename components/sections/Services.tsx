import { services } from "@/lib/content";
import { whatsappHref } from "@/lib/site";
import { button } from "@/components/ui/button";
import { BtnArrow, WhatsAppIcon } from "@/components/ui/icons";

/**
 * Qué hacemos: frases que se escuchan en una óptica y, al lado, qué hacemos
 * con cada una. Cierra con "Pedir una demo" (WhatsApp) y "Contanos la tuya".
 */
export function Services() {
  const demo = whatsappHref(services.demo.message);

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
          <h2 id="services-title" className="text-title font-medium text-balance lg:col-span-7">
            {services.title}
          </h2>
          <p className="max-w-[28rem] text-lead text-muted text-pretty lg:col-span-5">{services.lead}</p>
        </div>

        <ul className="mt-12 border-t border-ink/10 lg:mt-16">
          {services.items.map((item) => (
            <li key={item.quote} className="grid gap-4 border-b border-ink/10 py-8 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-9">
              <p className="text-[1.625rem] leading-[1.15] font-medium tracking-[-0.025em] text-balance lg:col-span-7 lg:text-[2.25rem]">
                <span className="text-ceibo">“</span>
                {item.quote}
                <span className="text-ceibo">”</span>
              </p>
              <div className="lg:col-span-5">
                <p className="text-[1.0625rem] leading-snug text-pretty lg:text-[1.1875rem]">{item.answer}</p>
                <p className="mt-2 text-sm text-muted">{item.tag}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-12">
          <a
            href={demo ?? "#hablemos"}
            className={button.primary}
            {...(demo ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
          >
            <WhatsAppIcon className="size-5" />
            {services.demo.label}
            <BtnArrow />
          </a>
          <a href="#hablemos" className={button.ghostLight}>
            {services.more}
            <BtnArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
