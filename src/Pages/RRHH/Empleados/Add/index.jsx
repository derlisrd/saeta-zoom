import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useEmpleados } from "../EmpleadosProvider";

function Add() {
    const { dialogs, llaveDialog,getLista} = useEmpleados();
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
        if(datas.doc_empleado === ''){
            focusTo('doc_empleado')
            return false;
        }
        if(datas.nombre_empleado === ''){
            return false;
        }
        setLoading(true)
        let check = await get({table:'empleados',where:`doc_empleado,=,'${datas.doc_empleado}'`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un empleado con ese doc.',code:1})
            setLoading(false)
            focusTo('doc_empleado')
            return false;
        }
        setError(initialError)

        let res = await insert({table:'empleados',data:datas})
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
                    <TextField id="doc_empleado" error={error.code===1} autoFocus name="doc_empleado" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_empleado" required autoComplete="off" label="Nombre y Apellido" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_empleado" required label="teléfono" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;
