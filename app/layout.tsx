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
  themeColor: "#2B1E19",
  colorScheme: "light",
  // Para que env(safe-area-inset-*) funcione en iPhone (CTA flotante).
  viewportFit: "cover",
};

/**
 * Boot script, antes del primer pintado:
 * - `.js`: indica que hay JS.
 * - `data-stand`: modo stand (?stand=1).
 * - `.glass-distort`: distorsión del vidrio solo en Chromium de escritorio.
 */
const bootScript = `(function(d){
d.classList.add('js');
if(/[?&]stand=1(&|$)/.test(location.search))d.setAttribute('data-stand','1');
try{var u=navigator.userAgentData;if(u&&!u.mobile&&u.brands.some(function(b){return b.brand==='Chromium'})&&matchMedia('(hover: hover) and (pointer: fine)').matches)d.classList.add('glass-distort')}catch(e){}
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
