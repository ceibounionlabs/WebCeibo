import { lens } from "@/lib/motion";

/** Índice elegido con los chips (lo leen la lupa DOM y la lente 3D). */
let index: number = lens.ior;
const listeners = new Set<(n: number) => void>();

export const lensStore = {
  get: () => index,
  set(n: number) {
    index = n;
    listeners.forEach((fn) => fn(n));
  },
  subscribe(fn: (n: number) => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
