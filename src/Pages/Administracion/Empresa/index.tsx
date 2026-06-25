import { Alert, Box, Button, Grid, LinearProgress, Snackbar, TextField, Typography } from "@mui/material";
import { useAuth } from "../../../Providers/AuthProvider";
import {  useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";

function Empresa() {

    const {dataEmpresa: d,userData,setearEmpresa} = useAuth()
    const [loading,setLoading] = useState(false)
    const [snack,setSnack] = useState({active:false,message:''})

    const [form,setForm] = useState({
      categoria_empresa:'',nombre_empresa:'',propietario_empresa:'',ruc_empresa:'',direccion_empresa:'',mensaje_recibo_empresa:'',licencia:''
    })
    const closeSnack = ()=>{setSnack({...snack,active:false})}

    const enviar = async()=>{
        setLoading(true)
        let data = {
            nombre_empresa:form.nombre_empresa,
            propietario_empresa:form.propietario_empresa,
            ruc_empresa:form.ruc_empresa,
            categoria_empresa:form.categoria_empresa,
            mensaje_recibo_empresa:form.mensaje_recibo_empresa
        }
        let res = await APICALLER.update({table:'empresas',token:userData.token_user,id:'1',data})
        if(res.response){
            setSnack({active:true,message:'Actualizado'})
            setearEmpresa({empresa:form,mode:true})
        }
        setLoading(false)
    }

    const change = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }

    useEffect(()=>{
        setForm(d)
    },[d])



    return (
      <Box padding={2}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snack.active}
          autoHideDuration={6000}
          onClose={closeSnack}
        >
          <Alert onClose={closeSnack} severity="success" sx={{ width: "100%" }}>
            {snack.message}
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Datos de empresa</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline">EMPRESA</Typography>
          </Grid>
          <Grid item xs={12}>
            <Alert icon={false}>
              {" "}
              <Typography variant="body1">
                LICENCIA VALIDA HASTA: {form.licencia}
              </Typography>{" "}
            </Alert>
          </Grid>
          <Grid item xs={12}>
            {loading && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <Box boxShadow={2} padding={2} borderRadius={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    autoComplete="off"
                    label="Nombre de empresa"
                    autoFocus
                    fullWidth
                    onChange={change}
                    name="nombre_empresa"
                    value={form?.nombre_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Nombre de propietario"
                    fullWidth
                    onChange={change}
                    name="propietario_empresa"
                    value={form?.propietario_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="RUC"
                    fullWidth
                    onChange={change}
                    name="ruc_empresa"
                    value={form?.ruc_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Categoria"
                    fullWidth
                    onChange={change}
                    name="categoria_empresa"
                    value={form?.categoria_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Direccion"
                    fullWidth
                    onChange={change}
                    name="direccion_empresa"
                    value={form?.direccion_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Mensaje"
                    fullWidth
                    onChange={change}
                    name="mensaje_recibo_empresa"
                    value={form?.mensaje_recibo_empresa}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant="contained" onClick={enviar} size="large">
                    GUARDAR
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
}

export default Empresa;