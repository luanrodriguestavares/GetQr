// TableQr.tsx
import React from 'react';
import './TableQr.css'; // Importando estilos específicos para o TableQr
import CodeData from './codedata';

interface TableQrProps {
    scannedCodes: CodeData[];
}

const TableQr: React.FC<TableQrProps> = ({ scannedCodes }) => {
    return (
        <div className="table-container">
            <table className="qr-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scannedCodes.map((codeData, index) => (
                        <tr key={index}>
                            <td>{codeData.code}</td>
                            <td>{codeData.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableQr;