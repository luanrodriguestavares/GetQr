import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Card from './components/card';
import TableQr from './components/table';
import SpeedDial from './components/speeddial';
import CodeData from './components/codedata';

function App() {
  const [scannedCodes, setScannedCodes] = useState<CodeData[]>([]);

  const handleScan = (codeData: CodeData) => {
      setScannedCodes(prevCodes => [...prevCodes, codeData]);
  };

  return (
      <>
          <Header />
          <div className="mx-3">
              <Card onScan={handleScan} />
              <TableQr scannedCodes={scannedCodes} />
              <SpeedDial />
          </div>
      </>
  );
}

export default App;