import React, { useState, useEffect } from 'react';
import CopyToClipboardButton from '../pages/CopyToClipboard';

const useMediaQuery = (query) => {
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
};

const CellPlayer = ({ cell }) => {
    const { player, sport, teams, startTime } = cell.row.original;
    const isMobile = useMediaQuery("(max-width: 900px)");

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0', minWidth: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                    fontSize: isMobile ? '13px' : '15px',
                    fontWeight: '700',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: isMobile ? '100px' : 'none'
                }}>{player}</span>
                <CopyToClipboardButton player={player} hideText={true} />
                <span style={{
                    backgroundColor: "rgba(37, 99, 235, 0.15)",
                    color: "#60a5fa",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                }}>
                    {sport}
                </span>
            </div>
            <div style={{
                fontSize: isMobile ? '10px' : '12px',
                color: '#8b8b9e',
                fontWeight: '500',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
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
