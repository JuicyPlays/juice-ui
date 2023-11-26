import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { Box, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { paths } from "../common/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ToggleSwitch from "./ToggleSwitch";
import {
  correlationSlipsColumns,
  correlationListColumns,
} from "../common/columns";
import MySelect from "./ReactSelect";

const Correlation = () => {
  const [correlationSlipsData, setCorrelationSlipsData] = React.useState([]);
  const [correlationListData, setCorrelationListData] = React.useState([]);
  const [sportsBooksOptions, setSportsBooksOptions] = React.useState([]);
  const [statOptions, setStatOptions] = React.useState([]);
  const [sportsOptions, setSportsOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [, setSportsBooks] = React.useState([]);
  const [sports, setSports] = React.useState([]);
  const [stats, setStats] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSportsBooksChange = (selected) => {
    setSportsBooks(selected.map((it) => it.value));
  };

  const handleSportsChange = (selected) => {
    setSports(selected.map((it) => it.value));
  };

  const handleStatChange = (selected) => {
    setStats(selected.map((it) => it.value).join(","));
  };

  async function handleClick() {
    setLoading(true);
    setButtonDisabled(true);
    await fetchData();
    setLoading(false);
    setButtonDisabled(false);
  }

  async function fetchData() {
    console.log("sports", sports);
    const queryParams = {
      parlayBooks: "PRIZEPICKS,UNDERDOG",
      sports: sports.length === 0 ? "CSGO,VAL,NFL,CFB" : sports.join(","),
      minCorrelationScore: 1.0, // TODO: Pass in as input on UI
      stats: stats,
    };

    try {
      const correlationSlipsResponse = await axios.get(
        paths.getCorrelationSlipsBasePath,
        {
          params: queryParams,
        }
      );
      setCorrelationSlipsData(correlationSlipsResponse.data);

      const correlationListResponse = await axios.get(
        paths.getCorrelationListBasePath,
        {
          params: queryParams,
        }
      );
      setCorrelationListData(correlationListResponse.data);

      const getMiddlesResponse = await axios.get(paths.getMiddlesBasePath, {
        params: queryParams,
      });
      setStatOptions(
        getMiddlesResponse.data.statTypes.map((value) => ({
          value,
          label: value,
        }))
      );
      setSportsOptions(
        getMiddlesResponse.data.sports.map((value) => ({
          value,
          label: value,
        }))
      );
      setSportsBooksOptions(
        getMiddlesResponse.data.sportsBooks.map((value) => ({
          value,
          label: value,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, []);

  const rows = correlationSlipsData.map((sportsBook) => ({
    sportsBookName: sportsBook.sportsBookName,
    diff: sportsBook.correlationScore,
    subRows: sportsBook.props.map((prop, i) => ({
      sport: prop.sport,
      diff: prop.diffs,
      player: prop.player,
      line: prop.line,
      teams: prop.teams,
      stat_type: prop.statType,
      over: prop.over ? "over" : "under", // Fixed the conditional statement
    })),
  }));

  const correlationListTable = useMaterialReactTable({
    columns: correlationListColumns,
    data: correlationListData,
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

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Box mr={2} margin="8px">
          <MySelect
            options={sportsBooksOptions}
            handleChanges={handleSportsBooksChange}
            label={"Books"}
          />
        </Box>
        <Box mr={2} margin="8px">
          <MySelect
            options={sportsOptions}
            handleChanges={handleSportsChange}
            label={"Sports"}
          />
        </Box>
        <Box mr={2} margin="8px">
          <MySelect
            options={statOptions}
            handleChanges={handleStatChange}
            label={"Stat"}
          />
        </Box>
        <Box mr={2} margin="8px">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            style={{ height: "39px" }}
            onClick={handleClick}
            disabled={buttonDisabled}
          >
            {loading ? <CircularProgress size={20} /> : "Refresh"}
          </Button>
        </Box>
        <Box mr={10} margin="15px">
          <ToggleSwitch
            isChecked={isChecked}
            onToggleChange={handleToggleChange}
          />
        </Box>
      </div>
      {isChecked ? (
        <MaterialReactTable table={correlationListTable} />
      ) : (
        <MaterialReactTable
          columns={correlationSlipsColumns}
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
      )}
    </div>
  );
};

class RenderCorrelation extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Correlation />
        <Footer />
      </>
    );
  }
}

export default RenderCorrelation;
