import { Box, Grid, LinearProgress, TextField,Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import InputPrecio from "./Components/InputPrecio";
import SelectCategory from "./Components/SelectCategory";
import Tipo from "./Components/Tipo";
import { useEffect, useState } from "react";
import Stock from "./Components/Stock";
import AddStock from "./Components/AddStock";
import { useAdd } from "./AddProvider";
import ButtonTip from "../../../../Components/Botones/ButtonTip";
import SelectIvaProducto from "./Components/SelectIvaProducto";
import Rangos from "./Rangos";


function Add() {

  const {dialogs,enviar,isLoading,isLoadingSend,error,listas,setStock,stock,setDialogs,setError,initialError} = useAdd()
  const initialFormStock = {
    id_categoria_producto:'',
    deposito_id:'',
    graduacion_esferico:'',
    graduacion_cilindrico:'',
    stock_producto_deposito:0,
    eje:0
  }
  const [formStock,setFormStock] = useState(initialFormStock)
  const initialForm = {
    codigo_producto:'',
    min_esferico:'0',
    max_esferico:'0',
    min_cilindrico:'0',
    max_cilindrico:'0',
    costo_producto:'',
    nombre_producto:'',
    preciom_producto:'',
    precio_producto:'',
    tipo_producto:'1',
    id_categoria_producto:'',
    base_min:'0',
    base_max:'0',
    adicion_min:'0',
    adicion_max:'0',
    iva_producto:"10"
  }
  const [form,setForm] = useState(initialForm)
  
  const changeForm = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }
  const change = e=>{
    const {value,name} = e.target
    setFormStock({...formStock,[name]:value})
  }

  const enviar_form = ()=>enviar(form) 
  
  const addStock = ()=>{
    let new_stock = [...stock]
    let eje = parseInt(formStock.eje), cil = formStock.graduacion_cilindrico, esf = formStock.graduacion_esferico, dep = formStock.deposito_id 
    if( eje<0 || eje>180 ){
      setError({code:1,active:true,message:'Eje incorrecto'})
      return false;
    }
    if(esf===''){
      setError({code:2,active:true,message:'Esferico'})
      return false;
    }
    if(cil===''){
      setError({code:3,active:true,message:'Cilindrico'})
      return false;
    }
    if(dep===''){
      setError({code:4,active:true,message:'Deposito'})
      return false;
    }
    setError(initialError)
    let insertar = {
      deposito_id: formStock.deposito_id,
      stock_producto_deposito: formStock.stock_producto_deposito,
      graduacion_cilindrico:formStock.graduacion_cilindrico,
      graduacion_esferico:formStock.graduacion_esferico,
      eje:formStock.eje
    }
    new_stock.push(insertar)
    setStock(new_stock)
    setFormStock(initialFormStock)
  }

  useEffect(()=>{
    setForm(initialForm)
  },[dialogs])

  const close = ()=> { setError(initialError); setForm(initialForm); setStock([]); setDialogs({...dialogs,main:false}) }

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}}>
    <DialogTitle><ButtonTip title="Cerrar" onClick={close} icon="ic:round-close" />  Agregar nuevo producto</DialogTitle>
    <DialogContent>
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}> {(isLoading || isLoadingSend) && <LinearProgress />} </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField autoComplete="off" value={form.codigo_producto} onChange={changeForm}  id="codigo_producto" helperText={error.code===5 && error.message} error={error.code===5} name="codigo_producto" autoFocus label="Código" fullWidth />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField autoComplete="off" value={form.nombre_producto} onChange={changeForm}  id="nombre_producto" error={error.code===6} label="Nombre de producto"  name="nombre_producto" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Tipo name='tipo_producto' error={error} value={form.tipo_producto} onChange={changeForm}  />
                </Grid>
                <Grid item xs={12}>
                  {
                    form.tipo_producto === '1' &&
                    <Rangos form={form} onChange={changeForm} />
                  }
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
          {
            form.tipo_producto === '1' &&
            <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <AddStock error={error} onChange={change} form={formStock} listas={listas} addStock={addStock} />
              </Grid>
              <Grid item sm={12} md={6}>
                <Stock stock={stock}  setStock={setStock} />
              </Grid>
            </Grid>
            </Box> 
          }
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} md={3}>
        <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <InputPrecio fullWidth error={error.code===12} value={form.costo_producto} onChange={changeForm} label="Costo" id="costo_producto"  name="costo_producto"   />
            </Grid>
            <Grid item xs={12}>
              <InputPrecio fullWidth error={error.code===7} value={form.precio_producto} onChange={changeForm} label="Precio" id="precio_producto"  name="precio_producto"   />
            </Grid>
            <Grid item xs={12}>
              <InputPrecio fullWidth error={error.code===8} value={form.preciom_producto} onChange={changeForm} label="Precio Mayorista" id="preciom_producto"  name="preciom_producto"   />
            </Grid>
            <Grid item xs={12}>
              <SelectCategory error={error.code===10} onChange={changeForm} value={form.id_categoria_producto} opciones={listas.categorias} name="id_categoria_producto" />
            </Grid>
            <Grid item xs={12}>
              <SelectIvaProducto error={error.code===11} onChange={changeForm} value={form.iva_producto} name="iva_producto" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
    </DialogContent>
    <DialogActions>
      <Button size="large" onClick={close} variant="outlined">Cerrar</Button>
      <Button size="large" onClick={enviar_form} variant="contained">Registrar</Button>
    </DialogActions>
  </Dialog> );
}

export default Add;