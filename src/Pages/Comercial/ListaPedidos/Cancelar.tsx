import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { APICALLER } from "../../../Services/api";
import { useAuth } from "../../../Providers/AuthProvider";
import { useState } from "react";

function Cancelar() {
    const {userData} = useAuth()
    const {token_user} = userData
    const {dialogs,setDialogs,formSelect,getLista} = useListaPedidos()
    const [motivo,setMotivo] = useState('')
    const [loading,setLoading] = useState(false)


    const cancelar = async()=>{
        if(motivo===''){
            return false;
        }
        setLoading(true)
        let data = {estado_pedido:'0',motivo_cancela:motivo}
        
        let res = await APICALLER.update({table:'pedidos',data,id:formSelect.id_pedido,token:token_user})

        if(res.response){
            getLista()
            close()
        }else{
            console.log(res);
        }
        setLoading(true) 
    }

    const close = ()=>{
        setDialogs({...dialogs,cancelar: false})
        setMotivo('')
    }

    return ( <Dialog open={dialogs.cancelar} fullWidth onClose={close}>
        <DialogTitle>Desea cancelar este pedido? NRO: {formSelect?.id_pedido }</DialogTitle>
        <DialogContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                <TextField fullWidth label="Motivo de cancelamiento" name="motivo" value={motivo} onChange={e=>{setMotivo(e.target.value)}} autoFocus  />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} >Cerrar</Button>
            <Button onClick={cancelar} variant="contained">Confirmar</Button>
        </DialogActions>
    </Dialog> );
}

export default Cancelar;