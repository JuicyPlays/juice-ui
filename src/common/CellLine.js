const CellLine = ({ cell }) => {
  let backgroundColor;
  let cellValue;

  if (cell.column.id === "JuicyLine") {
    cellValue = cell.row.original?.juicyLine;
    if (!cell.row.original?.over) {
      backgroundColor = "#388E3C";
    }
  }

  if (cell.column.id === "BookLine") {
    cellValue = cell.row.original?.sportsbookLine;
    if (cell.row.original?.over) {
      backgroundColor = "#388E3C";
    }
  }

  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "0.25rem",
        color: "#fff",
        maxWidth: "9ch",
        padding: "0.50rem",
        display: "inline-block",
        fontWeight: "bold",
      }}
    >
      {cellValue}
    </span>
  );
};

export default CellLine;
