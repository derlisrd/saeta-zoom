import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { usePedidos } from "./PedidosProvider";
import swal from "sweetalert";




function InputCodigo() {

    const {factura,setearFactura,dialogs,setDialogs,setFormDepositoStock,setCargas,cargas,setSelectProduct,setSelectIndex,lado} = usePedidos()
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    const [lista,setLista] = useState([])
    
    const insertaProducto = async(e,val)=>{
        if(val){
            let new_fact = {...factura}
            let tipo =  parseInt(val.tipo_producto), id_producto = val.id_producto
            let index = new_fact.items.findIndex(e => e.codigo.toLowerCase() === val.codigo_producto.toLowerCase());
            let found = new_fact.items.filter(i => i.codigo.toLowerCase() === val.codigo_producto.toLowerCase());
            setSelectIndex(new_fact.items.length)
            if( lado.izquierdo=== true && lado.derecho===true && tipo===1 && new_fact.tipo_pedido !=='4'){
                swal({icon:'info', title:'Error', text:'Lados ya están completos. Elimine algunos items para insertar en el pedido'})
                return false;
            }
            if(tipo === 1){
                let idCliente = new_fact.cliente.id_cliente
                setCargas({...cargas,stock:true})
                let [res,desc] = await Promise.all([
                    APICALLER.get({table:'productos_depositos',
                    fields:'nombre_producto,deposito_id,eje,graduacion_cilindrico,graduacion_esferico,stock_producto_deposito,codigo_producto,precio_producto,iva_producto,tipo_producto,id_producto,preciom_producto,precio_producto,id_productos_deposito'
                    ,include:'productos',on:'producto_id,id_producto',where:`producto_id,=,${id_producto}`}),
                    APICALLER.get({table:'descuentos',where:`cliente_id_descuento,=,${idCliente},and,producto_id_descuento,=,${id_producto}`})
                ])
                
                if(res.response){
                    setFormDepositoStock(res.results)
                }else{
                    swal({title:'Error',icon:'warning',text:'Ocurrió un error con tu conexión a internet'}) 
                    console.log(res);
                }
                let precio_descuento = parseFloat(val.precio_producto)
                if(desc.found>0){
                    precio_descuento = precio_descuento - ((precio_descuento * parseFloat(desc.first.porcentaje_descuento))/100)
                }
                let nuevo_item = {
                    id_productos_deposito:null,
                    cantidad:1,
                    precio_normal:parseFloat(val.precio_producto),
                    precio: precio_descuento,
                    preciom: parseFloat(val.preciom_producto),
                    descripcion:val.nombre_producto,
                    id_producto,
                    codigo:val.codigo_producto,
                    tipo,
                    editable:true,
                    iva:parseInt(val.iva_producto),
                    receta:{},
                    lado:'ambos'               
                }
                new_fact.items.push(nuevo_item)
                setCargas({...cargas,stock:false})
                setSelectProduct(nuevo_item)
                setDialogs({...dialogs,select_deposito_stock:true})

            }
            else{
                if (found.length > 0) {
                    new_fact.items[index].cantidad += 1 
                }else{
                    let nuevo_item = {
                        id_productos_deposito:null,
                        cantidad:1,
                        precio_normal:parseFloat(val.precio_producto),
                        precio: parseFloat(val.precio_producto),
                        preciom: parseFloat(val.preciom_producto),
                        descripcion:val.nombre_producto,
                        id_producto,
                        codigo:val.codigo_producto,
                        tipo,
                        editable:true,
                        iva:parseInt(val.iva_producto),
                        receta:null,
                        lado:'no'                 
                    }
                    new_fact.items.push(nuevo_item)
                }
            }
            setearFactura(new_fact)
            
        }
        setSearch('')
        setLista([])
    }

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "productos",
                    fields:'codigo_producto,id_producto,nombre_producto,preciom_producto,precio_producto,tipo_producto,iva_producto',
                    filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20'
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Autocomplete
        autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
        getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
        options={lista}
        onChange={insertaProducto}
        loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
        renderInput={(params) => <TextField id='id_busca_codigo' {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
      />);
}

export default InputCodigo;