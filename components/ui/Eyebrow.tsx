type Props = {
  children: React.ReactNode;
  className?: string;
  reveal?: boolean;
};

/**
 * Etiqueta sobre cada título (CAMBIOS-v2 C): 12px, mayúsculas, espaciado .12em
 * y una línea de 32px a la izquierda. Toma el color del texto (`className`).
 */
export function Eyebrow({ children, className = "", reveal = true }: Props) {
  return (
    <p
      className={`flex h-fit items-center gap-3 text-xs font-medium tracking-[0.12em] uppercase ${className}`}
      data-reveal={reveal ? "" : undefined}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      {children}
    </p>
  );
}
