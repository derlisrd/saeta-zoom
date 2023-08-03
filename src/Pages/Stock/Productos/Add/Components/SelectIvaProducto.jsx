import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectIvaProducto({name,value,onChange, ...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel id="iva_producto">IVA</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="IVA"
          name={name}
          {...rest}
        >
          <MenuItem value="" disabled>Seleccionar IVA</MenuItem>
          <MenuItem value="0">0 EXENTA</MenuItem>
          <MenuItem value="5">5 %</MenuItem>
          <MenuItem value="10">10 %</MenuItem>
        </Select>
      </FormControl> );
}

export default SelectIvaProducto;