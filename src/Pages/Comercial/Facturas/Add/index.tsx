import CambiarPrecio from "./CambiarPrecio";
import DialogBuscarCliente from "./DialogBuscarCliente";
import DialogInsertarPedido from "./DialogInsertarPedido";
import DialogMain from "./DialogMain";
import DialogNroFactura from "./DialogNroFactura";
import FacturasProvider from "./FacturasProvider";
import Main from "./Main";
import PreImpreso from "./Print/PreImpreso";


function AddFactura() {

    

    return ( <FacturasProvider>
        <DialogInsertarPedido />
        <PreImpreso />
        <CambiarPrecio />
        <DialogNroFactura />
        <DialogBuscarCliente />
        <DialogMain />
        <Main />
    </FacturasProvider>);
}

export default AddFactura;