import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/ui/Logo";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Future } from "@/components/sections/Future";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header logo={<Logo className="h-10 lg:h-11" />} />
      <main id="contenido">
        <Hero />
        <Manifesto />
        <Services />
        <HowWeWork />
        <Future />
        <Contact />
      </main>
      <Footer />
      <MotionRoot />
    </>
  );
}
