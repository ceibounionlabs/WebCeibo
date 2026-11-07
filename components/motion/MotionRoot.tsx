"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll";

/**
 * Raíz del movimiento global.
 * - Navegación por anclas (#id): scroll suave con Lenis si está activo, nativo
 *   si no, y foco accesible en el destino.
 * - Carga el scroll suave (Lenis) recién después de hidratar, para no
 *   competir con el primer render. Con `prefers-reduced-motion: reduce` ni
 *   siquiera se descarga.
 */
export function MotionRoot() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!link) return;
      if (scrollToHash(link.getAttribute("href") ?? "")) event.preventDefault();
    };
    document.addEventListener("click", onClick);

    let stop: (() => void) | undefined;
    let cancelled = false;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      import("./engine").then(({ startMotion }) => {
        if (!cancelled) stop = startMotion();
      });
    }

    return () => {
      cancelled = true;
      stop?.();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
