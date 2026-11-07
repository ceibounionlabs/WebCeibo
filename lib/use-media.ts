"use client";

import { useSyncExternalStore } from "react";

/** true si la media query coincide. En el servidor (y antes de hidratar) devuelve `fallback`. */
export function useMedia(query: string, fallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}
