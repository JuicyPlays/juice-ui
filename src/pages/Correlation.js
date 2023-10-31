import React from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";

import { Box, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MultipleSelectChip from "./Select";
import {
  correlationSportValues,
  paths,
  sportsBooksSelectValues,
} from "../common/constants";
import { correlationColumns } from "../common/columns";

const Correlation = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sportsBooks, setSportsBooks] = React.useState([]);
  const [sports, setSports] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const handleSportsBooksChange = (event) => {
    const {
      target: { value },
    } = event;
    setSportsBooks(typeof value === "string" ? value.split(",") : value);
  };

  const handleSportsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSports(typeof value === "string" ? value.split(",") : value);
  };

  async function handleClick() {
    setLoading(true);
    setButtonDisabled(true);
    await fetchData();
    setLoading(false);
    setButtonDisabled(false);
  }

  async function fetchData() {
    const queryParams = {
      parlayBooks: "PRIZEPICKS,UNDERDOG",
      sports: sports.length === 0 ? "CSGO,VAL" : sports.join(","),
    };

    try {
      const response = await axios.get(paths.getCorrelationBasePath, {
        params: queryParams,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const rows = data.map((sportsBook) => ({
    sportsBookName: sportsBook.sportsBookName,
    subRows: sportsBook.props.map((prop, i) => ({
      diff: prop.diffs,
      player: prop.player,
      line: prop.line,
      stat_type: prop.stat_types.split("\n")[i % 2],
      over: prop.over ? "over" : "under", // Fixed the conditional statement
    })),
  }));

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Box mr={2}>
          <MultipleSelectChip
            options={sportsBooksSelectValues}
            label="Books"
            handleChanges={handleSportsBooksChange}
          />
        </Box>
        <Box mr={2}>
          <MultipleSelectChip
            options={correlationSportValues}
            label="Sports"
            handleChanges={handleSportsChange}
          />
        </Box>
        <Box mr={2} margin="8px">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            style={{ height: "55px" }}
            onClick={handleClick}
            disabled={buttonDisabled}
          >
            {loading ? <CircularProgress size={20} /> : "Refresh"}
          </Button>
        </Box>
      </div>

      <MaterialReactTable
        columns={correlationColumns}
        data={rows}
        getSubRows={(row) => row.subRows}
        expandSubRows={4}
        enableExpandAll={true}
        enableExpanding={true}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={true}
        paginateExpandedRows={false}
        pageSize={2}
        enableSorting={false}
        enableBottomToolbar={true}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
        enableHiding={true}
        initialState={{ expanded: true, pagination: { pageSize: 2 } }}
        muiPaginationProps={{ rowsPerPageOptions: ["2"] }}
      />
    </div>
  );
};

export default Correlation;
