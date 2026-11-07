"use client";

import type { Ref } from "react";
import { services, serviceWhatsappMessage, type Service } from "@/lib/content";
import { whatsappHref } from "@/lib/site";
import { button, listNumber } from "@/components/ui/button";
import { BtnArrow, WhatsAppIcon } from "@/components/ui/icons";

const copy = services.detail;

type Props = {
  service: Service;
  index: number;
  total: number;
  rootRef: Ref<HTMLDivElement>;
  contentRef: Ref<HTMLDivElement>;
  onClose: () => void;
  /** Sin WhatsApp confirmado: cierra el detalle y lleva a Hablemos. */
  onContact: () => void;
  onNavigate: (direction: -1 | 1) => void;
};

/**
 * "Página" de detalle de un servicio (B3b). Es un diálogo a pantalla completa;
 * el fondo, el número y el título comparten `data-flip-id` con la tarjeta,
 * para que el zoom los lleve de un lugar al otro sin cortes.
 */
export function ServiceDetail({ service, index, total, rootRef, contentRef, onClose, onContact, onNavigate }: Props) {
  const wa = whatsappHref(serviceWhatsappMessage(service.title));
  const prev = services.cards[(index - 1 + total) % total];
  const next = services.cards[(index + 1) % total];

  return (
    <div ref={rootRef} role="dialog" aria-modal="true" aria-labelledby="svc-detail-title" className="service-detail fixed inset-0 z-[80] text-white">
      <div data-flip-id={`bg-${service.slug}`} className="absolute inset-0 bg-ceibo" />
      <div className="relative h-full overflow-y-auto overscroll-contain" data-lenis-prevent>
        <div ref={contentRef} className="wrap flex min-h-full flex-col pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:pt-8">
          <div className="flex items-center justify-between gap-4" data-detail-item>
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.12em] uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {services.eyebrow} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              data-detail-close
              className="grid size-12 place-items-center rounded-full border border-white/30 transition-colors duration-300 hover:bg-white hover:text-ceibo"
              aria-label={copy.close}
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-12 grid flex-1 content-end gap-12 lg:mt-0 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <span
                aria-hidden="true"
                data-flip-id={`num-${service.slug}`}
                className="block w-fit text-[clamp(5.5rem,4rem+8vw,12rem)] leading-[0.8] font-medium tracking-[-0.05em] tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2
                id="svc-detail-title"
                data-flip-id={`title-${service.slug}`}
                tabIndex={-1}
                className="mt-6 w-fit text-title font-medium text-balance lg:mt-8"
              >
                {service.title}
              </h2>
              <p className="mt-5 max-w-[28rem] text-lead text-white/90" data-detail-item>
                {service.tagline}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <h3 className="text-xs font-medium tracking-[0.12em] text-white/80 uppercase" data-detail-item>
                {copy.solves}
              </h3>
              <ul className="mt-4 divide-y divide-white/20 border-y border-white/20">
                {service.points.map((point, i) => (
                  <li key={point} className="flex gap-4 py-4 text-[1.0625rem] leading-snug" data-detail-item>
                    <span aria-hidden="true" className="text-sm text-white/70 tabular-nums">
                      {listNumber(i)}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-xs font-medium tracking-[0.12em] text-white/80 uppercase" data-detail-item>
                {copy.audience}
              </h3>
              <p className="mt-3 text-lead" data-detail-item>
                {service.audience}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-detail-item>
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={button.inverse}>
                    <WhatsAppIcon className="size-5" />
                    {copy.whatsapp}
                    <BtnArrow />
                  </a>
                ) : (
                  <button type="button" onClick={onContact} data-confirmar="" className={button.inverse}>
                    <WhatsAppIcon className="size-5" />
                    {copy.whatsapp}
                    <BtnArrow />
                  </button>
                )}
                <button type="button" onClick={onClose} className={button.ghostDark}>
                  {copy.back}
                  <BtnArrow />
                </button>
              </div>
            </div>
          </div>

          <nav aria-label="Otros servicios" className="mt-14 flex items-stretch justify-between gap-4 border-t border-white/20 pt-5 lg:mt-16" data-detail-item>
            <button type="button" onClick={() => onNavigate(-1)} className="group/nav flex max-w-[48%] flex-col items-start gap-1 text-left">
              <span className="text-xs font-medium tracking-[0.12em] text-white/70 uppercase">← {copy.prev}</span>
              <span className="text-[1.0625rem] font-medium group-hover/nav:underline">{prev.title}</span>
            </button>
            <button type="button" onClick={() => onNavigate(1)} className="group/nav flex max-w-[48%] flex-col items-end gap-1 text-right">
              <span className="text-xs font-medium tracking-[0.12em] text-white/70 uppercase">{copy.next} →</span>
              <span className="text-[1.0625rem] font-medium group-hover/nav:underline">{next.title}</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
