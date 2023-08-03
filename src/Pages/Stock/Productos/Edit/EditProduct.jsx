import { useParams } from "react-router-dom";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useState,useEffect,useCallback } from "react";
import { APICALLER } from "../../../../Services/api";
import ButtonTip from "../../../../Components/Botones/ButtonTip";

function EditProduct() {

    const {navigate} = useGotoNavigate()
    const {id} = useParams()
    const close = ()=>{navigate('/productos')}
    const [loading,setLoading] = useState(true)
    const [categorias,setCategorias] = useState([])
    const [error,setError] = useState({code:0,message:'',active:false})
    const [form,setForm] = useState({codigo_producto:'',nombre_producto:'',id_categoria_producto:'',iva_producto:'',tipo_producto:''})
    const changeForm = e=>{ 
        const {value,name} = e.target
        setForm({...form, [name]:value})
    }


    const getLista = useCallback(async()=>{
        setLoading(true)
          let [cat,pro] = await Promise.all([APICALLER.get({
            table: "categorias",
            fields: "id_categoria,nombre_categoria,tipo_categoria"
          }),
          APICALLER.get({
            table: "productos",
            where:`id_producto,=,${id}`
          })])
          if(cat.response && pro.response){
            setCategorias(cat.results); setForm(pro.first)
          }else{ console.log(cat,dep);}
        setLoading(false)
      },[])
      
      useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) {getLista();}
      return () => {isActive = false; ca.abort();};
      }, [getLista]);



    return (<Dialog open={true} fullScreen onClose={close}>
        <DialogTitle> <ButtonTip title="Cerrar" onClick={close} icon="ic:round-close" />  Editar</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>{loading && <LinearProgress />}</Grid>
                <Grid item xs={12} md={4}>
                  <TextField autoComplete="off" disabled={loading} value={form.codigo_producto} onChange={changeForm}  id="codigo_producto" helperText={error.code===5 && error.message} error={error.code===5} name="codigo_producto" autoFocus label="Código" fullWidth />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField autoComplete="off" disabled={loading} value={form.nombre_producto} onChange={changeForm}  id="nombre_producto" error={error.code===6} label="Nombre de producto"  name="nombre_producto" fullWidth />
                </Grid>
              </Grid>
        </DialogContent>
        <DialogActions>
            <Button size="large" onClick={close}>Guardar</Button>
            <Button size="large" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>);
}

export default EditProduct;