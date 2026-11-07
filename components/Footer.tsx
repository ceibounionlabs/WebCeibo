import { footer, nav } from "@/lib/content";
import { contact, isPending, mailHref, site, whatsappHref } from "@/lib/site";
import { leafShapes } from "@/lib/brand";
import { Logo } from "@/components/ui/Logo";
import { Confirmable } from "@/components/ui/Confirmable";
import { button } from "@/components/ui/button";
import { ArrowUp, BtnArrow } from "@/components/ui/icons";

const link = "text-white/80 transition-colors duration-300 hover:text-white";

/**
 * Color de las hojas gigantes (B8): "white" (blanco al 8%) o "red" (rojo
 * ceibo). CAMBIOS-v2 pide probar las dos: se cambia acá.
 */
const LEAF_TONE: "white" | "red" = "white";

/** Footer (B8): tres columnas, línea legal y las hojas del ceibo recortadas abajo. */
export function Footer() {
  const wa = whatsappHref();
  const mail = mailHref();
  const socials = [
    { label: "Instagram", value: contact.instagram },
    { label: "LinkedIn", value: contact.linkedin },
  ].filter((s) => s.value !== null);
  const leaves = leafShapes();

  return (
    <footer id="pie" data-header="dark" className="relative overflow-hidden bg-ink text-white">
      <div className="wrap grid gap-14 pt-section pb-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <h2 className="max-w-[14ch] text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">{footer.cta}</h2>
          <a href="#hablemos" className={`${button.primary} mt-8`} data-magnetic>
            {footer.ctaButton}
            <BtnArrow />
          </a>
        </div>

        <nav aria-labelledby="footer-nav" className="lg:col-span-3 lg:col-start-7">
          <h2 id="footer-nav" className="text-xs font-medium tracking-[0.12em] text-white/60 uppercase">
            Navegación
          </h2>
          <ul className="mt-5 space-y-3">
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
          <h2 className="text-xs font-medium tracking-[0.12em] text-white/60 uppercase">Contacto</h2>
          <ul className="mt-5 space-y-3">
            <li>
              {mail ? (
                <a href={mail} className={link}>
                  {String(contact.email)}
                </a>
              ) : (
                <span className="text-white/80">
                  <Confirmable value={contact.email} />
                </span>
              )}
            </li>
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

      <div className="wrap flex flex-col gap-5 border-t border-white/10 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-9" />
          <p>
            © {site.year} {site.name} · <Confirmable value={site.city} />
          </p>
        </div>
        <a href="#top" className={`inline-flex items-center gap-2 ${link}`}>
          Volver arriba
          <ArrowUp className="size-3.5" />
        </a>
      </div>

      {/* Las hojas del ceibo, gigantes y recortadas por el borde inferior. */}
      <div aria-hidden="true" data-leaves className={`footer-leaves leaves-${LEAF_TONE}`}>
        {leaves.map((leaf) => (
          <svg key={leaf.id} viewBox={leaf.viewBox} data-leaf className="footer-leaf" style={{ aspectRatio: leaf.aspect }}>
            <path d={leaf.d} fillRule="evenodd" fill="currentColor" />
          </svg>
        ))}
      </div>
    </footer>
  );
}
