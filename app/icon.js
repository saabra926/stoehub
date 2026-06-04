import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: 7,
            background: "linear-gradient(135deg, #ff8835 0%, #f1bd64 100%)",
            color: "#17120f",
            fontSize: 17,
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
