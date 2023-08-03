import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useEffect, useState } from "react";
import { env } from "../../../App/config";

function DialogObs() {

    const {dialogs,setDialogs,factura,setearFactura} = usePedidos()
    const [obs,setObs] = useState({
        cliente:'',
        laboratorio:'',
        armazon_id:'0'
    })
    const close = ()=>{
        let new_fact = {...factura}
        new_fact.obs = obs
        setearFactura(new_fact)
        setDialogs({...dialogs,obs:false})
    }

    const change = e=>{
        const {value,name} = e.target
        setObs({...obs,[name]:value})
    }
    

    useEffect(()=>{
        if(dialogs.obs){
            setObs(factura.obs)
        }
    },[factura,dialogs])

    return (<Dialog open={dialogs.obs} onClose={close} fullWidth >
        <DialogTitle>Observaciones</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                
                <Grid item xs={12}>
                    <TextField fullWidth name="laboratorio" autoFocus value={obs.laboratorio} onChange={change} label='Observaciones de laboratorio' />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="cliente"  value={obs.cliente} onChange={change} label='Observaciones de cliente' />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="armazon_id">Armazon</InputLabel>
                    <Select
                    onChange={change}
                    value={obs.armazon_id}
                    label="Armazon"
                    name='armazon_id'
                    >
                    {env.ARMAZONES.map((e,i)=>(
                        <MenuItem key={i} value={e.id_armazon}>{e.id_armazon} {e.nombre_armazon}</MenuItem>
                    ))}
                    
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>  );
}

export default DialogObs;