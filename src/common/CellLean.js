import React from 'react';

const CellLean = ({ cell }) => {
    const over = cell.row.original?.over;
    const overEnabled = cell.row.original?.overEnabled !== false; // Default to true if undefined
    const underEnabled = cell.row.original?.underEnabled !== false; // Default to true if undefined
    const isSingleOption = !overEnabled || !underEnabled;

    const getLeanText = () => {
        if (isSingleOption) {
            return over ? "OVER (ONLY)" : "UNDER (ONLY)";
        }
        return over ? "OVER" : "UNDER";
    };

    const getBackgroundColor = () => {
        if (isSingleOption) {
            return over ? "#059669" : "#dc2626"; // Darker green/red for single options
        }
        return over ? "#10b981" : "#ef4444"; // Normal colors
    };

    const style = {
        backgroundColor: getBackgroundColor(),
        color: "#fff",
        fontWeight: "800",
        fontSize: isSingleOption ? "11px" : "13px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderRadius: "6px",
        padding: isSingleOption ? "3px 8px" : "4px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
    };

    const iconStyle = {
        fontSize: "10px",
        opacity: "0.8",
    };

    return (
        <span style={style} title={isSingleOption ? "Limited options available" : ""}>
            {getLeanText()}
            {isSingleOption && <span style={iconStyle}>⚠️</span>}
        </span>
    );
};

export default CellLean;
