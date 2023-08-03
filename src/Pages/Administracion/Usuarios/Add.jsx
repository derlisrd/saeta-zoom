import { Alert, Button, DialogActions, DialogContent, Grid, LinearProgress, TextField } from "@mui/material";
import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import { useUsuarios } from "./UsuariosProvider";
import { useState } from "react";
import useFocus from "../../../Hooks/useFocus";
import SelectRol from "./SelectRol";
import { APICALLER } from "../../../Services/api";

function Add() {
    const {dialogs,llaveDialog,token_user,getLista} = useUsuarios()
    const [loading,setLoading] = useState(false)
    const {focusTo} = useFocus()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const close = ()=> llaveDialog('add',false)

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

        if(datas.password_user === '' || datas.password_confirm === ''){
            setError({active:true,message:'Contraseña',code:3})
            return false;
        }
        if(datas.password_user !== datas.password_confirm){
            setError({active:true,message:'Contraseña no coinciden',code:3})
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
            APICALLER.get({table:'users',where:`username_user,=,'${datas.username_user}'`,token:token_user}),
            APICALLER.get({table:'users',where:`email_user,=,'${datas.email_user}'`,token:token_user})
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
        delete datas.password_confirm;
        let res = await APICALLER.register({datos:datas})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }


    return ( <DialogZoom open={dialogs.add} onClose={close} fullWidth title='Agregar' >
        <form onSubmit={enviar}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField autoFocus id="nombre_user" error={error.code===1}  name="nombre_user" required autoComplete="off" fullWidth label="Nombre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="username_user" error={error.code===2} name="username_user" required autoComplete="off" label="Username" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="password_user" error={error.code===3} type="password" required name="password_user" label="Contraseña" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="password_confirm" error={error.code===3} type="password" required name="password_confirm" label="Repetir contraseña" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth id="email_user" autoComplete="off" required type="email" error={error.code===4} name="email_user" label="Email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectRol error={error} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button variant="contained" type="submit">Registrar</Button>
        </DialogActions>
        </form>
    </DialogZoom> );
}

export default Add;