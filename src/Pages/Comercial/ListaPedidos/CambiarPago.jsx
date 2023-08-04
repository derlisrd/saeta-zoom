import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Providers/AuthProvider";
import { APICALLER } from "../../../Services/api";

function CambiarPago() {

    const {dialogs,setDialogs,formSelect,getLista} = useListaPedidos()
    const close = ()=>{ setDialogs({...dialogs,pago:false}) }
    const {userData} = useAuth()
    const {token_user} = userData
    const [estado,setEstado] = useState ('0')
    const [loading,setLoading] = useState(false)
    const confirmar = async()=>{
        setLoading(true)
        let res = await APICALLER.update({table:'pedidos',data:{estado_pago:estado},id:formSelect.id_pedido,token:token_user })
        if(res.response){
            getLista();
            close()
        }else{
            console.log(res);
        }
        setLoading(false)

    }
    useEffect(()=>{
        if(dialogs.pago){
            setEstado(formSelect.estado_pago)
        }
    },[dialogs,formSelect])

    return ( <Dialog fullWidth onClose={close} open={dialogs.pago} >
        <DialogTitle>CAMBIAR ESTADO DE PAGO</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="estado_pago">Estado de pago</FormLabel>
                    <RadioGroup
                        row
                        value={estado}
                        onChange={e=>{ setEstado(e.target.value)} }
                        name="estado"
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Pendiente..." />
                        <FormControlLabel value="1" control={<Radio />} label="Pagado" />
                       </RadioGroup>
                </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={confirmar}>CAMBIAR</Button>
            <Button variant="outlined" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default CambiarPago;