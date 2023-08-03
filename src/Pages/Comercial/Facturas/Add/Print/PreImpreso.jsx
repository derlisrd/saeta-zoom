import {Dialog,DialogContent,DialogActions, Button} from '@mui/material'
import './style.css'
import { useRef,useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useFacturas } from '../FacturasProvider';
import TablasDatos from './TablasDatos';
import LoadingPage from '../../../../../Components/UI/LoadingPage';
import { useAuth } from '../../../../../Providers/AuthProvider';
import { APICALLER } from '../../../../../Services/api';

function PreImpreso() {
    const {userData} = useAuth()
    const {token_user,id_user} = userData
    const {factura,dialogs,setDialogs,initialFactura,setearFactura,pedidos} = useFacturas();
    const [grabado,setGrabado] = useState(false)
    const [loading,setLoading] = useState(false)
    const limpiar = ()=>{
      setearFactura(initialFactura)
      close()
      setGrabado(false)
    }
    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });

    const grabarFactura = async()=>{
      
      setLoading(true)
      let data = {
        tipo_factura: factura.tipo_factura,
        cliente_id: factura.cliente.id_cliente,
        user_id: id_user,
        total_exenta: factura.exenta,
        total_iva5: factura.iva5,
        total_iva10: factura.iva10,
        total_factura: factura.total,
        fecha_factura: factura.fecha,
        fecha_cobro_factura: factura.fecha,
        nro_factura: factura.nro_factura,
        factura_pagado: '0',
        nros_pedidos: pedidos.length > 0 ? pedidos.join(', ') : '_'
      }
      //console.log(data);
      let res = await APICALLER.insert({table:'facturas',data,token:token_user})
      if(res.response){
        let LAST_ID = res.last_id;
        let promises = []
        factura.items.forEach(el => {
          let data = {
            factura_id: LAST_ID,
            producto_id: el.id_producto,
            cantidad_item: el.cantidad,
            precio_item: el.precio,
            iva_item: el.iva
          }
          promises.push(APICALLER.insert({table:'facturas_items',data,token:token_user}))
        });
        pedidos.forEach(elem=>{
          promises.push(APICALLER.update({table:'pedidos',token:token_user,data:{facturado_pedido:1,factura_id:LAST_ID},id:elem}))
        })
        await Promise.all(promises)
        setGrabado(true)
      }else{
        console.log(res);
      } 
      setLoading(false)
    }  



    
    const close = ()=> { setDialogs({...dialogs,finalizar:false}) }  

    return (
      <Dialog open={dialogs.finalizar} onClose={() => {}} fullScreen>
        <DialogContent>
          {
            loading ? <LoadingPage /> : <div id="id_print_preimpreso" className="print_main" ref={divRef}>
            <TablasDatos factura={factura} style={{ marginBottom:'9mm' }} />
            <TablasDatos factura={factura} style={{ marginBottom:'9mm' }} />
            <TablasDatos factura={factura} style={{ marginBottom:'-2mm' }} />
          </div>
          }
        </DialogContent>
        <DialogActions>
          {
            grabado ? <Button variant="contained" size="large" onClick={limpiar} >
            Cerrar
          </Button> : 
            <Button variant="contained" size="large" onClick={close} >
            Volver  
          </Button>
          }
          {
            grabado ? <Button variant="contained" size="large" onClick={handlePrint}>
            Imprimir
          </Button> : 
          <Button variant="contained" size="large" onClick={grabarFactura}>
            Grabar factura
          </Button>
          }
        </DialogActions>
      </Dialog>
    );
}

export default PreImpreso;