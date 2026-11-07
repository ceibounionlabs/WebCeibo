import { contactSection as copy } from "@/lib/content";
import { contact, isPending, mailHref, whatsappHref } from "@/lib/site";
import { Confirmable } from "@/components/ui/Confirmable";
import { button } from "@/components/ui/button";
import { BtnArrow, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
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
    <section id="hablemos" data-header="light" aria-labelledby="contact-title" className="bg-white py-section text-ink">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6">
          <h2 id="contact-title" className="text-title font-medium text-balance lg:mt-8">
            <span className="block">{copy.titleLead}</span> <span className="block text-ceibo">{copy.titleAccent}</span>
          </h2>
          <p className="mt-8 max-w-[32rem] text-lead text-muted text-pretty lg:mt-10">
            {copy.bodyBefore} <Confirmable value={contact.responseTime} confirmed={contact.responseTimeConfirmed} />.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={wa ?? "#contacto-form"}
              className={button.primary}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
            >
              <WhatsAppIcon className="size-5" />
              {copy.whatsappLabel}
              <BtnArrow />
            </a>
            <a href={mail ?? "#contacto-form"} className={button.ghostLight}>
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
            <div className="mt-14 border-t border-ink/10 pt-8">
              <h3 className="text-sm font-medium text-muted">{copy.socialTitle}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    {isPending(s.value) || !s.value ? (
                      <span className="text-ink/80">
                        {s.label} <Confirmable value={s.value ?? ""} />
                      </span>
                    ) : (
                      <a href={s.value} target="_blank" rel="noopener noreferrer" className="text-ink/80 underline-offset-4 hover:text-ink hover:underline">
                        {s.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
