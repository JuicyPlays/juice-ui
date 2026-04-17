import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * Generic filter popover — same UX as BookieSettings but for plain text options.
 * Used for Sport and Market (stat type) filters on the Juicy Screen.
 *
 * Props:
 *   label      – Trigger button label (e.g. "Sports", "Market")
 *   icon       – Emoji/icon shown in the trigger (e.g. "🎮", "📊")
 *   options    – Array of { value, label } available choices
 *   selected   – Array of currently selected values
 *   onToggle   – (value) => void — toggle a single option
 *   onToggleAll – (selectAll: boolean) => void — select / deselect all
 *   searchable – boolean — enable search input (default false)
 */
const FilterSelect = ({
  label,
  icon,
  options,
  selected,
  onToggle,
  onToggleAll,
  singleMode = false,
  searchable = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click + clear search when closing
  useEffect(() => {
    const handler = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Filter options by search query (case-insensitive on label)
  const filteredOptions = searchable && searchQuery.trim()
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : options;

  const allSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((o) => selected.includes(o.value));

  // Calculate panel position from trigger button rect
  const getPanelPosition = useCallback(() => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
    };
  }, []);

  const panelPos = open ? getPanelPosition() : { top: 0, left: 0 };

  const selectedCount = selected.length;
  const hasSelection = selectedCount > 0;
  const singleSelectedLabel =
    singleMode && hasSelection
      ? options.find((o) => selected.includes(o.value))?.label || ""
      : "";

  return (
    <div style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        className="bookie-settings-trigger"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          background: open
            ? "rgba(99,102,241,0.15)"
            : "rgba(255, 255, 255, 0.05)",
          border: open
            ? "1px solid rgba(99,102,241,0.4)"
            : "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          transition: "var(--transition)",
          minHeight: "40px",
          width: "100%",
        }}
      >
        <span>{label}</span>
        {hasSelection && (
          <span
            style={{
              marginLeft: "auto",
              background: "rgba(99,102,241,0.2)",
              color: "var(--accent-light)",
              padding: "1px 8px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {singleMode ? singleSelectedLabel : selectedCount}
          </span>
        )}
      </button>

      {/* Popover panel — portaled to body */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              top: `${panelPos.top}px`,
              left: `${panelPos.left}px`,
              zIndex: 9999,
              width: label === "Game" ? "320px" : "260px",
              background: "rgba(19, 19, 43, 0.97)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "14px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:
                "0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
              padding: "16px",
              animation: "fadeInUp 0.18s ease both",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--text-primary)",
                  marginBottom: "2px",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                {searchable && searchQuery.trim()
                  ? `${filteredOptions.length} of ${options.length} matches`
                  : `${options.length} available`}
              </div>
            </div>

            {/* Search input */}
            {searchable && (
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    outline: "none",
                    transition: "var(--transition)",
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Select all toggle */}
            {!singleMode && filteredOptions.length > 1 && (
              <button
                onClick={() => {
                  if (searchable && searchQuery.trim()) {
                    // When searching, only toggle visible filtered options
                    const visibleValues = new Set(filteredOptions.map((o) => o.value));
                    const allVisibleSelected = filteredOptions.every((o) =>
                      selected.includes(o.value)
                    );
                    if (allVisibleSelected) {
                      // Deselect only visible: toggle off each visible selected item
                      selected.forEach((v) => {
                        if (visibleValues.has(v)) onToggle(v);
                      });
                    } else {
                      // Select all visible: toggle on each visible unselected item
                      filteredOptions.forEach((o) => {
                        if (!selected.includes(o.value)) onToggle(o.value);
                      });
                    }
                  } else {
                    onToggleAll(!allSelected);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "7px 10px",
                  marginBottom: "4px",
                  background: allSelected
                    ? "rgba(99,102,241,0.08)"
                    : "transparent",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "var(--transition)",
                }}
              >
                <Checkbox checked={allSelected} />
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            )}
            {searchable && searchQuery.trim() && filteredOptions.length === 0 && (
              <div
                style={{
                  padding: "12px 10px",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "center",
                }}
              >
                No matches
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "var(--border-subtle)",
                margin: "6px 0",
              }}
            />

            {/* Options list */}
            <div
              style={{
                maxHeight: "280px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1px",
              }}
            >
              {options.length === 0 && (
                <div
                  style={{
                    padding: "12px 10px",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                    textAlign: "center",
                  }}
                >
                  No options available
                </div>
              )}
              {filteredOptions.map((option) => {
                const checked = selected.includes(option.value);
                const isGameFilter = label === "Game";
                // For Game filter, extract teams from label and format startTime in local timezone
                const formatGameTime = (dateStr) => {
                  if (!dateStr) return "";
                  try {
                    // Backend sends UTC times - append 'Z' to ensure proper UTC parsing
                    const utcDateStr = dateStr.endsWith("Z") ? dateStr : dateStr + "Z";
                    const date = new Date(utcDateStr);
                    const now = new Date();
                    const isToday = date.toDateString() === now.toDateString();
                    const timeStr = date.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                    if (isToday) {
                      return `Today ${timeStr}`;
                    } else {
                      return (
                        date.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + timeStr
                      );
                    }
                  } catch (e) {
                    return "";
                  }
                };
                // Extract teams from label (everything before " • " if present)
                const labelParts = isGameFilter ? option.label.split(" • ") : null;
                const teamsLabel = isGameFilter
                  ? (labelParts && labelParts.length >= 1 ? labelParts[0] : option.label)
                  : option.label;
                const timeLabel = isGameFilter && option.startTime
                  ? formatGameTime(option.startTime)
                  : (labelParts && labelParts.length >= 2 ? labelParts.slice(1).join(" • ") : "");
                const hasTwoLines = isGameFilter && teamsLabel && timeLabel;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onToggle(option.value);
                      if (singleMode) {
                        setOpen(false);
                        setSearchQuery("");
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      width: "100%",
                      padding: hasTwoLines ? "6px 10px" : "7px 10px",
                      background: checked
                        ? "rgba(99,102,241,0.06)"
                        : "transparent",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    <div style={{ marginTop: hasTwoLines ? "2px" : "0", flexShrink: 0 }}>
                      <Checkbox checked={checked} />
                    </div>
                    {hasTwoLines ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: checked
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                            transition: "var(--transition)",
                            textAlign: "left",
                            lineHeight: "1.3",
                          }}
                        >
                          {teamsLabel}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "var(--text-secondary)",
                            transition: "var(--transition)",
                            textAlign: "left",
                            lineHeight: "1.2",
                          }}
                        >
                          {timeLabel}
                        </span>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: checked
                            ? "var(--text-primary)"
                            : "var(--text-secondary)",
                          transition: "var(--transition)",
                          textAlign: "left",
                        }}
                      >
                        {option.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

/** Small styled checkbox */
const Checkbox = ({ checked }) => (
  <span
    style={{
      width: "16px",
      height: "16px",
      borderRadius: "4px",
      border: checked
        ? "2px solid var(--accent)"
        : "2px solid var(--text-muted)",
      background: checked ? "var(--accent)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "var(--transition)",
    }}
  >
    {checked && (
      <svg
        width="9"
        height="7"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

export default FilterSelect;
