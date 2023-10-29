import Cell from "./Cell";
import CellLine from "./CellLine";

export const middlesColumnsV1 = [
  {
    accessorKey: "difference",
    header: "Difference",
    Cell,
    size: 70,
  },
  {
    accessorKey: "percentDifference",
    header: "Percent Difference",
  },
  {
    accessorKey: "player",
    header: "Player",
    enableClickToCopy: true,
  },
  {
    accessorKey: "sport",
    header: "Sport",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "opposingTeam",
    header: "Opponent",
  },
  {
    accessorKey: "statType",
    header: "Stat Type",
  },
  {
    // accessorKey: "prizepicksLine",
    header: "Prize Picks",
    Cell: CellLine,
  },
  {
    // accessorKey: "udLine",
    header: "Underdog",
    Cell: CellLine,
  },
];

export const rivalsColumns = [
  {
    accessorKey: "difference",
    header: "Difference",
    Cell,
  },
  {
    accessorKey: "percentDifference",
    header: "Percent Difference",
  },
  {
    accessorKey: "rivalOne.name",
    header: "Rival 1",
    enableClickToCopy: true,
  },
  {
    accessorKey: "rivalOne.adjustedLine",
    header: "Rival 1 Adjusted Line",
  },
  {
    accessorKey: "rivalTwo.name",
    header: "Rival 2",
    enableClickToCopy: true,
  },
  {
    accessorKey: "rivalTwo.adjustedLine",
    header: "Rival 2 Adjusted Line",
  },
  {
    accessorKey: "sport",
    header: "Sport",
  },
  {
    accessorKey: "statType",
    header: "Stat Type",
  },
];

export const correlationColumns = [
  {
    accessorKey: "sportsBookName",
    header: "BOOK",
    size: 30,
  },
  {
    accessorKey: "player",
    header: "PLAYER",
    enableClickToCopy: true,
    size: 30,
  },
  {
    accessorKey: "over",
    header: "O / U",
    size: 30,
  },
  {
    accessorKey: "line",
    header: "LINE",
    size: 10,
  },
  {
    accessorKey: "stat_type",
    header: "STAT",
    size: 10,
  },
  {
    accessorKey: "diff",
    header: "DIFF",
    Cell,
    size: 30,
  },
];

export const middlesColumnsV2 = [
  {
    accessorKey: "difference",
    header: "Diff",
    Cell: Cell,
    size: 70,
  },
  {
    accessorKey: "percentDifference",
    header: "% Diff",
    Cell: Cell,
    size: 70,
  },
  {
    accessorKey: "player",
    header: "Player",
    enableClickToCopy: true,
  },
];
