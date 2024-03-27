// Card.tsx
import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface CodeData {
    code: string;
    value: string;
    date: string;
}

function Card() {
    const [scannedCodes, setScannedCodes] = useState<CodeData[]>([]);
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startScanner = () => {
        setIsModalOpen(true);

        const codeReader = new BrowserMultiFormatReader();
        codeReader.decodeFromVideoDevice(null, videoRef.current!, (result, error) => {
            if (result) {
                const scannedCode: CodeData = {
                    code: result.getText(),
                    value: 'Valor', // Defina o valor conforme necessário
                    date: new Date().toLocaleString()
                };
                setScannedCodes(prevScannedCodes => [...prevScannedCodes, scannedCode]);
                setResult(result.getText());
                codeReader.stopContinuousDecode();
            }
            if (error) {
                console.error(error);
            }
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-6xl w-full bg-indigo-600 rounded-lg shadow-lg p-8 mt-20">
                <h2 className="text-2xl xl:text-5xl font-semibold mb-2 text-center text-white">Getting Essential Tracking</h2>
                <p className="text-indigo-200 text-xs xl:text-lg mb-10 text-center">Maximizing Data Retrieval with QR Ease</p>
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <button type="button" onClick={startScanner} className="flex items-center text-gray-900 bg-indigo-50 focus:outline-none transition-transform duration-300 hover:scale-110 focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5">
                            <Camera className="mr-2" />
                            Scan
                        </button>
                    </div>
                </div>

                {result && (
                    <p className="text-white text-center mt-4">QR Code scanned: {result}</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        {/* Exibir o preview da câmera dentro do modal */}
                        <video ref={videoRef}></video>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
