import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import TablasDatos from "../Add/Print/TablasDatos";
import { useListaFactura } from "./ListaFacturaProvider";
import { useCallback, useEffect, useState, useRef} from "react";
import { useReactToPrint } from 'react-to-print';
import { APICALLER } from "../../../../Services/api";
import LoadingPage from "../../../../Components/UI/LoadingPage";
import '../Add/Print/style.css';
function Print() {

   const [factura,setFactura] = useState({})
   const {dialogs,setDialogs,formSelect} = useListaFactura()
    const [loading,setLoading] = useState(true)
    const close = ()=>{ setDialogs({...dialogs,print:false})}
    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });


   const getData = useCallback(async()=>{
        if(dialogs.print){
            setLoading(true)
            let [fact,item] = await Promise.all([
                APICALLER.get({table:'facturas',where:`id_factura,=,${formSelect.id_factura}`,
                include:'clientes,users',
                on:'id_cliente,cliente_id,id_user,user_id',
                fields:'nro_factura,ruc_cliente,nombre_cliente,direccion_cliente,fecha_factura,tipo_factura,total_exenta,total_iva10,total_iva5,total_factura'
            }),
                APICALLER.get({table:'facturas_items',where:`factura_id,=,${formSelect.id_factura}`,
                include:'productos',on:'id_producto,producto_id',
                fields:'codigo_producto,cantidad_item,precio_item,id_producto,iva_item,nombre_producto'
            })
            ])
            if(fact.response && item.response){
              let factu = fact.first
              let itemsArray = []
              item.results.forEach(elem=>{
                itemsArray.push({
                  codigo_producto: elem.codigo_producto,
                  cantidad: parseFloat(elem.cantidad_item),
                  precio: parseFloat(elem.precio_item),
                  iva: parseFloat(elem.iva_item),
                  nombre_producto: elem.nombre_producto
                })
              })
              let f = {
                nro_factura:factu.nro_factura,
                fecha: factu.fecha_factura,
                cliente:{
                  nombre_cliente: factu.nombre_cliente,
                  direccion_cliente: factu.direccion_cliente,
                  ruc_cliente: factu.ruc_cliente
                },
                tipo_factura: factu.tipo_factura,
                total: parseFloat(factu.total_factura),
                exenta: parseFloat(factu.total_exenta),
                iva5: parseFloat(factu.total_iva5),
                iva10: parseFloat(factu.total_iva10),
                items: itemsArray,
                liquiiva10: parseFloat(factu.total_iva10)/11,
                liquiiva5: parseFloat(factu.total_iva5)/21,
                liquiivatotal: (parseFloat(factu.total_iva5)/21) + parseFloat(factu.total_iva10)/11 
              }
              setFactura(f)
              	//console.log(f);
            }
            
            setLoading(false)
        }
   },[formSelect,dialogs])

    useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getData();}
    return () => {isActive = false; ca.abort();};
}, [getData]);

    return ( <Dialog open={dialogs.print} onClose={() => {}} fullScreen>
    <DialogContent>
      {
        loading ? <LoadingPage /> : <div id="id_print_preimpreso" className="print_main" ref={divRef}>
        <TablasDatos factura={factura}  style={{ paddingBottom:'25px' }}/>
        <TablasDatos factura={factura}  style={{ marginBottom:'25px' }}/>
        <TablasDatos factura={factura}  style={{ marginBottom:'-2mm' }}/>
      </div>
      }
    </DialogContent>
    <DialogActions>
      
    <Button variant="contained" size="large" onClick={handlePrint}>
        Imprimir
      </Button> 
      <Button variant="contained" size="large" onClick={close}>
        Cerrar
      </Button>
      
    </DialogActions>
  </Dialog> );
}

export default Print;