/**
 * GSAP con todos sus plugins, registrado una sola vez.
 * Nunca se importa de forma estática desde componentes que se renderizan al
 * cargar: se pide con `loadGsap()` (lib/load-gsap.ts) para que quede fuera
 * del bundle inicial.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { customEases } from "./motion";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip);
CustomEase.create("lente", customEases.lente);
CustomEase.create("cortina", customEases.cortina);

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip };
