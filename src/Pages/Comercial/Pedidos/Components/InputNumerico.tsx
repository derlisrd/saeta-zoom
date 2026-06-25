import { TextField } from "@mui/material";
import NumberFormatCustom from "../../../../Components/TextFields/NumberFormatCustom";

function InputNumerico({ name, value, onChange, label, onKeyUp, ...rest }) {



  return (
    <TextField
      size="small"
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      {...rest}
      autoComplete="off"
      onKeyUp={onKeyUp}
      InputProps={{
        inputProps: { 
            maxLength:6,
        },
        inputComponent: NumberFormatCustom
      }} 
    />
  );
}

export default InputNumerico;
