import { contactSection as copy } from "@/lib/content";
import { contact, isPending, mailHref, whatsappHref } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Confirmable } from "@/components/ui/Confirmable";
import { button } from "@/components/ui/button";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/ContactForm";

/** Hablemos: el objetivo de toda la web. */
export function Contact() {
  const wa = whatsappHref();
  const mail = mailHref();
  const socials = [
    { label: "Instagram", value: contact.instagram },
    { label: "LinkedIn", value: contact.linkedin },
  ].filter((s) => s.value !== null);

  return (
    <section id="hablemos" aria-labelledby="contact-title" className="bg-ink py-section text-white">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6">
          <Eyebrow className="text-white/70">{copy.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="mt-6 text-title font-medium text-balance lg:mt-8" data-reveal>
            <span className="block">{copy.titleLead}</span> <span className="block text-ceibo">{copy.titleAccent}</span>
          </h2>
          <p className="mt-8 max-w-[32rem] text-lead text-white/70 text-pretty lg:mt-10" data-reveal>
            {copy.bodyBefore} <Confirmable value={contact.responseTime} confirmed={contact.responseTimeConfirmed} />.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-reveal>
            <a
              href={wa ?? "#contacto-form"}
              className={button.primary}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
            >
              <WhatsAppIcon className="size-5" />
              {copy.whatsappLabel}
            </a>
            <a href={mail ?? "#contacto-form"} className={button.ghostDark}>
              <MailIcon className="size-5" />
              <Confirmable value={contact.email} />
            </a>
          </div>
          {!wa && (
            <p className="mt-3 text-sm text-white/60">
              WhatsApp: <Confirmable value={contact.whatsapp} />
            </p>
          )}

          {socials.length > 0 && (
            <div className="mt-14 border-t border-white/10 pt-8" data-reveal>
              <h3 className="text-sm font-medium text-white/60">{copy.socialTitle}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    {isPending(s.value) || !s.value ? (
                      <span className="text-white/80">
                        {s.label} <Confirmable value={s.value ?? ""} />
                      </span>
                    ) : (
                      <a href={s.value} target="_blank" rel="noopener noreferrer" className="text-white/80 underline-offset-4 hover:text-white hover:underline">
                        {s.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
