
import { InputAdornment, TextField,Icon } from "@mui/material";
import NumberFormatCustom from "../../../../../Components/TextFields/NumberFormatCustom";

function InputPrecio({ name, value, onChange,label, ...rest}) {

    
    return (<TextField label={label} {...rest}
        name={name}
        autoComplete='off'
        value={value}
        onChange={onChange}
        InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>attach_money</Icon> 
          </InputAdornment>
        ),
        inputProps: { min: 0 },
        inputComponent: NumberFormatCustom,
      }}
/> );
}

export default InputPrecio;