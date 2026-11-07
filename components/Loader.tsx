import { Logo } from "@/components/ui/Logo";

/**
 * A7. Loader de primera visita. Es HTML + CSS puro: se pinta antes de que
 * llegue el JS y dura menos de 2 s. Solo se muestra si el boot script puso la
 * clase `.loader` en <html> (primera visita, con JS, sin reduced motion, fuera
 * del modo stand). El hero ya está debajo: el loader solo lo tapa.
 */
export function Loader() {
  return (
    <div className="site-loader" aria-hidden="true">
      <div className="relative grid size-40 place-items-center">
        <svg viewBox="0 0 100 100" className="loader-ring absolute inset-0 size-full -rotate-90">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgb(255 255 255 / 0.3)" strokeWidth="0.6" pathLength={1} />
        </svg>
        <Logo variant="isotipo" label={null} className="loader-logo h-20" />
      </div>
    </div>
  );
}
