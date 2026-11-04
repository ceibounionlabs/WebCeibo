import { nav } from "@/lib/content";
import { contact, isPending, mailHref, site, whatsappHref } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Confirmable } from "@/components/ui/Confirmable";
import { ArrowUp } from "@/components/ui/icons";

const link = "text-white/80 transition-colors duration-300 hover:text-white";

export function Footer() {
  const wa = whatsappHref();
  const mail = mailHref();
  const socials = [
    { label: "Instagram", value: contact.instagram },
    { label: "LinkedIn", value: contact.linkedin },
  ].filter((s) => s.value !== null);

  return (
    <footer id="pie" className="border-t border-white/10 bg-ink text-white">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-5">
          <Logo className="h-14 lg:h-16" />
          <p className="mt-6 max-w-[22rem] text-sm text-white/60 text-pretty">{site.tagline}</p>
        </div>

        <nav aria-labelledby="footer-nav" className="lg:col-span-3 lg:col-start-7">
          <h2 id="footer-nav" className="text-sm font-medium text-white/60">
            Secciones
          </h2>
          <ul className="mt-4 space-y-2.5">
            {[...nav, { href: "#hablemos", label: "Hablemos" }].map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-medium text-white/60">Contacto</h2>
          <ul className="mt-4 space-y-2.5">
            <li>{mail ? <a href={mail} className={link}>{String(contact.email)}</a> : <span className="text-white/80"><Confirmable value={contact.email} /></span>}</li>
            <li>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp
                </a>
              ) : (
                <span className="text-white/80">
                  WhatsApp <Confirmable value={contact.whatsapp} />
                </span>
              )}
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                {isPending(s.value) || !s.value ? (
                  <span className="text-white/80">
                    {s.label} <Confirmable value={s.value ?? ""} />
                  </span>
                ) : (
                  <a href={s.value} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.year} {site.name} · <Confirmable value={site.city} />
        </p>
        <a href="#top" className={`inline-flex items-center gap-2 ${link}`}>
          Volver arriba
          <ArrowUp className="size-3.5" />
        </a>
      </div>
    </footer>
  );
}
