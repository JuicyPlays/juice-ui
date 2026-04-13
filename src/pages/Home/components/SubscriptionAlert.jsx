import React from "react";

export default function SubscriptionAlert() {
  return (
    <div
      style={{
        background: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        borderRadius: "12px",
        padding: "16px",
        marginTop: "24px",
        textAlign: "center",
        color: "#ef4444",
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        zIndex: 10,
        position: "relative",
      }}
    >
      ⚠️ Subscription required to access Juicy Screen or Slip Generator. Please
      choose a plan below.
    </div>
  );
}
