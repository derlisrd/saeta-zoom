import { Link } from "react-router-dom";
import { usePedidos } from "./PedidosProvider";
import { Box, Button, Stack } from "@mui/material";
import { BASEURL } from "../../../App/config";

function Main() {
    const {dialogs,setDialogs} = usePedidos()
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}
    
    return (<Box>
        <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" onClick={abrir}>HACER PEDIDO</Button>
            <Button size="large" variant="contained" component={Link} to={BASEURL +'/pedidos/lista'} >LISTA DE PEDIDOS</Button>
        </Stack>
    </Box>);
}

export default Main;