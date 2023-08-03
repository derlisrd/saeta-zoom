import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useDeposito } from "../DepositoProvider";


function Add() {
    const { dialogs, llaveDialog,getLista} = useDeposito();
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
        if(datas.nombre_deposito === ''){
            focusTo('nombre_deposito')
            setError({active:true,message:'Ingrese el nombre del depósito',code:1})
            return false;
        }
        setLoading(true)
        setError(initialError)

        let res = await insert({table:'depositos',data:datas})
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
                    <TextField id="nombre_deposito" autoFocus error={error.code===1} name="nombre_deposito" required autoComplete="off" fullWidth label="Nombre de depósito" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;
