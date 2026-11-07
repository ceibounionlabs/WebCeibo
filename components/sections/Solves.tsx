import { solves } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listNumber } from "@/components/ui/button";

/**
 * Lo que resolvemos (B5): grilla con "linterna". Los bordes de las celdas se
 * iluminan en rojo cerca del cursor (o del dedo), como un haz de luz.
 * El movimiento vive en components/motion/features/flashlight.ts.
 */
export function Solves() {
  return (
    <section id="lo-que-resolvemos" data-header="dark" data-nav="#que-hacemos" aria-labelledby="solves-title" className="bg-ink py-section text-white">
      <div className="wrap">
        <Eyebrow className="text-white/70">{solves.eyebrow}</Eyebrow>
        <h2 id="solves-title" className="mt-6 text-title font-medium lg:mt-8" data-focus>
          {solves.title}
        </h2>
        <ul data-flashlight className="flashlight-grid relative mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-16 lg:grid-cols-3">
          {solves.items.map((item, i) => (
            <li
              key={item}
              data-cell
              className={`flash-cell flex min-h-[7.5rem] flex-col justify-between gap-6 rounded-card p-5 sm:min-h-[9rem] lg:min-h-[11rem] lg:p-8 ${i === solves.items.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <span aria-hidden="true" className="text-sm text-white/50 tabular-nums">
                {listNumber(i)}
              </span>
              <span className="text-[1.0625rem] leading-snug font-medium tracking-[-0.01em] sm:text-xl lg:text-2xl">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
