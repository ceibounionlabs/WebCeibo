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
  lead: "Nacimos en Laboratorio Elena, donde un cuarto de dioptría hace la diferencia. Con ese mismo cuidado hacemos software de todo tipo, con especialidad en el rubro óptico.",
} as const;

/**
 * Nosotros: una carta corta en primera persona, al lado del nombre en grande
 * ("union" en rojo: la unión es el equipo).
 */
export const manifesto = {
  title: "Unidos desde el primer día.",
  body: "Ceibo empezó con dos amigos resolviendo los problemas de todos los días del laboratorio. Hoy somos tres, y seguimos trabajando igual: cerca de quien va a usar lo que hacemos, escuchando primero y construyendo después.",
  signature: "Los tres de Ceibo Union Labs",
} as const;

/**
 * Qué hacemos: los tipos de software que hacemos, con lo que ya hicimos como
 * ejemplo, y un puente al sistema para ópticas (la especialidad).
 */
export const services = {
  title: "Construimos herramientas que se usan todos los días.",
  lead: "Escuchamos cómo trabaja tu equipo y armamos lo que hace falta: un sistema, una plataforma web o una automatización.",
  items: [
    {
      title: "Sistemas de gestión",
      body: "Ventas, stock, clientes y procesos internos, en un sistema pensado para cómo trabaja tu equipo.",
      note: "Hicimos los sistemas internos de Laboratorio Elena.",
    },
    {
      title: "Plataformas web",
      body: "Portales para que tus clientes hagan pedidos, sigan cada estado y se autogestionen.",
      note: "Hicimos la web de pedidos de Laboratorio Elena.",
    },
    {
      title: "Automatizaciones",
      body: "Conectamos sistemas que no se hablan y te sacamos de encima las tareas repetitivas.",
      note: "Planillas, reportes e integraciones entre sistemas.",
    },
  ],
  bridge: { lead: "Nuestra especialidad es el rubro óptico.", cta: "Conocé el sistema para ópticas" },
} as const;

/**
 * El sistema para ópticas, contado con frases que se escuchan en una óptica y
 * qué resuelve en cada caso. `tag` marca qué funciona con cualquier
 * laboratorio y qué suma trabajar con Laboratorio Elena.
 */
export const opticsSystem = {
  title: "Un sistema para ópticas, hecho desde el laboratorio.",
  lead: "Lo armamos con todo lo que aprendimos del otro lado del mostrador. Funciona con cualquier laboratorio y, si trabajás con Laboratorio Elena, los precios y los pedidos llegan solos.",
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
