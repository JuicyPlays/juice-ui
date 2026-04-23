import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { bookDisplayName } from "./bookLogos";

const SERIES_COLORS = {
  boom: "#f97316",
  prizepicks: "#eab308",
  sleeper: "#2563eb",
  underdog: "#38bdf8",
  parlayplay: "#8b5cf6",
  dabble: "#ec4899",
  draftkings_pick6: "#22c55e",
  betr: "#f43f5e",
  thunderpick: "#14b8a6",
  juice_ml: "#a855f7",
};

const formatTimestamp = (value) => {
  if (!value) return "";
  const date = new Date(value.endsWith("Z") ? value : `${value}Z`);
  if (Number.isNaN(date.getTime())) return value;
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.96)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        borderRadius: "12px",
        padding: "10px 12px",
        minWidth: "180px",
      }}
    >
      <div style={{ color: "#cbd5e1", fontSize: "12px", marginBottom: "8px" }}>
        {formatTimestamp(label)}
      </div>
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            color: "#fff",
            fontSize: "13px",
            marginBottom: "4px",
          }}
        >
          <span style={{ color: entry.stroke }}>{entry.name}</span>
          <span>{formatLine(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function PropHistoryModal({
  open,
  onClose,
  historyData,
  loading,
  error,
}) {
  const chartData = useMemo(() => {
    const pointsByTimestamp = new Map();
    const series = historyData?.series || [];

    series.forEach((seriesItem) => {
      (seriesItem.points || []).forEach((point) => {
        if (!point?.observedAt) return;
        const key = point.observedAt;
        const existing = pointsByTimestamp.get(key) || { observedAt: key };
        existing[seriesItem.sportsbook] = point.line;
        pointsByTimestamp.set(key, existing);
      });
    });

    return Array.from(pointsByTimestamp.values()).sort(
      (a, b) => new Date(a.observedAt) - new Date(b.observedAt)
    );
  }, [historyData]);

  const netMoves = useMemo(() => {
    return (historyData?.series || []).map((seriesItem) => ({
      sportsbook: seriesItem.sportsbook,
      openingLine: seriesItem.openingLine,
      currentLine: seriesItem.currentLine,
      delta:
        seriesItem.currentLine != null && seriesItem.openingLine != null
          ? seriesItem.currentLine - seriesItem.openingLine
          : null,
    }));
  }, [historyData]);

  const currentModelLine = historyData?.currentModelLine;
  const hasSeries = (historyData?.series || []).length > 0;
  const hasRenderableContent = hasSeries || currentModelLine != null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          background: "#111827",
          color: "#fff",
          border: "1px solid rgba(99,102,241,0.18)",
          borderRadius: "18px",
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "22px", fontWeight: 800 }}>
            {historyData?.player || "Prop History"}
          </span>
          <span style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>
            {[historyData?.sport, historyData?.statType, historyData?.teams]
              .filter(Boolean)
              .join(" • ")}
          </span>
        </div>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "8px !important", paddingBottom: 3 }}>
        {loading ? (
          <div
            style={{
              minHeight: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ color: "#8b5cf6" }} />
          </div>
        ) : error ? (
          <div style={{ color: "#fca5a5", padding: "24px 8px" }}>{error}</div>
        ) : !hasRenderableContent ? (
          <div style={{ color: "#cbd5e1", padding: "24px 8px" }}>
            No history found for this prop yet.
          </div>
        ) : (
          <>
            {!hasSeries && currentModelLine != null && (
              <div style={{ color: "#cbd5e1", padding: "0 0 16px 2px", fontSize: "13px" }}>
                No sportsbook history found yet. Showing the current model reference only.
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              {netMoves.map((item) => (
                <div
                  key={item.sportsbook}
                  style={{
                    background: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                    borderRadius: "12px",
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
                    {bookDisplayName(item.sportsbook)}
                  </div>
                  <div style={{ fontSize: "13px", color: "#fff", marginBottom: "4px" }}>
                    Open: {formatLine(item.openingLine)}
                  </div>
                  <div style={{ fontSize: "13px", color: "#fff", marginBottom: "4px" }}>
                    Current: {formatLine(item.currentLine)}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color:
                        item.delta == null
                          ? "#cbd5e1"
                          : item.delta > 0
                          ? "#34d399"
                          : item.delta < 0
                          ? "#f87171"
                          : "#cbd5e1",
                    }}
                  >
                    Move: {item.delta == null ? "—" : formatLine(item.delta)}
                  </div>
                </div>
              ))}
              {currentModelLine != null && (
                <div
                  style={{
                    background: "rgba(88, 28, 135, 0.35)",
                    border: "1px solid rgba(168, 85, 247, 0.28)",
                    borderRadius: "12px",
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#d8b4fe", marginBottom: "6px" }}>
                    {bookDisplayName("juice_ml")}
                  </div>
                  <div style={{ fontSize: "13px", color: "#fff", marginBottom: "4px" }}>
                    Current: {formatLine(currentModelLine)}
                  </div>
                  <div style={{ fontSize: "13px", color: "#d8b4fe", fontWeight: 700 }}>
                    Static live reference
                  </div>
                </div>
              )}
            </div>
            <div style={{ width: "100%", height: "420px" }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="observedAt"
                    tickFormatter={formatTimestamp}
                    minTickGap={28}
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatLine}
                    domain={["auto", "auto"]}
                  />
                  {currentModelLine != null && (
                    <ReferenceLine
                      y={currentModelLine}
                      stroke={SERIES_COLORS.juice_ml}
                      strokeDasharray="8 6"
                      ifOverflow="extendDomain"
                      label={{
                        value: `${bookDisplayName("juice_ml")} ${formatLine(currentModelLine)}`,
                        fill: SERIES_COLORS.juice_ml,
                        fontSize: 12,
                        position: "insideTopRight",
                      }}
                    />
                  )}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {(historyData?.series || []).map((seriesItem) => (
                    <Line
                      key={seriesItem.sportsbook}
                      type="monotone"
                      dataKey={seriesItem.sportsbook}
                      name={bookDisplayName(seriesItem.sportsbook)}
                      stroke={SERIES_COLORS[seriesItem.sportsbook] || "#c084fc"}
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 4 }}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
