import AppSeguro from "./components/AppSeguro"
import { CotizadorProvider } from './context/CotizadorProvider'


const App = () => {
  
    return (
        <CotizadorProvider>
            <AppSeguro/>
        </CotizadorProvider>
    )
}

export default App
