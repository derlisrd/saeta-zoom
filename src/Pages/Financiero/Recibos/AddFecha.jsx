import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField,Stack } from "@mui/material";
import { funciones } from "../../../App/helpers/funciones";
import { useAuth } from "../../../Providers/AuthProvider";
import { useRecibosProvider } from "./Provider";
import { useState } from "react";
import BuscaCliente from "./Components/BuscaCliente";


function AddFecha() {
    const {dialogs,setDialogs,getLista} = useRecibosProvider()
    const [loading,setLoading]=useState(false)
    const [total,setTotal] = useState(0)
    const [error,setError]=useState({code:0})
    const [cliente,setCliente] = useState({id_cliente:null,nombre_cliente:null,ruc_cliente:null})
    const close = ()=> {
        setLoading(false);
        setDialogs({...dialogs,addfecha:false})
    }
    const reset = ()=>{

    }
    const consultar = ()=>{

    }
    const finalizar = ()=>{

    }
    return ( <Dialog open={dialogs.addfecha} onClose={close} fullScreen >
    <DialogTitle>Agregar recibo nuevo | Total: {funciones.numberFormat(total)}</DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {loading && <LinearProgress />}
            </Grid>
            <Grid item xs={12} sm={3}>
                <BuscaCliente setCliente={setCliente} />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField type="date"  fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField type="date"  fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Stack direction='row' spacing={1}>
                <Button onClick={consultar} variant="outlined">Filtrar</Button>
                <Button onClick={reset} variant="outlined">Reiniciar</Button>
                </Stack>
            </Grid>
        </Grid>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" onClick={finalizar}>FINALIZAR</Button>
        <Button variant="outlined" onClick={close}>CERRAR</Button>
    </DialogActions>
</Dialog> );
}

export default AddFecha;