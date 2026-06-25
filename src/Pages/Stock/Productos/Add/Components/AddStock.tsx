import { SelectCilindrico, SelectEsferico } from "./SelectGraduaciones";
import {  Button, Grid,  TextField } from "@mui/material";
import NumberFormatCustom from '../../../../../Components/TextFields/NumberFormatCustom'
import SelectDeposito from "./SelectDeposito";

function AddStock({form,onChange,listas,addStock,error}) {
    return ( <Grid container spacing={2} alignItems="center" >
    <Grid item xs={12} sm={6} md={6} >
      <SelectDeposito name="deposito_id" error={error.code===4}  value={form.deposito_id} onChange={onChange} opciones={listas.depositos} />
    </Grid>
    <Grid item xs={12} sm={6} md={6} >
      <TextField autoComplete="off" InputProps={{inputComponent: NumberFormatCustom}} value={form.stock_producto_deposito} onChange={onChange} label="Cantidad" name="stock_producto_deposito" id="stock_producto_deposito" fullWidth />
    </Grid>
    <Grid item xs={12} sm={6} md={6} >
      <SelectEsferico onChange={onChange} error={error.code===2}  value={form.graduacion_esferico} />
    </Grid>

    <Grid item xs={12} sm={6} md={6} >
      <SelectCilindrico onChange={onChange} error={error.code===3}  value={form.graduacion_cilindrico} />
    </Grid>

    <Grid item xs={12} sm={6} md={6} >
      <TextField autoComplete="off" error={error.code===1} InputProps={{inputComponent: NumberFormatCustom}} value={form.eje} onChange={onChange} label="Eje" name="eje" id="eje" fullWidth />
    </Grid>
    
    
    <Grid item xs={12} sm={6} md={6} >
      <Button onClick={addStock} fullWidth variant="outlined">Agregar</Button>
    </Grid>
  </Grid> );
}

export default AddStock;