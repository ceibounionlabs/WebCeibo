"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/site";
import { button } from "@/components/ui/button";
import { BtnArrow, WhatsAppIcon } from "@/components/ui/icons";

/**
 * A6. CTA flotante en mobile: aparece cuando el hero sale de pantalla y se
 * esconde con Hablemos o el footer a la vista (y, por CSS, con el menú o el
 * detalle de un servicio abiertos). Respeta el área segura del iPhone.
 */
export function FloatingCta() {
  const [heroOut, setHeroOut] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const ends = ["hablemos", "pie"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visibleEnds = new Set<Element>();

    const heroIo = new IntersectionObserver(([entry]) => setHeroOut(!entry.isIntersecting));
    const endIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visibleEnds.add(e.target);
        else visibleEnds.delete(e.target);
      }
      setEndVisible(visibleEnds.size > 0);
    });
    if (hero) heroIo.observe(hero);
    ends.forEach((el) => endIo.observe(el));
    return () => {
      heroIo.disconnect();
      endIo.disconnect();
    };
  }, []);

  const wa = whatsappHref();
  const show = heroOut && !endVisible;

  return (
    <div
      id="cta-flotante"
      data-show={show ? "" : undefined}
      inert={!show}
      className="cta-flotante pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex justify-center px-4 lg:hidden"
    >
      <a
        href={wa ?? "#hablemos"}
        {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : { "data-confirmar": "" })}
        className={`${button.primary} pointer-events-auto shadow-[0_10px_30px_-8px_rgb(20_17_19/0.45)]`}
      >
        <WhatsAppIcon className="size-5" />
        Hablemos por WhatsApp
        <BtnArrow />
      </a>
    </div>
  );
}
