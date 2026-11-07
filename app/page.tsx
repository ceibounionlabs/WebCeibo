import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { ReadingProgress } from "@/components/ReadingProgress";
import { FloatingCta } from "@/components/FloatingCta";
import { Logo } from "@/components/ui/Logo";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Future } from "@/components/sections/Future";
import { Contact } from "@/components/sections/Contact";

/**
 * Cada <section> declara su tema para el header (`data-header`: light, dark o
 * red) y a qué link de la navegación pertenece (`data-nav`, para la lupita).
 */
export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed top-3 left-3 z-[110] -translate-y-[200%] rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Loader />
      <ReadingProgress />
      <Header
        isotipo={<Logo variant="isotipo" label={null} className="h-7" />}
        wordmark={<Logo label={null} className="h-12" />}
      />
      <main id="contenido">
        <Hero />
        <Manifesto />
        <Services />
        <HowWeWork />
        <Future />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
      <MotionRoot />
    </>
  );
}
