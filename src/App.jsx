import { useState } from 'react'
import './App.css'
import CryptoComponent from './components/CryptoComponent'
import StockPriceComponent from './components/StockPriceComponent'
import CurrencyComponent from './components/CurrencyComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CryptoComponent />
      {/* <StockPriceComponent /> */}
      {/* <CurrencyComponent /> */}
    </>
  )
}

export default App
