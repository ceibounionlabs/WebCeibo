import { opticsSystem } from "@/lib/content";
import { whatsappHref } from "@/lib/site";
import { button } from "@/components/ui/button";
import { BtnArrow, WhatsAppIcon } from "@/components/ui/icons";

/**
 * El sistema para ópticas: qué es y, con frases que se escuchan en una
 * óptica, qué resuelve. Cierra con "Pedir una demo" (WhatsApp).
 */
export function OpticsSystem() {
  const demo = whatsappHref(opticsSystem.demo.message);

  return (
    <section
      id="sistema"
      data-header="light"
      data-nav="#sistema"
      aria-labelledby="sistema-title"
      className="section-rounded z-[1] bg-paper py-section text-ink"
    >
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="sistema-title" className="max-w-[16ch] text-title font-medium text-balance lg:col-span-7">
            {opticsSystem.title}
          </h2>
          <p className="max-w-[30rem] text-lead text-muted text-pretty lg:col-span-5">{opticsSystem.lead}</p>
        </div>

        <h3 className="mt-14 text-[1.375rem] font-medium tracking-[-0.015em] lg:mt-20">{opticsSystem.heard}</h3>
        <ul className="mt-6 border-t border-ink/10">
          {opticsSystem.items.map((item) => (
            <li key={item.quote} className="grid gap-4 border-b border-ink/10 py-8 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-9">
              <p className="text-[1.625rem] leading-[1.15] font-medium tracking-[-0.025em] text-balance lg:col-span-7 lg:text-[2.25rem]">
                <span className="text-ceibo">“</span>
                {item.quote}
                <span className="text-ceibo">”</span>
              </p>
              <div className="lg:col-span-5">
                <p className="text-[1.0625rem] leading-snug text-pretty lg:text-[1.1875rem]">{item.answer}</p>
                <p className={`mt-2 text-sm ${item.elena ? "font-medium text-ceibo" : "text-muted"}`}>{item.tag}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:mt-12">
          <a
            href={demo ?? "#hablemos"}
            className={button.primary}
            {...(demo ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
          >
            <WhatsAppIcon className="size-5" />
            {opticsSystem.demo.label}
            <BtnArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
