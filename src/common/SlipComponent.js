import React, { useState, useEffect } from "react";
import CopyToClipboardButton from "../pages/CopyToClipboard";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}

const SlipComponent = ({ slips }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const slipsPerPage = 5;

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
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            padding: isMobile ? "12px 16px" : "16px 24px",
            borderBottom: "1px solid #2d2d3d",
            backgroundColor: "#171721",
            gap: isMobile ? "16px" : "24px",
            minWidth: 0,
        },
        headerLeft: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "12px" : "24px",
            minWidth: 0,
            flex: 1,
            width: isMobile ? "100%" : "auto",
        },
        headerTypeInfo: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
        },
        slipTypeHead: {
            fontSize: "14px",
            fontWeight: "800",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            letterSpacing: "0.02em",
        },
        powerIcon: {
            fontSize: "16px",
        },
        slipTypeSub: {
            fontSize: "12px",
            color: "#8b8b9e",
            fontWeight: "600",
            marginLeft: "2px",
        },
        headerPlayersInfo: {
            display: "flex",
            alignItems: "center",
            flex: 1,
            minWidth: 0,
        },
        playersList: {
            fontSize: "14px",
            color: "#e2e2e8",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: 0,
            flex: 1,
        },
        playersText: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
            minWidth: 0,
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
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "800",
            boxShadow: "0 0 12px rgba(99, 102, 241, 0.3)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
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
        // Desktop Table Styles
        tableHeader: {
            display: "flex",
            alignItems: "center",
            padding: "12px 24px",
            backgroundColor: "#1c1c27",
            borderBottom: "1px solid #2d2d3d",
            color: "#8b8b9e",
        },
        th: {
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        tableRow: {
            display: "flex",
            alignItems: "center",
            padding: "14px 24px",
            backgroundColor: "#13131a",
            transition: "background 0.2s ease",
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
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
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
            color: "#8b8b9e",
            fontSize: "11px",
            fontWeight: "500",
        },
        propText: {
            color: "#e2e2e8",
            fontSize: "13px",
            fontWeight: "600",
        },
        targetLinePill: {
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "700",
            fontSize: "13px",
            padding: "4px 12px",
            borderRadius: "6px",
        },
        modelLinePill: {
            backgroundColor: "#9333ea",
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
            gap: "24px",
            marginTop: "32px",
            paddingBottom: "40px",
        },
        pageBtn: {
            backgroundColor: "#1c1c27",
            border: "1px solid #2d2d3d",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            transition: "all 0.2s ease",
        },
        pageInfo: {
            color: "#8b8b9e",
            fontSize: "13px",
            fontWeight: "600",
        },
        empty: {
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "#13131a",
            borderRadius: "16px",
            border: "1px dashed #2d2d3d",
        },
        emptyIcon: {
            fontSize: "40px",
            display: "block",
            marginBottom: "16px",
            opacity: 0.5,
        },
        emptyText: {
            fontSize: "18px",
            fontWeight: "700",
            color: "#ffffff",
            margin: "0 0 8px 0",
        },
        emptySubText: {
            fontSize: "14px",
            color: "#8b8b9e",
            margin: 0,
        },
        picksContainer: {
            display: "flex",
            flexDirection: "column",
        },
        // Mobile Specific Body Styles
        mobilePicksContainer: {
            display: "flex",
            flexDirection: "column",
        },
        mobileCardRow: {
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderBottom: "1px solid #1f1f2e",
        },
        mobileCardHeader: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        mobileDetailGrid: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
            minWidth: 0,
        },
        mobileChip: {
            padding: "4px 10px",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#e2e2e8",
            fontWeight: "500",
            border: "1px solid #2d2d3d",
        },
        mobileBookChip: {
            padding: "4px 10px",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#60a5fa",
            fontWeight: "600",
            border: "1px solid rgba(37, 99, 235, 0.2)",
        },
        mobileModelChip: {
            padding: "4px 10px",
            backgroundColor: "rgba(147, 51, 234, 0.12)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#a855f7",
            fontWeight: "600",
            border: "1px solid rgba(147, 51, 234, 0.2)",
        },
        mobileLeanOver: {
            padding: "4px 10px",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#10b981",
            fontWeight: "800",
            border: "1px solid rgba(16, 185, 129, 0.2)",
        },
        mobileLeanUnder: {
            padding: "4px 10px",
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#ef4444",
            fontWeight: "800",
            border: "1px solid rgba(239, 68, 68, 0.2)",
        },
        mobileStatBox: {
            display: "flex",
            flexDirection: "column",
            gap: "2px",
        },
        mobileStatLabel: {
            fontSize: "10px",
            fontWeight: "700",
            color: "#8b8b9e",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
    };

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
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <div style={styles.slipTypeHead}>
                                                <span style={styles.powerIcon}>🔮</span> POWER {slip.size}
                                            </div>
                                            <div style={{
                                                ...styles.evPill,
                                                background: slip.evPercent >= 10 ? "linear-gradient(90deg, #059669 0%, #10b981 100%)" : styles.evPill.background,
                                                boxShadow: slip.evPercent >= 10 ? "0 0 12px rgba(16, 185, 129, 0.4)" : styles.evPill.boxShadow
                                            }}>
                                                {slip.evPercent !== undefined && slip.evPercent !== null
                                                    ? `${Math.max(0.1, slip.evPercent).toFixed(1)}% EV`
                                                    : "High EV"}
                                            </div>
                                        </div>
                                        <div style={styles.slipTypeSub}>{slip.size}-leg parlay</div>
                                    </div>
                                    <div style={styles.headerPlayersInfo}>
                                        <div style={styles.playersList}>
                                            <span style={styles.iconGray}>👥</span>
                                            <span style={styles.playersText}>{playersStr}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="slip-header-right" style={styles.headerRight}>
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

                            {isMobile ? (
                                <div style={styles.mobilePicksContainer}>
                                    {slip.picks.map((pick, j) => (
                                        <div key={j} style={styles.mobileCardRow}>
                                            <div style={styles.mobileCardHeader}>
                                                <span style={styles.playerName}>{pick.player}</span>
                                                <CopyToClipboardButton player={pick.player} hideText={true} />
                                                <span style={{ ...styles.sportBadge, marginLeft: "auto" }}>{pick.sport}</span>
                                            </div>
                                            <div style={styles.mobileDetailGrid}>
                                                <span style={styles.mobileChip}>{pick.teams}</span>
                                                <span style={styles.mobileChip}>{pick.statType}</span>
                                            </div>
                                            <div style={{ ...styles.mobileDetailGrid, marginTop: "4px" }}>
                                                <span style={styles.mobileBookChip}>Book: {pick.sportsbookLine}</span>
                                                <span style={styles.mobileModelChip}>Model: {pick.modelLine}</span>
                                                <span style={pick.over ? styles.mobileLeanOver : styles.mobileLeanUnder}>{pick.over ? "OVER" : "UNDER"}</span>
                                            </div>
                                            <div style={{ ...styles.mobileDetailGrid, marginTop: "8px", justifyContent: "space-between", borderTop: "1px solid #2d2d3d", paddingTop: "8px" }}>
                                                <div style={styles.mobileStatBox}>
                                                    <div style={styles.mobileStatLabel}>Prob</div>
                                                    <span style={styles.diffText}>{pick.prob ? `${pick.prob.toFixed(1)}%` : "-"}</span>
                                                </div>
                                                <div style={styles.mobileStatBox}>
                                                    <div style={styles.mobileStatLabel}>EV</div>
                                                    <span style={styles.diffText}>{pick.evPercent ? `${pick.evPercent.toFixed(1)}%` : "-"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
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
                            )}
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



