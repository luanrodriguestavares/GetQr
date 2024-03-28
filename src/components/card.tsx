import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, QrCode } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';
import CodeData from './codedata';

interface CardProps {
    onScan: (codeData: CodeData) => void;
}

const Card: React.FC<CardProps> = ({ onScan }) => {
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [qrText, setQrText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        if (isScanModalOpen) {
            startScanner();
        }
    }, [isScanModalOpen]);

    const startScanner = () => {
        if (videoRef.current) {
            codeReaderRef.current = new BrowserMultiFormatReader(); // Initialize code reader
            codeReaderRef.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
                if (result) {
                    const scannedCode: CodeData = {
                        code: result.getText(),
                        value: 'Valor',
                        date: new Date().toLocaleString(),
                    };
                    onScan(scannedCode);
                    alert("Code scanned!")
                }
                if (error) {
                    console.error(error);
                }
            });
        }
    };

    const openScanModal = () => {
        setIsScanModalOpen(true);
    };

    const closeScanModal = () => {
        setIsScanModalOpen(false);
        codeReaderRef.current?.reset(); // Reset code reader when modal is closed
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const createQRCode = () => {
        // Chamada para a API do Google para criar o QR Code
        fetch(`https://chart.googleapis.com/chart?cht=qr&chl=${qrText}&chs=300x300&chld=L|0`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create QR Code');
                }
                return response.blob();
            })
            .then(blob => {
                setQrCodeUrl(URL.createObjectURL(blob));
            })
            .catch(error => {
                console.error('Error creating QR Code:', error);
            });
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-6xl w-full bg-indigo-600 rounded-lg shadow-lg p-8 mt-20">
                <h2 className="text-2xl xl:text-5xl font-semibold mb-2 text-center text-white">Generation, Extraction, and Tracking</h2>
                <p className="text-indigo-200 text-xs xl:text-lg mb-10 text-center">Maximizing QR Data Recovery with Ease</p>
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <button type="button" onClick={openScanModal} className="flex items-center text-gray-900 bg-indigo-50 focus:outline-none transition-transform duration-300 hover:scale-110 focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5">
                            <Camera className="mr-2" />
                            Scan
                        </button>
                        <span className='mx-4 text-indigo-200'>or</span>
                        <button type="button" onClick={openCreateModal} className="flex items-center text-gray-900 bg-indigo-50 focus:outline-none transition-transform duration-300 hover:scale-110 focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5">
                            <QrCode className="mr-2" />
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {isScanModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-3 rounded-md">
                        <div className="flex justify-end p-2">
                            <button className="rounded-full bg-rose-700 hover:bg-rose-800 text-zinc-200 p-1" onClick={closeScanModal}><X /></button>
                        </div>
                        <video className="pb-2" ref={videoRef} autoPlay={true} playsInline={true}></video>
                    </div>
                </div>
            )}

            {isCreateModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-3 rounded-md">
                        <div className="flex justify-end p-2">
                            <button className="rounded-full bg-rose-700 hover:bg-rose-800 text-zinc-200 p-1" onClick={closeCreateModal}><X /></button>
                        </div>
                        <input type="text" value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="Enter QR Code Text" className="border-2 border-gray-400 p-2 mb-4 w-full" />
                        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md mb-4" onClick={createQRCode}>Create QR Code</button>
                        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;