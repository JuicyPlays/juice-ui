import React, { useState } from "react";
import CopyToClipboardButton from "../pages/CopyToClipboard";

const SlipComponent = ({ slips }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const slipsPerPage = 5;

    if (!slips || slips.length === 0) {
        return (
            <div style={styles.empty}>
                <span style={styles.emptyIcon}>🎫</span>
                <p style={styles.emptyText}>No slips generated right now.</p>
                <p style={styles.emptySubText}>Try adjusting your filters or generating again.</p>
            </div>
        );
    }

    const sortedSlips = [...slips].sort((a, b) => (b.evPercent || 0) - (a.evPercent || 0));
    const indexOfLastSlip = (currentPage + 1) * slipsPerPage;
    const indexOfFirstSlip = indexOfLastSlip - slipsPerPage;
    const currentSlips = sortedSlips.slice(indexOfFirstSlip, indexOfLastSlip);
    const totalPages = Math.ceil(sortedSlips.length / slipsPerPage);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    const getPayout = (size) => {
        if (size === 2) return "3.5x";
        if (size === 3) return "6.5x";
        if (size === 4) return "10x";
        if (size === 5) return "20x";
        return "-";
    };

    return (
        <div style={styles.wrap}>
            <div style={styles.list}>
                {currentSlips.map((slip, i) => {
                    const playersStr = slip.picks.map(p => p.player).join(", ");
                    return (
                        <div key={i} style={styles.card}>
                            {/* Card Header */}
                            <div className="slip-card-header" style={styles.cardHeader}>
                                <div style={styles.headerLeft}>
                                    <div style={styles.headerTypeInfo}>
                                        <div style={styles.slipTypeHead}>
                                            <span style={styles.powerIcon}>🔮</span> POWER {slip.size}
                                        </div>
                                        <div style={styles.slipTypeSub}>{slip.size}-leg parlay</div>
                                    </div>
                                    <div style={styles.headerPlayersInfo}>
                                        <div style={styles.playersList}>
                                            <span style={styles.iconGray}>👥</span> {playersStr}
                                        </div>
                                    </div>
                                </div>
                                <div className="slip-header-right" style={styles.headerRight}>
                                    <div style={styles.evPill}>
                                        {slip.evPercent !== undefined && slip.evPercent !== null
                                            ? `${Math.max(0.1, slip.evPercent).toFixed(1)}% EV`
                                            : "High EV"}
                                    </div>
                                    <div style={styles.payoutCol}>
                                        <div style={styles.payoutVal}>
                                            {(slip.picks.reduce((acc, p) => acc * ((p.prob || 50) / 100), 1) * 100).toFixed(1)}%
                                        </div>
                                        <div style={styles.payoutLabel}>HIT PROB</div>
                                    </div>
                                    <div style={styles.payoutCol}>
                                        <div style={styles.payoutVal}>{getPayout(slip.size)}</div>
                                        <div style={styles.payoutLabel}>PAYOUT</div>
                                    </div>
                                    <button style={styles.placeSlipBtn} onClick={() => alert("Auto-place functionality coming soon!")}>
                                        Place Slip
                                    </button>
                                </div>
                            </div>

                            <div className="table-scroll-container">
                                <div style={styles.tableHeader}>
                                    <div style={{ ...styles.th, flex: 1.5 }}>Player</div>
                                    <div style={{ ...styles.th, flex: 1 }}>Prop</div>
                                    <div style={{ ...styles.th, width: '90px', textAlign: 'center' }}>Sportsbook</div>
                                    <div style={{ ...styles.th, width: '70px', textAlign: 'center' }}>Model</div>
                                    <div style={{ ...styles.th, width: '80px', textAlign: 'center' }}>Lean</div>
                                    <div style={{ ...styles.th, width: '80px', textAlign: 'center' }}>Prob</div>
                                    <div style={{ ...styles.th, width: '80px', textAlign: 'center' }}>EV</div>
                                </div>

                                {/* Card Body - Table Rows */}
                                <div style={styles.picksContainer}>
                                    {slip.picks.map((pick, j) => (
                                        <div key={j} style={{ ...styles.tableRow, borderBottom: j < slip.picks.length - 1 ? "1px solid #1f1f2e" : "none" }}>
                                            <div style={{ ...styles.td, flex: 1.5, flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                                                <div style={styles.playerWrap}>
                                                    <span style={styles.playerName}>{pick.player}</span>
                                                    <CopyToClipboardButton player={pick.player} hideText={true} />
                                                    <span style={styles.sportBadge}>{pick.sport}</span>
                                                </div>
                                                <div style={styles.matchupText}>{pick.teams}</div>
                                            </div>
                                            <div style={{ ...styles.td, flex: 1 }}>
                                                <span style={styles.propText}>{pick.statType}</span>
                                            </div>
                                            <div style={{ ...styles.td, width: '90px', justifyContent: 'center' }}>
                                                <div style={styles.targetLinePill}>{pick.sportsbookLine}</div>
                                            </div>
                                            <div style={{ ...styles.td, width: '70px', justifyContent: 'center' }}>
                                                <div style={styles.modelLinePill}>{pick.modelLine}</div>
                                            </div>
                                            <div style={{ ...styles.td, width: '80px', justifyContent: 'center' }}>
                                                <span style={pick.over ? styles.leanOver : styles.leanUnder}>
                                                    {pick.over ? "OVER" : "UNDER"}
                                                </span>
                                            </div>
                                            <div style={{ ...styles.td, width: '80px', justifyContent: 'center' }}>
                                                <span style={styles.diffText}>{pick.prob ? `${pick.prob.toFixed(1)}%` : "-"}</span>
                                            </div>
                                            <div style={{ ...styles.td, width: '80px', justifyContent: 'center' }}>
                                                <span style={styles.diffText}>{pick.evPercent ? `${pick.evPercent.toFixed(1)}%` : "-"}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        style={{ ...styles.pageBtn, opacity: currentPage === 0 ? 0.4 : 1 }}
                        onClick={prevPage}
                        disabled={currentPage === 0}
                    >
                        ← Prev
                    </button>
                    <span style={styles.pageInfo}>
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                        style={{ ...styles.pageBtn, opacity: currentPage === totalPages - 1 ? 0.4 : 1 }}
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default SlipComponent;

const styles = {
    wrap: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        minWidth: 0,
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minWidth: 0,
    },
    card: {
        backgroundColor: "#13131a",
        border: "1px solid #2d2d3d",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        minWidth: 0,
        width: "100%",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #2d2d3d",
        backgroundColor: "#171721"
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
    },
    headerTypeInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    slipTypeHead: {
        fontSize: "16px",
        fontWeight: "800",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        letterSpacing: "0.02em"
    },
    powerIcon: {
        color: "#a855f7",
        fontSize: "18px"
    },
    slipTypeSub: {
        fontSize: "13px",
        color: "#8b8b9e",
        fontWeight: "500",
    },
    headerPlayersInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "2px"
    },
    playersList: {
        fontSize: "14px",
        color: "#e2e2e8",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    iconGray: {
        opacity: 0.6,
        fontSize: "16px",
    },
    headerRight: {
        display: "flex",
        alignItems: "center",
        gap: "28px",
    },
    evPill: {
        background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "800",
        boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)",
        letterSpacing: "0.02em"
    },
    payoutCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px"
    },
    payoutVal: {
        fontSize: "18px",
        fontWeight: "800",
        color: "#ffffff",
    },
    payoutLabel: {
        fontSize: "10px",
        fontWeight: "700",
        color: "#8b8b9e",
        letterSpacing: "0.05em",
    },
    placeSlipBtn: {
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "background 0.2s ease",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
    },
    tableHeader: {
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #1f1f2e",
        backgroundColor: "#0d0d14",
        minWidth: "700px",
    },
    th: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#8b8b9e",
    },
    picksContainer: {
        display: "flex",
        flexDirection: "column",
    },
    tableRow: {
        display: "flex",
        alignItems: "center",
        padding: "16px 24px",
        transition: "background 0.2s ease",
        backgroundColor: "#13131a",
        minWidth: "700px",
    },
    td: {
        display: "flex",
        alignItems: "center",
    },
    playerWrap: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "6px",
    },
    playerName: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#ffffff",
    },
    sportBadge: {
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        color: "#60a5fa",
        padding: "2px 8px",
        borderRadius: "10px",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.05em",
    },
    matchupText: {
        fontSize: "12px",
        color: "#8b8b9e",
        fontWeight: "500",
    },
    propText: {
        fontSize: "14px",
        color: "#ffffff",
        fontWeight: "600",
    },
    targetLinePill: {
        backgroundColor: "#9333ea",
        color: "white",
        fontWeight: "700",
        fontSize: "13px",
        padding: "4px 12px",
        borderRadius: "6px",
    },
    modelLinePill: {
        backgroundColor: "#2563eb",
        color: "white",
        fontWeight: "700",
        fontSize: "13px",
        padding: "4px 12px",
        borderRadius: "6px",
    },
    leanOver: {
        color: "#10b981",
        fontWeight: "800",
        fontSize: "13px",
    },
    leanUnder: {
        color: "#ef4444",
        fontWeight: "800",
        fontSize: "13px",
    },
    diffText: {
        color: "#10b981",
        fontWeight: "700",
        fontSize: "15px",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        padding: "12px 0",
    },
    pageBtn: {
        padding: "8px 20px",
        background: "#1f1f2e",
        border: "1px solid #2d2d3d",
        borderRadius: "8px",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.15s ease",
    },
    pageInfo: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        color: "#8b8b9e",
    },
    empty: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        background: "rgba(19, 19, 43, 0.4)",
        borderRadius: "16px",
        border: "1px dashed #2d2d3d",
    },
    emptyIcon: {
        fontSize: "48px",
        marginBottom: "20px",
        opacity: 0.8,
    },
    emptyText: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "18px",
        fontWeight: 700,
        color: "#ffffff",
        margin: "0 0 8px 0",
    },
    emptySubText: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        color: "#8b8b9e",
        margin: 0,
    },
};
