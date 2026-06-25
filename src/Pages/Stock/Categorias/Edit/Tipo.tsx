import { FormControl, FormControlLabel, FormLabel, RadioGroup,Radio } from "@mui/material";

function Tipo({name,onChange,value}) {
    return ( <FormControl>
        <FormLabel>Tipo</FormLabel>
        <RadioGroup
          row
          name={name}
          onChange={onChange}
          value={value}
        >
          <FormControlLabel value="1" control={<Radio />} label="Artículos" />
          <FormControlLabel value="0" control={<Radio />} label="Servicios" />
          <FormControlLabel value="2" control={<Radio />} label="Insumos" />
        </RadioGroup>
      </FormControl> );
}

export default Tipo;