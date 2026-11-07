import { solves } from "@/lib/content";

/**
 * Lo que resolvemos (B5): grilla simple de lo que resolvemos.
 */
export function Solves() {
  return (
    <section id="lo-que-resolvemos" data-header="light" data-nav="#que-hacemos" aria-labelledby="solves-title" className="bg-paper py-section text-ink">
      <div className="wrap">
        <h2 id="solves-title" className="text-title font-medium">
          {solves.title}
        </h2>
        <ul className="flashlight-grid relative mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-16 lg:grid-cols-3">
          {solves.items.map((item, i) => (
            <li
              key={item}
              className={`flash-cell flex min-h-[6.5rem] items-end rounded-card p-5 sm:min-h-[8rem] lg:min-h-[9rem] lg:p-7 ${i === solves.items.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <span className="text-[1.0625rem] leading-snug font-medium tracking-[-0.01em] sm:text-xl lg:text-[1.375rem]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
