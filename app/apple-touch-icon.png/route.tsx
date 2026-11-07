import { ImageResponse } from "next/og";
import { IconArt } from "@/lib/brand-image";

export const dynamic = "force-static";

/** apple-touch-icon 180×180. iOS redondea las esquinas solo. */
export function GET() {
  return new ImageResponse(<IconArt size={180} radius={0} />, { width: 180, height: 180 });
}
