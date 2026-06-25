import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useClientes } from "../ClientesProvider";
import TipoPago from "./TipoPago";

function Add() {
    const { dialogs, llaveDialog,getLista} = useClientes();
    const [loading,setLoading] = useState(false)
    const {focusTo} = useFocus()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {insert,get} = useQuerys()    

    const close = () => {setError(initialError); llaveDialog("add", false)}


    const enviar = async(e)=>{ 
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        if(datas.ruc_cliente === ''){
            focusTo('ruc_cliente')
            return false;
        }
        if(datas.nombre_cliente === ''){
            focusTo('nombre_cliente')
            return false;
        }
        setLoading(true)
        /* let check = await get({table:'clientes',where:`ruc_cliente,=,'${datas.ruc_cliente}'`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un cliente con ese doc.',code:1})
            setLoading(false)
            focusTo('ruc_cliente')
            return false;
        } */
        setError(initialError)

        let res = await insert({table:'clientes',data:datas})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }
  

  return (
    <DialogZoom open={dialogs.add} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="ruc_cliente" error={error.code===1} autoFocus name="ruc_cliente" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="nombre_cliente" name="nombre_cliente" required autoComplete="off" label="Nombre completo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="fantasia_cliente" required autoComplete="off" label="Nombre Fantasia" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="direccion_cliente" autoComplete="off" label="Dirección" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_cliente" label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="email_cliente" label="Email" />
                </Grid>
                <Grid item xs={12}>
                    <TipoPago name="tipo_pago" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;
