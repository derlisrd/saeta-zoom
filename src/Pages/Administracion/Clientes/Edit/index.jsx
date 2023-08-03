import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useAuth } from "../../../../Providers/AuthProvider";
import { APICALLER } from "../../../../Services/api";
import { useClientes } from "../ClientesProvider";
import TipoPago from "./TipoPago";


function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useClientes();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {get} = useQuerys()
    const {userData} = useAuth()
    const {focusTo} = useFocus()    
    const [formEdit,setFormEdit] = useState({})

    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.ruc_cliente === ''){
            focusTo('ruc_cliente')
            return false;
        }
        if(datas.nombre_cliente === ''){
            return false;
        }
        setLoading(true)
        let id = formSelect.id_cliente;
        let check = await get({table:'clientes',where:`id_cliente,=,${id}`})
        if(check.response && check.found>1){
            console.log(check, id);
            setError({active:true,message:'Ya existe un cliente con ese doc.',code:1})
            focusTo('ruc_cliente')
            setLoading(false)
            return false;
        }
        setError(initialError)
        let res = await APICALLER.update({table:'clientes',data:datas,id,token:userData.token_user})
        if(res.response){
            close()
            getLista()
        }else{ }
        
        setLoading(false)
    }

    useEffect(()=>{
        if(dialogs.edit){
            setFormEdit(formSelect)
        }
    },[formSelect,dialogs])
  

  return (
    <DialogZoom open={dialogs.edit} title={`EDITAR - ${formSelect?.id_cliente}`} onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <input type="hidden" name="id" value={formSelect.id_cliente} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="ruc_cliente" error={error.code===1} autoFocus name="ruc_cliente" onChange={change} value={formEdit.ruc_cliente} required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_cliente" onChange={change} value={formEdit.nombre_cliente} required autoComplete="off" label="Nombre completo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="fantasia_cliente" onChange={change} value={formEdit.fantasia_cliente} autoComplete="off" label="Nombre fantasia" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="direccion_cliente" onChange={change} value={formEdit.direccion_cliente} label="Dirección" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_cliente" onChange={change} value={formEdit.telefono_cliente} label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="email_cliente" onChange={change} value={formEdit.email_cliente} label="Email" />
                </Grid>
                <Grid item xs={12}>
                    <TipoPago name='tipo_pago' onChange={change} value={formEdit.tipo_pago} />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;
