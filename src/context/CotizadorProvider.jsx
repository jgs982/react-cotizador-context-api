import { createContext, useState } from 'react'
import {
    obtenerDiferenciaYear,
    calcularMarca,
    calcularPlan,
    formatearDinero
} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')

    const [resultado, setResultado] = useState(0)

    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {

        setDatos({
            ...datos,
            [e.target.name] : e.target.value 
        })
    }

    const cotizarSeguro = () => {
        
        // Base
        let resultado = 2000

        // Obtener diferencia de años        
        const diferencia = obtenerDiferenciaYear(datos.year)       

        // Restar el 3% por cada año
        resultado = ((diferencia*3)*resultado)/100

        // Incrementar en función de la marca
        // 30% Europeo - 15% Americano - 5% Asiático
        resultado *= calcularMarca(datos.marca)

        // Incrementar en función del plan
        // 20% Básico - 50% Completo
        resultado *= calcularPlan(datos.plan)

        // Formatear Dinero
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)  
            setCargando(false) 
        }, 3000);
    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                setResultado,
                cargando,
                setCargando 
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext
