"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { nav } from "@/lib/content";
import { header as cfg } from "@/lib/motion";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { contact, isPending, mailHref, whatsappHref } from "@/lib/site";
import { focusables, setPageInert, setUiFlag, trapFocus } from "@/lib/ui-flags";
import { button } from "@/components/ui/button";
import { BtnArrow, MailIcon, WhatsAppIcon } from "@/components/ui/icons";

type Theme = "light" | "dark" | "red";

const menuItems = [...nav, { href: "#hablemos", label: "Hablemos" }];
const MENU_CLOSE_MS = 450;

/**
 * Header "lente flotante" (A1): tres píldoras de vidrio que cambian de tema
 * según la sección de abajo, con la lupita de sección activa (A2) y el menú
 * mobile "diafragma" (A4).
 */
export function Header({ isotipo, wordmark }: { isotipo: ReactNode; wordmark: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lupa, setLupa] = useState({ x: 0, w: 0 });
  const [origin, setOrigin] = useState({ x: "100%", y: "0%" });

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef(false);

  // Tema según la sección que queda debajo del header.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setTheme((entry.target as HTMLElement).dataset.header as Theme);
        }
      },
      { rootMargin: "-40px 0px -95% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Sección activa para la lupita: la que cruza el centro de la pantalla.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.nav ?? null);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Se oculta al bajar y reaparece al subir.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      if (y <= cfg.hideAfter) setHidden(false);
      if (Math.abs(delta) < cfg.tolerance) return;
      setHidden(delta > 0 && y > cfg.hideAfter);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Posición y ancho de la lupita.
  const target = preview ?? active;
  const measure = useCallback(() => {
    const item = target ? navRef.current?.querySelector<HTMLElement>(`a[href="${target}"]`)?.closest("li") : null;
    if (item) setLupa({ x: item.offsetLeft, w: item.offsetWidth });
  }, [target]);
  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Menú abierto: scroll frenado, página inerte, foco atrapado, Esc cierra.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const lenis = getLenis();
    if (lenis) lenis.stop();
    else html.style.overflow = "hidden";
    setUiFlag("menu", true);
    setPageInert(true);
    const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocus.current = true;
        setOpen(false);
        return;
      }
      const items = [toggleRef.current!, ...focusables(menuRef.current!)];
      trapFocus(event, items);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(focusFrame);
      if (lenis) lenis.start();
      else html.style.overflow = "";
      setUiFlag("menu", false);
      setPageInert(false);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (restoreFocus.current) toggleRef.current?.focus();
      restoreFocus.current = false;
    };
  }, [open]);

  function toggleMenu() {
    const rect = toggleRef.current?.getBoundingClientRect();
    if (rect) setOrigin({ x: `${rect.left + rect.width / 2}px`, y: `${rect.top + rect.height / 2}px` });
    restoreFocus.current = true;
    setOpen((v) => !v);
  }

  // Link del menú: primero se cierra y después hace scroll (A4).
  function onMenuLink(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    restoreFocus.current = false;
    setOpen(false);
    window.setTimeout(() => scrollToHash(href), MENU_CLOSE_MS);
  }

  const shownTheme: Theme = open ? "red" : theme;
  const wa = whatsappHref();
  const mail = mailHref();

  return (
    <>
      <header
        data-site-header
        data-theme={shownTheme}
        onFocusCapture={() => setHidden(false)}
        className={[
          "site-header pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4 lg:pt-6",
          "transition-[translate] duration-600 ease-lente",
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0",
        ].join(" ")}
      >
        <div className="header-in wrap flex items-center justify-between gap-2">
          {/* 1. Logo */}
          <a href="#top" className="glass-pill pointer-events-auto h-12 gap-2.5 pr-5 pl-4" aria-label="Ceibo Union Labs, ir al inicio">
            <GlassLayers />
            <span className="relative flex items-center gap-2.5">
              {isotipo}
              <span aria-hidden="true" className="text-[0.9375rem] leading-none font-medium tracking-[-0.01em]">
                ceibo union labs
              </span>
            </span>
          </a>

          {/* 2. Links con la lupita */}
          <nav aria-label="Principal" className="glass-pill pointer-events-auto hidden h-12 px-1.5 lg:flex" onPointerLeave={() => setPreview(null)}>
            <GlassLayers />
            <ul ref={navRef} className="relative flex h-full items-center">
              <span
                aria-hidden="true"
                className="lupita absolute inset-y-1.5 left-0 rounded-full transition-[translate,width,opacity] duration-500 ease-lente"
                style={{ translate: `${lupa.x}px 0`, width: lupa.w, opacity: target ? 1 : 0 }}
              />
              {nav.map((item) => (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    onPointerEnter={() => setPreview(item.href)}
                    onFocus={() => setPreview(item.href)}
                    onBlur={() => setPreview(null)}
                    className="flex h-9 items-center rounded-full px-4.5 text-[0.9375rem] font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. CTA (+ botón de menú en mobile) */}
          <div className="pointer-events-auto flex items-center gap-2">
            <a
              href="#hablemos"
              className={`header-cta group/btn hidden h-12 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-300 sm:inline-flex ${open ? "sm:hidden" : ""}`}
            >
              Hablemos
              <BtnArrow />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="glass-pill size-12 justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={toggleMenu}
            >
              <GlassLayers />
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-lente ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-lente ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú mobile "diafragma" */}
      <div
        id="menu-mobile"
        ref={menuRef}
        inert={!open}
        data-open={open ? "" : undefined}
        className="menu-diafragma fixed inset-0 z-40 bg-ceibo text-white lg:hidden"
        style={{ "--mx": origin.x, "--my": origin.y } as React.CSSProperties}
      >
        <nav aria-label="Menú" className="wrap flex h-full flex-col justify-between pt-[calc(var(--spacing-header)+2.5rem)] pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={item.href} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={item.href}
                  onClick={(e) => onMenuLink(e, item.href)}
                  className="flex items-baseline gap-4 py-1.5 text-[2.5rem] leading-tight font-medium tracking-[-0.03em] sm:text-5xl"
                >
                  <span aria-hidden="true" className="text-sm font-medium tracking-normal text-white/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="menu-item space-y-6" style={{ "--i": menuItems.length } as React.CSSProperties}>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a href={wa ?? "#hablemos"} onClick={wa ? undefined : (e) => onMenuLink(e, "#hablemos")} className={`${button.inverse} w-full sm:w-auto`} {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <WhatsAppIcon className="size-5" />
                WhatsApp{isPending(contact.whatsapp) ? " [CONFIRMAR]" : ""}
                <BtnArrow />
              </a>
              <a href={mail ?? "#hablemos"} onClick={mail ? undefined : (e) => onMenuLink(e, "#hablemos")} className={`${button.ghostDark} w-full sm:w-auto`}>
                <MailIcon className="size-5" />
                Mail{isPending(contact.email) ? " [CONFIRMAR]" : ""}
                <BtnArrow />
              </a>
            </div>
            <div className="text-white">{wordmark}</div>
          </div>
        </nav>
      </div>
    </>
  );
}

/** Capas del vidrio: base (todos los navegadores) y distorsión (solo Chromium de escritorio). */
function GlassLayers() {
  return (
    <>
      <span aria-hidden="true" className="glass-base" />
      <span aria-hidden="true" className="glass-distort-layer" />
    </>
  );
}
