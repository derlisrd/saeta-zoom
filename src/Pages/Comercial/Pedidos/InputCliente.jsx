import { Button } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function InputCliente() {
    const {factura,dialogs,setDialogs} = usePedidos()

    const open = ()=>{
        setDialogs({...dialogs,buscar_cliente:true})
    }

    return ( <Button onClick={open}>CLIENTE: {factura.cliente.ruc_cliente} {factura.cliente.nombre_cliente} </Button> );
}

export default InputCliente;