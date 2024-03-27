import './App.css';
import Header from './components/header';
import Card from './components/card';
import TableQr from './components/table';

function App() {
  return (
    <>
      <Header />
      <div className="mx-3">
        <Card />
        <TableQr scannedCodes={[]} /> {/* Passando um array vazio como placeholder */}
      </div>
    </>
  );
}

export default App;