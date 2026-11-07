import { ImageResponse } from "next/og";
import { IconArt } from "@/lib/brand-image";

export const dynamic = "force-static";

/** Favicon PNG 32×32 (respaldo del SVG para navegadores que no lo leen). */
export function GET() {
  return new ImageResponse(<IconArt size={32} radius={7} />, { width: 32, height: 32 });
}
