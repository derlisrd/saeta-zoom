import { InputAdornment, Stack, TextField } from "@mui/material";
import NumberFormatCustom from "../../../../Components/TextFields/NumberFormatCustom";
import { useState } from "react";

function PreciosDescuentos({form,setForm,selectProduct}) {



    const change = e=>{
        const {value, name} = e.target
        let valor = parseFloat(value)

        let f = {...form}
        if(name==='precio'){
            f.porcentaje = (100 * (parseFloat(selectProduct.precio_producto) - valor) / parseFloat(selectProduct.precio_producto) )
            f.precio = valor
        }
        if(name==='porcentaje'){
            f.precio = parseFloat(selectProduct.precio_producto) - (parseFloat(selectProduct.precio_producto) * valor / 100)
            f.porcentaje = valor
        }
        setForm(f)
    }

    return (<Stack direction='row' spacing={1}>
        <TextField disabled={selectProduct===null}  label='Precio' name='precio' value={form.precio} onChange={change} 
            InputProps={{
                inputProps: { min: 0},
                inputComponent: NumberFormatCustom,
              }}
        />
        <TextField disabled={selectProduct===null} label='Porcentaje' name='porcentaje' value={form.porcentaje} onChange={change}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    %
                  </InputAdornment>
                ),
                inputProps: { min: 0, maxLength:2},
                inputComponent: NumberFormatCustom,
              }}
        />
    </Stack>);
}

export default PreciosDescuentos;