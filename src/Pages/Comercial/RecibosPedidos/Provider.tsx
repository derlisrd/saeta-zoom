
import { createContext, useEffect, useState, useContext, useCallback } from "react";
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../App/helpers/funciones";

const Context = createContext()


function RecibosProvider({ children }) {
    const [lista, setLista] = useState([])
    const [dialogs, setDialogs] = useState({ print: false, add: false })
    const [loading, setLoading] = useState(true)
    const [formSelect, setFormSelect] = useState({})

    /* const [fechas,setFechas] = useState({
        desde: funciones.fechaActualYMD() + ' 00:00:00',
        hasta:funciones.fechaActualYMD() + ' 23:59:59'
    }) */

    const getLista = useCallback(async (desde = '', hasta = '') => {
        setLoading(true)
        let fechaDesde = desde + ' 00:00:00'
        let fechaHasta = hasta + ' 23:59:59'
        if (desde === '' || hasta === '') {
            fechaDesde = funciones.fechaActualYMD() + ' 00:00:00'
            fechaHasta = funciones.fechaActualYMD() + ' 23:59:59'
        }


        let whereFilter = `fecha_recibo,between,'${fechaDesde}',and,'${fechaHasta}'`

        let res = await APICALLER.get({
            table: 'recibo_pedidos', fields: 'id_recibo_pedido,ruc_cliente,nombre_cliente,fecha_recibo,generado_por,nros_pedidos',
            on: 'id_cliente,cliente_id_recibo', include: 'clientes', where: whereFilter, sort: 'id_recibo_pedido'
        })
        if (res.response) {
            setLista(res.results)
        } else {
            console.log(res);
        }
        setLoading(false)
    }, [])
    const values = { dialogs, setDialogs, formSelect, setFormSelect, lista, getLista, loading }

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) { getLista(); }
        return () => { isActive = false; ca.abort(); };
    }, [getLista]);

    return <Context.Provider value={values} >{children}</Context.Provider>
}

export function useReciboPedido() {
    const { dialogs, setDialogs, formSelect, setFormSelect, lista, getLista, loading, setFechas } = useContext(Context)
    return { dialogs, setDialogs, formSelect, setFormSelect, lista, getLista, loading, setFechas }
}

export default RecibosProvider;