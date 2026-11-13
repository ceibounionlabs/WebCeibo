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
  titleLead: "Nacimos dentro de un laboratorio óptico.",
  titleAccent: "Hacemos el software que el rubro necesita.",
  lead: "Empezamos como el área de I+D de Laboratorio Elena. Hoy hacemos un sistema de gestión para ópticas conectado con el laboratorio, automatizaciones y software a medida.",
} as const;

export const manifesto = {
  statements: [
    "Conocemos el rubro desde adentro: lo vivimos todos los días en el laboratorio.",
    "Lo que hacemos ya se usa: la web de pedidos y los sistemas internos de Laboratorio Elena.",
    "Ahora lo llevamos a las ópticas, con un sistema pensado para cómo trabajan.",
  ],
  title: "Como el ceibo, crecemos en comunidad",
  body: "Empezamos siendo dos amigos y hoy somos tres. Seguimos a cargo del desarrollo de Laboratorio Elena y creamos Ceibo para llevar lo que aprendimos a todo el rubro, y a lo que venga. Por eso Union: esto lo armamos juntos.",
  closing:
    "El ceibo es resistente, generoso y florece en los lugares más inesperados. Así queremos crecer.",
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
  title: "Herramientas que entienden cómo trabaja el rubro",
  lead: "Un sistema para tu óptica que ya habla con el laboratorio, y un equipo para todo lo demás.",
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
      audience: "Ópticas y cualquier negocio con tareas que se repiten.",
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
      audience: "El rubro óptico y lo que venga.",
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

export const solves = {
  title: "Lo que resolvemos",
  items: [
    "Ventas",
    "Control de stock",
    "Clientes y recetas",
    "Pedidos al laboratorio",
    "Seguimiento de pedidos",
    "Precios en tiempo real",
    "Link de seguimiento para tus clientes",
    "Tareas repetitivas",
    "Desarrollos a medida",
  ],
} as const;

export const howWeWork = {
  title: "De la semilla a la flor, en cuatro etapas",
  lead: "Un proceso claro, con avances visibles. Siempre sabés en qué punto está tu proyecto y qué viene después.",
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
  body: "Raíces en el rubro óptico, ramas hacia todo lo que viene.",
} as const;

export const contactSection = {
  titleLead: "¿Se te cayó una idea?",
  titleAccent: "Contactanos.",
  whatsappLabel: "Escribinos por WhatsApp",
  socialTitle: "Redes",
} as const;
