import { createContext, useContext, useState } from "react";
//import { useAuth } from "../../../Providers/AuthProvider";
import useInitialState from "./useInitialState";

const FacturasContext = createContext(null)

function FacturasProvider({children}) {

    //const {userData} = useAuth()
    const {iDialogs,initialFactura} = useInitialState()
    const [dialogs,setDialogs] = useState(iDialogs)
    const [pedidos,setPedidos] = useState([])
    const [factura,setFactura] = useState(()=>{
        let sto = JSON.parse(localStorage.getItem('factura'))
        return sto ?? initialFactura
    })
    const [indexCambioPrecio,setIndexCambioPrecio] = useState(-1)

    const setearFactura = (obj)=>{
        let total = 0,iva5=0,iva10=0,exenta=0;
        obj.items.forEach(e=>{
            total += e.cantidad * e.precio
            exenta += e.iva === 0 && (e.cantidad * e.precio)
            iva5 += e.iva === 5 && (e.cantidad * e.precio)
            iva10 += e.iva === 10 && (e.cantidad * e.precio)
        })
        obj.liquiiva10= iva10/11,
        obj.liquiiva5= iva5/21,
        obj.liquiivatotal = (iva10/11) + (iva5/21)
        obj.total = total;
        obj.iva10 = iva10;
        obj.iva5 = iva5;
        obj.exenta = exenta;
        setFactura(obj)
        localStorage.setItem('factura',JSON.stringify(obj))
    }

    const values = {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura,pedidos,setPedidos}
    return <FacturasContext.Provider value={values}>{children}</FacturasContext.Provider>
}

export const useFacturas = ()=>{
    const {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura,pedidos,setPedidos} = useContext(FacturasContext)
    return {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura,pedidos,setPedidos}
}

export default FacturasProvider;