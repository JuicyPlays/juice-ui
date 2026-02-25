const Cell = ({ cell }) => {
  const cellValue = cell.getValue();
  const numericValue = typeof cellValue === "number" ? cellValue : parseFloat(cellValue);
  if (isNaN(numericValue)) return null;
  const roundedValue = numericValue.toFixed(2);

  // Color scale matching design system
  let bg, textColor;
  if (numericValue < 1) {
    bg = "rgba(239, 68, 68, 0.15)";
    textColor = "#f87171";
  } else if (numericValue < 3) {
    bg = "rgba(245, 158, 11, 0.15)";
    textColor = "#fbbf24";
  } else if (numericValue < 5) {
    bg = "rgba(16, 185, 129, 0.15)";
    textColor = "#34d399";
  } else if (numericValue < 7) {
    bg = "rgba(99, 102, 241, 0.18)";
    textColor = "#818cf8";
  } else {
    bg = "rgba(139, 92, 246, 0.18)";
    textColor = "#a78bfa";
  }

  return (
    <span
      style={{
        background: bg,
        border: `1px solid ${textColor}44`,
        borderRadius: "6px",
        color: textColor,
        padding: "3px 9px",
        display: "inline-block",
        fontWeight: 700,
        fontSize: "12.5px",
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.02em",
        minWidth: "42px",
        textAlign: "center",
      }}
    >
      {roundedValue}
    </span>
  );
};

export default Cell;
