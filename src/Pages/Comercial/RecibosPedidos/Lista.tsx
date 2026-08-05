import { Button, Grid, Stack, TextField } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useReciboPedido } from "./Provider";
import { columns } from "./columns";
import ButtonPermisos from "../../../Components/Botones/ButtonPermisos";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import { useState } from "react";

function Lista() {
  const { loading, lista, dialogs, setDialogs, setFormSelect, getLista } = useReciboPedido();
  const [hasta, setHasta] = useState('');
  const [desde, setDesde] = useState('');

  const handleChange = () => {
    if (desde === '' || hasta === '') {
      alert('Debe seleccionar un rango de fechas')
      return
    }
    getLista(desde, hasta);
  }

  const print = r => { setFormSelect(r); setDialogs({ ...dialogs, print: true }) }
  const Opciones = ({ rowProps }) => (
    <Stack spacing={1} direction='row'>
      <ButtonTip id='55' title='Imprimir' icon='print' onClick={() => { print(rowProps) }} />
    </Stack>
  );
  const Inputs = (
    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
      <Grid item xs={12}  >
        <ButtonPermisos id='54' onClick={() => { setDialogs({ ...dialogs, add: true }) }} variant="contained" size="large">CREAR RECIBO</ButtonPermisos>
      </Grid>
      <Grid item xs={12} >
        <Grid container gap={2}>
          <Grid item xs={3}>
            <TextField type="date" helperText="Desde" fullWidth size="small" onChange={e => { setDesde(e.target.value) }} />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" helperText="Hasta" fullWidth size="small" onChange={e => { setHasta(e.target.value) }} />
          </Grid>
          <Grid item xs={3}>
            <Button size="large" variant="contained" onClick={handleChange}>FILTRAR</Button>
          </Grid>
        </Grid>
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
