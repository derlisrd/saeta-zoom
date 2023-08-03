import {FormControl,Select,MenuItem} from '@mui/material'

function SelectTipo({onChange}) {
    return ( <FormControl fullWidth>
        
        <Select
            onChange={onChange}
            label="Tipo"
            size='small'
            defaultValue='0'
        >
          <MenuItem value='0'>Todos</MenuItem>
          <MenuItem value='1'>NORMAL PREESCRIPCION</MenuItem>
          <MenuItem value='2'>CORTESIA</MenuItem>
          <MenuItem value='3'>GARANTIA</MenuItem>
          <MenuItem value='4'>NORMAL SOLO CRISTAL</MenuItem>
        </Select>
      </FormControl> );
}

export default SelectTipo;