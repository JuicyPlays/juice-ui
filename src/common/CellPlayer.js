import React from 'react';

const CellPlayer = ({ cell }) => {
    const { player, sport, teams, startTime } = cell.row.original;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        } catch (e) {
            return '';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>{player}</span>
                <span style={{
                    backgroundColor: "rgba(37, 99, 235, 0.15)",
                    color: "#60a5fa",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                }}>
                    {sport}
                </span>
            </div>
            <div style={{ fontSize: '12px', color: '#8b8b9e', fontWeight: '500', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span>{teams}</span>
                {startTime && (
                    <>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>{formatDate(startTime)}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default CellPlayer;
