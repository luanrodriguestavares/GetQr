import { FC } from 'react';
import { Edit, Trash } from 'lucide-react';

interface CodeData {
    code: string;
    value: string;
    date: string;
}

interface TableQrProps {
    scannedCodes: CodeData[];
}

const TableQr: FC<TableQrProps> = ({ scannedCodes }) => {
    return (
        <div className="max-w-6xl mt-8 mx-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-gray-400">
                    <thead className="text-xs text-zinc-200 uppercase bg-indigo-600">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Value
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scannedCodes.map((code, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{code.code}</td>
                                <td className="px-6 py-4">{code.value}</td>
                                <td className="px-6 py-4">{code.date}</td>
                                <td className="px-6 py-4 flex items-center space-x-2">
                                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 focus:outline-none">
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableQr;
