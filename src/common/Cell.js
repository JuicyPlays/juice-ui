const Cell = ({ cell }) => {
  let backgroundColor;

  if (cell.getValue() < 1) {
    backgroundColor = "#B00020"; // Red
  } else if (cell.getValue() < 3) {
    backgroundColor = "#E07C24"; // Orange
  } else if (cell.getValue() < 5) {
    backgroundColor = "#388E3C"; // Green
  } else if (cell.getValue() < 7) {
    backgroundColor = "#3944F7"; // Blue
  } else if (cell.getValue() !== undefined) {
    backgroundColor = "#5A20CB"; // Purple
  }

  const cellValue = cell.getValue();
  const numericValue =
    typeof cellValue === "number" ? cellValue : parseFloat(cellValue);
  const roundedValue = numericValue.toFixed(2);
  const formattedValue = roundedValue.toLocaleString("en-US");

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
      {isNaN(formattedValue) ? "" : formattedValue}
    </span>
  );
};

export default Cell;
