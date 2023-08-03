import Add from "./Add";
import AddFecha from "./AddFecha";
import Lista from "./Lista";
import Print from "./Print";
import RecibosProvider from "./Provider";

function Recibos() {
    return (<RecibosProvider>
    <Lista />
    <Add />
    <AddFecha />
    <Print />
    </RecibosProvider> );
}

export default Recibos;