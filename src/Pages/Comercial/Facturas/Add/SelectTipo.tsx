import { Button, MenuItem, Menu } from "@mui/material";
import { useState } from "react";
import { useFacturas } from "./FacturasProvider";

function SelectTipo() {
  const { factura, setearFactura } = useFacturas();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const change = (e) => {
    let f = { ...factura };
    f.tipo_factura = e;
    setearFactura(f);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleOpen}  >
        CONDICION DE VENTA: {factura.tipo_factura ==='1' ? 'CONTADO' : 'CREDITO' }
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            change("1");
          }}
          value="1"
        >
          CONTADO
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("2");
          }}
          value="2"
        >
          CREDITO
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SelectTipo;
