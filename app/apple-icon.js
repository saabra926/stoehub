import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151515",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 32,
            background: "linear-gradient(135deg, #ff8835 0%, #f1bd64 100%)",
            color: "#17120f",
            fontSize: 88,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
