import { Button, Grid, LinearProgress, TextField } from "@mui/material";
import { useInventario } from "./InventarioProvider";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import { useState } from "react";
import SelectDeposito from "../Productos/Add/Components/SelectDeposito";
import { SelectCilindrico, SelectEsferico } from "../Productos/Add/Components/SelectGraduaciones";
import { APICALLER } from "../../../Services/api";

function AddStock() {

    const initialError = {active:false,code:0,message:''}
    const [error,setError] = useState(initialError)
    const [loading,setLoading] = useState(false)
    const {depositos,setStock,stock,token_user,formInfo} = useInventario()
    const initialForm = {
        deposito_id:'',
        graduacion_cilindrico:'',
        graduacion_esferico:'',
        eje:'0',
        stock_producto_deposito:'0',
    }
    const [form,setForm] = useState(initialForm)
    const onChange =e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }

    const addStock = async()=>{
        
        let eje = parseInt(form.eje), cil = form.graduacion_cilindrico, esf = form.graduacion_esferico, dep = form.deposito_id 
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
        let new_stock = [...stock]
        let insertar = {
          deposito_id: form.deposito_id,
          stock_producto_deposito: form.stock_producto_deposito,
          graduacion_cilindrico:form.graduacion_cilindrico,
          graduacion_esferico:form.graduacion_esferico,
          eje:form.eje,
          producto_id:formInfo.id_producto
        }
        setLoading(true)
        let res = await APICALLER.insert({table:'productos_depositos',token:token_user,data:insertar})
        if(res.response){
            let index = depositos.findIndex(e=> e.id_deposito === form.deposito_id)
            let nuevostock = {...insertar,nombre_deposito: depositos[index].nombre_deposito,id_productos_deposito: res.last_id}
            new_stock.push(nuevostock)
            setStock(new_stock)
            setForm(initialForm)
        }else{
            console.log(res);
        }
        setLoading(false)
      }
      console.log(stock);

    return (<Grid container spacing={2} alignItems="center" >
        <Grid item xs={12}>
            {loading && <LinearProgress />}
        </Grid>
    <Grid item xs={12} sm={6} md={2} >
      <SelectDeposito name="deposito_id" error={error.code===4}  value={form.deposito_id} onChange={onChange} opciones={depositos} />
    </Grid>
    <Grid item xs={12} sm={6} md={2} >
      <TextField autoComplete="off" InputProps={{inputComponent: NumberFormatCustom}} value={form.stock_producto_deposito} onChange={onChange} label="Cantidad" name="stock_producto_deposito" id="stock_producto_deposito" fullWidth />
    </Grid>
    <Grid item xs={12} sm={6} md={2} >
      <SelectEsferico onChange={onChange} error={error.code===2}  value={form.graduacion_esferico} />
    </Grid>

    <Grid item xs={12} sm={6} md={2} >
      <SelectCilindrico onChange={onChange} error={error.code===3}  value={form.graduacion_cilindrico} />
    </Grid>

    <Grid item xs={12} sm={6} md={2} >
      <TextField autoComplete="off" error={error.code===1} InputProps={{inputComponent: NumberFormatCustom}} value={form.eje} onChange={onChange} label="Eje" name="eje" id="eje" fullWidth />
    </Grid>
    
    
    <Grid item xs={12} sm={6} md={2} >
      <Button onClick={addStock} fullWidth variant="outlined">Agregar</Button>
    </Grid>
  </Grid> );
}

export default AddStock;