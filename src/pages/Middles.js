import React, { Component, useEffect } from "react";
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
  paths,
  sportsBooksSelectValues,
  sportsSelectValues,
} from "../common/constants";
import { middlesColumnsV1, middlesColumnsV2 } from "../common/columns";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Middles = () => {
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
      parlayBooks: sportsBooks.join(","),
      sports: sports.join(","),
    };

    try {
      const response = await axios.get(paths.getMiddlesBasePath, {
        params: queryParams,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, []);

  const tableV1 = useMaterialReactTable({
    columns: middlesColumnsV1,
    data,
    layoutMode: "semantic",
    enableColumnResizing: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: true,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    muiTableBodyRowProps: { hover: false },
  });

  const tableV2 = useMaterialReactTable({
    columns: middlesColumnsV2,
    data,
    layoutMode: "semantic",
    enableColumnOrdering: false,
    enableColumnResizing: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: false,
    enableBottomToolbar: true,
    enableTopToolbar: false,
    paginateExpandedRows: true,
    pageSize: 10,
    initialState: { expanded: true, pagination: { pageSize: 10 } },
    muiPaginationProps: { rowsPerPageOptions: ["10"] },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                {row.original.team} vs. {row.original.opposingTeam}
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{row.original.statType}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{row.original.sport}</Item>
            </Grid>
          </Grid>
        </Box>
        <br />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>UD: {row.original.udLine}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>PP: {row.original.prizepicksLine}</Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    ),
  });

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
            options={sportsSelectValues}
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

      {detectMob() ? (
        <MaterialReactTable table={tableV2} />
      ) : (
        <MaterialReactTable table={tableV1} />
      )}
    </div>
  );
};

class RenderMiddles extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Middles />
        <Footer />
      </>
    );
  }
}

export default RenderMiddles;
