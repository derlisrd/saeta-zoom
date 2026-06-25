import { Button } from "@mui/material";
import { useAuth } from "../../Providers/AuthProvider";

function ButtonPermisos({children,onClick, id,...rest}) {
    const {userData} = useAuth()
    const {permisos} = userData

    return  (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(id)) ) && <Button onClick={onClick} {...rest}>{children}</Button>
}

export default ButtonPermisos;