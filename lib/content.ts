/**
 * Textos finales del sitio (brief, sección 6). Español rioplatense, con voseo.
 * Los datos de contacto y todo lo que falta confirmar están en lib/site.ts.
 */

export const nav = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#sistema", label: "Para ópticas" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
] as const;

export const hero = {
  titleLead: "Software con precisión",
  titleAccent: "de laboratorio.",
  lead: "Nacimos como el departamento de I+D de Laboratorio Elena, donde un cuarto de dioptría hace la diferencia. Con ese mismo cuidado hacemos software de todo tipo, con especialidad en el rubro óptico.",
} as const;

/**
 * Nosotros: una carta corta en primera persona, al lado del nombre en grande
 * ("union" en rojo: la unión es el equipo).
 */
export const manifesto = {
  title: "Unidos desde el primer día.",
  body: "Ceibo empezó con dos amigos en el departamento de I+D de Laboratorio Elena, resolviendo los problemas de todos los días del laboratorio. Seguimos trabajando igual: cerca de quien va a usar lo que hacemos, escuchando primero y construyendo después.",
  signature: "El equipo de Ceibo Union Labs",
} as const;

/**
 * Qué hacemos: lo que hacemos, dicho una vez, y lo que nos diferencia (que
 * nuestro primer cliente fue el laboratorio donde nacimos).
 */
export const services = {
  title: "Nuestro primer cliente fue el laboratorio donde nacimos.",
  lead: "Como su departamento de I+D, aprendimos a hacer software del lado de quien lo usa. Hoy hacemos sistemas de gestión, plataformas web y automatizaciones.",
  points: [
    {
      title: "Lo probamos en casa.",
      body: "Lo que hacemos corre todos los días en Laboratorio Elena. Si algo falla, somos los primeros en enterarnos.",
    },
    {
      title: "Hablás con quien lo programa.",
      body: "Sin vendedores ni intermediarios: el que te escucha es el que lo construye.",
    },
    {
      title: "Conocemos el rubro óptico por dentro.",
      body: "Recetas, lentes, pedidos y urgencias de mostrador: no hace falta explicarnos cómo funciona una óptica.",
    },
  ],
} as const;

/**
 * El sistema para ópticas, contado con frases que se escuchan en una óptica y
 * qué resuelve en cada caso. `tag` marca qué funciona con cualquier
 * laboratorio y qué suma trabajar con Laboratorio Elena.
 */
export const opticsSystem = {
  title: "Un sistema para ópticas, hecho desde el laboratorio.",
  lead: "Salió del I+D de Laboratorio Elena, con todo lo que aprendimos del otro lado del mostrador. Funciona con cualquier laboratorio y, si trabajás con Elena, los precios y los pedidos llegan solos.",
  heard: "¿Te suena alguna?",
  items: [
    {
      quote: "Las ventas en un lado, el stock en otro y las recetas en un cuaderno.",
      answer: "Ventas, stock, clientes y recetas en un mismo sistema, pensado para trabajar con cualquier laboratorio sin cargar los artículos de cada uno.",
      tag: "Con cualquier laboratorio",
      elena: false,
    },
    {
      quote: "¿Este precio está actualizado?",
      answer: "Los precios de las lentes llegan en tiempo real. No hay listas que actualizar.",
      tag: "Con Laboratorio Elena",
      elena: true,
    },
    {
      quote: "Lo cargo en la web de pedidos y después en el sistema.",
      answer: "El pedido se hace una vez y entra solo al sistema, vinculado a la venta.",
      tag: "Con Laboratorio Elena",
      elena: true,
    },
    {
      quote: "¿Ya llegaron mis anteojos?",
      answer: "Tu cliente sigue su pedido con un link, sin tener que llamarte.",
      tag: "Con Laboratorio Elena",
      elena: true,
    },
  ],
  demo: { label: "Pedir una demo", message: "¡Hola Ceibo! Quiero ver una demo del sistema para ópticas." },
} as const;

export const howWeWork = {
  title: "De la semilla a la flor, en cuatro etapas",
  lead: "Cada proyecto crece como un ceibo: de a una etapa y con avances que ves. Siempre sabés en qué punto está y qué viene después.",
  steps: [
    {
      title: "Sembrar",
      body: "Escuchamos y entendemos tu desafío, cómo trabaja tu equipo y qué necesita resolver.",
    },
    {
      title: "Germinar",
      body: "Bajamos la idea a un prototipo rápido y lo validamos con quienes lo van a usar.",
    },
    {
      title: "Crecer",
      body: "Desarrollamos en ciclos cortos, con entregas frecuentes que podés probar.",
    },
    {
      title: "Florecer",
      body: "Lanzamos, acompañamos y seguimos mejorando juntos para que dé frutos.",
    },
  ],
} as const;

export const future = {
  titleLead: "Empezamos por la óptica.",
  titleAccent: "Vamos por más.",
  body: "Si tenés una idea, la hacemos crecer.",
} as const;

export const contactSection = {
  titleLead: "¿Se te cayó una idea?",
  titleAccent: "Contactanos.",
  whatsappLabel: "Escribinos por WhatsApp",
  socialTitle: "Redes",
} as const;
