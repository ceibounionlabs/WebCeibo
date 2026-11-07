"use client";

import { useSyncExternalStore } from "react";
import { lens } from "@/lib/motion";
import { lensStore } from "./lensStore";

/**
 * Easter egg (5.3): chips de índice de refracción. Al tocar uno, la lente
 * cambia su índice y se vuelve más fina cuanto más alto es, como una lente
 * real. Solo se ven cuando hay lente (lupa DOM o 3D).
 */
export function LensChips() {
  const current = useSyncExternalStore(lensStore.subscribe, lensStore.get, () => lens.ior);
  return (
    <div className="lens-chips hero-in items-center gap-3" style={{ "--i": 4 } as React.CSSProperties} role="group" aria-label="Índice de refracción de la lente">
      <span aria-hidden="true" className="text-xs font-medium tracking-[0.12em] text-white/60 uppercase">
        n
      </span>
      <div className="flex gap-1.5">
        {lens.indices.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={current === n}
            onClick={() => lensStore.set(n)}
            className={`lens-chip h-8 rounded-full border px-3 text-xs font-medium tabular-nums transition-colors duration-300 ease-lente ${
              current === n ? "border-white bg-white text-ink" : "border-white/25 text-white/80 hover:border-white/60 hover:text-white"
            }`}
          >
            {n.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
}
