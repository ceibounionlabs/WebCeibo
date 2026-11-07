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
 */
export function LeafSlot({ id, className, rest = 0 }: Props) {
  const art = isotipoParts([id]);
  return (
    <div data-seed-slot={id} aria-hidden="true" className={`pointer-events-none ${className}`} style={{ aspectRatio: art.aspect }}>
      <div data-seed className="absolute inset-0 z-20">
        <div data-seed-zoom className="size-full">
          <svg data-seed-leaf viewBox={art.viewBox} className="seed-leaf size-full overflow-visible text-ceibo" style={{ rotate: `${rest}deg` }}>
            <path d={art.paths[0]?.d} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
