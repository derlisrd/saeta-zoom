import { Box, Button } from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";



function Main() {
    const {dialogs,setDialogs} = useFacturas()
    const {navigate} = useGotoNavigate()
    const open = ()=>{ setDialogs({...dialogs,main:true}) }
    const ir = ()=>{ navigate('/facturas/lista') }

    return (<Box sx={{display:'flex',gap:4 }}>
        <Button variant="contained" onClick={open} >HACER FACTURA</Button>
        <Button variant="contained" onClick={ir} >LISTA DE FACTURAS</Button>
    </Box>);
}

export default Main;