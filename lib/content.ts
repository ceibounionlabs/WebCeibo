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
  eyebrow: "laboratorio de software · rubro óptico",
  titleLead: "Construimos las herramientas que el rubro óptico necesita,",
  titleAccent: "con la tecnología que viene.",
  lead: "Software a medida para ópticas y laboratorios, hecho por un equipo joven que trabaja con las herramientas que están cambiando cómo se construye software.",
  ctaPrimary: "Hablemos",
  ctaSecondary: "Conocé el lab",
  scrollCue: "Deslizá",
} as const;

export const manifesto = {
  eyebrow: "manifiesto",
  title: "Como el ceibo, crecemos en comunidad",
  body: "Somos un grupo de amigos a punto de recibirnos de ingenieros en sistemas. Nos juntamos para construir software que se use de verdad, y elegimos empezar por el rubro óptico. Trabajamos con las prácticas y herramientas más nuevas de la industria, IA incluida, para llegar más rápido sin resignar calidad.",
  closing:
    "El ceibo es resistente, generoso y florece en los lugares más inesperados. Así queremos crecer.",
} as const;

export const services = {
  eyebrow: "qué hacemos",
  title: "Herramientas que entienden cómo trabaja el rubro",
  lead: "Un mismo equipo para pensar, diseñar y desarrollar, así no tenés que coordinar a diez proveedores distintos.",
  cards: [
    {
      title: "Gestión para ópticas",
      body: "Ventas, compras, historias clínicas, recetas y el seguimiento de cada trabajo, en un solo sistema.",
    },
    {
      title: "Pedidos a laboratorio",
      body: "Ópticas y laboratorios intercambiando pedidos sin papeles, sin llamadas y sin mensajes perdidos.",
    },
    {
      title: "Automatización y datos",
      body: "Listas de precios, planillas y tareas repetitivas: que las haga la máquina y vos decidas con datos claros.",
    },
    {
      title: "Software a medida",
      body: "Si la herramienta que necesitás no existe, la construimos.",
    },
  ],
} as const;

export const howWeWork = {
  eyebrow: "cómo trabajamos",
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
  eyebrow: "hacia dónde vamos",
  titleLead: "Empezamos por la óptica.",
  titleAccent: "Vamos por más.",
  body: "Raíces en el rubro óptico, ramas hacia todo lo que viene.",
  marquee: "Donde las ideas echan raíces ·",
} as const;

export const contactSection = {
  eyebrow: "hablemos",
  titleLead: "¿Tenés una idea?",
  titleAccent: "Hagámosla crecer juntos.",
  bodyBefore: "Contanos qué necesita tu óptica o tu laboratorio. Te respondemos en",
  whatsappLabel: "Escribinos por WhatsApp",
  form: {
    title: "O dejanos tu mensaje",
    name: "Nombre",
    email: "Email",
    company: "Óptica, laboratorio o empresa",
    message: "¿Qué te gustaría resolver?",
    submit: "Enviar",
  },
  socialTitle: "Redes",
} as const;
