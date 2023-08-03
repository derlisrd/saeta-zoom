import { FormControl, FormControlLabel, FormLabel, RadioGroup,Radio } from "@mui/material";

function TipoPago({name}) {
    return ( <FormControl>
        <FormLabel>Tipo de pago</FormLabel>
        <RadioGroup
          row
          name={name}
        >
          <FormControlLabel value="1" control={<Radio />} label="Normal" />
          <FormControlLabel value="2" control={<Radio />} label="Semanal" />
          <FormControlLabel value="3" control={<Radio />} label="Quincenal" />
          <FormControlLabel value="4" control={<Radio />} label="Mensual" />
        </RadioGroup>
      </FormControl> );
}

export default TipoPago;