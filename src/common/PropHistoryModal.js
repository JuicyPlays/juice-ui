import React, { useMemo, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { bookDisplayName, bookLogo } from "./bookLogos";

const SERIES_COLORS = {
  boom: "#ff6b35",           // BOOM orange
  prizepicks: "#ff4ecd",     // PrizePicks pink
  sleeper: "#7c3aed",        // Sleeper purple
  underdog: "#ff9500",       // Underdog orange
  parlayplay: "#fbbf24",     // ParlayPlay yellow/gold
  dabble: "#f472b6",         // Dabble pink
  draftkings_pick6: "#10b981", // DraftKings green
  betr: "#fb7185",           // Betr pink/red
  thunderpick: "#06b6d4",    // Thunderpick cyan
  juice_ml: "#a855f7",       // Model purple
};

// Book display order (popular first)
const BOOK_ORDER = [
  "prizepicks",
  "underdog",
  "sleeper",
  "boom",
  "betr",
  "parlayplay",
  "dabble",
  "draftkings_pick6",
  "thunderpick",
];

const parseTimestamp = (value) => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  const normalizedValue =
    typeof value === "string" && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value)
      ? `${value}Z`
      : value;

  const date = new Date(normalizedValue);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatTimestamp = (value) => {
  if (!value) return "";
  const date = parseTimestamp(value);
  if (!date) return value;
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatLine = (value) => {
  if (value == null || Number.isNaN(value)) return "—";
  return Number(value).toFixed(2).replace(/\.00$/, "");
};

const CustomTooltip = ({ active, payload, label, seriesMeta }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  // Sort payload: model last, then by book order, then alphabetically
  const sortedPayload = [...payload].sort((a, b) => {
    if (a.dataKey === "juice_ml") return 1;
    if (b.dataKey === "juice_ml") return -1;
    const aIndex = BOOK_ORDER.indexOf(a.dataKey);
    const bIndex = BOOK_ORDER.indexOf(b.dataKey);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.98)",
        border: "1px solid rgba(99, 102, 241, 0.3)",
        borderRadius: "14px",
        padding: "12px 14px",
        minWidth: "200px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: "11px", marginBottom: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {formatTimestamp(label)}
      </div>
      {sortedPayload.map((entry) => {
        const meta = seriesMeta?.[entry.dataKey];
        const delta = meta?.openingLine != null && entry.value != null
          ? entry.value - meta.openingLine
          : null;
        const isModel = entry.dataKey === "juice_ml";
        const logoUrl = !isModel ? bookLogo(entry.dataKey) : null;

        return (
          <div
            key={entry.dataKey}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt=""
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  background: "rgba(255,255,255,0.1)",
                  flexShrink: 0,
                }}
              />
            ) : isModel ? (
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "rgba(168, 85, 247, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
            ) : null}
            <span style={{ color: "#94a3b8", fontSize: "12px", minWidth: "70px" }}>
              {entry.name}
            </span>
            <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600, marginLeft: "auto" }}>
              {formatLine(entry.value)}
            </span>
            {!isModel && delta !== null && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: delta > 0 ? "#34d399" : delta < 0 ? "#f87171" : "#94a3b8",
                  background: delta !== 0 ? (delta > 0 ? "rgba(52, 211, 153, 0.15)" : "rgba(248, 113, 113, 0.15)") : "transparent",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {delta > 0 ? "+" : ""}{formatLine(delta)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const LegendItem = ({ bookKey, color, currentLine, isActive, onHover, onLeave }) => {
  const logoUrl = bookLogo(bookKey);
  const name = bookDisplayName(bookKey);

  return (
    <div
      onMouseEnter={() => onHover(bookKey)}
      onMouseLeave={onLeave}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        background: isActive ? "rgba(99, 102, 241, 0.15)" : "rgba(30, 41, 59, 0.5)",
        border: `1px solid ${isActive ? "rgba(99, 102, 241, 0.4)" : "rgba(148, 163, 184, 0.12)"}`,
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        opacity: isActive === false ? 0.4 : 1,
      }}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt=""
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "rgba(255,255,255,0.08)",
          }}
        />
      ) : (
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: color + "40",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
          }}
        >
          {name.charAt(0)}
        </div>
      )}
      <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 500 }}>{name}</span>
      <span style={{ color: color, fontSize: "12px", fontWeight: 700 }}>{formatLine(currentLine)}</span>
    </div>
  );
};

const PropHistoryModal = React.memo(function PropHistoryModal({
  open,
  onClose,
  historyData,
  loading,
  error,
}) {
  const [hoveredBook, setHoveredBook] = useState(null);

  const { chartData, timeDomain, seriesMeta } = useMemo(() => {
    const pointsByTimestamp = new Map();
    const series = historyData?.series || [];
    let minTime = null;
    let maxTime = null;
    const meta = {};

    series.forEach((seriesItem) => {
      meta[seriesItem.sportsbook] = {
        openingLine: seriesItem.openingLine,
        currentLine: seriesItem.currentLine,
      };

      (seriesItem.points || []).forEach((point) => {
        if (!point?.observedAt) return;
        const ts = parseTimestamp(point.observedAt);
        if (!ts) return;

        const tsNum = ts.getTime();
        const key = tsNum; // Use numeric timestamp as key
        const existing = pointsByTimestamp.get(key) || { observedAt: tsNum };
        existing[seriesItem.sportsbook] = point.line;
        pointsByTimestamp.set(key, existing);

        if (!minTime || ts < minTime) minTime = ts;
        if (!maxTime || ts > maxTime) maxTime = ts;
      });
    });

    // Add final data points at maxTime using currentLine for each series
    // This ensures lines extend horizontally to the end of the chart
    const lastValues = {};
    series.forEach((seriesItem) => {
      if (seriesItem.currentLine != null) {
        lastValues[seriesItem.sportsbook] = seriesItem.currentLine;
      }
    });

    // Extend to now using UTC to avoid timezone mismatch
    const now = new Date();
    const nowUtc = new Date(now.toUTCString());
    const nowNum = nowUtc.getTime();
    if (!maxTime || maxTime.getTime() < nowNum) {
      maxTime = nowUtc;
    }

    if (maxTime && Object.keys(lastValues).length > 0) {
      const maxTimeNum = maxTime.getTime();
      const finalPoint = { observedAt: maxTimeNum, ...lastValues };
      pointsByTimestamp.set(maxTimeNum, finalPoint);
    }

    const sortedData = Array.from(pointsByTimestamp.values()).sort(
      (a, b) => a.observedAt - b.observedAt
    );

    return {
      chartData: sortedData,
      timeDomain: minTime && maxTime ? [minTime.getTime(), maxTime.getTime()] : ["auto", "auto"],
      seriesMeta: meta,
    };
  }, [historyData]);

  const currentModelLine = historyData?.currentModelLine;
  const hasSeries = (historyData?.series || []).length > 0;
  const hasRenderableContent = hasSeries || currentModelLine != null;

  // Sort series by BOOK_ORDER
  const sortedSeries = useMemo(() => {
    const series = historyData?.series || [];
    return [...series].sort((a, b) => {
      const aIndex = BOOK_ORDER.indexOf(a.sportsbook);
      const bIndex = BOOK_ORDER.indexOf(b.sportsbook);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.sportsbook.localeCompare(b.sportsbook);
    });
  }, [historyData?.series]);

  const handleLegendHover = useCallback((bookKey) => setHoveredBook(bookKey), []);
  const handleLegendLeave = useCallback(() => setHoveredBook(null), []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)",
          color: "#fff",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "20px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset",
        },
      }}
    >
      <DialogTitle sx={{ padding: "20px 24px 12px", position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#94a3b8",
            "&:hover": { color: "#fff", background: "rgba(255,255,255,0.1)" },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingRight: "40px" }}>
          <span style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px", background: "linear-gradient(90deg, #fff 0%, #c7d2fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {historyData?.player || "Prop History"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {historyData?.sport && (
              <span style={{ fontSize: "12px", color: "#818cf8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {historyData.sport}
              </span>
            )}
            {historyData?.sport && historyData?.statType && (
              <span style={{ color: "#475569" }}>•</span>
            )}
            {historyData?.statType && (
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
                {historyData.statType}
              </span>
            )}
            {historyData?.teams && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  background: "rgba(30, 41, 59, 0.8)",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(148, 163, 184, 0.15)",
                }}
              >
                {historyData.teams}
              </span>
            )}
          </div>
        </div>
      </DialogTitle>
      <DialogContent sx={{ padding: "0 24px 24px !important" }}>
        {loading ? (
          <div
            style={{
              minHeight: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ color: "#818cf8" }} size={40} />
          </div>
        ) : error ? (
          <div style={{ color: "#fca5a5", padding: "24px 8px", textAlign: "center" }}>{error}</div>
        ) : !hasRenderableContent ? (
          <div style={{ color: "#94a3b8", padding: "24px 8px", textAlign: "center" }}>
            No history found for this prop yet.
          </div>
        ) : (
          <>
            {!hasSeries && currentModelLine != null && (
              <div style={{ color: "#64748b", padding: "0 0 16px", fontSize: "12px", textAlign: "center" }}>
                No sportsbook history yet. Showing current model reference.
              </div>
            )}

            {/* Legend Bar */}
            {hasSeries && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "16px",
                  padding: "12px",
                  background: "rgba(15, 23, 42, 0.5)",
                  borderRadius: "12px",
                  border: "1px solid rgba(148, 163, 184, 0.1)",
                }}
              >
                {sortedSeries.map((seriesItem) => (
                  <LegendItem
                    key={seriesItem.sportsbook}
                    bookKey={seriesItem.sportsbook}
                    color={SERIES_COLORS[seriesItem.sportsbook] || "#c084fc"}
                    currentLine={seriesItem.currentLine}
                    isActive={hoveredBook === null || hoveredBook === seriesItem.sportsbook}
                    onHover={handleLegendHover}
                    onLeave={handleLegendLeave}
                  />
                ))}
                {currentModelLine != null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 12px",
                      background: "rgba(168, 85, 247, 0.15)",
                      border: "1px solid rgba(168, 85, 247, 0.3)",
                      borderRadius: "10px",
                      marginLeft: "auto",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "rgba(168, 85, 247, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                      }}
                    >
                      ⚡
                    </div>
                    <span style={{ color: "#d8b4fe", fontSize: "12px", fontWeight: 500 }}>Model</span>
                    <span style={{ color: "#a855f7", fontSize: "12px", fontWeight: 700 }}>{formatLine(currentModelLine)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Chart */}
            <div style={{ width: "100%", height: "440px" }}>
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    {sortedSeries.map((seriesItem) => (
                      <linearGradient
                        key={`grad-${seriesItem.sportsbook}`}
                        id={`gradient-${seriesItem.sportsbook}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={SERIES_COLORS[seriesItem.sportsbook] || "#c084fc"}
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="100%"
                          stopColor={SERIES_COLORS[seriesItem.sportsbook] || "#c084fc"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    stroke="rgba(148,163,184,0.08)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="observedAt"
                    type="number"
                    domain={timeDomain}
                    scale="time"
                    tickFormatter={(val) => {
                      const date = new Date(val);
                      return date.toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      });
                    }}
                    minTickGap={40}
                    stroke="#475569"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.15)" }}
                  />
                  <YAxis
                    stroke="#475569"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickFormatter={formatLine}
                    domain={["auto", "auto"]}
                    axisLine={{ stroke: "rgba(148, 163, 184, 0.15)" }}
                    tickLine={false}
                  />
                  {currentModelLine != null && (
                    <ReferenceLine
                      y={currentModelLine}
                      stroke={SERIES_COLORS.juice_ml}
                      strokeDasharray="6 4"
                      strokeWidth={2}
                      ifOverflow="extendDomain"
                    />
                  )}
                  <Tooltip content={<CustomTooltip seriesMeta={seriesMeta} />} />
                  {sortedSeries.map((seriesItem, index) => {
                    const color = SERIES_COLORS[seriesItem.sportsbook] || "#c084fc";
                    const isDimmed = hoveredBook !== null && hoveredBook !== seriesItem.sportsbook;
                    return (
                      <React.Fragment key={seriesItem.sportsbook}>
                        <Area
                          type="linear"
                          dataKey={seriesItem.sportsbook}
                          stroke="none"
                          fill={`url(#gradient-${seriesItem.sportsbook})`}
                          fillOpacity={isDimmed ? 0.05 : 0.3}
                          isAnimationActive={false}
                        />
                        <Line
                          type="linear"
                          dataKey={seriesItem.sportsbook}
                          name={bookDisplayName(seriesItem.sportsbook)}
                          stroke={color}
                          strokeWidth={hoveredBook === seriesItem.sportsbook ? 4 : 3}
                          strokeOpacity={isDimmed ? 0.3 : 1}
                          dot={{ r: 3, stroke: "#0f172a", strokeWidth: 2, fill: color }}
                          activeDot={{
                            r: 6,
                            stroke: "#0f172a",
                            strokeWidth: 2,
                            fill: color,
                          }}
                          connectNulls={true}
                          animationDuration={800}
                          animationBegin={index * 100}
                          isAnimationActive={true}
                        />
                      </React.Fragment>
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});

export default PropHistoryModal;
