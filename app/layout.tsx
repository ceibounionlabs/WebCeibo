import type { Metadata, Viewport } from "next";
import { Figtree, Google_Sans } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

// Español completo (á, ñ, ¿, ¡) entra en el subset "latin": no hace falta precargar latin-ext.
// Next no trae métricas de Google Sans para el fallback automático, así que se usa
// "Google Sans Fallback" (definida en globals.css) para evitar saltos de layout (CLS).
const googleSans = Google_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-sans",
  adjustFontFallback: false,
  fallback: ["Google Sans Fallback"],
});

// Respaldo si Google Sans no carga. No se precarga: solo se baja si hace falta.
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: site.title,
  description: site.tagline,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.tagline,
    // Fase 3: imagen OG 1200×630 (logo sobre rojo + lema).
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#141113",
  colorScheme: "light",
};

/**
 * Clase .js en <html> antes del primer pintado: los estados ocultos de las
 * animaciones solo existen con JS. Failsafe: si el motor de animación no
 * arrancó a los 4 s, se muestra todo (clase .no-motion).
 */
const bootScript = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('no-motion')},4000)})(document.documentElement)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${googleSans.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
