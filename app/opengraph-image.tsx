import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 45%, #f8fafc 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#047857",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Riverside Ward
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Sacrament Meeting Planner
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            fontSize: 32,
            color: "#475569",
            maxWidth: 900,
          }}
        >
          Plan, review, and manage Sunday sacrament meeting agendas.
        </div>
      </div>
    ),
    size,
  );
}
