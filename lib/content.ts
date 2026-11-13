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
  titleLead: "Software con raíces en el rubro óptico.",
  titleAccent: "Y ramas hacia todo lo que viene.",
  lead: "Nacimos como el área de desarrollo de Laboratorio Elena. Conocemos el rubro desde adentro y hacemos software para ópticas y para cualquier negocio que quiera crecer.",
} as const;

/**
 * La idea que ordena todo el sitio: Ceibo es un árbol. Raíces en el rubro
 * óptico (Laboratorio Elena), un tronco que es la unión del equipo y ramas
 * hacia todo lo que viene. Nosotros la cuenta en esas tres partes.
 */
export const manifesto = {
  title: "Crecemos como el ceibo",
  body: "Un ceibo se sostiene en sus raíces, se hace fuerte en el tronco y florece en las ramas. Así estamos hechos nosotros.",
  parts: [
    {
      label: "Raíces",
      text: "Nacimos como el área de desarrollo de Laboratorio Elena. El rubro óptico lo conocemos desde adentro, y ahí seguimos.",
    },
    {
      label: "Tronco",
      text: "Empezamos dos amigos y hoy somos tres. Lo que nos sostiene es la unión: de ahí viene el nombre.",
    },
    {
      label: "Ramas",
      text: "Un sistema para ópticas, automatizaciones y software a medida. Para el rubro y para todo lo que venga.",
    },
  ],
} as const;

export type Service = {
  slug: string;
  title: string;
  body: string;
  tagline: string;
  points: readonly string[];
  audience: string;
  demo?: boolean;
};

export const services = {
  title: "Herramientas que entienden cómo trabajás",
  lead: "Empezamos por la óptica, con un sistema que ya habla con el laboratorio. Y lo mismo hacemos para cualquier negocio: automatizar lo repetitivo y construir lo que falta.",
  seeMore: "Ver más",
  seeDetail: "Ver detalle",
  // `demo`: el botón del detalle ofrece una demo en vez de una consulta.
  cards: [
    {
      slug: "sistema",
      title: "Sistema para ópticas",
      body: "Ventas, stock, clientes, recetas y pedidos, en un solo sistema pensado para cómo trabaja una óptica.",
      tagline: "Toda la gestión de tu óptica, en un solo lugar.",
      points: [
        "Ventas y control de stock.",
        "Tus clientes, con sus recetas.",
        "Cada venta vinculada al pedido de sus lentes y a su estado.",
        "Pensado para trabajar con cualquier laboratorio, sin cargar los artículos de cada uno.",
      ],
      audience: "Ópticas, trabajen con el laboratorio que trabajen.",
      demo: true,
    },
    {
      slug: "elena",
      title: "Conectado con Laboratorio Elena",
      body: "Si sos cliente de Elena, los precios de las lentes llegan en tiempo real y cada pedido entra solo al sistema.",
      tagline: "Sin listas de precios. Sin cargar los pedidos dos veces.",
      points: [
        "Precios de las lentes en tiempo real: los actualiza el laboratorio y vos ya los ves.",
        "Los pedidos que hacés en la web de pedidos aparecen solos en el sistema.",
        "El seguimiento de cada pedido, vinculado a su venta.",
        "Un link para que tu cliente consulte cómo va su pedido, sin tener que llamarte.",
      ],
      audience: "Ópticas clientes de Laboratorio Elena.",
      demo: true,
    },
    {
      slug: "automatizacion",
      title: "Automatización y datos",
      body: "Tareas repetitivas, planillas y reportes: que los haga la máquina y vos decidas con datos claros.",
      tagline: "Lo repetitivo, que lo haga la máquina.",
      points: [
        "Automatizamos las tareas que hoy se hacen a mano, una y otra vez.",
        "Conectamos sistemas y planillas que hoy no se hablan.",
        "Reportes con los datos que ya tenés, para decidir mejor.",
      ],
      audience: "Cualquier negocio con tareas que se repiten, del rubro óptico o de otro.",
    },
    {
      slug: "a-medida",
      title: "Software a medida",
      body: "Si la herramienta que necesitás no existe, la construimos.",
      tagline: "Si no existe, lo construimos.",
      points: [
        "Entendemos cómo trabajás antes de proponer nada.",
        "Arrancamos con un prototipo rápido para validar la idea.",
        "Desarrollamos en ciclos cortos y seguimos acompañando después de entregar.",
      ],
      audience: "El rubro óptico y cualquier otro.",
    },
  ] as readonly Service[],
  detail: {
    solves: "Qué resuelve",
    audience: "Para quién",
    whatsapp: "Consultar por WhatsApp",
    demo: "Pedir una demo",
    back: "Volver a servicios",
    close: "Cerrar",
    prev: "Anterior",
    next: "Siguiente",
  },
} as const;

export const serviceWhatsappMessage = (service: Service) =>
  service.demo ? "¡Hola Ceibo! Quiero ver una demo del sistema para ópticas." : `¡Hola Ceibo! Quiero saber más sobre ${service.title}.`;

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
  body: "Si tenés una idea, del rubro que sea, la hacemos crecer.",
} as const;

export const contactSection = {
  titleLead: "¿Se te cayó una idea?",
  titleAccent: "Contactanos.",
  whatsappLabel: "Escribinos por WhatsApp",
  socialTitle: "Redes",
} as const;
