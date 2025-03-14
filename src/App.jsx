import './App.css'
import CryptoComponent from './components/CryptoComponent'
import StockPriceComponent from './components/StockPriceComponent'
import CurrencyComponent from './components/CurrencyComponent'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <CryptoComponent />
      <CurrencyComponent />
      <StockPriceComponent />
      <Footer />
    </>
  )
}

export default App
