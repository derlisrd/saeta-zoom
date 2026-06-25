import { Box, Breadcrumbs, Button, Grid, LinearProgress, Snackbar, TextField, Typography,Alert } from "@mui/material";
import { useAuth } from "../../../Providers/AuthProvider";
import { APICALLER } from "../../../Services/api";
import { useState } from "react";
import useFocus from "../../../Hooks/useFocus";

function Perfil() {

    const {userData} = useAuth()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const [loading,setLoading] = useState(false)
    const [toast,setToast] = useState({
        active:false,
        message:''
    })
    const close = ()=>setToast({active:false,message:''})
    const {focusTo} = useFocus()

    const enviar = async(e)=>{
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        
        let datos_nuevos = {password_user: datas.new_password,id_user: userData.id_user}
        //let res = await APICALLER.updatePassword(datos_nuevos);
        if(datas.old_password === ''){
            focusTo('old_password')
            setError({active:true,message:'Contraseña vacía',code:2})
            return false;
        }
        if(datas.new_password==='' || datas.confirm_password===''){
            focusTo('new_password')
            setError({active:true,message:'Contraseña vacía',code:3})
            return false;
        }
        if(datas.new_password !== datas.confirm_password){
            focusTo('new_password')
            setError({active:true,message:'Contraseña no coinciden',code:3})
            return false;
        }
        setError(initialError)
        setLoading(true)
        let consulta = await APICALLER.confirmPassword({username_user: userData.username_user,password_user:datas.old_password});
        if(consulta.response){
            let res = await APICALLER.updatePassword(datos_nuevos);
            if(res.response){
              setToast({active:true,message:'Contraseña cambiada con éxito.'})
              document.getElementById('old_password').value = ''
              document.getElementById('new_password').value = ''
              document.getElementById('confirm_password').value = ''
              focusTo('old_password')
            }
        }else{
            focusTo('old_password')
            setError({active:true,message:'Contraseña incorrecta',code:2})
            console.log(consulta);
        }
        setLoading(false)
    }

    return (<Box p={2}>
        <Snackbar anchorOrigin={{ vertical:'top',horizontal:'center' }} open={toast.active} autoHideDuration={6000} onClose={close}>
        <Alert onClose={close} severity="success" sx={{ width: '100%' }}>
            {toast.message}
        </Alert>
        </Snackbar>
        <Grid container spacing={2}>
            <Grid xs={12} item>
                <Typography variant="h4">Perfil</Typography>
            </Grid> 
            <Grid xs={12} item>
                <Breadcrumbs separator="›">
                    <Typography color="text.primary">Usuario</Typography>
                    <Typography color="text.primary">Perfil</Typography>
                    <Typography color="text.primary">{userData.nombre_user}</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid xs={12} item>
                {loading && <LinearProgress />}
            </Grid>
            <Grid item xs={12} md={4}>
                <form onSubmit={enviar}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="button">Cambiar contraseña</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="old_password" id="old_password" type="password" error={error.code===2} helperText={error.code===2 && error.message} label="Contraseña actual" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="new_password" id="new_password" type="password" error={error.code===3} helperText={error.code===3 && error.message} label="Contraseña nueva" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="confirm_password" id="confirm_password" type="password" error={error.code===3} helperText={error.code===3 && error.message} label="Confirmar contraseña nueva" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Actualizar</Button>
                    </Grid>
                </Grid>
                </form>
            </Grid>
        </Grid>
    </Box> );
}

export default Perfil;