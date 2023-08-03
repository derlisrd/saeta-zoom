import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useCategoria } from "../CategoriaProvider";
import Tipo from "./Tipo";

function Add() {
    const { dialogs, llaveDialog,getLista} = useCategoria();
    const [loading,setLoading] = useState(false)
    const {focusTo} = useFocus()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {insert} = useQuerys()    

    const close = () => {setError(initialError); llaveDialog("add", false)}


    const enviar = async(e)=>{ 
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        if(datas.nombre_categoria === ''){
            focusTo('nombre_categoria')
            setError({active:true,message:'Ingrese el nombre de categoría',code:1})
            return false;
        }
        setLoading(true)
        setError(initialError)

        let res = await insert({table:'categorias',data:datas})
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
                <Grid item xs={12} >
                    <TextField id="nombre_categoria" autoFocus error={error.code===1} name="nombre_categoria" required autoComplete="off" fullWidth label="Nombre de depósito" />
                </Grid>
                <Grid item xs={12}>
                    <Tipo name="tipo_categoria" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;
