import { createContext, useCallback,useContext, useEffect, useState } from "react"
import { APICALLER } from "../../../Services/api"
import { funciones } from "../../../App/helpers/funciones"

const ListaPedidosContext = createContext()


function ListaPedidosProvider({children}) {

    const [selectCliente,setSelectCliente]=useState(null)
    const [dialogs,setDialogs] = useState({imprimir:false,editar_pedido:false,cancelar:false,cambio_estado:false,pdf:false,excel:false})
    const [loading,setLoading] = useState(true)
    const today = funciones.fechaActualYMD()
    const [formSelect,setFormSelect] = useState({})
    const [fechas,setFechas] = useState({
        desde: funciones.fechaActualYMD() + ' 00:00:00',
        hasta:funciones.fechaActualYMD() + ' 23:59:59'
    })
    const [listas,setListas] = useState({
        pedidos:[],
        total:0,
        entrada:0
    })

    const getFiltrar = useCallback(async(cliente,desde,hasta)=>{
        
        if(cliente){
            let whereFilter;
            if(desde && hasta) {
                whereFilter = `fecha_pedido,between,'${desde} 00:00:00',and,'${hasta} 23:59:59',and,id_cliente,=,${cliente}`
            }else{
                whereFilter = `id_cliente,=,${cliente}`
            }
            setLoading(true)
            let [res] = await Promise.all([APICALLER.get({table:'pedidos',include:'clientes,users',
                on:'cliente_id_pedido,id_cliente,id_user,user_id_pedido',
                fields:'estado_pago,factura_id,codigo_cliente_pedido,facturado_pedido,motivo_cancela,estado_pago,total_pedido,tipo_pedido,total_pedido,nombre_user,fecha_pedido,id_pedido,nombre_cliente,estado_pedido,codigo_cliente_pedido',
                where:whereFilter,
                sort:'id_pedido'
                }),
                ])
                if(res.response){
                    let tipoPedido = {
                        "1": "NORMAL PREESCRIPCION",
                        "2": "CORTESIA",
                        "3": "GARANTIA",
                        "4": "NORMAL SOLO CRISTAL"
                    }
                    let pedidos = []
                    res.results.forEach(elem=>{
                        pedidos.push({...elem,total_pedido: parseFloat(elem.total_pedido), 
                            facturado: elem.facturado_pedido==='0'? 'No' : 'Si',
                            tipo: tipoPedido[elem.tipo_pedido],
                            pago: elem.estado_pago==='0'? 'PENDIENTE':'PAGADO'
                        })
                    })
            setListas({pedidos,total:res.found,entrada:0 })
        }else{
            console.log(res);
        } 
            
            
        }
        setLoading(false)
    },[]);






    const getLista = useCallback(async(nro='')=>{
        setLoading(true)
        let whereFilter = `fecha_pedido,between,'${fechas.desde}',and,'${fechas.hasta}'`
        
        if(nro!==''){
            whereFilter = `id_pedido,=,${nro}`
        }
        
        let [res,tot] = await Promise.all([APICALLER.get({table:'pedidos',include:'clientes,users',
        on:'cliente_id_pedido,id_cliente,id_user,user_id_pedido',
        fields:'estado_pago,factura_id,codigo_cliente_pedido,facturado_pedido,motivo_cancela,estado_pago,total_pedido,tipo_pedido,total_pedido,nombre_user,fecha_pedido,id_pedido,nombre_cliente,estado_pedido,codigo_cliente_pedido',
        where:whereFilter,
        sort:'id_pedido'
        }),
        APICALLER.get({table:'pedidos',where:`fecha_pedido,between,'${today} 00:00:00',and,'${today} 23:59:59'`,fields:'SUM(total_pedido) as monto_total'})
        ])
        if(res.response){
            let tipoPedido = {
                "1": "NORMAL PREESCRIPCION",
                "2": "CORTESIA",
                "3": "GARANTIA",
                "4": "NORMAL SOLO CRISTAL"
              }
            let pedidos = []
            res.results.forEach(elem=>{
                pedidos.push({...elem,total_pedido: parseFloat(elem.total_pedido), 
                    facturado: elem.facturado_pedido==='0'? 'No' : 'Si',
                    tipo: tipoPedido[elem.tipo_pedido],
                    pago: elem.estado_pago==='0'? 'PENDIENTE':'PAGADO'
                })
            })
            setListas({pedidos,entrada:tot.first.monto_total,total:res.found})
        }else{
            console.log(res);
        }

        setLoading(false)
    },[fechas,today])

    
    
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    const values = {selectCliente,getFiltrar,setSelectCliente,listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista}

    return ( <ListaPedidosContext.Provider value={values}>{children}</ListaPedidosContext.Provider> );
}

export default ListaPedidosProvider;


export const useListaPedidos = ()=>{
    const {selectCliente,getFiltrar,setSelectCliente,listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista} = useContext(ListaPedidosContext)
    return {selectCliente,getFiltrar,setSelectCliente,listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista}
}