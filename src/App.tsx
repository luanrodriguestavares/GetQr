import './App.css'
import Header from './components/header'
import Card from './components/card'
import TableQr from './components/table'
import SpeedDial from './components/speeddial'


function App() {

  return (
    <>
    <Header></Header>
    <div className="mx-3">
      <Card></Card>
      <TableQr></TableQr>
      <SpeedDial></SpeedDial>
    </div>

      

      


    </>
  )
}

export default App
