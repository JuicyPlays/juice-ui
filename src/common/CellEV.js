import React from 'react';

const CellEV = ({ cell }) => {
    const value = cell.getValue();
    if (value === null || value === undefined) return '-';

    return (
        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '15px' }}>
            {value.toFixed(1)}%
        </span>
    );
};

export default CellEV;
