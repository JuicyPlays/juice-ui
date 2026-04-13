import React from "react";

export default function TechGridVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        background:
          "linear-gradient(180deg, rgba(19, 19, 43, 0.4) 0%, rgba(13, 13, 26, 0.8) 100%)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 40px rgba(99, 102, 241, 0.1)",
      }}
    >
      {/* Animated Matrix/Grid effect overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.5,
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 10px #6366f1",
            }}
          ></div>
          <span
            style={{
              color: "#a0a0c0",
              fontSize: "13px",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            SLIP GENERATOR
          </span>
        </div>
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          <span style={{ color: "#10b981", fontSize: "11px", fontWeight: 700 }}>
            +EV FOUND
          </span>
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          zIndex: 1,
        }}
      >
        {/* Mock Slip Rows */}
        {[
          {
            game: "CS2 • TS vs NAVI",
            player: "donk",
            stat: "Map 1-2 Kills",
            line: "38.5",
            pick: "OVER",
            ev: "+11.4%",
          },
          {
            game: "VAL • SEN vs LOUD",
            player: "TenZ",
            stat: "Map 1-2 Kills",
            line: "35.5",
            pick: "OVER",
            ev: "+14.2%",
          },
          {
            game: "LoL • T1 vs GEN",
            player: "Faker",
            stat: "Map 1-2 Kills",
            line: "9.5",
            pick: "OVER",
            ev: "+8.9%",
          },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#a0a0c0",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                {row.game}
              </div>
              <div
                style={{ color: "#f1f1fb", fontWeight: 600, fontSize: "15px" }}
              >
                {row.player}
              </div>
              <div
                style={{ color: "#818cf8", fontSize: "12px", marginTop: "2px" }}
              >
                {row.stat}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#10b981",
                    marginBottom: "2px",
                    fontWeight: 700,
                  }}
                >
                  {row.ev} EV
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#a0a0c0",
                    marginBottom: "4px",
                  }}
                >
                  LINE: {row.line}
                </div>
              </div>
              <div
                style={{
                  background: "#10b981",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#000",
                    fontWeight: 800,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {row.pick}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slip Footer / Total EV */}
      <div
        style={{
          padding: "16px 20px",
          background: "rgba(19, 19, 43, 0.8)",
          borderTop: "1px solid rgba(99, 102, 241, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ fontSize: "12px", color: "#a0a0c0", fontWeight: 500 }}>
            3-PICK POWER PLAY
          </div>
          <div
            style={{
              color: "#f1f1fb",
              fontSize: "14px",
              fontWeight: 700,
              marginTop: "2px",
            }}
          >
            Total Expected Value
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#10b981", fontSize: "20px", fontWeight: 800 }}>
            +34.5%
          </span>
          <span style={{ color: "#a0a0c0", fontSize: "13px", fontWeight: 600 }}>
            EV
          </span>
        </div>
      </div>
    </div>
  );
}
