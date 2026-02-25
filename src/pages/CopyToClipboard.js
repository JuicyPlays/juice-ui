import { useState } from "react";

const CopyToClipboardButton = ({ player, hideText = false }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(player).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleClick}
      title={`Copy "${player}"`}
      style={{
        background: "transparent",
        border: "1px solid transparent",
        borderRadius: "6px",
        color: copied ? "#34d399" : "var(--text-primary)",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        padding: "2px 6px",
        transition: "all 0.15s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
          e.currentTarget.style.background = "rgba(99,102,241,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {!hideText && player}
      <span style={{ fontSize: "11px", opacity: 0.6 }}>{copied ? "✓" : "⎘"}</span>
    </button>
  );
};

export default CopyToClipboardButton;
