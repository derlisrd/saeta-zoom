import { Button } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function InputObs() {
    const {dialogs,setDialogs} = usePedidos()

    const open = ()=>{
        setDialogs({...dialogs,obs:true})
    }

    return ( <Button onClick={open}>OBSERVACIONES</Button> );
}

export default InputObs;