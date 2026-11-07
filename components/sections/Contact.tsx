import { contactSection as copy } from "@/lib/content";
import { contact, isPending, mailHref, whatsappHref } from "@/lib/site";
import { Confirmable } from "@/components/ui/Confirmable";
import { button } from "@/components/ui/button";
import { BtnArrow, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { isotipoParts } from "@/lib/brand";

/**
 * Hablemos: la "idea" (la hoja que se cayó del ceibo) apoyada sobre el título,
 * y los canales de contacto. La caída la anima components/SeedFall.tsx; sin
 * JS o con reduced motion, la hoja ya está acá.
 */
export function Contact() {
  const seed = isotipoParts(["hoja-1"]);
  const wa = whatsappHref();
  const mail = mailHref();
  const socials = [
    { label: "Instagram", value: contact.instagram },
    { label: "LinkedIn", value: contact.linkedin },
  ].filter((s) => s.value !== null);

  return (
    <section id="hablemos" data-header="light" aria-labelledby="contact-title" className="bg-white py-section text-ink">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-7">
          <div data-seed-slot aria-hidden="true" className="relative mb-6 h-14 lg:h-16" style={{ aspectRatio: seed.aspect }}>
            <div data-seed className="absolute inset-0 z-20">
              <div data-seed-zoom className="size-full">
                <svg data-seed-leaf viewBox={seed.viewBox} className="seed-leaf size-full text-ceibo">
                  <path d={seed.paths[0]?.d} fill="currentColor" fillRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
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
