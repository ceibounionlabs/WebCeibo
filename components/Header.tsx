"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { hero, nav } from "@/lib/content";
import { header as cfg } from "@/lib/motion";
import { getLenis } from "@/lib/scroll";
import { button } from "@/components/ui/button";

/**
 * Header fijo: transparente sobre el hero, sólido al scrollear, se oculta al
 * bajar y reaparece al subir. En mobile abre un menú a pantalla completa.
 */
export function Header({ logo }: { logo: ReactNode }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  // Estado según el scroll (funciona igual con Lenis o con scroll nativo).
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > cfg.solidAfter);
      const delta = y - last;
      if (Math.abs(delta) < cfg.tolerance) return;
      setHidden(delta > 0 && y > cfg.hideAfter);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Menú mobile: bloquea el scroll, deja inerte el resto y cierra con Escape.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const lenis = getLenis();
    const page = [document.getElementById("contenido"), document.getElementById("pie")];

    if (lenis) lenis.stop();
    else html.style.overflow = "hidden";
    page.forEach((el) => el && (el.inert = true));
    // Al abrir, visibility cambia sin transición, así el primer link ya es enfocable.
    const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocus.current = true;
        setOpen(false);
      }
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
      page.forEach((el) => el && (el.inert = false));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (restoreFocus.current) toggleRef.current?.focus();
      restoreFocus.current = false;
    };
  }, [open]);

  const isHidden = hidden && !open;

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={[
          "fixed inset-x-0 top-0 z-50 text-white",
          "transition-[translate,background-color,box-shadow] duration-500 ease-[var(--ease-main)]",
          isHidden ? "-translate-y-full" : "translate-y-0",
          solid || open ? "bg-ink/92 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="wrap flex h-header items-center justify-between gap-6">
          <a href="#top" className="-m-1 shrink-0 p-1" aria-label="Ceibo Union Labs, ir al inicio">
            {logo}
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.9375rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative py-2 text-white/80 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-main)] hover:text-white hover:after:origin-left hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#hablemos" className={`${button.primary} ${button.small}`} onClick={() => setOpen(false)}>
              Hablemos
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => {
                restoreFocus.current = true;
                setOpen((v) => !v);
              }}
            >
              <span aria-hidden="true" className="relative block h-3 w-5.5">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-[var(--ease-main)] ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-[var(--ease-main)] ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={menuRef}
        inert={!open}
        className={`fixed inset-0 z-40 bg-ink text-white duration-500 lg:hidden ${open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"}`}
      >
        <nav aria-label="Menú" className="wrap flex h-full flex-col justify-between pt-[calc(var(--spacing-header)+2.5rem)] pb-10">
          <ul className="space-y-1">
            {[...nav, { href: "#hablemos", label: "Hablemos" }].map((item, i) => (
              <li
                key={item.href}
                className={`transition-[translate,opacity] duration-700 ease-[var(--ease-main)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  className={`block py-2 text-[2.5rem] leading-tight font-medium tracking-[-0.03em] ${item.href === "#hablemos" ? "text-ceibo" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/60">{hero.eyebrow}</p>
        </nav>
      </div>
    </>
  );
}
