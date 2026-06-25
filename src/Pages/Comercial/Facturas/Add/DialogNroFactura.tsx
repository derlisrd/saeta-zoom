import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,TextField } from "@mui/material";

import { useFacturas } from "./FacturasProvider";


function DialogNroFactura() {

    const {setDialogs,dialogs,setearFactura,factura} = useFacturas()
    
    const close = ()=>{ 
        setDialogs({...dialogs,nro_factura:false});
    }
    const cambiar = e=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const data = Object.fromEntries(myFormData.entries());
        let f = {...factura}
        f.nro_factura = data.nro_factura
        setearFactura(f)
        close();
    }


    return (
      <Dialog open={dialogs.nro_factura} fullWidth onClose={close}>
        <DialogTitle>NRO FACTURA</DialogTitle>
        <form onSubmit={cambiar}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField name="nro_factura" fullWidth autoFocus />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" type="submit" >GUARDAR</Button>
            <Button variant="contained" onClick={close}>Cancelar</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
}

export default DialogNroFactura;