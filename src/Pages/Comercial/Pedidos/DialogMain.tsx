import { Dialog, DialogContent, DialogTitle, Grid,  Stack, Typography } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import TablaItems from "./TablaItems";
import InputCodigo from "./InputCodigo";
import Botones from "./Botones";
import InputCliente from "./InputCliente";
import Cargando from "./Cargando";
import { funciones } from "../../../App/helpers/funciones";
import InputObs from "./InputObs";
import SelectTipo from "./Components/SelectTipo";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";


function DialogMain() {

    const {navigate} = useGotoNavigate()
    const {setDialogs,dialogs,factura,cargas,idUpdate,initialFactura,setearFactura} = usePedidos()
    //console.log(idUpdate);
    const close = ()=>{ 
        if(idUpdate.state){
            setearFactura(initialFactura)
            navigate('/pedidos/lista')
        }
        setDialogs({...dialogs,main:false}) 
    }

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}} >
        <Cargando open={cargas.stock} />
        <Cargando open={cargas.main} />
        <DialogTitle> <ButtonTip id='1' onClick={close} title='Atrás' icon='arrow_back' /> {idUpdate.state && `Modificar pedido nro: ${idUpdate.id} -`}  Pedido - Total: { funciones.numberFormat( factura.total )} </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                   <Stack direction='row' spacing={2} alignItems='center'>
                   <InputCliente />
                    <Typography variant="overline">CODIGO CLIENTE: {factura.codigo_cliente_pedido}</Typography>
                    <InputObs />
                    <SelectTipo />
                   </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <TablaItems items={factura.items} />
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