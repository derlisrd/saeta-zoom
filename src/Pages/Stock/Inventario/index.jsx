import { Grid, Typography } from "@mui/material";
import BuscarProductos from "./BuscarProductos";
import InventarioProvider from "./InventarioProvider";


function Inventario() {
  return (
    <InventarioProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Inventario</Typography>
          <Typography variant="caption">
            Módulo de correción de inventario
          </Typography>
        </Grid>
      </Grid>
      <BuscarProductos />
    </InventarioProvider>
  );
}

export default Inventario;
