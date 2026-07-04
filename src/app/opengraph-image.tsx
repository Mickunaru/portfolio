import { ImageResponse } from "next/og";

/* Simple generated OG card (SRS §9): themed monochrome, headline with the
   accent "100%", statically rendered at build time. */

export const alt =
  "Michael Le — I build software the way I play games, all the way to 100%.";
export const size = { width: 1200, height: 630 };
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
          padding: "80px",
          backgroundColor: "#09090B",
          color: "#FAFAFA",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#A1A1AA",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Michael Le
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.2,
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1000,
          }}
        >
          I build software the way I play games — all the way to&nbsp;
          <span style={{ color: "#38BDF8" }}>100%</span>.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#A1A1AA",
            marginTop: 32,
            fontStyle: "italic",
            display: "flex",
          }}
        >
          Problem solver by day. Gamer by night.
        </div>
      </div>
    ),
    size,
  );
}
