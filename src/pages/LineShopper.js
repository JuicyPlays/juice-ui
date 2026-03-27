import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { CircularProgress, TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { paths } from "../common/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MySelect from "./ReactSelect";
import CellPlayer from "../common/CellPlayer";
import { useAuthUser } from "react-auth-kit";
import { useMediaQuery } from "../hooks/useMediaQuery";

const bookDisplayName = (key) => {
  if (!key) return "";
  const lower = key.toLowerCase();
  if (lower === "prizepicks") return "PrizePicks";
  if (lower === "underdog") return "Underdog";
  if (lower === "sleeper") return "Sleeper";
  if (lower === "thunderpick") return "Thunderpick";
  return key.charAt(0).toUpperCase() + key.slice(1);
};

const LineShopper = () => {
  const [data, setData] = useState([]);
  const [sports, setSports] = useState([]);
  const [stats, setStats] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [statOptions, setStatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerSearch, setPlayerSearch] = useState("");
  const user = useAuthUser();
  const isMobile = useMediaQuery("(max-width: 900px)");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleRefresh(); }, []);

  async function handleRefresh() {
    setLoading(true);
    await fetchLineShopperData();
    setLoading(false);
  }

  const handleSportsChange = (selected) => {
    setSports(selected.map((it) => it.value).join(","));
  };

  const handleStatChange = (selected) => {
    setStats(selected.map((it) => it.value).join(","));
  };

  const handleBooksChange = (selected) => {
    setSelectedBooks(selected ? selected.map((it) => it.value) : []);
  };

  const fetchLineShopperData = async () => {
    const queryParams = {
      sports: sports,
      stats: stats,
    };
    const headers = {
      "x-customer-id": "",
      "x-user-id": user().userId,
    };
    try {
      const res = await axios.get(paths.getLineShopperBasePath, {
        params: queryParams,
        headers,
      });
      setData(res.data.rows || []);
      setStatOptions((res.data.statTypes || []).map((v) => ({ value: v, label: v })));
      setSportsOptions((res.data.sports || []).map((v) => ({ value: v, label: v })));
      if (res.data.availableBooks) {
        const books = [...res.data.availableBooks];
        const mappedBooks = books.map((v) => ({
          value: v.toLowerCase(),
          label: bookDisplayName(v),
        }));
        setBookOptions(mappedBooks);
        
        // Default: select all books
        if (selectedBooks.length === 0) {
          setSelectedBooks(books.map(b => b.toLowerCase()));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter data based on player search
  const filteredData = useMemo(() => {
    if (!playerSearch.trim()) return data;
    
    const searchTerm = playerSearch.toLowerCase().trim();
    return data.filter(row => 
      row.player && row.player.toLowerCase().includes(searchTerm)
    );
  }, [data, playerSearch]);

  // Add min/max line values per row for highlighting
  const processedData = useMemo(() => {
    return filteredData.map(row => {
      const lines = Object.entries(row.bookLines || {})
        .filter(([book]) => selectedBooks.includes(book))
        .map(([_, line]) => line)
        .filter(line => line != null);
      
      const minLine = lines.length > 0 ? Math.min(...lines) : null;
      const maxLine = lines.length > 0 ? Math.max(...lines) : null;
      
      return {
        ...row,
        _minLine: minLine,
        _maxLine: maxLine,
      };
    });
  }, [filteredData, selectedBooks]);

  // Build dynamic columns based on selected books
  const columns = useMemo(() => {
    const cols = [
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
        size: 130,
        minSize: 100,
      },
    ];

    // One column per selected book
    for (const bookKey of selectedBooks.sort()) {
      cols.push({
        id: `book_${bookKey}`,
        header: bookDisplayName(bookKey),
        accessorFn: (row) =>
          row.bookLines ? row.bookLines[bookKey] : null,
        size: 100,
        minSize: 80,
        Cell: ({ cell, row }) => {
          const val = cell.getValue();
          if (val == null) return <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>—</span>;

          const minLine = row.original._minLine;
          const maxLine = row.original._maxLine;
          
          let bgColor = "#6366f1"; // Default blue
          
          // Highlight lowest line in green, highest in red
          if (val === minLine && val !== maxLine) {
            bgColor = "#22c55e"; // Green for lowest
          } else if (val === maxLine && val !== minLine) {
            bgColor = "#ef4444"; // Red for highest
          }

          return (
            <span
              style={{
                backgroundColor: bgColor,
                borderRadius: "6px",
                color: "#fff",
                minWidth: "48px",
                padding: "4px 12px",
                display: "inline-block",
                fontWeight: "700",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              {val}
            </span>
          );
        },
      });
    }

    return cols;
  }, [selectedBooks]);

  // Mobile columns (simplified)
  const mobileColumns = useMemo(() => {
    const cols = [
      {
        accessorKey: "player",
        header: "Player",
        Cell: CellPlayer,
        size: 140,
      },
      {
        accessorKey: "statType",
        header: "Prop",
        size: 90,
      },
    ];

    // Add first selected book for mobile view
    if (selectedBooks.length > 0) {
      const firstBook = selectedBooks[0];
      cols.push({
        id: `book_${firstBook}`,
        header: bookDisplayName(firstBook),
        accessorFn: (row) =>
          row.bookLines ? row.bookLines[firstBook] : null,
        size: 70,
        Cell: ({ cell, row }) => {
          const val = cell.getValue();
          if (val == null) return "-";
          
          const minLine = row.original._minLine;
          const maxLine = row.original._maxLine;
          
          let textColor = "#a78bfa"; // Default purple
          
          // Highlight lowest line in green, highest in red
          if (val === minLine && val !== maxLine) {
            textColor = "#22c55e"; // Green for lowest
          } else if (val === maxLine && val !== minLine) {
            textColor = "#ef4444"; // Red for highest
          }
          
          return (
            <span style={{ color: textColor, fontWeight: 700, fontSize: "13px" }}>
              {val}
            </span>
          );
        },
      });
    }

    return cols;
  }, [selectedBooks]);

  const table = useMaterialReactTable({
    columns: isMobile ? mobileColumns : columns,
    data: processedData,
    layoutMode: "grid",
    defaultColumn: { minSize: 60, maxSize: 200 },
    enableColumnResizing: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: !isMobile,
    enableSorting: true,
    initialState: {
      pagination: { pageSize: 25 },
    },
    enableBottomToolbar: !isMobile,
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
    ...(isMobile && {
      renderDetailPanel: ({ row }) => {
        const bookEntries = row.original.bookLines
          ? Object.entries(row.original.bookLines)
          : [];
        return (
          <div style={{ padding: "8px 4px" }}>
            <div style={mobileDetailStyles.grid}>
              <span style={mobileDetailStyles.chip}>{row.original.teams}</span>
              <span style={mobileDetailStyles.chip}>{row.original.statType}</span>
              <span style={mobileDetailStyles.chip}>{row.original.sport}</span>
            </div>
            <div style={{ ...mobileDetailStyles.grid, marginTop: "8px" }}>
              {bookEntries.map(([book, line]) => (
                <span key={book} style={mobileDetailStyles.otherChip}>
                  {bookDisplayName(book)}: {line != null ? line : "—"}
                </span>
              ))}
            </div>
          </div>
        );
      },
    }),
  });

  return (
    <div style={{ ...styles.page, padding: isMobile ? "16px 8px 60px" : styles.page.padding }}>
      {/* Page header */}
      <div style={styles.header}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={styles.title}>🔍 Juicy Screen</h2>
          <p style={styles.subtitle}>Cross-book line comparison — find market discrepancies</p>
        </div>
        <div style={styles.countBadge}>{data.length} props</div>
      </div>

      {/* Filter bar */}
      <div style={{ ...styles.filterBar, padding: isMobile ? "12px" : styles.filterBar.padding }}>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Search Players</div>
          <TextField
            fullWidth
            placeholder="Search player names..."
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "var(--text-muted)", fontSize: "18px" }} />
                </InputAdornment>
              ),
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-primary)",
                fontSize: "14px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { border: "none" },
              },
            }}
          />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Sportsbooks</div>
          <MySelect
            options={bookOptions}
            handleChanges={handleBooksChange}
            label={"Sportsbooks"}
            defaultSelected={bookOptions}
            isMulti={true}
          />
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
          onClick={handleRefresh}
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
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default function LineShopperPage() {
  return (
    <>
      <NavBar />
      <LineShopper />
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
    minWidth: "150px",
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
  primaryChip: {
    padding: "4px 10px",
    background: "rgba(99, 102, 241, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#a78bfa",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(99, 102, 241, 0.2)",
  },
  otherChip: {
    padding: "4px 10px",
    background: "rgba(37, 99, 235, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#60a5fa",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(37, 99, 235, 0.2)",
  },
};
