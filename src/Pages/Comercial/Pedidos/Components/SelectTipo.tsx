import { Button, MenuItem, Menu } from "@mui/material";
import { usePedidos } from "../PedidosProvider";
import { useState } from "react";
import swal from 'sweetalert'

function SelectTipo() {
  const { factura, setearFactura } = usePedidos();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const change = async(e) => {
    let f = { ...factura };
    
    if(f.items.length>0 && e==='4'){
      let ok = await swal({
        title: "Cambiar?",
        text: "Desea cambiar de tipo de venta. Puede perder su lista de items!",
        icon: "warning",
        buttons: ['Cancelar','Cambiar'],
      })
      if(ok){
        f.items = []
      }
    }
    f.tipo_pedido = e;
    setearFactura(f);
    setAnchorEl(null);
  }

  const tipos = {
    "1": "NORMAL PREESCRIPCIÓN",
    "2": "CORTESIA",
    "3": "GARANTIA",
    "4": "NORMAL SOLO CRISTAL"
  }

  return (
    <div>
      <Button onClick={handleOpen}  >
        TIPO PEDIDO: {tipos[factura.tipo_pedido] }
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            change("1");
          }}
          value="1"
        >
          NORMAL PREESCRIPCIÓN
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("2");
          }}
          value="2"
        >
          CORTESIA
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("3");
          }}
          value="3"
        >
          GARANTIA
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("4");
          }}
          value="4"
        >
          NORMAL SOLO CRISTAL
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SelectTipo;
