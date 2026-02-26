import CellPlayer from "./CellPlayer";
import CellLine from "./CellLine";
import CellLean from "./CellLean";
import CellEV from "./CellEV";
import Cell from "./Cell";

export const juicyColumnsV1 = [
  {
    accessorKey: "player",
    header: "Player",
    Cell: CellPlayer,
    size: 220,
    minSize: 180,
  },
  {
    accessorKey: "statType",
    header: "Prop",
    size: 140,
    minSize: 110,
  },
  {
    header: "Book",
    id: "BookLine",
    Cell: CellLine,
    size: 90,
    minSize: 80,
  },
  {
    header: "Model",
    id: "JuicyLine",
    Cell: CellLine,
    size: 90,
    minSize: 80,
  },
  {
    header: "Lean",
    id: "Lean",
    Cell: CellLean,
    size: 80,
    minSize: 70,
  },
  {
    accessorKey: "expectedValue",
    header: "EV",
    Cell: CellEV,
    size: 80,
    minSize: 70,
  },
  {
    accessorKey: "diffs",
    header: "Diff",
    Cell: Cell,
    size: 80,
    minSize: 70,
  },
];

export const rivalsColumns = [
  {
    accessorKey: "rivalOne.name",
    header: "Rival 1",
    enableClickToCopy: true,
  },
  {
    accessorKey: "rivalTwo.name",
    header: "Rival 2",
    enableClickToCopy: true,
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
    accessorKey: "player",
    header: "Player",
    Cell: CellPlayer,
  },
  {
    accessorKey: "expectedValue",
    header: "EV",
    Cell: CellEV,
  },
  {
    accessorKey: "diffs",
    header: "Diff",
    Cell: Cell,
  },
];


