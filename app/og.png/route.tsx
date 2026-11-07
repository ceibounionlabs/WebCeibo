import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { colors } from "@/lib/colors";
import { googleSans, Isotipo } from "@/lib/brand-image";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** Imagen Open Graph / Twitter 1200×630: logo sobre rojo y el lema. */
export function GET() {
  const [lead, accent] = site.tagline.split(", ");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.ceibo,
          color: "#FFFFFF",
          fontFamily: "Google Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Isotipo height={88} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 30, lineHeight: 1.02, letterSpacing: -0.5 }}>
            <span>ceibo</span>
            <span>union</span>
            <span>labs</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.04, letterSpacing: -2.2, maxWidth: 1000 }}>
          <span>{lead},</span>
          <span style={{ opacity: 0.78 }}>{accent}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Google Sans", data: googleSans(), weight: 500, style: "normal" }] },
  );
}
