import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { esferico,cilindrico } from "./graduaciones";

export function SelectEsferico({onChange,value,...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel id="graduacion_esferico">Esférico</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Esférico"
          name='graduacion_esferico'
          {...rest}
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {esferico.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}


export function SelectCilindrico({value,onChange,...rest}) {
    return ( <FormControl fullWidth>
        <InputLabel id="graduacion_cilindrico">Cilindrico</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Cilindrico"
          name='graduacion_cilindrico'
          {...rest}
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {cilindrico.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}

