/**
 * Datos del sitio.
 *
 * Todo lo marcado como CONFIRMAR es un dato que tiene que completar el equipo.
 * Mientras valga `null`, la web muestra un placeholder visible "[CONFIRMAR …]".
 * Para encontrarlos todos: buscá "CONFIRMAR" en el proyecto.
 */

export type Pending = { readonly confirmar: string };

/** Marca un dato pendiente. El texto es lo que se muestra en la web. */
const confirmar = (label: string): Pending => ({ confirmar: `[CONFIRMAR ${label}]` });

export const isPending = (value: unknown): value is Pending =>
  typeof value === "object" && value !== null && "confirmar" in value;

export const site = {
  name: "Ceibo Union Labs",
  shortName: "ceibo union labs",
  tagline:
    "Construimos las herramientas que el rubro óptico necesita, con la tecnología que viene.",
  title: "Ceibo Union Labs · Software para el rubro óptico",
  year: 2026,

  // CONFIRMAR dominio, sin protocolo. Ej: "ceibounionlabs.com"
  domain: confirmar("dominio") as string | Pending,

  // CONFIRMAR ciudad, para el footer. Ej: "Rosario, Santa Fe"
  city: confirmar("ciudad") as string | Pending,
} as const;

export const contact = {
  // CONFIRMAR número de WhatsApp en formato internacional, solo dígitos. Ej: "5493410000000"
  whatsapp: confirmar("número") as string | Pending,
  // Mensaje con el que se abre el chat de WhatsApp.
  whatsappMessage: "Hola Ceibo Union Labs, les escribo desde la web.",

  // CONFIRMAR mail de contacto. Ej: "hola@ceibounionlabs.com"
  email: confirmar("mail") as string | Pending,

  // CONFIRMAR plazo de respuesta (el brief propone "menos de 48 horas").
  responseTime: "menos de 48 horas" as string | Pending,
  responseTimeConfirmed: false,

  // CONFIRMAR ID del formulario de Formspree (formspree.io/f/<ID>). Mientras sea null,
  // el formulario arma un mail y abre la app de correo.
  formspreeId: null as string | null,

  // CONFIRMAR redes. URL completa o null para no mostrarla.
  instagram: confirmar("Instagram") as string | Pending | null,
  linkedin: confirmar("LinkedIn") as string | Pending | null,
} as const;

/** URL pública del sitio (para metadata). Vercel la expone en build. */
export function siteUrl(): URL {
  if (!isPending(site.domain)) return new URL(`https://${site.domain}`);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(vercel ? `https://${vercel}` : "http://localhost:3000");
}

export function whatsappHref(message: string = contact.whatsappMessage): string | null {
  if (isPending(contact.whatsapp)) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailHref(subject?: string, body?: string): string | null {
  if (isPending(contact.email)) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}
