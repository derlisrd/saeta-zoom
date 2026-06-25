import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectCategory({opciones,name,value,onChange,...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel id="id_categoria_producto">Categoría</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Categoría"
          name={name}
          {...rest}
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {opciones.map((e,i)=>(
            <MenuItem key={i} value={e.id_categoria}>{e.nombre_categoria}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}

export default SelectCategory;