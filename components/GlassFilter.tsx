/**
 * Filtro SVG de distorsión de lente para el vidrio del header (A1).
 * Va una sola vez en el layout. Solo lo usa Chromium de escritorio.
 */
export function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="lente-distorsion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves={1} seed={5} result="ruido" />
        <feComponentTransfer in="ruido" result="mapa">
          <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
          <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
          <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
        </feComponentTransfer>
        <feGaussianBlur in="mapa" stdDeviation={3} result="mapaSuave" />
        <feDisplacementMap in="SourceGraphic" in2="mapaSuave" scale={60} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
