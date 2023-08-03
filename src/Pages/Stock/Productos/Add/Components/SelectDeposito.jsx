import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectDeposito({opciones,name,value,onChange, ...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel id="id_deposito">Depósito</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Depósito"
          name={name}
          {...rest}
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {opciones.map((e,i)=>(
            <MenuItem key={i} value={e.id_deposito}>{e.id_deposito} {e.nombre_deposito}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}

export default SelectDeposito;