import { isPending, type Pending } from "@/lib/site";

/**
 * Muestra un dato de lib/site.ts. Si todavía no está confirmado, lo muestra
 * como placeholder "[CONFIRMAR …]" marcado con borde punteado.
 */
export function Confirmable({ value, confirmed = true }: { value: string | Pending; confirmed?: boolean }) {
  if (isPending(value)) {
    return (
      <mark data-confirmar="" className="rounded bg-transparent px-1 whitespace-nowrap text-current outline-1 outline-current outline-dashed">
        {value.confirmar}
      </mark>
    );
  }
  if (!confirmed) {
    return (
      <mark
        data-confirmar=""
        title="CONFIRMAR"
        className="rounded bg-transparent px-1 whitespace-nowrap text-current outline-1 outline-current outline-dashed"
      >
        {value}
      </mark>
    );
  }
  return <>{value}</>;
}
