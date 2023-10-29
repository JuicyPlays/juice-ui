import React from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { styled } from "@mui/material/styles";
import { Box, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MultipleSelectChip from "./Select";
import {
  correlationSportValues,
  paths,
  sportsBooksSelectValues,
  sportsSelectValues,
} from "../common/constants";
import {
  correlationColumns,
  correlationColumnsInner,
  middlesColumnsV1,
  middlesColumnsV2,
} from "../common/columns";
import Footer from "./Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      sports: sports.join(","),
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
        enableExpandAll={true}
        enableExpanding={true}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={true}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
      />
    </div>
  );
};

export default Correlation;
