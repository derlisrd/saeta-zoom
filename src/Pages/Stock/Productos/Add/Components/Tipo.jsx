import { FormControl, FormControlLabel, FormLabel, RadioGroup,Radio } from "@mui/material";


function Tipo({name,error,...rest}) {

    const stylo = { color: error.code === 9 ? 'red' : 'inherit'}
    return ( <FormControl>
        <FormLabel sx={stylo}>Tipo:  </FormLabel>
        <RadioGroup
          row
          name={name}
          {...rest}
        >
          <FormControlLabel value="1" control={<Radio name={name} sx={stylo} />} label="Artículo" />
          <FormControlLabel value="2" control={<Radio name={name} sx={stylo} />} label="Servicio" />
          <FormControlLabel value="3" control={<Radio name={name} sx={stylo} />} label="No lucrativo" />
        </RadioGroup>
      </FormControl> );
}

export default Tipo;