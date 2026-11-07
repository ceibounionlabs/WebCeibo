"use client";

import { useId, useState, type FormEvent } from "react";
import { contactSection } from "@/lib/content";
import { contact, mailHref } from "@/lib/site";
import { button } from "@/components/ui/button";
import { BtnArrow } from "@/components/ui/icons";

const copy = contactSection.form;

const field =
  "mt-2 block w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white transition-colors duration-300 placeholder:text-white/35 hover:border-white/30 focus:border-white focus:outline-none focus-visible:outline-none";
const label = "block text-sm font-medium text-white/70";

type Status = "idle" | "sending" | "sent" | "error" | "opened" | "pending";

const messages: Record<Status, string> = {
  idle: "",
  sending: "Enviando…",
  sent: "¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.",
  error: "No pudimos enviarlo. Probá de nuevo o escribinos por WhatsApp.",
  opened: "Listo: se abrió tu app de correo con el mensaje.",
  pending: "El envío se activa cuando se confirme el mail de contacto.",
};

/**
 * Formulario de contacto.
 * - Con `contact.formspreeId` (lib/site.ts): envía a Formspree (el sitio es
 *   estático, no hay backend propio). Incluye un campo trampa para spam.
 * - Sin él: arma un mail con los datos y abre la app de correo (mailto).
 */
export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    if (contact.formspreeId) {
      setStatus("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `Consulta web: ${get("empresa") || get("nombre")}`;
    const body = [`Nombre: ${get("nombre")}`, `Email: ${get("email")}`, `Óptica, laboratorio o empresa: ${get("empresa") || "-"}`, "", get("mensaje")].join("\n");
    const href = mailHref(subject, body);
    if (!href) {
      setStatus("pending");
      return;
    }
    window.location.href = href;
    setStatus("opened");
  }

  return (
    <form id="contacto-form" onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
      <h3 id={`${id}-title`} className="text-[1.375rem] font-medium tracking-[-0.02em]">
        {copy.title}
      </h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nombre`} className={label}>
            {copy.name}
          </label>
          <input id={`${id}-nombre`} name="nombre" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            {copy.email}
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-empresa`} className={label}>
            {copy.company}
          </label>
          <input id={`${id}-empresa`} name="empresa" type="text" autoComplete="organization" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-mensaje`} className={label}>
            {copy.message}
          </label>
          <textarea id={`${id}-mensaje`} name="mensaje" rows={4} required className={`${field} resize-y`} />
        </div>
        {/* Campo trampa: las personas no lo ven; los bots lo completan. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className={`${button.primary} w-full disabled:opacity-60 sm:w-auto`} data-magnetic>
          {copy.submit}
          <BtnArrow />
        </button>
        <p role="status" aria-live="polite" className="text-sm text-white/70">
          {messages[status]}
        </p>
      </div>
    </form>
  );
}
