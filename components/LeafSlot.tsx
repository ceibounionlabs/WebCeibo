import { isotipoParts } from "@/lib/brand";

type Props = {
  /** Pieza del isotipo (hoja-1 … hoja-8). */
  id: string;
  /** Posición y tamaño del lugar donde aterriza (incluye la altura). */
  className: string;
  /** Ángulo con el que queda apoyada, en grados. */
  rest?: number;
};

/**
 * Lugar donde aterriza una hoja que se cae del ceibo (ver components/SeedFall.tsx).
 * La hoja vive acá: sin JS o con reduced motion, ya está caída.
 *
 * Capas: [data-seed] recorrido · [data-seed-zoom] vuelo (vaivén, aleteo,
 * acercamiento) · [data-seed-rest] ángulo de reposo (CSS fijo, GSAP no lo
 * toca) · [data-seed-leaf] giro.
 */
export function LeafSlot({ id, className, rest = 0 }: Props) {
  const art = isotipoParts([id]);
  return (
    <div data-seed-slot={id} aria-hidden="true" className={`pointer-events-none ${className}`} style={{ aspectRatio: art.aspect }}>
      <div data-seed className="absolute inset-0 z-20">
        <div data-seed-zoom className="size-full">
          <div data-seed-rest={rest} className="size-full" style={{ transform: `rotate(${rest}deg)` }}>
            <svg data-seed-leaf viewBox={art.viewBox} className="seed-leaf size-full overflow-visible text-ceibo">
              <path d={art.paths[0]?.d} fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
