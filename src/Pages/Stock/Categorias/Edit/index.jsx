import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import { useAuth } from "../../../../Providers/AuthProvider";
import { APICALLER } from "../../../../Services/api";
import { useCategoria } from "../CategoriaProvider";
import Tipo from "./Tipo";



function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useCategoria();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {userData} = useAuth()
    const {focusTo} = useFocus()    
    const [formEdit,setFormEdit] = useState({id_categoria:'',
    nombre_categoria:'',
    tipo_categoria:''})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.nombre_categoria === ''){
            focusTo('nombre_categoria')
            setError({active:true,code:1,message:'Ingrese el nombre de categoría'})
            return false;
        }
        
        setLoading(true)
        let id = formSelect.id_categoria;
        setError(initialError)
        let res = await APICALLER.update({table:'categorias',data:datas,id,token:userData.token_user})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res); }
        
        setLoading(false)
    }

    useEffect(()=>{
        setFormEdit(formSelect)
    },[formSelect])
  

  return (
    <DialogZoom open={dialogs.edit} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <input type="hidden" name="id" value={formSelect.id_categoria} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField id="nombre_categoria" error={error.code===1} autoFocus name="nombre_categoria" onChange={change} value={formEdit.nombre_categoria} required autoComplete="off" fullWidth label="Nombre de categoría" />
                </Grid>
                <Grid item xs={12}>
                    <Tipo name="tipo_categoria" value={formEdit.tipo_categoria} onChange={change} />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;
