import DialogAdd from "./DialogAdd";
import Lista from "./Lista";
import PrintRecibo from "./PrintRecibo";
import RecibosProvider from "./Provider";

function RecibosPedidos() {
    return (<RecibosProvider>
        <Lista />
        <PrintRecibo />
        <DialogAdd />
    </RecibosProvider>);
}

export default RecibosPedidos;