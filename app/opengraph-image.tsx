import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Julien Lange — Développeur JavaScript Senior";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 80px",
        background: "#0F172A",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(46,117,182,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.12) 0%, transparent 45%)",
        }}
      />

      {/* Monogram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "linear-gradient(135deg, #2E75B6, #38BDF8)",
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 40,
        }}
      >
        JL
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#F1F5F9",
          lineHeight: 1,
          letterSpacing: "-2px",
        }}
      >
        Julien Lange
      </div>

      {/* Title */}
      <div
        style={{
          marginTop: 20,
          fontSize: 28,
          color: "#38BDF8",
          fontWeight: 500,
        }}
      >
        Développeur JavaScript Senior
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 8,
          fontSize: 22,
          color: "#64748B",
        }}
      >
        Web Components · Design System · Fullstack · Freelance
      </div>

      {/* Location pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          fontSize: 16,
          color: "#94A3B8",
        }}
      >
        📍 Île-de-France · julienlange.dev
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
