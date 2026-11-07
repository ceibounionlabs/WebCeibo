"use client";

import { useId, useState, type FormEvent } from "react";
import { contactSection } from "@/lib/content";
import { mailHref } from "@/lib/site";
import { button } from "@/components/ui/button";
import { BtnArrow } from "@/components/ui/icons";

const copy = contactSection.form;

const field =
  "mt-2 block w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white transition-colors duration-300 placeholder:text-white/35 hover:border-white/30 focus:border-white focus:outline-none focus-visible:outline-none";
const label = "block text-sm font-medium text-white/70";

/**
 * Formulario de contacto.
 * Fase 1: arma un mail con los datos y abre la app de correo (mailto).
 * Fase 3: se conecta a Formspree (el sitio es estático, no hay backend propio).
 */
export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "opened" | "pending">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `Consulta web: ${get("empresa") || get("nombre")}`;
    const body = [
      `Nombre: ${get("nombre")}`,
      `Email: ${get("email")}`,
      `Óptica, laboratorio o empresa: ${get("empresa") || "-"}`,
      "",
      get("mensaje"),
    ].join("\n");

    const href = mailHref(subject, body);
    if (!href) {
      setStatus("pending");
      return;
    }
    window.location.href = href;
    setStatus("opened");
  }

  return (
    <form
      id="contacto-form"
      onSubmit={onSubmit}
      aria-labelledby={`${id}-title`}
      className="rounded-card border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
    >
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
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={`${button.primary} w-full sm:w-auto`}>
          {copy.submit}
          <BtnArrow />
        </button>
        <p role="status" aria-live="polite" className="text-sm text-white/70">
          {status === "opened" && "Listo: se abrió tu app de correo con el mensaje."}
          {status === "pending" && "El envío se activa cuando se confirme el mail de contacto."}
        </p>
      </div>
    </form>
  );
}
