import {FormControl,Select,MenuItem, InputLabel} from '@mui/material'
function SelectCondicion({onChange,}) {
    return ( <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select
            onChange={onChange}
            label="Condición"
            size='small'
            defaultValue='0'
        >
          <MenuItem value='0'>Todos</MenuItem>
          <MenuItem value='1'>Contado</MenuItem>
          <MenuItem value='2'>Crédito</MenuItem>
        </Select>
      </FormControl> );
}

export default SelectCondicion;