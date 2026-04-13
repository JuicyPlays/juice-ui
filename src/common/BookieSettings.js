import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { BOOK_CONFIG, ALL_BOOK_KEYS } from "./bookLogos";

const BookieSettings = ({
  selectedBooks,
  onToggleBook,
  onToggleAll,
  label = "Sportsbooks",
  options = null,
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

  const bookList =
    options ||
    ALL_BOOK_KEYS.map((k) => ({ value: k, label: BOOK_CONFIG[k].name }));
  const allSelected =
    !singleMode && bookList.every((o) => selectedBooks.includes(o.value));
  const singleSelectedLabel =
    singleMode && selectedBooks.length > 0
      ? bookList.find((o) => selectedBooks.includes(o.value))?.label ||
        BOOK_CONFIG[selectedBooks[0]?.toLowerCase()]?.name ||
        ""
      : "";

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
        {singleMode ? (
          <>
            {(() => {
              const singleSelectedKey =
                selectedBooks.length > 0
                  ? selectedBooks[0].toLowerCase()
                  : null;
              const logoUrl = singleSelectedKey
                ? BOOK_CONFIG[singleSelectedKey]?.logo
                : null;

              if (!singleSelectedKey) return <span>{label}</span>;
              return (
                <>
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={singleSelectedLabel}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(99,102,241,0.2)",
                        color: "var(--accent-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {singleSelectedKey === "juice_ml" ||
                      singleSelectedKey === "juiceml"
                        ? "⚡"
                        : singleSelectedLabel.charAt(0)}
                    </div>
                  )}
                  <span>{singleSelectedLabel}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      transition: "var(--transition)",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </>
              );
            })()}
          </>
        ) : (
          <>
            <span>{label}</span>
            {selectedBooks.length > 0 && (
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
                {selectedBooks.length}
              </span>
            )}
          </>
        )}
      </button>

      {/* Popover panel — portaled to body to escape filter bar stacking context */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            className="bookie-settings-panel"
            style={{
              position: "fixed",
              top: `${panelPos.top}px`,
              left: `${panelPos.left}px`,
              zIndex: 9999,
              width: "280px",
              background: "rgba(19, 19, 43, 0.97)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "14px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:
                "0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
              padding: "20px",
              animation: "fadeInUp 0.18s ease both",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                {label === "Sportsbooks" ? "Bookie Settings" : label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                }}
              >
                {label === "Sportsbooks"
                  ? "Choose which books to compare"
                  : `Select a ${label.toLowerCase()}`}
              </div>
            </div>

            {/* Select all toggle */}
            {!singleMode && bookList.length > 1 && (
              <button
                onClick={() => onToggleAll(!allSelected)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "8px 10px",
                  marginBottom: "8px",
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
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    border: allSelected
                      ? "2px solid var(--accent)"
                      : "2px solid var(--text-muted)",
                    background: allSelected ? "var(--accent)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "var(--transition)",
                  }}
                >
                  {allSelected && (
                    <svg
                      width="10"
                      height="8"
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
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            )}

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "var(--border-subtle)",
                margin: "8px 0",
              }}
            />

            {/* Book list */}
            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {bookList.map((opt) => {
                const bookKey = opt.value;
                const cfg = BOOK_CONFIG[bookKey.toLowerCase()];
                const logoUrl = cfg?.logo;
                const displayName = opt.label;
                const checked = selectedBooks.includes(bookKey);

                return (
                  <button
                    key={bookKey}
                    onClick={() => {
                      onToggleBook(bookKey);
                      if (singleMode) setOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "8px 10px",
                      background: checked
                        ? "rgba(99,102,241,0.06)"
                        : "transparent",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    {/* Checkbox (hide if singleMode) */}
                    {!singleMode && (
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
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
                            width="10"
                            height="8"
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
                    )}

                    {/* Logo */}
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={displayName}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "rgba(99,102,241,0.2)",
                          color: "var(--accent-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          flexShrink: 0,
                        }}
                      >
                        {bookKey.toLowerCase() === "juice_ml" ||
                        bookKey.toLowerCase() === "juiceml"
                          ? "⚡"
                          : displayName.charAt(0)}
                      </div>
                    )}

                    {/* Name */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: checked
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                        transition: "var(--transition)",
                      }}
                    >
                      {displayName}
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

export default BookieSettings;
