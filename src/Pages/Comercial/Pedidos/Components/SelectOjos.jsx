import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { usePedidos } from '../PedidosProvider';

function SelectOjos({value,onChange}) {

    const {lado} = usePedidos()

    return ( <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Seleccione lados</FormLabel>
        <RadioGroup
          row
          defaultValue='ambos'
          value={value}
          onChange={onChange}
        >
          <FormControlLabel value="ambos" disabled={lado.izquierdo===true || lado.derecho===true} control={<Radio />} label="Ambos" />
          <FormControlLabel value="derecho" disabled={lado.derecho===true} control={<Radio />} label="Derecho" />
          <FormControlLabel value="izquierdo" disabled={lado.izquierdo===true} control={<Radio />} label="Izquierdo" />
        </RadioGroup>
      </FormControl> );
}

export default SelectOjos;