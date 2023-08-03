import {  Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,LinearProgress,TextField, Typography } from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import { APICALLER } from "../../../../Services/api";
import { useState } from "react";

function DialogInsertarPedido() {
    const {setDialogs,dialogs,setearFactura,factura,setPedidos,pedidos} = useFacturas()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,message:''})
    const close = ()=>{ 
        setDialogs({...dialogs,insertar_pedido:false});
        setError({active:false,message:''})
    }
    //console.log(pedidos);
    const cambiar = async(e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const data = Object.fromEntries(myFormData.entries());
        

        let p = [...pedidos]

        let found = p.findIndex(el=> el === data.nro_pedido)
        if(found>=0){
          setError({active:true,message:'Pedido ya insertado'})
          return false;
        }
        
        setLoading(true)
        setError({active:false,message:''})

        let [res,client] = await Promise.all([APICALLER.get({table:'pedidos_items',
        fields:'precio_venta_item,nombre_producto,codigo_producto,cantidad_pedido,id_producto,iva_producto,precio_producto,preciom_producto',
        include:'productos',on:'producto_id_item,id_producto',where:`pedido_id,=,${data.nro_pedido}`}),
        APICALLER.get({table:'pedidos',include:'clientes',on:'id_cliente,cliente_id_pedido',
        where:`id_pedido,=,${data.nro_pedido}`,
        fields:'nombre_cliente,ruc_cliente,direccion_cliente,id_cliente,estado_pedido,facturado_pedido,tipo_cliente'})
        ])
        
        if(res.found===0 && res.response){
          setLoading(false)
          setError({active:true,message:'Número de pedido no existe'})
          return false;
        }
        
        if(res.response && res.found>0 && client.response){

          let p = [...pedidos]
          p.push(data.nro_pedido)
          let f  = {...factura}
          f.pedidos.push(data.nro_pedido)
          
          if(client.first.estado_pedido === '0'){
            setLoading(false)
            setError({active:true,message:'Este pedido fue cancelado'})
            return false;
          }

          if(client.first.facturado_pedido === '1'){
            setLoading(false)
            setError({active:true,message:'Este pedido ya fue facturado'})
            return false;
          }
          

          if(pedidos.length>0 && (f.cliente.id_cliente !== client.first.id_cliente)){
              setLoading(false)
              setError({active:true,message:'Ese pedido pertenece a otro cliente'})
              return false;
          }
          setError({active:false,message:''})
          f.cliente = {...client.first}
          f.tipo_factura = client.first.tipo_cliente==='1' ? '1': '2' 
          
          res.results.forEach(val => {
            let nuevo_item;
            let indexItem = f.items.findIndex(elem=> elem.id_producto === val.id_producto )
            if(indexItem>=0){
              f.items[indexItem].cantidad += parseFloat(val.cantidad_pedido);
            }else{
              nuevo_item = {
                id_pedido_insert: data.nro_pedido,
                cantidad: parseFloat(val.cantidad_pedido) ,
                precio_normal:parseFloat(val.precio_producto),
                precio: parseFloat(val.precio_venta_item),
                preciom: parseFloat(val.preciom_producto),
                nombre_producto:val.nombre_producto,
                id_producto:val.id_producto,
                codigo_producto:val.codigo_producto,
                iva:parseInt(val.iva_producto)                 
                }
                f.items.push(nuevo_item)
            }
          });

          setPedidos(p)
          setearFactura(f) 
        }
        setLoading(false)
        document.getElementById('nro_pedido').value = ''
    }


    return (
      <Dialog open={dialogs.insertar_pedido} fullWidth onClose={close}>
        <DialogTitle>NRO PEDIDO</DialogTitle>
        <form onSubmit={cambiar}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {
                loading && <LinearProgress />
              }
              {
                error.active && <Alert severity="error">{error.message}</Alert>
              }
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline">Pedidos insertados: </Typography>
              {
                pedidos.map(e=>( <span key={e}> - {e}  </span> ))
              }
            </Grid>
            <Grid item xs={12}>
                <TextField required autoComplete="off" id='nro_pedido' name="nro_pedido" fullWidth autoFocus />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" type="submit" >INSERTAR</Button>
            <Button variant="contained" onClick={close}>CERRAR</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
}

export default DialogInsertarPedido;