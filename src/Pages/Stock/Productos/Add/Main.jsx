import { Box, Button, Stack } from "@mui/material";
import { useAdd } from "./AddProvider";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";

function Main() {

    const {dialogs,setDialogs} = useAdd()
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}
    const {navigate} = useGotoNavigate()

    return (<Box>
        <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" onClick={abrir}>AGREGAR PRODUCTO</Button>
            <Button size="large" variant="contained" onClick={()=>{navigate('/productos')}}>LISTA DE PRODUCTOS</Button>
        </Stack>
    </Box>  );
}

export default Main;