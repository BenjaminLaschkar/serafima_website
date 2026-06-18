import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — Soprano`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0C",
          color: "#F4EFE6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#C9A86B" }}>
          — Soprano
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 130, lineHeight: 1, fontWeight: 300 }}>Serafima</div>
          <div style={{ fontSize: 130, lineHeight: 1, fontWeight: 300, fontStyle: "italic", color: "#C9A86B" }}>
            Liberman
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#F4EFE6AA", letterSpacing: 4, textTransform: "uppercase" }}>
          <span>Opéra · Récital</span>
          <span>serafima-liberman.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
