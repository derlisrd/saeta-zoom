import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function SelectCategoria({onChange,value,name,opciones,...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel sx={{ lineHeight:'0.9rem' }} id="deposito_id">Categoria</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          defaultValue=''
          label="Depósito"
          name={name}
          size="small"
          {...rest}
        >
          <MenuItem value='' disabled>Categoria</MenuItem>
          {opciones.map((e,i)=>(
            <MenuItem key={i} value={e.id_categoria}>{e.id_categoria} {e.nombre_categoria}</MenuItem>
          ))}
          
        </Select>
      </FormControl>  );
}

export default SelectCategoria;