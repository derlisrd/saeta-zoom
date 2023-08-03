import { TextField } from "@mui/material";
import NumberFormatCustom from "../../../../Components/TextFields/NumberFormatCustom";

function InputNumber({ name, value, onChange, label }) {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      name={name}
      label={label}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}

export default InputNumber;
