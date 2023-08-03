import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useUsuarios } from "./UsuariosProvider";

function SelectRol({error}) {
  const {formSelect} = useUsuarios()
  const [value, setValue] = useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(()=>{
    setValue(formSelect.rol_user)
    //console.log('cambia form select');
},[formSelect])

    return ( <FormControl fullWidth>
        <InputLabel id="rol_user">ROL</InputLabel>
        <Select
          label="ROL"
          id="rol_user"
          name="rol_user"
          value={value}
          error={error.code===5}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          <MenuItem value="0" disabled>Mantenimiento</MenuItem>
          <MenuItem value="1">Administrador</MenuItem>
          <MenuItem value="2">Gerente</MenuItem>
          <MenuItem value="3">Vendedor</MenuItem>
          <MenuItem value="4">Financiero</MenuItem>
          <MenuItem value="5">Deposito</MenuItem>
          <MenuItem value="6">Caja</MenuItem>
        </Select>
      </FormControl> );
}

export default SelectRol;