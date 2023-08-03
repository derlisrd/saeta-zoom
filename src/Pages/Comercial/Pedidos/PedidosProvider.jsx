import { createContext, useCallback, useContext,useEffect,useState } from "react";
import useInitialStates from "./useInitialStates";
import { useAuth } from "../../../Providers/AuthProvider";
import useQuery from "../../../Hooks/useQuery";
import { APICALLER } from "../../../Services/api";



const PedidosContext = createContext()




function PedidosProvider({children}) {
    const {initialFactura} = useInitialStates()
    let query = useQuery();

    const [idUpdate,setIdUpdate] = useState({
        state:false,
        id: null
    })
    //console.log(idUpdate);
    const [dialogs,setDialogs] = useState({
        main: query.get("open") ? true : false ,
        finalizar:false,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false,
        obs:false,
        precio:false,
        edit_receta:false
    })
    const {userData} = useAuth()
    const {token_user} = userData
    const [cargas,setCargas] = useState({
        main:false,
        stock:false
    })
    const [lado,setLado] = useState({
        izquierdo:false,
        derecho:false
    })
    const [selectProduct, setSelectProduct] = useState({})
    const [formDepositoStock,setFormDepositoStock] = useState([])
    const [seleccionado,setSeleccionado] = useState([])
    const [factura,setFactura] = useState(()=>{
        let sto = JSON.parse(localStorage.getItem('pedido'))
        if(sto && !query.get('id')){
            return sto
        }
        return initialFactura
    })
    const [selectIndex,setSelectIndex] = useState(-1)
    const [indexCambioPrecio,setIndexCambioPrecio] = useState(-1)
    const [lastID,setLastID] = useState('')
    
    const setearFactura = (obj)=>{
        let total = 0,iva5=0,iva10=0,exenta=0;
        
        obj.items.forEach(e=>{
            if(e.tipo<3){
                total += e.cantidad * e.precio
                exenta += e.iva === 0 && (e.cantidad * e.precio)
                iva5 += e.iva === 5 && (e.cantidad * e.precio)
                iva10 += e.iva === 10 && (e.cantidad * e.precio)
            }
        })
        obj.total = total;
        obj.iva10 = iva10;
        obj.iva5 = iva5;
        obj.exenta = exenta;
        setFactura(obj)
        localStorage.setItem('pedido',JSON.stringify(obj))
    }



    const getDatasEdit = useCallback(async()=>{
        let id = query.get('id')
        if(id){
            setCargas({main:true,stock:false})
            setearFactura(initialFactura)
            let [main,items,rece] = await Promise.all([
                APICALLER.get({
                    table:'pedidos',where:`id_pedido,=,${id}`,
                    include:'clientes,users',on:'id_cliente,cliente_id_pedido,user_id_pedido,id_user',
                    fields:'fecha_pedido,tipo_pedido,armazon_id,codigo_cliente_pedido,obs_cliente,obs_laboratorio,id_cliente,nombre_cliente,ruc_cliente,direccion_cliente,fantasia_cliente,nombre_user,fecha_pedido,codigo_cliente_pedido,obs_laboratorio,armazon_id,tipo_pedido'
            }),
            APICALLER.get({table:'pedidos_items',
            where:`pedido_id,=,${id}`,
            include:'productos',on:'id_producto,producto_id_item',
            fields:'lado_item,id_pedidos_item,deposito_id_item,codigo_producto,cantidad_pedido,id_producto,precio_producto,preciom_producto,precio_venta_item,iva_producto,nombre_producto,tipo_producto'
            }),
            APICALLER.get({table:'recetas',where:`pedido_id_receta,=,${id}`})
            ])
            if(main.response && items.response){
                setIdUpdate({state:true,id:id})
                let f = {...factura},
                lados = {'0':'no', '1':'ambos', '2':'derecho','3':'izquierdo'}
                let fa  = main.first, fare = rece.first
                delete fare.updated_at
                delete fare.pedido_id_receta

                let rec = {
                    id_receta:fare.id_receta,
                    codigo_izquierdo:fare.codigo_izquierdo,codigo_derecho:fare.codigo_derecho,
                    adicion_izquierdo:"0",adicion_derecho:"0",
                    altura_izquierdo:"0",altura_derecho:"0",
                    dnp_izquierdo:"0", dnp_derecho:"0",
                    cerca_eje_izquierdo:"0",cerca_eje_derecho:"0",
                    cerca_izquierdo_cilindrico:"0",cerca_derecho_cilindrico:"0",
                    cerca_izquierdo_esferico:"0", cerca_derecho_esferico:"0",
                    lejos_izquierdo_cilindrico:"0",lejos_derecho_cilindrico:"0",
                    lejos_izquierdo_esferico:"0",lejos_derecho_esferico:"0",
                    lejos_eje_izquierdo:"0", lejos_eje_derecho:"0",
                }

                items.results.forEach(elem=>{
                    let ladito = 'no';
                    
                    //console.log(rec);
                    if(elem.tipo_producto==="1"){
                        if(fare.codigo_derecho === fare.codigo_izquierdo){
                            ladito = 'ambos'
                            rec = fare
                        }
                        else{
                            if(elem.codigo_producto === fare.codigo_izquierdo){
                                ladito = 'izquierdo'
                                rec.adicion_izquierdo = fare.adicion_izquierdo
                                rec.altura_izquierdo = fare.altura_izquierdo
                                rec.dnp_izquierdo = fare.dnp_izquierdo
                                
                                rec.cerca_eje_izquierdo = fare.cerca_eje_izquierdo
                                rec.cerca_izquierdo_esferico = fare.cerca_izquierdo_esferico
                                rec.cerca_izquierdo_cilindrico = fare.cerca_izquierdo_cilindrico

                                rec.lejos_eje_izquierdo = fare.lejos_eje_izquierdo
                                rec.lejos_izquierdo_esferico = fare.lejos_izquierdo_esferico
                                rec.lejos_izquierdo_cilindrico = fare.lejos_izquierdo_cilindrico
                            }
                            else{
                                ladito = 'derecho'
                                rec.adicion_derecho = fare.adicion_derecho
                                rec.altura_derecho = fare.altura_derecho
                                rec.dnp_derecho = fare.dnp_derecho

                                rec.cerca_derecho_cilindrico = fare.cerca_derecho_cilindrico
                                rec.cerca_derecho_esferico = fare.cerca_derecho_esferico
                                rec.cerca_eje_derecho = fare.cerca_eje_derecho

                                rec.lejos_eje_derecho = fare.lejos_eje_derecho
                                rec.lejos_derecho_cilindrico = fare.lejos_derecho_cilindrico
                                rec.lejos_derecho_esferico = fare.lejos_derecho_esferico
                                //console.log('entro en derecho');
                            }
                        }
                    }
                    let objeto = {
                        id_pedidos_item: elem.id_pedidos_item,
                        id_productos_deposito:elem.deposito_id_item,
                        cantidad:parseFloat(elem.cantidad_pedido),
                        precio_normal:parseFloat(elem.precio_producto),
                        precio: parseFloat(elem.precio_venta_item),
                        preciom: parseFloat(elem.preciom_producto),
                        descripcion:elem.nombre_producto,
                        id_producto:elem.id_producto,
                        codigo:elem.codigo_producto,
                        tipo:parseInt(elem.tipo_producto),
                        iva:parseInt(elem.iva_producto),
                        editable:false,
                        receta:rec,
                        lado: ladito
                    }
                    //console.log(objeto);
                    f.items.push(objeto)
                })
                
                f.cliente = {
                    id_cliente:fa.id_cliente,
                    ruc_cliente:fa.ruc_cliente,
                    nombre_cliente:fa.nombre_cliente,
                    fantasia_cliente:fa.fantasia_cliente,
                    direccion_cliente:fa.direccion_cliente
                }
                f.tipo_pedido = fa.tipo_pedido,
                f.codigo_cliente_pedido = fa.codigo_cliente_pedido,
                f.fecha = fa.fecha_pedido,
                f.obs = {
                    cliente:fa.obs_cliente,
                    laboratorio:fa.obs_laboratorio,
                    armazon_id:fa.armazon_id
                }
                
                f.receta = fare
                setearFactura(f)

            }
            setCargas({main:false,stock:false})
        }
    },[])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatasEdit();}
        return () => {isActive = false; ca.abort();};
      }, [getDatasEdit]);

    const values = {lado,setLado,selectIndex,setSelectIndex,idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {lado,setLado,selectIndex,setSelectIndex,idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user} = useContext(PedidosContext)
    return {lado,setLado,selectIndex,setSelectIndex,idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user}
}

export default PedidosProvider;