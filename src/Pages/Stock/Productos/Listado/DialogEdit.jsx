import { useEffect, useState } from "react";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import { useListadoProducto } from "./ListadoProductoProvider";
import { Button, DialogActions, DialogContent, Grid, LinearProgress, TextField } from "@mui/material";
import SelectCategory from "../Add/Components/SelectCategory";
import InputPrecio from "../Add/Components/InputPrecio";
import SelectIvaProducto from "../Add/Components/SelectIvaProducto";
import { useEnfocar } from "../../../../Hooks/useEnfocar";
import { APICALLER } from "../../../../Services/api";
import Rangos from "../Add/Rangos";

function DialogEdit() {
    const {dialogs,llaveDialog,formSelect,listas,token_user,getLista} = useListadoProducto()
    const close = ()=> llaveDialog('edit',false)
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,code:0,message:''}
    const [error,setError] = useState(initialError)
    const [formEdit, setFormEdit] = useState({
      codigo_producto: "",
      costo_producto: "",
      id_categoria_producto: "",
      id_producto: "",
      max_cilindrico:'',
      min_cilindrico:'',
      min_esferico:'',
      max_esferico:'',
      iva_producto: "",
      nombre_producto: "",
      precio_producto: "",
      preciom_producto: "",
      base_min:"",
      base_max:"",
      adicion_min:"",
      adicion_max:""
    });
    const enviar = async()=>{
        let datas = {...formEdit}
        if(datas.codigo_producto === ''){
            setError({active:true,code:5,message:'Codigo de producto'})
            useEnfocar('codigo_producto')
            return false
          }
          if(datas.nombre_producto === ''){
            setError({active:true,code:6,message:'Nombre de producto'})
            useEnfocar('nombre_producto')
            return false
          }
          if(datas.costo_producto === ''){
            setError({active:true,code:12,message:'Costo'})
            useEnfocar('costo_producto')
            return false
          }
          if(datas.precio_producto === ''){
            setError({active:true,code:7,message:'Precio'})
            useEnfocar('precio_producto')
            return false
          }
          if(datas.preciom_producto === ''){
            setError({active:true,code:8,message:'Precio mayorista'})
            useEnfocar('preciom_producto')
            return false
          }
          if(datas.id_categoria_producto === ''){
            setError({active:true,code:10,message:'Categoria'})
            return false
          }
          if(datas.iva_producto === ''){
            setError({active:true,code:11,message:'IVA'})
            return false
          }
          setLoading(true)
          let id = formSelect.id_producto;
          
          let check = await APICALLER.get({table:'productos',where:`codigo_producto,=,'${datas.codigo_producto}',and,id_producto,<>,${id}`})
          if(check.response && check.found>0){
              setError({active:true,message:'Ya existe código.',code:5})
              useEnfocar('codigo_producto')
              setLoading(false)
              return false;
          }
          setError(initialError)
          delete datas.nombre_categoria;
          let res = await APICALLER.update({table:'productos',data:datas,id,token:token_user})
          if(res.response){
              close()
              getLista()
          }else{ console.log(res); }
          
          setLoading(false)
    }

    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }

    useEffect(()=>{
        if(dialogs.edit){
            setFormEdit(formSelect)
        }
        //console.log('cambia form select');
    },[formSelect,dialogs])


    return (<DialogZoom fullWidth open={dialogs.edit} onClose={close} title='Editar' >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}> {loading && <LinearProgress />} </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth autoComplete="off" id="codigo_producto" helperText={error.code===5 && error.message} error={error.code===5} autoFocus onChange={change} name="codigo_producto" value={formEdit.codigo_producto} label="Código" />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField fullWidth autoComplete="off" id="nombre_producto" error={error.code===6} onChange={change} name="nombre_producto" value={formEdit.nombre_producto} label="Descripción" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputPrecio onChange={change} id="costo_producto" error={error.code===12} name="costo_producto" value={formEdit.costo_producto} label="Costo" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputPrecio onChange={change} id="precio_producto" error={error.code===7} name="precio_producto" value={formEdit.precio_producto} label="Precio" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputPrecio onChange={change} id="preciom_producto" error={error.code===8} name="preciom_producto" value={formEdit.preciom_producto} label="Precio Mayorista" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SelectCategory onChange={change} id="id_categoria_producto" error={error.code===10} name="id_categoria_producto" value={formEdit.id_categoria_producto} opciones={listas.categorias} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SelectIvaProducto name="iva_producto" error={error.code===11} onChange={change} value={formEdit.iva_producto} />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12}>
                        <Rangos form={formEdit} onChange={change} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cerrar</Button>
                <Button variant="contained" onClick={enviar}>Actualizar</Button>
            </DialogActions>
    </DialogZoom>  );
}

export default DialogEdit;