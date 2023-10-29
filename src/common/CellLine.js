const CellLine = ({ cell }) => {
  let backgroundColor;
  let cellValue;

  if (cell.column.id === "Prize Picks") {
    cellValue = cell.row.original.prizepicksLine;
  }
  if (
    cell.column.id === "Prize Picks" &&
    cell.row.original.prizepicksLine < cell.row.original.udLine
  ) {
    backgroundColor = "#388E3C";
  }

  if (cell.column.id === "Underdog") {
    cellValue = cell.row.original.udLine;
  }

  if (
    cell.column.id === "Underdog" &&
    cell.row.original.prizepicksLine > cell.row.original.udLine
  ) {
    backgroundColor = "#388E3C";
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
