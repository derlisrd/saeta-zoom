import { Dialog, DialogContent, Grid,  DialogTitle,Stack,Button} from "@mui/material";
import { useFacturas } from "./FacturasProvider";

import TableItems from "./TableItems";
import InputCodigo from "./InputCodigo";
import { funciones } from "../../../../App/helpers/funciones";
import Botones from "./Botones";
import SelectTipo from "./SelectTipo";
import IconButtonTip from "../../../../Components/Botones/IconButtonTip";

function DialogMain() {
    const {dialogs,setDialogs,factura} = useFacturas()
    const close = ()=>{ setDialogs({...dialogs,main:false}) }
    const openInsertarPedido = ()=>{ setDialogs({...dialogs,insertar_pedido:true}) }
    const openCliente = ()=>{ setDialogs({...dialogs,buscar_cliente:true})}
    const openNroFactura = ()=>{ setDialogs({...dialogs,nro_factura:true})}

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}} >
    <DialogTitle><IconButtonTip onClick={close} title='Cerrar factura' icon={{ name:'close' }} /> Factura - Total: { funciones.numberFormat( factura.total)} </DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
               <Stack direction='row' spacing={2} alignItems='center'>
                    <Button onClick={openInsertarPedido}>INSERTAR PEDIDO</Button>
                    <Button onClick={openCliente}>CLIENTE: {factura.cliente.ruc_cliente} {factura.cliente.nombre_cliente}</Button>
                    <Button onClick={openNroFactura}>FACTURA NRO: {factura.nro_factura}</Button>
                    <SelectTipo />
               </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
                <TableItems />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <Grid container rowGap={3}>
                    <Grid item xs={12}>
                        <InputCodigo />
                    </Grid>
                    <Grid item xs={12}>
                        <Botones />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </DialogContent>
</Dialog> );
}

export default DialogMain;