import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useCallback, useEffect, useState } from "react";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import { funciones } from "../../../App/helpers/funciones";
import { useAuth } from "../../../Providers/AuthProvider";

function CambiarPrecio() {

    const {factura,dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,setearFactura} = usePedidos()
    const {userData} = useAuth()
    const {permisos} = userData
    const [error,setError]=useState({active:false,msg:''})
    const [precio,setPrecio] = useState({
        precio_anterior:'',
        precio_normal:'',
        precio_nuevo: '',
        precio_minimo: ''
    })

    const close = ()=>{
        setDialogs({...dialogs,precio:false})
        setIndexCambioPrecio(-1)
        setError({active:false,msg:''})
    }

    const cambiarPrecio = ()=>{
        let ID_PERMISO = '51'
        let autorizado = permisos.some(elm=> elm.id_permiso_permiso === ID_PERMISO)
        
        if(precio.precio_nuevo< precio.precio_minimo && !autorizado)
        {
            setError({active:true,msg:"No tiene permisos para cambiar el precio"})
            return false;
        }
        
        let f = {...factura}
        f.items[indexCambioPrecio].precio = precio.precio_nuevo
        setearFactura(f)
        close()
    }
    //console.log(factura);

    const setearPrecio = useCallback(()=>{
        if(indexCambioPrecio>=0){
            let f = {...factura}
            //console.log(f.items);
            let precios = f.items[indexCambioPrecio]
            setPrecio({
                precio_normal: precios.precio_normal,
                precio_anterior: precios.precio,
                precio_minimo: precios.preciom,
                precio_nuevo:''
            })
        }
    },[indexCambioPrecio])

    useEffect(()=>{
        setearPrecio()
    },[setearPrecio])

    
    return (<Dialog open={dialogs.precio} fullWidth onClose={close}>
        <DialogTitle>Cambiar precio</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {error.active && <Alert>{error.msg}</Alert>}
                </Grid>
            <Grid item xs={12}>
                    <Typography variant="h5">Precio normal: {funciones.numberFormat(precio.precio_normal)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Precio anterior: {funciones.numberFormat(precio.precio_anterior)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">Precio mínimo: {funciones.numberFormat(precio.precio_minimo)}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Precio nuevo' autoFocus name='precio_nuevo' value={precio.precio_nuevo}
                    onKeyUp={e=>{ (e.key==='Enter' && cambiarPrecio());}} fullWidth
                    onChange={e=>{ setPrecio({...precio,precio_nuevo: e.target.value}) }} 
                    InputProps={{
                        inputProps: { min: 0 },
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cancelar</Button>
            <Button variant="contained" onClick={cambiarPrecio}>Cambiar</Button>
        </DialogActions>
    </Dialog>  );
}

export default CambiarPrecio;