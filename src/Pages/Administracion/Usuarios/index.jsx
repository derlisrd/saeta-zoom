import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import Lista from "./Lista";
import Permisos from "./Permisos";
import UsuariosProvider from "./UsuariosProvider";

function Usuarios() {
    return ( <UsuariosProvider>
        <Add />
        <Edit />
        <Delete />
        <Permisos />
        <Lista />
    </UsuariosProvider> );
}

export default Usuarios;