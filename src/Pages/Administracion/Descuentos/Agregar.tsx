import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, Icon, LinearProgress, Stack,  Alert, IconButton } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";
import { APICALLER } from "../../../Services/api";
import { useState } from "react";
import useInitialState from "./useInitialState";
import { useAuth } from "../../../Providers/AuthProvider";
import ListadoAgregado from "./ListadoAgregado";
import { funciones } from "../../../App/helpers/funciones";
import BuscarCliente from "./Components/BuscarCliente";
import ConsultarProducto from "./Components/ConsultarProducto";
import PreciosDescuentos from "./Components/PreciosDescuentos";

function Agregar() {
    const {userData}  = useAuth()
    const {token_user} = userData
    const [loading,setLoading] = useState(false)
    const {iError,iForm} = useInitialState()
    const {dialogs,setDialogs,getLista} = useDescuentos()
    const [selectCliente,setSelectCliente] = useState(null)
    const [expand,setExpand] = useState(false)
    const [selectProduct,setSelectProduct] = useState(null)
    const [errors,setErrors] = useState(iError)
    const [form,setForm] = useState(iForm)
    const [listaDescuentos,setListaDescuentos] = useState([])
    const close = ()=>{
        setDialogs({...dialogs,add:false})
        reset()
        if(listaDescuentos.length>0){
            getLista()
        }
    }
    const reset = ()=>{
        setSelectProduct(null)
        setSelectCliente(null)
        setForm(iForm)
        setErrors(iError)
    }

    const enviar = async()=>{
        setLoading(true)
        let descuento = {
            cliente_id_descuento:selectCliente.id_cliente,
            producto_id_descuento: selectProduct.id_producto,
            porcentaje_descuento: form.porcentaje
        }
        let ins = await APICALLER.insert({table:'descuentos',data:descuento,token:token_user})
        if(ins.response){
            let nuevo_listado = [...listaDescuentos]
            let nuevo_descuento = {
                codigo_producto : selectProduct.codigo_producto,
                nombre_producto: selectProduct.nombre_producto,
                precio_descuento: form.precio,
                porcentaje_descuento: form.porcentaje,
                id_descuento: ins.last_id
            }
            nuevo_listado.push(nuevo_descuento)
            setListaDescuentos(nuevo_listado)
            document.getElementById('__inputCodigo').value = ''
            document.getElementById('__inputCodigo').focus()
            setForm(iForm)
            setSelectProduct(null)
        }else{console.log(ins);}
        setLoading(false)
    }
    const eliminar = async(id)=>{
        setLoading(true)
        let index = listaDescuentos.findIndex(elem=> elem.id_descuento === id)

        let res = await APICALLER.delete({table:'descuentos',id:id,token:token_user})
        if(res.response){
            let p = [...listaDescuentos]
            p.splice(index, 1);
            setListaDescuentos(p)
        }
        setLoading(false)
    }

    return ( <Dialog onClose={close} open={dialogs.add} maxWidth='md' fullWidth={!expand} fullScreen={expand} >
        <DialogTitle><IconButton onClick={close}><Icon>close</Icon></IconButton> Agregar descuento por cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BuscarCliente setSelectCliente={setSelectCliente} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    {errors.active &&
                    <Alert icon={false} severity="error">
                        <p>{errors.msg}</p>
                    </Alert>
                    }
                    {selectProduct && <p>COD: {selectProduct.codigo_producto}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        selectProduct && <p>Producto: {selectProduct.nombre_producto}</p>
                    }
                </Grid>
                <Grid item xs={12} sm={3}>
                    {
                        selectProduct && <p>PRECIO: {funciones.numberFormat(selectProduct.precio_producto)}</p>
                    }
                </Grid>
                {
                    selectCliente && 
                    <>
                        <Grid item xs={12} sm={4} >
                            <ConsultarProducto  selectCliente={selectCliente}  setProduct={setSelectProduct} setErr={setErrors} />
                        </Grid>
                        <Grid item xs={12} sm={8} >
                            <PreciosDescuentos form={form} setForm={setForm} selectProduct={selectProduct} />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Stack direction='row' spacing={1}>
                                <Button disabled={selectProduct===null} onClick={enviar} variant="outlined">AGREGAR</Button>
                                <Button onClick={reset} variant="outlined">LIMPIAR</Button>
                            </Stack>
                            
                        </Grid>
                    </>
                }
                <Grid item xs={12}>
                    {
                        loading && <LinearProgress />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        listaDescuentos.length>0 &&
                        <ListadoAgregado eliminar={eliminar} productos={listaDescuentos} />
                    }
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" startIcon={<Icon>{expand ? `close_fullscreen`: `open_in_full`}</Icon>} onClick={()=>{setExpand(!expand)}}> {expand ? `MINIZAR` : `EXPANDIR`} </Button>
            <Button variant="contained" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Agregar;