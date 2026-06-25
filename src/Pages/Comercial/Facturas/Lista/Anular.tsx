import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useListaFactura } from "./ListaFacturaProvider";
import { useEffect,useState } from "react";
import { APICALLER } from "../../../../Services/api";
import { useAuth } from "../../../../Providers/AuthProvider";

function Anular() {
    const {dialogs,setDialogs,formSelect,getLista} = useListaFactura()
    const [loading,setLoading] = useState(false)
    const [motivo,setMotivo] = useState('')
    const {userData} = useAuth()
    const {token_user} = userData
    const anular = async()=>{
        setLoading(true)
        let res = await APICALLER.update({table:'facturas',data:{estado_factura:0,motivo_cancela: motivo},id:formSelect.id_factura,token:token_user})
        if(!res.response){
            console.log(res);
        }
        setLoading(false)
        close()
        getLista()
    }
    const close = _ => setDialogs({...dialogs,anular:false})
    useEffect(()=>{
        //console.log(formSelect);
    },[dialogs,formSelect])
    
    return (<Dialog fullWidth open={dialogs.anular} onClose={close}>
        <DialogTitle>Desea anular?</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                    <DialogContentText>
                        {formSelect.nro_factura}
                    </DialogContentText>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth autoFocus autoComplete="off" label="Motivo de anular" value={motivo} onChange={e=>setMotivo(e.target.value)} />
                </Grid>
            </Grid>
            
            
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={anular}>Anular</Button>
            <Button variant="outlined" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>  );
}

export default Anular;