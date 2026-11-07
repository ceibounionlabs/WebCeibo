import { contactSection as copy } from "@/lib/content";
import { contact, isPending, mailHref, whatsappHref } from "@/lib/site";
import { Confirmable } from "@/components/ui/Confirmable";
import { button } from "@/components/ui/button";
import { BtnArrow, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { LeafSlot } from "@/components/LeafSlot";

/**
 * Hablemos: las hojas que se cayeron del ceibo quedan desparramadas en la
 * sección (la principal, la "idea", sobre el título), y los canales de
 * contacto. La caída la anima components/SeedFall.tsx; sin JS o con reduced
 * motion, las hojas ya están acá.
 */
export function Contact() {
  const wa = whatsappHref();
  const mail = mailHref();
  const socials = [
    { label: "Instagram", value: contact.instagram },
    { label: "LinkedIn", value: contact.linkedin },
  ].filter((s) => s.value !== null);

  return (
    <section id="hablemos" data-header="light" aria-labelledby="contact-title" className="bg-white py-section text-ink">
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        {/* Hojas caídas, desparramadas */}
        <LeafSlot id="hoja-3" rest={58} className="absolute top-3 left-[5.5rem] h-9 lg:top-1 lg:left-[7rem] lg:h-11" />
        <LeafSlot id="hoja-5" rest={-34} className="absolute top-0 right-6 h-10 lg:-top-10 lg:right-[38%] lg:h-12" />
        <LeafSlot id="hoja-6" rest={112} className="absolute right-10 bottom-6 h-9 lg:right-auto lg:bottom-auto lg:top-[62%] lg:left-[49%] lg:h-10" />

        <div className="lg:col-span-7">
          <LeafSlot id="hoja-1" className="relative mb-6 h-14 lg:h-16" />
          <h2 id="contact-title" className="text-title font-medium text-balance">
            <span className="block">{copy.titleLead}</span> <span className="block text-ceibo">{copy.titleAccent}</span>
          </h2>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-3">
            <a
              href={wa ?? "#hablemos"}
              className={button.primary}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
            >
              <WhatsAppIcon className="size-5" />
              {copy.whatsappLabel}
              <BtnArrow />
            </a>
            <a href={mail ?? "#hablemos"} className={button.ghostLight}>
              <MailIcon className="size-5" />
              <Confirmable value={contact.email} />
              <BtnArrow />
            </a>
          </div>
          {!wa && (
            <p className="mt-3 text-sm text-muted">
              WhatsApp: <Confirmable value={contact.whatsapp} />
            </p>
          )}

          {socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/10 pt-6">
              {socials.map((s) => (
                <li key={s.label}>
                  {isPending(s.value) || !s.value ? (
                    <span className="text-ink/80">
                      {s.label} <Confirmable value={s.value ?? ""} />
                    </span>
                  ) : (
                    <a
                      href={s.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink/80 underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {s.label === "Instagram" && <InstagramIcon className="size-4" />}
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
