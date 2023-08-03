import Agregar from "./Agregar";
import DescuentosProvider from "./DescuentosProvider";
import ListaDescuentos from "./Lista";

function Descuentos() {
    return (<DescuentosProvider>
        <ListaDescuentos />
        <Agregar />
    </DescuentosProvider>);
}

export default Descuentos;