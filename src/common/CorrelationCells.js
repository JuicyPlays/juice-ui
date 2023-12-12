import CopyToClipboardButton from "../pages/CopyToClipboard";

function getColor(value) {
  let backgroundColor;
  value = Number(value);
  if (value < 1) {
    backgroundColor = "#B00020"; // Red
  } else if (value < 3) {
    backgroundColor = "#E07C24"; // Orange
  } else if (value < 5) {
    backgroundColor = "#388E3C"; // Green
  } else if (value < 7) {
    backgroundColor = "#3944F7"; // Blue
  } else if (value !== undefined) {
    backgroundColor = "#5A20CB"; // Purple
  }
  return backgroundColor;
}

const CorrelationCells = ({ cell }) => {
  let backgroundColor1;
  let backgroundColor2;
  let val1;
  let val2;
  let isPlayer = false;

  if (cell.column.id === "PRIZE PICKS") {
    val1 = cell.row.original.a.prizepicksLine;
    val2 = cell.row.original.b.prizepicksLine;
  }

  if (cell.column.id === "UNDERDOG") {
    val1 = cell.row.original.a.udLine;
    val2 = cell.row.original.b.udLine;
  }

  if (cell.column.id === "STAT TYPE") {
    val1 = cell.row.original.a.statType;
    val2 = cell.row.original.b.statType;
  }

  if (cell.column.id === "PLAYERS") {
    isPlayer = true;
    val1 = cell.row.original.a.player;
    val2 = cell.row.original.b.player;
  }

  if (cell.column.id === "TEAM") {
    val1 = cell.row.original.a.team;
    val2 = cell.row.original.b.team;
  }

  if (cell.column.id === "DIFF") {
    val1 = cell.row.original.a.difference;
    val2 = cell.row.original.b.difference;
    backgroundColor1 = getColor(val1);
    backgroundColor2 = getColor(val2);
  }

  return (
    <>
      <span
        style={{
          backgroundColor: backgroundColor1,
          borderRadius: "0.25rem",
          color: "#fff",
          maxWidth: "9ch",
          padding: "3px",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        {isPlayer ? <CopyToClipboardButton player={val1} /> : val1}
      </span>
      <br />
      <span
        style={{
          backgroundColor: backgroundColor2,
          borderRadius: "0.25rem",
          color: "#fff",
          maxWidth: "9ch",
          padding: "3px",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        {isPlayer ? <CopyToClipboardButton player={val2} /> : val2}
      </span>
    </>
  );
};

export default CorrelationCells;
