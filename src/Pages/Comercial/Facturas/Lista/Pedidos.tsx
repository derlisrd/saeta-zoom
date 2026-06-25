import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useListaFactura } from "./ListaFacturaProvider";

function Pedidos() {
    const {dialogs,setDialogs,formSelect} = useListaFactura()
    const close = ()=>{ setDialogs({...dialogs,pedidos:false})}
    return ( <Dialog fullWidth onClose={close} open={dialogs.pedidos}>
        <DialogTitle>
            Listado de pedidos en factura
        </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={12}>
                    <p style={{ wordBreak:'break-word' }}>{formSelect.nros_pedidos}</p>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Pedidos;