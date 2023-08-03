import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, LinearProgress } from "@mui/material";
import { useReciboPedido } from "./Provider";
import { useEffect, useState, useCallback } from "react";
import { APICALLER } from "../../../Services/api";

function PrintRecibo() {
    const {dialogs,setDialogs,formSelect} = useReciboPedido()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])
    const close = ()=>{ setDialogs({...dialogs,print:false})}

    const getLista = useCallback(async()=>{
        if(dialogs.print){
            setLoading(true)
            let res = await APICALLER.get({table:'recibo_pedidos_items',where:`recibo_pedido_id,=,${formSelect.id_recibo_pedido}`})
            if(res.response){
                setLista(res.results)
                console.log(res);
            }else{
                console.log(res);
            }
            setLoading(false)
        }
    },[dialogs])

    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    return (<Dialog fullScreen open={dialogs.print} onClose={close}>
        <DialogTitle>
            Imprimir Recibo de pedidos
        </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button startIcon={<Icon>print</Icon>} variant="contained">IMPRIMIR</Button>
            <Button onClick={close} variant="outlined">CERRAR</Button>
        </DialogActions>
    </Dialog>  );
}

export default PrintRecibo;