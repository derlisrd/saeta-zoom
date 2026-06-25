import { Button, DialogActions, DialogContent, Grid, LinearProgress } from "@mui/material";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import { useListadoProducto } from "./ListadoProductoProvider";
import { useCallback, useEffect, useState } from "react";
import { APICALLER } from "../../../../Services/api";
import style from './stock.module.css'

function DialogStock() {

    const {dialogs,llaveDialog,formSelect} = useListadoProducto()
    const [loading,setLoading] = useState(true)
    const [stock,setStock] = useState([])
    const close = ()=> llaveDialog('stock',false)

    
    const getLista = useCallback(async()=>{
        if(dialogs.stock){
            let res = await APICALLER.get({table:'productos_depositos',where:`producto_id,=,${formSelect.id_producto}`,fields:'deposito_id,eje,graduacion_esferico,graduacion_cilindrico,producto_id,stock_producto_deposito'})
            if(res.response){
                setStock(res.results)
            }else{console.log(res);}
            setLoading(false)
        }
    },[dialogs,formSelect])


    //console.log(stock);

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);
    


    return (<DialogZoom fullWidth open={dialogs.stock} onClose={close} title='Stock' >
        <DialogContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                    <table width='100%' border={1} className={style.table_stock}>
                        <tbody>
                            <tr>
                                <th>DEPOSITO</th>
                                <th>ESFERICO</th>
                                <th>CILINDRICO</th>
                                <th>EJE</th>
                                <th>STOCK DISPONIBLE</th>
                                <th>ACCIONES</th>
                            </tr>
                            {
                                stock.map((e,i)=>(
                                    <tr key={i}>
                                        <td>{e.deposito_id}</td>
                                        <td>{e.graduacion_esferico}</td>
                                        <td>{e.graduacion_cilindrico}</td>
                                        <td>{e.eje}</td>
                                        <td>{e.stock_producto_deposito}</td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
        </DialogActions>
    </DialogZoom> );
}

export default DialogStock;