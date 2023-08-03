import { Button, Icon, Stack } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";

function Botones() {
    const {navigate} = useGotoNavigate()
    const {setearFactura,initialFactura,factura,dialogs,setDialogs,idUpdate,setLado} = usePedidos()

    const cancelar = ()=>{
        setearFactura(initialFactura)
        if(idUpdate.state){
            navigate('/pedidos/lista')
        }
        setLado({derecho:false,izquierdo:false})
    }

    const nuevo = ()=>{
        setearFactura(initialFactura)
        setLado({derecho:false,izquierdo:false})
        //console.log(document.getElementById('id_busca_codigo'));
    }

    

    const fin = ()=> {
        setDialogs({...dialogs,finalizar:true})
    }

    return ( <Stack spacing={2} >
        {
            factura.items.length>0 &&
            <>
            <Button size="large" onClick={fin} variant="contained" color="success" fullWidth>
            FINALIZAR
        </Button>
        <Button onClick={cancelar} size="large" variant="outlined" color="info" fullWidth>
            CANCELAR
        </Button>
            </>
        }
        {
            !idUpdate.state && <Button onClick={nuevo} color='secondary' startIcon={<Icon>cleaning_services</Icon>} variant="contained">LIMPIAR TODO</Button>
        }
        
    </Stack> );
}

export default Botones;