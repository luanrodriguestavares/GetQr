import React from 'react';
import CodeData from './codedata';

interface TableQrProps {
    scannedCodes: CodeData[];
}

const TableQr: React.FC<TableQrProps> = ({ scannedCodes }) => {
    return (
        <div className="mt-10 shadow-md sm:rounded-lg mx-auto">
            <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-gray-400 divide-y divide-gray-200">
                <thead className="bg-indigo-600 text-xs text-white uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {scannedCodes.map((codeData, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{codeData.code}</td>
                            <td className="px-6 py-4">{codeData.value}</td>
                            <td className="px-6 py-4">{codeData.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableQr;
