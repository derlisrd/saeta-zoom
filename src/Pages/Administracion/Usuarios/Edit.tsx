import { useEffect, useState } from "react";
import { useUsuarios } from "./UsuariosProvider";
import useFocus from "../../../Hooks/useFocus";
import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import { Alert, Button, DialogActions, DialogContent, Grid, LinearProgress, TextField } from "@mui/material";
import SelectRol from "./SelectRol";
import { APICALLER } from "../../../Services/api";


function Edit() {

    const {dialogs,llaveDialog,formSelect,getLista,token_user} = useUsuarios()
    const initialFormEdit = {id_user:'',nombre_user:'',username_user:'',email_user:'',rol_user:''}
    const [formEdit,setFormEdit] = useState(initialFormEdit)
    const [loading,setLoading] = useState(false)
    const {focusTo} = useFocus()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const close = ()=> llaveDialog('edit',false)
    const handleChange = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        if(datas.nombre_user === ''){
            focusTo('nombre_user')
            return false;
        }
        if(datas.username_user === ''){
            focusTo('username_user')
            setError({active:true,message:'Login usuario',code:2})
            return false;
        }

        
        if(datas.email_user === ''){
            focusTo('email_user')
            setError({active:true,message:'E-mail',code:4})
            return false;
        }
        if(datas.rol_user === ''){
            focusTo('rol_user')
            setError({active:true,message:'ROL',code:5})
            return false;
        }

        setLoading(true)
        let [user,emailCheck] = await Promise.all([
            APICALLER.get({table:'users',where:`username_user,=,'${datas.username_user}',and,id_user,<>,${formEdit.id_user}`,token:token_user}),
            APICALLER.get({table:'users',where:`email_user,=,'${datas.email_user}',and,id_user,<>,${formEdit.id_user}`,token:token_user})
        ])

      
        if(user.response && user.found>0){
            setError({active:true,message:'Ya existe ese usuario',code:2})
            setLoading(false)
            focusTo('username_user')
            return false;
        }
        if(emailCheck.response && emailCheck.found>0){
            setError({active:true,message:'Ya existe ese email',code:4})
            setLoading(false)
            focusTo('email_user')
            return false;
        }
        setError(initialError)
        //console.log(datas);
         let res = await APICALLER.update({ table:'users',token: token_user,data: datas,id:formEdit.id_user});
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }


    useEffect(()=>{
        setFormEdit(formSelect)
        //console.log('cambia form select');
    },[formSelect])

    return (
    <DialogZoom open={dialogs.edit} onClose={close} fullWidth title='Editar' >
        <form onSubmit={enviar}>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField autoFocus id="nombre_user" value={formEdit.nombre_user} onChange={handleChange} error={error.code===1}  name="nombre_user" required autoComplete="off" fullWidth label="Nombre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="username_user" value={formEdit.username_user} onChange={handleChange} error={error.code===2} name="username_user" required autoComplete="off" label="Username" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="email_user" value={formEdit.email_user} onChange={handleChange} required type="email" error={error.code===4} name="email_user" autoComplete="off" label="Email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectRol error={error} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button variant="contained" type="submit">Actualizar</Button>
        </DialogActions>
        </form>
    </DialogZoom>);
}

export default Edit;<></>