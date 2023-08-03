import { Grid, Stack } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useReciboPedido } from "./Provider";
import { columns } from "./columns";
import ButtonPermisos from "../../../Components/Botones/ButtonPermisos";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function Lista() {
  const { loading, lista,dialogs,setDialogs,setFormSelect } = useReciboPedido();

  const print = r=>{ setFormSelect(r); setDialogs({...dialogs,print:true}) }
  const Opciones = ({ rowProps }) => (
    <Stack spacing={1} direction='row'>
        <ButtonTip id='55' title='Imprimir' icon='print' onClick={()=>{print(rowProps)}} />
    </Stack>
  );
  const Inputs = (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
      <Grid item xs={12}>
        <ButtonPermisos id='54' onClick={()=>{ setDialogs({...dialogs,add:true})}} variant="contained" size="large">CREAR RECIBO</ButtonPermisos>
      </Grid>
    </Grid>
  );

  return (
    <Tablas
      title="Recibos"
      subtitle="Modulo de recibos de pedidos"
      inputs={Inputs}
      datas={lista}
      loading={loading}
      icon={{ name: "receipt" }}
      showOptions
      Accions={Opciones}
      columns={columns}
    />
  );
}

export default Lista;
