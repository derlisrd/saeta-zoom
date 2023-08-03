import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useProveedor } from "../ProveedorProvider";

function Add() {
    const { dialogs, llaveDialog,getLista} = useProveedor();
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
        if(datas.ruc_proveedor === ''){
            focusTo('ruc_proveedor')
            return false;
        }
        if(datas.nombre_proveedor === ''){
            return false;
        }
        setLoading(true)
        let check = await get({table:'proveedors',where:`ruc_proveedor,=,'${datas.ruc_proveedor}'`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un proveedor con ese doc.',code:1})
            setLoading(false)
            focusTo('ruc_proveedor')
            return false;
        }
        setError(initialError)

        let res = await insert({table:'proveedors',data:datas})
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
                    <TextField id="ruc_proveedor" error={error.code===1} autoFocus name="ruc_proveedor" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_proveedor" required autoComplete="off" label="Nombre de proveedor" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_proveedor" label="teléfono" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;
