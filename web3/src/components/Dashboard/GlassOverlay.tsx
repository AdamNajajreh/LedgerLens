"use client";

export default function GlassOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(5px)",
        background: "rgba(255, 255, 255, 0.05)",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: "2rem",
      }}
    ></div>
  );
}
