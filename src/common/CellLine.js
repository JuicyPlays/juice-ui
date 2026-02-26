const CellLine = ({ cell }) => {
  let backgroundColor;
  let cellValue;

  if (cell.column.id === "JuicyLine") {
    cellValue = cell.row.original?.juicyLine;
    backgroundColor = "#9333ea"; // Model Purple
  }

  if (cell.column.id === "BookLine") {
    cellValue = cell.row.original?.sportsbookLine;
    backgroundColor = "#2563eb"; // Sportsbook Blue
  }

  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "6px",
        color: "#fff",
        minWidth: "48px",
        padding: "4px 12px",
        display: "inline-block",
        fontWeight: "700",
        textAlign: "center",
        fontSize: "13px",
      }}
    >
      {cellValue}
    </span>
  );
};

export default CellLine;
