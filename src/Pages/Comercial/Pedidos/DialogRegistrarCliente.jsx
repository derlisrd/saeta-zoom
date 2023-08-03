import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import { usePedidos } from "./PedidosProvider";

function DialogRegistrarCliente() {

    const {dialogs,setDialogs} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,registrar_cliente:false}) }

    return ( <DialogZoom fullWidth open={dialogs.registrar_cliente} onClose={close} title="Registrar cliente" >

    </DialogZoom> );
}

export default DialogRegistrarCliente;