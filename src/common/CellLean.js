import React from "react";

const CellLean = ({ cell }) => {
  const over = cell.row.original?.over;
  const overEnabled = cell.row.original?.overEnabled !== false; // Default to true if undefined
  const underEnabled = cell.row.original?.underEnabled !== false; // Default to true if undefined
  const isSingleOption = !overEnabled || !underEnabled;

  const getTooltipTitle = () => {
    if (!isSingleOption) return "";
    const availableOption = over ? "OVER" : "UNDER";
    return `Only ${availableOption} option available for this prop`;
  };

  const style = {
    color: over ? "#10b981" : "#ef4444",
    fontWeight: "800",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    cursor: isSingleOption ? "help" : "default",
    // Add subtle indicator for single-option props
    ...(isSingleOption && {
      borderBottom: "1px dashed",
      borderBottomColor: over ? "#10b981" : "#ef4444",
      position: "relative",
    }),
  };

  const leanContent = (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span style={style}>{over ? "OVER" : "UNDER"}</span>
      {isSingleOption && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-8px",
            background: "#fbbf24",
            color: "#000",
            borderRadius: "50%",
            width: "12px",
            height: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "7px",
            fontWeight: "bold",
            border: "1px solid #fff",
            cursor: "help",
          }}
          title={getTooltipTitle()}
        >
          !
        </span>
      )}
    </div>
  );

  // Wrap in tooltip only for single-option props
  if (isSingleOption) {
    return <span title={getTooltipTitle()}>{leanContent}</span>;
  }

  return leanContent;
};

export default CellLean;
