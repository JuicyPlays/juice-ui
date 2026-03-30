import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, CircularProgress } from "@mui/material";
import { paths } from "../common/constants";
import { juicyColumnsV1, juicyColumnsV2 } from "../common/columns";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MySelect from "./ReactSelect";
import { useAuthUser } from "react-auth-kit";
import { useMediaQuery } from "../hooks/useMediaQuery";

const bookDisplayName = (key) => {
  if (!key) return "";
  const lower = key.toLowerCase();
  if (lower === "juice_ml") return "Juicy";
  if (lower === "prizepicks") return "PrizePicks";
  if (lower === "underdog") return "Underdog";
  if (lower === "sleeper") return "Sleeper";
  if (lower === "thunderpick") return "Thunderpick";
  if (lower === "parlayplay") return "ParlayPlay";
  if (lower === "betr") return "Betr";
  if (lower === "boom") return "BOOM";
  if (lower === "draftkings_pick6" || lower === "draftkings-pick6") return "DK Pick6";
  return key.charAt(0).toUpperCase() + key.slice(1);
};

const JuicyPlays = () => {
  const [data, setData] = useState([]);
  const [sportsbook, setSportsbook] = useState("underdog");
  const [baselineBook, setBaselineBook] = useState("prizepicks");
  const [sports, setSports] = useState([]);
  const [stats, setStats] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);
  const [baselineOptions, setBaselineOptions] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [statOptions, setStatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthUser();
  const isMobile = useMediaQuery("(max-width: 900px)");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleClick(); }, []);

  async function handleClick() {
    setLoading(true);
    await fetchJuicyPlaysData();
    setLoading(false);
  }

  const handleSportsChange = (selected) => {
    setSports(selected.map((it) => it.value).join(","));
  };

  const handleBookChange = (selected) => {
    if (!selected) {
      setSportsbook("");
    } else if (Array.isArray(selected)) {
      setSportsbook(selected.map((it) => it.value).join(","));
    } else {
      setSportsbook(selected.value);
    }
  };

  const handleBaselineBookChange = (selected) => {
    setBaselineBook(selected ? selected.value : "");
  };

  const handleStatChange = (selected) => {
    setStats(selected.map((it) => it.value).join(","));
  };

  const fetchJuicyPlaysData = async (currentBook = sportsbook, currentBaseline = baselineBook) => {
    const queryParams = {
      sportsbook: currentBook,
      sports: sports,
      stats: stats,
      baselineBook: currentBaseline,
    };
    const headers = {
      "x-customer-id": "",
      "x-user-id": user().userId,
    };
    try {
      const res = await axios.get(paths.getJuicyPlaysBasePath, {
        params: queryParams,
        headers,
      });
      setData(res.data.plays);
      setStatOptions(res.data.statTypes.map((v) => ({ value: v, label: v })));
      setSportsOptions(res.data.sports.map((v) => ({ value: v, label: v })));
      if (res.data.sportsbooks) {
        let books = [...res.data.sportsbooks];
        if (!books.includes("underdog")) books.push("underdog");
        if (!books.includes("prizepicks")) books.push("prizepicks");

        const targetBooks = books.filter(b => b.toLowerCase() !== "juice_ml" && b.toLowerCase() !== "juiceml");
        const mappedBooks = targetBooks.map((v) => ({
          value: v.toLowerCase(),
          label: bookDisplayName(v)
        }));
        setBookOptions(mappedBooks);

        const baselineOpts = [...mappedBooks, { value: "juice_ml", label: "Juicy" }];
        setBaselineOptions(baselineOpts);

        // Auto-select the first sportsbook on initial load if none is selected yet
        if (!currentBook && mappedBooks.length > 0) {
          setSportsbook(mappedBooks[0].value);
          // Re-fetch implicitly using the newly selected default book to calculate plays
          fetchJuicyPlaysData(mappedBooks[0].value, currentBaseline);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tableV1 = useMaterialReactTable({
    columns: juicyColumnsV1,
    data,
    layoutMode: "grid",
    defaultColumn: { minSize: 60, maxSize: 200 },
    enableColumnResizing: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: true,
    initialState: {
      sorting: [{ id: "diffs", desc: true }],
    },
    enableBottomToolbar: false,
    enableTopToolbar: false,
    muiTableBodyRowProps: { hover: false },
    muiTablePaperProps: { style: { width: "100%" } },
    muiTableContainerProps: { style: { maxWidth: "100%" } },
    muiTableHeadCellProps: {
      sx: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: 1.25,
        padding: "12px 16px",
        fontSize: "13px",
        fontWeight: "700",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
    muiTableBodyCellProps: {
      sx: { padding: "4px 16px" },
    },
  });

  const tableV2 = useMaterialReactTable({
    columns: juicyColumnsV2,
    data,
    layoutMode: "grid",
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
    initialState: {
      expanded: true,
      pagination: { pageSize: 10 },
      sorting: [{ id: "diffs", desc: true }]
    },
    muiPaginationProps: { rowsPerPageOptions: ["10"] },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ flexGrow: 1, p: 1, minWidth: 0 }}>
        <div style={mobileDetailStyles.grid}>
          <span style={mobileDetailStyles.chip}>{row.original.teams}</span>
          <span style={mobileDetailStyles.chip}>{row.original.statType}</span>
          <span style={mobileDetailStyles.chip}>{row.original.sport}</span>
        </div>
        <div style={{ ...mobileDetailStyles.grid, marginTop: "8px" }}>
          <span style={mobileDetailStyles.bookChip}>Book: {row.original?.sportsbookLine}</span>
          <span style={mobileDetailStyles.juicyChip}>Juicy: {row.original?.juicyLine}</span>
          <span style={row.original?.over ? mobileDetailStyles.leanOver : mobileDetailStyles.leanUnder}>
            {row.original?.over ? "OVER" : "UNDER"}
          </span>
        </div>
      </Box>
    ),
    muiTablePaperProps: {
      sx: {
        width: "100%",
        boxShadow: "none",
        border: "none",
        background: "transparent"
      }
    },
    muiTableBodyCellProps: {
      sx: {
        padding: "8px 8px",
        fontSize: "11px"
      }
    }
  });

  return (
    <div style={{ ...styles.page, padding: isMobile ? "16px 8px 60px" : styles.page.padding }}>
      {/* Page header */}
      <div style={styles.header}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={styles.title}>⚡ EV Plays</h2>
          <p style={styles.subtitle}>Model-based +EV plays across sportsbooks</p>
        </div>
        <div style={styles.countBadge}>{data.length} props</div>
      </div>

      {/* Filter bar */}
      <div style={{ ...styles.filterBar, padding: isMobile ? "12px" : styles.filterBar.padding }}>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Sportsbook</div>
          <MySelect options={bookOptions} handleChanges={handleBookChange} label={"Sportsbook"} defaultSelected={sportsbook ? { value: sportsbook, label: sportsbook === "prizepicks" ? "PrizePicks" : sportsbook.charAt(0).toUpperCase() + sportsbook.slice(1) } : null} isMulti={false} />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Model</div>
          <MySelect options={baselineOptions} handleChanges={handleBaselineBookChange} label={"Baseline Model"} defaultSelected={baselineBook ? { value: baselineBook, label: (baselineBook === "juice_ml" || baselineBook === "juiceml") ? "Juicy" : baselineBook === "prizepicks" ? "PrizePicks" : baselineBook.charAt(0).toUpperCase() + baselineBook.slice(1) } : null} isMulti={false} />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Sport</div>
          <MySelect options={sportsOptions} handleChanges={handleSportsChange} label={"Sports"} />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Market</div>
          <MySelect options={statOptions} handleChanges={handleStatChange} label={"Stat"} />
        </div>
        <button
          className="btn-gradient"
          onClick={handleClick}
          disabled={loading}
          style={{ minWidth: isMobile ? "100%" : "110px", flexShrink: 0 }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CircularProgress size={14} style={{ color: "white" }} />
              Loading…
            </span>
          ) : (
            "↻  Refresh"
          )}
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        {isMobile ? (
          <div style={{ width: "100%", overflowX: "hidden" }}>
            <MaterialReactTable table={tableV2} />
          </div>
        ) : (
          <MaterialReactTable table={tableV1} />
        )}
      </div>
    </div>
  );
};

export default function JuicyPlaysPage() {
  return (
    <>
      <NavBar />
      <JuicyPlays />
      <Footer />
    </>
  );
}

const styles = {
  page: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "32px 24px 80px",
    minHeight: "calc(100vh - 60px)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "24px",
    letterSpacing: "-0.4px",
    color: "var(--text-primary)",
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "var(--text-muted)",
    margin: 0,
  },
  countBadge: {
    padding: "6px 14px",
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    color: "var(--accent-light)",
    letterSpacing: "0.04em",
    alignSelf: "flex-start",
    marginTop: "4px",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    background: "rgba(19,19,43,0.7)",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    backdropFilter: "blur(16px)",
    marginBottom: "20px",
  },
  selectWrap: {
    flex: "1 1 200px",
    minWidth: "150px"
  },
  dropdownLabel: {
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableWrap: {
    borderRadius: "14px",
    overflow: "hidden",
  },
};

const mobileDetailStyles = {
  grid: { display: "flex", gap: "8px", flexWrap: "wrap" },
  chip: {
    padding: "4px 10px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "var(--text-secondary)",
    fontFamily: "'Inter', sans-serif",
    border: "1px solid var(--border-subtle)",
  },
  bookChip: {
    padding: "4px 10px",
    background: "rgba(37, 99, 235, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#60a5fa",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(37, 99, 235, 0.2)",
  },
  juicyChip: {
    padding: "4px 10px",
    background: "rgba(147, 51, 234, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#a855f7",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(147, 51, 234, 0.2)",
  },
  leanOver: {
    padding: "4px 10px",
    background: "rgba(16, 185, 129, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#10b981",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
  leanUnder: {
    padding: "4px 10px",
    background: "rgba(239, 68, 68, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#ef4444",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
};
