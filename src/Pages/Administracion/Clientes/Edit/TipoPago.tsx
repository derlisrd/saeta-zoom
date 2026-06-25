import { FormControl, FormControlLabel, FormLabel, RadioGroup,Radio } from "@mui/material";

function TipoPago({name,value,onChange}) {
    return ( <FormControl>
        <FormLabel>Tipo de pago</FormLabel>
        <RadioGroup
          row
          onChange={onChange}
          name={name}
        >
          <FormControlLabel value="1" checked={value==='1'} control={<Radio />} label="Normal" />
          <FormControlLabel value="2" checked={value==='2'} control={<Radio />} label="Semanal" />
          <FormControlLabel value="3" checked={value==='3'} control={<Radio />} label="Quincenal" />
          <FormControlLabel value="4" checked={value==='4'} control={<Radio />} label="Mensual" />
        </RadioGroup>
      </FormControl> );
}

export default TipoPago;