import Anular from "./Anular";
import EditarPago from "./EditarPago";
import Lista from "./Lista";
import ListaFacturaProvider from "./ListaFacturaProvider";
import Pedidos from "./Pedidos";
import Print from "./Print";
import Reportes from "./Reportes/Reportes";

function ListaFacturas() {
    return ( <ListaFacturaProvider>
        <Reportes />
        <Anular />
        <Pedidos />
        <Print />
        <EditarPago />
        <Lista />
    </ListaFacturaProvider> );
}

export default ListaFacturas;