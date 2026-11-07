import { ImageResponse } from "next/og";
import { IconArt } from "@/lib/brand-image";

export const dynamic = "force-static";

/** apple-touch-icon 180×180: isotipo rojo sobre blanco (iOS no admite transparencia y redondea solo). */
export function GET() {
  return new ImageResponse(<IconArt size={180} background="#FFFFFF" fill={0.72} />, { width: 180, height: 180 });
}
