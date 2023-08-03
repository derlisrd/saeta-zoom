import { Button, Dialog, DialogActions, DialogContent, DialogTitle,  LinearProgress } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from "../../../Providers/AuthProvider";
import './stylos.css'
import { funciones } from "../../../App/helpers/funciones";
import { useState } from "react";
import { APICALLER } from "../../../Services/api";
import useInitialStates from "./useInitialStates";
import Ticket from "./Print/Ticket";
import swal from "sweetalert";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";

function FinalizarPedido() {
    const {navigate} = useGotoNavigate()
    const {initialFactura} = useInitialStates()
    const {userData} = useAuth()
    const [finalizado,setFinalizado] = useState(false)
    const {token_user,id_user} = userData
    const {dialogs,setDialogs,factura,setearFactura,lastID,setLastID,idUpdate} = usePedidos()
    const [loading,setLoading] = useState(false)

    
    const atras = ()=>{
        if(finalizado){
            setearFactura(initialFactura)
            setFinalizado(false)
        }
        setDialogs({...dialogs,finalizar:false})
    }
    const actualizar = async()=>{
        let f = {...factura}
        setLoading(true)

        let updatePedido = {
            armazon_id: f.obs.armazon_id,
            obs_laboratorio:f.obs.laboratorio,
            obs_cliente: f.obs.cliente,
            cliente_id_pedido: f.cliente.id_cliente,
            tipo_pedido: f.tipo_pedido,
            codigo_cliente_pedido: f.codigo_cliente_pedido,
            total_pedido: f.total,
            total_iva10: f.iva10,
            total_iva5: f.iva5,
            total_exenta: f.exenta
        }
        let nueva_receta = {}
        f.items.forEach(elm =>{
            if(elm.tipo===1){
                if(elm.lado === 'ambos'){
                    nueva_receta = {...elm.receta}
                }
                else{
                    if(elm.lado === 'izquierdo'){
                        //console.log('entro en izquierdo');
                    }
                    if(elm.lado === 'derecho'){
                        //console.log('entro en derecho');
                    }
                }
            }
        })

        

        let promesas =  [
            APICALLER.update({table:'pedidos',token:token_user,id:idUpdate.id,data:updatePedido}),
            APICALLER.update({table:'recetas',token:token_user,id:f.receta.id_receta,data:nueva_receta}),
        ]

        f.items.forEach(elem=>{
            let dataItems = {
                pedido_id: idUpdate.id,
                cantidad_pedido: elem.cantidad,
                producto_id_item: elem.id_producto,
                precio_venta_item: elem.precio,
                deposito_id_item: elem.id_productos_deposito ?? 0,
            }
            promesas.push(APICALLER.update({table:'pedidos_items',id: elem.id_pedidos_item,data:dataItems,token:token_user}))
        })

        Promise.allSettled(promesas).
            then((res) => {
                //res.forEach((resp) => console.log(resp)) 
            }
            ).catch(e=>{
                console.log(e);
            })
        setLoading(false)
        navigate('/pedidos/lista')
    }

    


    const closeInsert = async()=>{ 
        let f = {...factura}
        setLoading(true)
        let datos = {
            cliente_id_pedido: f.cliente.id_cliente,
            fecha_pedido: `${funciones.getFechaHorarioString()}`,
            total_pedido: f.total,
            total_exenta: f.exenta,
            total_iva5: f.iva5,
            total_iva10: f.iva10,
            obs_cliente: f.obs.cliente,
            obs_laboratorio: f.obs.laboratorio,
            armazon_id: f.obs.armazon_id,
            estado_pedido:1,
            tipo_pedido:f.tipo_pedido,
            user_id_pedido:id_user,
            codigo_cliente_pedido: f.codigo_cliente_pedido,
            motivo_cancela:''
        }

        
        let res = await APICALLER.insert({table:'pedidos',data:datos,token:token_user})
        if(res.response)
        {
            let id_pedido = res.last_id, pedidos_items;
            setLastID(id_pedido)
            let lados = {'no':'0', 'ambos':'1', 'derecho':'2','izquierdo':'3'}
            let promises = [];
            f.items.forEach(e=>{
                pedidos_items = {
                    pedido_id: id_pedido,
                    cantidad_pedido: e.cantidad,
                    producto_id_item: e.id_producto,
                    precio_venta_item: e.precio,
                    deposito_id_item: e.id_productos_deposito ?? 0,
                    lado_item: f.tipo_pedido==='4' ? '0' : lados[e.lado]
                }
                promises.push(APICALLER.insert({table:'pedidos_items',token:token_user,data:pedidos_items}))
            })
            /**
             * 
             * ACA SERA LA BATALLA FINAL
             */
 
            let data_receta = {}
        f.items.forEach(elem=>{
            if(elem.lado==='derecho')
            {
                data_receta.lejos_derecho_esferico= elem.receta.lejos_derecho_esferico
                data_receta.lejos_derecho_cilindrico= elem.receta.lejos_derecho_cilindrico
                data_receta.lejos_eje_derecho= elem.receta.lejos_eje_derecho
                data_receta.cerca_derecho_esferico= elem.receta.cerca_derecho_esferico
                data_receta.cerca_derecho_cilindrico= elem.receta.cerca_derecho_cilindrico
                data_receta.cerca_eje_derecho= elem.receta.cerca_eje_derecho
                data_receta.adicion_derecho= elem.receta.adicion_derecho
                data_receta.dnp_derecho= elem.receta.dnp_derecho
                data_receta.codigo_derecho= elem.receta.codigo_derecho
                data_receta.altura_derecho= elem.receta.altura_derecho
      
            }
            if(elem.lado==='izquierdo')
            {

                data_receta.lejos_izquierdo_cilindrico= elem.receta.lejos_izquierdo_cilindrico
                data_receta.lejos_izquierdo_esferico= elem.receta.lejos_izquierdo_esferico
                data_receta.lejos_eje_izquierdo= elem.receta.lejos_eje_izquierdo
                data_receta.cerca_izquierdo_cilindrico= elem.receta.cerca_izquierdo_cilindrico
                data_receta.cerca_izquierdo_esferico= elem.receta.cerca_izquierdo_esferico
                data_receta.cerca_eje_izquierdo= elem.receta.cerca_eje_izquierdo
                data_receta.adicion_izquierdo= elem.receta.adicion_izquierdo
                data_receta.dnp_izquierdo= elem.receta.dnp_izquierdo
                data_receta.codigo_izquierdo= elem.receta.codigo_izquierdo
                data_receta.altura_izquierdo= elem.receta.altura_izquierdo
            }
            if(elem.lado==='ambos')
            {
                data_receta = {...elem.receta} 
            }
        })

        data_receta.pedido_id_receta = id_pedido

            
            promises.push(APICALLER.insert({table:'recetas',token:token_user,data:data_receta}))
            
            //await Promise.all(promises)
            Promise.allSettled(promises).
            then((res) => {}
                /* res.forEach((resp) => console.log(resp)) */
            ).catch(e=>{
                console.log(e);
            })
        }else{
            console.log(res);
            swal({title:'Error',text:'Ocurrió un error con la conexión a internet',icon:'warning'})
            setLoading(false)
            setFinalizado(false)
            return;
        }
        setLoading(false) 
        setFinalizado(true)
    }

    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });
      


    return ( <Dialog open={dialogs.finalizar} onClose={()=>{}} fullScreen >
        <DialogTitle><ButtonTip id='9' onClick={atras} title='Atrás' icon='arrow_back' />  Imprimir pedido</DialogTitle>
        <DialogContent>
            {loading ? <LinearProgress /> :
            <div ref={divRef} id="print">
            <Ticket factura={factura} nro={idUpdate.state ? idUpdate.id : lastID} userData={userData} /> 
            </div>
            }
        </DialogContent>
        <DialogActions>
            {
                finalizado ? <Button variant="outlined" size="large" onClick={atras}>CERRAR PEDIDO</Button> :
                <Button color="info" variant="outlined" onClick={ idUpdate.state ? actualizar : closeInsert} size="large"> {idUpdate.state ? `ACTUALIZAR` : `GRABAR PEDIDO` } </Button>
            }
            <Button color="success" variant="contained" disabled={!finalizado} onClick={handlePrint} size="large"> IMPRIMIR </Button>
        </DialogActions>
    </Dialog> );
}

export default FinalizarPedido;