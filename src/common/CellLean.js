import React from 'react';

const CellLean = ({ cell }) => {
    const over = cell.row.original?.over;

    const style = {
        color: over ? "#10b981" : "#ef4444",
        fontWeight: "800",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    };

    return (
        <span style={style}>
            {over ? "OVER" : "UNDER"}
        </span>
    );
};

export default CellLean;
