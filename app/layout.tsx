import type { Metadata, Viewport } from "next";
import { Figtree, Google_Sans } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import { GlassFilter } from "@/components/GlassFilter";
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
  // Íconos e imagen OG generados en build (app/icon.svg, app/*.png/route.tsx).
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.tagline,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: site.title,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#2A1013",
  colorScheme: "light",
  // Para que env(safe-area-inset-*) funcione en iPhone (CTA flotante).
  viewportFit: "cover",
};

/**
 * Boot script, antes del primer pintado:
 * - `.js`: los estados ocultos de las animaciones solo existen con JS.
 * - `data-stand`: modo stand (?stand=1).
 * - `.loader`: loader solo en la primera visita (sessionStorage), sin reduced
 *   motion y fuera del modo stand.
 * - `.glass-distort`: distorsión del vidrio solo en Chromium de escritorio.
 * - Failsafe: si el motor de animación no arrancó a los 4 s, se muestra todo.
 */
const bootScript = `(function(d){
d.classList.add('js');
var stand=/[?&]stand=1(&|$)/.test(location.search);if(stand)d.setAttribute('data-stand','1');
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{if(!stand&&!rm&&!sessionStorage.getItem('ceibo-intro')){d.classList.add('loader');sessionStorage.setItem('ceibo-intro','1')}}catch(e){}
try{var u=navigator.userAgentData;if(u&&!u.mobile&&u.brands.some(function(b){return b.brand==='Chromium'})&&matchMedia('(hover: hover) and (pointer: fine)').matches)d.classList.add('glass-distort')}catch(e){}
setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('no-motion')},4000);
})(document.documentElement)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${googleSans.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <GlassFilter />
        {children}
      </body>
    </html>
  );
}
