import Cell from "./Cell";

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
    accessorKey: "prizepicksLine",
    header: "PrizePicks",
  },
  {
    accessorKey: "udLine",
    header: "Underdog",
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
  },
  {
    accessorKey: "over",
    header: "O / U",
  },
  {
    accessorKey: "diff",
    header: "DIFF",
    Cell,
  },
  {
    accessorKey: "player",
    header: "PLAYER",
    enableClickToCopy: true,
  },
  {
    accessorKey: "line",
    header: "LINE",
    enableClickToCopy: true,
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
