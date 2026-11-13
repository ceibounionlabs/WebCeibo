/**
 * Textos finales del sitio (brief, sección 6). Español rioplatense, con voseo.
 * Los datos de contacto y todo lo que falta confirmar están en lib/site.ts.
 */

export const nav = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#que-hacemos", label: "Qué hacemos" },
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
  title: "Somos tres amigos y hacemos software.",
  body: "Empezamos siendo dos, como el área de desarrollo de Laboratorio Elena, y ahí aprendimos cómo funciona el rubro óptico por dentro. Seguimos trabajando igual: primero escuchamos, después construimos.",
  signature: "Los tres de Ceibo Union Labs",
} as const;

/**
 * Qué hacemos, contado con frases que se escuchan en una óptica y qué
 * hacemos con cada una. `tag` dice a qué servicio corresponde.
 */
export const services = {
  title: "¿Te suena alguna?",
  lead: "Frases que se escuchan todos los días en una óptica. Para cada una, tenemos una respuesta.",
  items: [
    {
      quote: "Las ventas en un lado, el stock en otro y las recetas en un cuaderno.",
      answer: "Ventas, stock, clientes y recetas en un solo sistema, que funciona con cualquier laboratorio.",
      tag: "Sistema para ópticas",
    },
    {
      quote: "¿Este precio está actualizado?",
      answer: "Si trabajás con Laboratorio Elena, los precios de las lentes llegan en tiempo real y cada pedido entra solo al sistema.",
      tag: "Sistema para ópticas · con Laboratorio Elena",
    },
    {
      quote: "¿Ya llegaron mis anteojos?",
      answer: "Tu cliente sigue su pedido con un link, sin tener que llamarte. Y vos lo ves desde la venta.",
      tag: "Sistema para ópticas · con Laboratorio Elena",
    },
    {
      quote: "Esta planilla la armamos a mano todas las semanas.",
      answer: "La automatizamos: lo repetitivo, que lo haga la máquina.",
      tag: "Automatización y datos",
    },
    {
      quote: "Necesitaríamos algo que haga…",
      answer: "Si no existe, lo construimos.",
      tag: "Software a medida",
    },
  ],
  demo: { label: "Pedir una demo", message: "¡Hola Ceibo! Quiero ver una demo del sistema para ópticas." },
  more: "Contanos la tuya",
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
