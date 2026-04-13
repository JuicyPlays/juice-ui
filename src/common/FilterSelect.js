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
 */
const FilterSelect = ({
  label,
  icon,
  options,
  selected,
  onToggle,
  onToggleAll,
  singleMode = false,
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click
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
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const allSelected =
    options.length > 0 && options.every((o) => selected.includes(o.value));

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
              width: "260px",
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
                {options.length} available
              </div>
            </div>

            {/* Select all toggle */}
            {!singleMode && options.length > 1 && (
              <button
                onClick={() => onToggleAll(!allSelected)}
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
              {options.map((option) => {
                const checked = selected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onToggle(option.value);
                      if (singleMode) setOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "7px 10px",
                      background: checked
                        ? "rgba(99,102,241,0.06)"
                        : "transparent",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    <Checkbox checked={checked} />
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
