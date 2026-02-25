import Cell from "./Cell";
import CellLine from "./CellLine";
export const juicyColumnsV1 = [
  {
    accessorKey: "diffs",
    header: "Diff",
    Cell,
    size: 80,
    minSize: 70,
    maxSize: 90,
  },
  {
    accessorKey: "expectedValue",
    header: "EV %",
    size: 90,
    minSize: 75,
    maxSize: 105,
    Cell: ({ cell }) => <>{cell.getValue()}%</>,
  },
  {
    accessorKey: "player",
    header: "Player",
    enableClickToCopy: true,
    size: 130,
    minSize: 100,
  },
  {
    accessorKey: "sport",
    header: "Sport",
    size: 95,
    minSize: 85,
    maxSize: 110,
  },
  {
    accessorKey: "teams",
    header: "Teams",
    size: 145,
    minSize: 120,
  },
  {
    accessorKey: "statType",
    header: "Stat Type",
    size: 140,
    minSize: 110,
  },
  {
    header: "Juicy",
    id: "JuicyLine",
    Cell: CellLine,
    size: 105,
    minSize: 90,
  },
  {
    header: "Book",
    id: "BookLine",
    Cell: CellLine,
    size: 105,
    minSize: 90,
  },
];


export const rivalsColumns = [
  {
    accessorKey: "diffs",
    header: "Difference",
    Cell,
  },
  {
    accessorKey: "percentDiffs",
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

export const juicyColumnsV2 = [
  {
    accessorKey: "diffs",
    header: "Diff",
    Cell: Cell,
    size: 70,
  },
  {
    accessorKey: "expectedValue",
    header: "EV %",
    Cell: ({ cell }) => <>{cell.getValue()}%</>,
    size: 70,
  },
  {
    accessorKey: "player",
    header: "Player",
    enableClickToCopy: true,
  },
];


