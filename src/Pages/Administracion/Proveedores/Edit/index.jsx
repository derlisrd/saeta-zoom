import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useAuth } from "../../../../Providers/AuthProvider";
import { APICALLER } from "../../../../Services/api";
import { useProveedor } from "../ProveedorProvider";


function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useProveedor();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {get} = useQuerys()
    const {userData} = useAuth()
    const {focusTo} = useFocus()    
    const [formEdit,setFormEdit] = useState({id_proveedor:"",ruc_proveedor:"",telefono_proveedor:"",nombre_proveedor:""})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.ruc_proveedor === ''){
            focusTo('ruc_cliente')
            return false;
        }
        if(datas.nombre_proveedor === ''){
            return false;
        }
        setLoading(true)
        let id = formSelect.id_proveedor;
        let check = await get({table:'proveedors',where:`ruc_proveedor,=,'${datas.ruc_proveedor}',and,id_proveedor,<>,${id}`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un proveedor con ese doc.',code:1})
            focusTo('ruc_proveedor')
            setLoading(false)
            return false;
        }
        setError(initialError)
        let res = await APICALLER.update({table:'proveedors',data:datas,id,token:userData.token_user})
        if(res.response){
            close()
            getLista()
        }else{ }
        
        setLoading(false)
    }

    useEffect(()=>{
        setFormEdit(formSelect)
        //console.log('cambia form select');
    },[formSelect])
  

  return (
    <DialogZoom open={dialogs.edit} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <input type="hidden" name="id" value={formSelect.id_proveedor} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="ruc_proveedor" error={error.code===1} autoFocus name="ruc_proveedor" onChange={change} value={formEdit.ruc_proveedor} required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_proveedor" onChange={change} value={formEdit.nombre_proveedor} required autoComplete="off" label="Nombre de proveedor" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_proveedor" onChange={change} value={formEdit.telefono_proveedor} label="teléfono" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;
