import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectDeposito({opciones,name,value,onChange, ...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel sx={{ lineHeight:'0.9rem' }} id="deposito_id">Depósito</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          defaultValue=''
          label="Depósito"
          name={name}
          size="small"
          {...rest}
        >
          <MenuItem value='' disabled>Seleccionar</MenuItem>
          {opciones.map((e,i)=>(
            <MenuItem key={i} value={e.id_deposito}>{e.id_deposito} {e.nombre_deposito}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}

export default SelectDeposito;