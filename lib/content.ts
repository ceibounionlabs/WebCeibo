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
  titleLead: "Construimos las herramientas que el rubro óptico necesita,",
  titleAccent: "con la tecnología que viene.",
  lead: "Software a medida para ópticas y laboratorios, hecho por un equipo joven que trabaja con las herramientas que están cambiando cómo se construye software.",
} as const;

export const manifesto = {
  // CONFIRMAR tono de los tres enunciados (borrador de CAMBIOS-v2, B1).
  statements: [
    "El rubro óptico trabaja con precisión. Su software también debería.",
    "Diseñamos y construimos sistemas para ópticas y laboratorios, con las herramientas que están cambiando cómo se hace software.",
    "El resultado: herramientas claras, rápidas y hechas a la medida de cómo trabajás.",
  ],
  title: "Como el ceibo, crecemos en comunidad",
  body: "Somos un grupo de amigos a punto de recibirnos de ingenieros en sistemas. Nos juntamos para construir software que se use de verdad, y elegimos empezar por el rubro óptico. Trabajamos con las prácticas y herramientas más nuevas de la industria, IA incluida, para llegar más rápido sin resignar calidad.",
  closing:
    "El ceibo es resistente, generoso y florece en los lugares más inesperados. Así queremos crecer.",
} as const;

export const services = {
  title: "Herramientas que entienden cómo trabaja el rubro",
  lead: "Un mismo equipo para pensar, diseñar y desarrollar, así no tenés que coordinar a diez proveedores distintos.",
  seeMore: "Ver más",
  seeDetail: "Ver detalle",
  // CONFIRMAR contenido del detalle de cada servicio (borrador de CAMBIOS-v2, B3b).
  // Si algo no lo hacemos, se saca de la lista.
  cards: [
    {
      slug: "gestion",
      title: "Gestión para ópticas",
      body: "Ventas, compras, historias clínicas, recetas y el seguimiento de cada trabajo, en un solo sistema.",
      tagline: "Todo lo de tu óptica, en un solo sistema.",
      points: [
        "Fichas de pacientes con su historia clínica.",
        "Recetas, graduaciones y datos de cada trabajo, incluidos los lentes de contacto.",
        "Seguimiento de cada trabajo: en qué estado está y a qué laboratorio se pidió.",
        "Ventas y compras en el mismo lugar.",
      ],
      audience: "Ópticas.",
    },
    {
      slug: "pedidos",
      title: "Pedidos a laboratorio",
      body: "Ópticas y laboratorios intercambiando pedidos sin papeles, sin llamadas y sin mensajes perdidos.",
      tagline: "Del mostrador al laboratorio, sin papeles.",
      points: [
        "Cargar el pedido con la receta y el tipo de lente.",
        "Ver el estado del pedido sin llamar ni mandar mensajes.",
        "Historial de pedidos por óptica y por paciente.",
      ],
      audience: "Ópticas y laboratorios.",
    },
    {
      slug: "automatizacion",
      title: "Automatización y datos",
      body: "Listas de precios, planillas y tareas repetitivas: que las haga la máquina y vos decidas con datos claros.",
      tagline: "Lo repetitivo, que lo haga la máquina.",
      points: [
        "Leer y ordenar las listas de precios de los laboratorios.",
        "Comparar precios entre laboratorios.",
        "Cargar planillas automáticamente y armar reportes.",
      ],
      audience: "Ópticas y laboratorios.",
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
  ],
  detail: {
    solves: "Qué resuelve",
    audience: "Para quién",
    whatsapp: "Consultar por WhatsApp",
    back: "Volver a servicios",
    close: "Cerrar",
    prev: "Anterior",
    next: "Siguiente",
  },
} as const;

export type Service = (typeof services.cards)[number];

export const serviceWhatsappMessage = (title: string) => `¡Hola Ceibo! Quiero saber más sobre ${title}.`;

export const solves = {
  title: "Lo que resolvemos",
  // CONFIRMAR lista (borrador de CAMBIOS-v2, B5).
  items: [
    "Historias clínicas",
    "Recetas y graduaciones",
    "Seguimiento de trabajos",
    "Pedidos a laboratorio",
    "Listas de precios",
    "Stock",
    "Ventas y compras",
    "Reportes",
    "Automatización de planillas",
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
  titleLead: "¿Tenés una idea?",
  titleAccent: "Hagámosla crecer juntos.",
  whatsappLabel: "Escribinos por WhatsApp",
  socialTitle: "Redes",
} as const;
