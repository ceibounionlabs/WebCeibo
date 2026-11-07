import type Lenis from "lenis";
import type { GsapModule } from "@/lib/load-gsap";

/** Lo que recibe cada efecto del motor. */
export type FeatureContext = GsapModule & {
  /** ≥ 1024px: pins y efectos de escritorio. */
  desktop: boolean;
  /** Mouse o trackpad (hay hover real). */
  finePointer: boolean;
  /** El failsafe ya mostró el contenido: no volver a ocultarlo para animarlo. */
  skipReveals: boolean;
  /** Modo stand (?stand=1). */
  stand: boolean;
  lenis: Lenis;
};

/** Un efecto: arma lo suyo y devuelve, si hace falta, cómo desarmar lo que GSAP no limpia solo. */
export type Feature = (ctx: FeatureContext) => void | (() => void);
