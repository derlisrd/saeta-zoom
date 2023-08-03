import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import { useAuth } from "../../../../Providers/AuthProvider";
import { APICALLER } from "../../../../Services/api";
import { useDeposito } from "../DepositoProvider";



function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useDeposito();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {userData} = useAuth()
    const {focusTo} = useFocus()    
    const [formEdit,setFormEdit] = useState({id_deposito:'',nombre_deposito:''})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.nombre_deposito === ''){
            focusTo('nombre_deposito')
            setError({active:true,code:1,message:'Ingrese el nombre del depósito'})
            return false;
        }
        
        setLoading(true)
        let id = formSelect.id_deposito;
        setError(initialError)
        let res = await APICALLER.update({table:'depositos',data:datas,id,token:userData.token_user})
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
        <input type="hidden" name="id" value={formSelect.id_deposito} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField id="nombre_deposito" error={error.code===1} autoFocus name="nombre_deposito" onChange={change} value={formEdit.nombre_deposito} required autoComplete="off" fullWidth label="Nombre de depósito" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;
