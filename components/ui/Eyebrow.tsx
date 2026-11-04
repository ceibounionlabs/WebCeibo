type Props = {
  children: React.ReactNode;
  /** Color del punto: rojo por defecto, blanco sobre la sección roja. */
  dot?: "ceibo" | "white";
  className?: string;
  reveal?: boolean;
};

/** Volanta en minúsculas, con el mismo tono que el logotipo. */
export function Eyebrow({ children, dot = "ceibo", className = "", reveal = true }: Props) {
  return (
    <p
      className={`flex h-fit items-center gap-2.5 text-sm font-medium tracking-[0.01em] ${className}`}
      data-reveal={reveal ? "" : undefined}
    >
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${dot === "white" ? "bg-white" : "bg-ceibo"}`} />
      {children}
    </p>
  );
}
