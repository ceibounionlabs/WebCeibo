import QRCode from "qrcode";
import { siteUrl } from "@/lib/site";

/**
 * QR del modo stand (5.8). Se genera en build con la URL pública del sitio
 * (el dominio de lib/site.ts o, mientras falte, la URL de producción de
 * Vercel). Solo se ve con ?stand=1.
 */
export async function StandQr() {
  const url = siteUrl().href;
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#141113", light: "#FFFFFF" } });
  return (
    <aside className="stand-qr fixed right-6 bottom-6 z-[90] flex-col items-center gap-3 rounded-card bg-white p-5 text-ink shadow-[0_20px_60px_-20px_rgb(20_17_19/0.5)]" aria-label="Código QR del sitio">
      <div className="size-[clamp(8rem,12vw,13rem)] [&_svg]:size-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="text-center text-[clamp(0.875rem,1vw,1.25rem)] font-medium">Escaneá y hablemos</p>
    </aside>
  );
}
