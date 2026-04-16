import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  CircularProgress,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { paths } from "../common/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FilterSelect from "../common/FilterSelect";
import CellPlayer from "../common/CellPlayer";
import BookieSettings from "../common/BookieSettings";
import {
  ALL_BOOK_KEYS,
  BOOK_CONFIG,
  bookDisplayName,
  bookLogo,
} from "../common/bookLogos";
import { useAuthUser } from "react-auth-kit";
import { useMediaQuery } from "../hooks/useMediaQuery";

const LineShopper = () => {
  const [data, setData] = useState([]);
  const [sports, setSports] = useState([]);
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([...ALL_BOOK_KEYS]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [statOptions, setStatOptions] = useState([]);
  const [gameOptions, setGameOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [playerSearch, setPlayerSearch] = useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleRefresh();
  }, []);

  async function handleRefresh() {
    setLoading(true);
    await fetchLineShopperData();
    setLoading(false);
  }

  const handleToggleSport = (val) => {
    setSports((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleToggleAllSports = (selectAll) => {
    setSports(selectAll ? sportsOptions.map((o) => o.value) : []);
  };

  const handleToggleStat = (val) => {
    setStats((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleToggleAllStats = (selectAll) => {
    setStats(selectAll ? statOptions.map((o) => o.value) : []);
  };

  const handleToggleGame = (val) => {
    setGames((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleToggleAllGames = (selectAll) => {
    setGames(selectAll ? gameOptions.map((o) => o.value) : []);
  };

  const handleToggleBook = (bookKey) => {
    setSelectedBooks((prev) =>
      prev.includes(bookKey)
        ? prev.filter((b) => b !== bookKey)
        : [...prev, bookKey]
    );
  };

  const handleToggleAll = (selectAll) => {
    setSelectedBooks(selectAll ? [...ALL_BOOK_KEYS] : []);
  };

  const fetchLineShopperData = async () => {
    const queryParams = {
      sports: sports.join(","),
      stats: stats.join(","),
      games: games.join(","),
    };
    try {
      const res = await axios.get(paths.getLineShopperBasePath, {
        params: queryParams,
      });
      setData(res.data.rows || []);
      const retrievedStats = res.data.statTypes || [];
      const retrievedSports = res.data.sports || [];
      const retrievedGames = res.data.games || [];
      setStatOptions(retrievedStats.map((v) => ({ value: v, label: v })));
      setSportsOptions(retrievedSports.map((v) => ({ value: v, label: v })));
      setGameOptions(retrievedGames);

      if (isInitialLoad) {
        setStats(retrievedStats);
        setSports(retrievedSports);
        setGames(retrievedGames.map((v) => v.value));
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter data based on player search
  const filteredData = useMemo(() => {
    if (!playerSearch.trim()) return data;

    const searchTerm = playerSearch.toLowerCase().trim();
    return data.filter(
      (row) => row.player && row.player.toLowerCase().includes(searchTerm)
    );
  }, [data, playerSearch]);

  // Add min/max line values per row for highlighting
  const processedData = useMemo(() => {
    return filteredData.map((row) => {
      // Collect all lines from selected books (excluding juice_ml for min/max)
      const sportsbookLines = Object.entries(row.bookLines || {})
        .filter(([book]) => selectedBooks.includes(book) && book !== "juice_ml")
        .map(([_, line]) => line)
        .filter((line) => line != null);

      const minLine =
        sportsbookLines.length > 0 ? Math.min(...sportsbookLines) : null;
      const maxLine =
        sportsbookLines.length > 0 ? Math.max(...sportsbookLines) : null;

      return {
        ...row,
        _minLine: minLine,
        _maxLine: maxLine,
      };
    });
  }, [filteredData, selectedBooks]);

  // Logo header renderer
  const LogoHeader = ({ bookKey }) => {
    const logo = bookLogo(bookKey);
    const name = bookDisplayName(bookKey);

    if (!logo) {
      return (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--text-muted)",
          }}
        >
          {name}
        </span>
      );
    }

    return (
      <Tooltip title={name} arrow placement="top">
        <img
          src={logo}
          alt={name}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "rgba(255,255,255,0.08)",
            cursor: "pointer",
          }}
        />
      </Tooltip>
    );
  };

  // Line cell renderer
  const BookLineCell = ({ cell, row, bookKey }) => {
    const val = cell.getValue();
    if (val == null)
      return (
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>—</span>
      );

    const minLine = row.original._minLine;
    const maxLine = row.original._maxLine;

    // Check if this is a single-option prop
    const overEnabled = row.original?.overEnabled !== false;
    const underEnabled = row.original?.underEnabled !== false;
    const isSingleOption = !overEnabled || !underEnabled;

    // Create tooltip content for single-option props
    const getTooltipTitle = () => {
      if (!isSingleOption) return "";
      const availableOption = overEnabled ? "OVER" : "UNDER";
      return `Only ${availableOption} option available for this prop`;
    };

    let bgColor = "#6366f1"; // Default indigo

    // Highlight lowest line in green, highest in red (only when there's a spread)
    if (val === minLine && val !== maxLine) {
      bgColor = "#22c55e"; // Green for lowest
    } else if (val === maxLine && val !== minLine) {
      bgColor = "#ef4444"; // Red for highest
    }

    const lineStyle = {
      backgroundColor: bgColor,
      borderRadius: "6px",
      color: "#fff",
      minWidth: "44px",
      padding: "4px 10px",
      display: "inline-block",
      fontWeight: "700",
      textAlign: "center",
      fontSize: "13px",
      cursor: "help", // Changes cursor to question mark/help cursor
      // Add subtle indicator for single-option props
      ...(isSingleOption && {
        border: "1px dashed rgba(255, 255, 255, 0.5)",
        position: "relative",
        // Add a subtle glow/pulse effect
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.2)",
        // Add a subtle animation to draw attention
        animation: "pulse 2s infinite",
      }),
    };

    const lineContent = (
      <div style={{ position: "relative", display: "inline-block" }}>
        <span style={lineStyle}>{val}</span>
        {isSingleOption && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#fbbf24",
              color: "#000",
              borderRadius: "50%",
              width: "14px",
              height: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "bold",
              border: "1px solid #fff",
              cursor: "help",
            }}
            title={getTooltipTitle()}
          >
            !
          </span>
        )}
      </div>
    );

    // Wrap in tooltip only for single-option props
    if (isSingleOption) {
      return (
        <Tooltip title={getTooltipTitle()} arrow placement="top">
          {lineContent}
        </Tooltip>
      );
    }

    return lineContent;
  };

  // Model line cell renderer (distinct purple styling)
  const ModelLineCell = ({ cell }) => {
    const val = cell.getValue();
    if (val == null)
      return (
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>—</span>
      );

    return (
      <span
        style={{
          backgroundColor: "#9333ea",
          borderRadius: "6px",
          color: "#fff",
          minWidth: "44px",
          padding: "4px 10px",
          display: "inline-block",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "13px",
          boxShadow: "0 0 8px rgba(147, 51, 234, 0.3)",
        }}
      >
        {val}
      </span>
    );
  };

  // Build columns — always render ALL book columns for stable table width.
  // Data is only shown for selected books; unselected columns show "—".
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

    // Always render all sportsbook columns (sorted alphabetically)
    for (const bookKey of ALL_BOOK_KEYS) {
      const isSelected = selectedBooks.includes(bookKey);
      cols.push({
        id: `book_${bookKey}`,
        header: bookDisplayName(bookKey),
        Header: () => <LogoHeader bookKey={bookKey} />,
        accessorFn: (row) => {
          if (!isSelected) return null; // Hide data for deselected books
          return row.bookLines ? row.bookLines[bookKey] : null;
        },
        size: 80,
        minSize: 65,
        muiTableBodyCellProps: { align: "center" },
        muiTableHeadCellProps: { align: "center" },
        Cell: ({ cell, row }) => (
          <BookLineCell cell={cell} row={row} bookKey={bookKey} />
        ),
      });
    }

    // Juicy model column — always last, visually distinct
    cols.push({
      id: "book_juice_ml",
      header: "Juicy",
      Header: () => (
        <Tooltip title="JuicyPlays Model" arrow placement="top">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 800,
              fontSize: "13px",
              color: "#a855f7",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Juicy
          </span>
        </Tooltip>
      ),
      accessorFn: (row) => (row.bookLines ? row.bookLines["juice_ml"] : null),
      size: 80,
      minSize: 65,
      muiTableBodyCellProps: { align: "center" },
      muiTableHeadCellProps: { align: "center" },
      Cell: ModelLineCell,
    });

    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const mobileSportsbooks = selectedBooks.filter((b) => b !== "juice_ml");
    if (mobileSportsbooks.length > 0) {
      const firstBook = mobileSportsbooks[0];
      cols.push({
        id: `book_${firstBook}`,
        header: bookDisplayName(firstBook),
        Header: () => <LogoHeader bookKey={firstBook} />,
        accessorFn: (row) => (row.bookLines ? row.bookLines[firstBook] : null),
        size: 70,
        Cell: ({ cell, row }) => {
          const val = cell.getValue();
          if (val == null) return "—";

          const minLine = row.original._minLine;
          const maxLine = row.original._maxLine;

          // Check if this is a single-option prop
          const overEnabled = row.original?.overEnabled !== false;
          const underEnabled = row.original?.underEnabled !== false;
          const isSingleOption = !overEnabled || !underEnabled;

          // Create tooltip content for single-option props
          const getTooltipTitle = () => {
            if (!isSingleOption) return "";
            const availableOption = overEnabled ? "OVER" : "UNDER";
            return `Only ${availableOption} option available for this prop`;
          };

          let textColor = "#a78bfa"; // Default purple

          if (val === minLine && val !== maxLine) {
            textColor = "#22c55e";
          } else if (val === maxLine && val !== minLine) {
            textColor = "#ef4444";
          }

          const textStyle = {
            color: textColor,
            fontWeight: 700,
            fontSize: "13px",
            cursor: "help", // Changes cursor to question mark/help cursor
            // Add subtle indicator for single-option props
            ...(isSingleOption && {
              borderBottom: "1px dashed",
              borderBottomColor: textColor,
              position: "relative",
            }),
          };

          const textContent = (
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={textStyle}>{val}</span>
              {isSingleOption && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-8px",
                    background: "#fbbf24",
                    color: "#000",
                    borderRadius: "50%",
                    width: "12px",
                    height: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "7px",
                    fontWeight: "bold",
                    border: "1px solid #fff",
                    cursor: "help",
                  }}
                  title={getTooltipTitle()}
                >
                  !
                </span>
              )}
            </div>
          );

          // Wrap in tooltip only for single-option props
          if (isSingleOption) {
            return (
              <Tooltip title={getTooltipTitle()} arrow placement="top">
                {textContent}
              </Tooltip>
            );
          }

          return textContent;
        },
      });
    }

    // Always show model on mobile too
    cols.push({
      id: "book_juice_ml_mobile",
      header: "Juicy",
      Header: () => (
        <span style={{ color: "#a855f7", fontWeight: 800, fontSize: "11px" }}>
          Juicy
        </span>
      ),
      accessorFn: (row) => (row.bookLines ? row.bookLines["juice_ml"] : null),
      size: 60,
      Cell: ({ cell }) => {
        const val = cell.getValue();
        if (val == null) return "—";
        return (
          <span style={{ color: "#a855f7", fontWeight: 700, fontSize: "13px" }}>
            {val}
          </span>
        );
      },
    });

    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    enableSorting: false,
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
        padding: "10px 8px",
        fontSize: "13px",
        fontWeight: "700",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        textAlign: "center",
        "& .Mui-TableHeadCell-Content": {
          justifyContent: "center",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: { padding: "4px 8px" },
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
              <span style={mobileDetailStyles.chip}>
                {row.original.statType}
              </span>
              <span style={mobileDetailStyles.chip}>{row.original.sport}</span>
            </div>
            <div style={{ ...mobileDetailStyles.grid, marginTop: "8px" }}>
              {bookEntries.map(([book, line]) => {
                const logo = bookLogo(book);
                const name = bookDisplayName(book);
                return (
                  <span
                    key={book}
                    style={
                      book === "juice_ml"
                        ? mobileDetailStyles.modelChip
                        : mobileDetailStyles.otherChip
                    }
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={name}
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          verticalAlign: "middle",
                          marginRight: "4px",
                        }}
                      />
                    )}
                    {name}: {line != null ? line : "—"}
                  </span>
                );
              })}
            </div>
          </div>
        );
      },
    }),
  });

  return (
    <div
      style={{
        ...styles.page,
        padding: isMobile ? "16px 8px 60px" : styles.page.padding,
      }}
    >
      {/* Page header */}
      <div style={styles.header}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={styles.title}>Juicy Screen</h2>
          <p style={styles.subtitle}>
            Compare lines against different platforms
          </p>
        </div>
        <div style={styles.countBadge}>{processedData.length} props</div>
      </div>

      {/* Filter bar */}
      <div
        style={{
          ...styles.filterBar,
          padding: isMobile ? "12px" : styles.filterBar.padding,
        }}
      >
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
                  <SearchIcon
                    style={{ color: "var(--text-muted)", fontSize: "18px" }}
                  />
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
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { border: "none" },
              },
            }}
          />
        </div>
        <div style={{ ...styles.selectWrap, flex: "0 1 200px" }}>
          <div style={styles.dropdownLabel}>Sportsbooks</div>
          <BookieSettings
            selectedBooks={selectedBooks}
            onToggleBook={handleToggleBook}
            onToggleAll={handleToggleAll}
          />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Sport</div>
          <FilterSelect
            label="Sports"
            options={sportsOptions}
            selected={sports}
            onToggle={handleToggleSport}
            onToggleAll={handleToggleAllSports}
          />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Market</div>
          <FilterSelect
            label="Market"
            options={statOptions}
            selected={stats}
            onToggle={handleToggleStat}
            onToggleAll={handleToggleAllStats}
          />
        </div>
        <div style={styles.selectWrap}>
          <div style={styles.dropdownLabel}>Game</div>
          <FilterSelect
            label="Game"
            options={gameOptions}
            selected={games}
            onToggle={handleToggleGame}
            onToggleAll={handleToggleAllGames}
            searchable={true}
          />
        </div>
        <button
          className="btn-gradient"
          onClick={handleRefresh}
          disabled={loading}
          style={{
            minWidth: isMobile ? "100%" : "110px",
            flexShrink: 0,
            height: "40px",
          }}
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
    alignItems: "flex-end",
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
  otherChip: {
    padding: "4px 10px",
    background: "rgba(37, 99, 235, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#60a5fa",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(37, 99, 235, 0.2)",
    display: "inline-flex",
    alignItems: "center",
  },
  modelChip: {
    padding: "4px 10px",
    background: "rgba(147, 51, 234, 0.12)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#a855f7",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    border: "1px solid rgba(147, 51, 234, 0.2)",
    display: "inline-flex",
    alignItems: "center",
  },
};
