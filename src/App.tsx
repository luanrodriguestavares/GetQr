import React, { useState } from 'react';
import { Printer, Download, Copy } from 'lucide-react';
import 'animate.css';
import * as XLSX from 'xlsx'; // Importe a biblioteca xlsx

interface Tooltip {
    id: string;
    content: string;
}

const tooltips: Tooltip[] = [
    { id: 'tooltip-print', content: 'Print' },
    { id: 'tooltip-download', content: 'Download' },
    { id: 'tooltip-copy', content: 'Copy' },
];

interface SpeedDialProps {
    tableData: any[]; // Defina o tipo correto para seus dados da tabela
}

const SpeedDial: React.FC<SpeedDialProps> = ({ tableData }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const downloadTableAsExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(tableData); 
        XLSX.utils.book_append_sheet(wb, ws, 'QR Codes');
        XLSX.writeFile(wb, 'GetQR-ScannedCodes.xlsx'); 
    };

    return (
        <div className="fixed bottom-6 right-6">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-1"
                    onClick={toggleMenu}
                />
            )}
            <div className={`flex flex-col items-center mb-4 space-y-2 ${isOpen ? '' : 'hidden'} animate__animated animate__fadeIn`} style={{ transition: 'opacity 0.3s ease' }}>
                {tooltips.map(({ id, content }) => (
                    <React.Fragment key={id}>
                        <button
                            type="button"
                            data-tooltip-target={id}
                            data-tooltip-placement="left"
                            className="z-10 flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 animate__animated animate__fadeIn"
                            style={{ opacity: isOpen ? 1 : 0 }}
                            onClick={id === 'tooltip-download' ? downloadTableAsExcel : undefined}
                        >
                            {id === 'tooltip-print' && <Printer className="w-5 h-5" />}
                            {id === 'tooltip-download' && <Download className="w-5 h-5" />}
                            {id === 'tooltip-copy' && <Copy className="w-5 h-5" />}
                            <span className="sr-only">{content}</span>
                        </button>
                        <div
                            id={id}
                            role="tooltip"
                            className="absolute z-50 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                            {content}
                            <div className="tooltip-arrow" data-popper-arrow />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <button
                type="button"
                onClick={toggleMenu}
                aria-controls="speed-dial-menu-default"
                aria-expanded={isOpen}
                className="flex items-center justify-center w-14 h-14 text-white bg-indigo-600 rounded-full hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none dark:focus:ring-indigo-800 z-10 animate__animated animate__fadeIn"
                style={{ transition: 'transform 0.3s ease' }}
            >
                <svg
                    className={`w-5 h-5 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                    style={{ transition: 'transform 0.3s ease' }}
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
};

export default SpeedDial;