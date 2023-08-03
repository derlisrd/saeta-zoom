import { useAuth } from "../../Providers/AuthProvider";
import { Button,Icon } from "@mui/material";

function AddButton({onClick, id, ...res}) {
    const {userData} = useAuth()
    const {permisos} = userData

    return (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(id)) ) && <Button variant="contained" onClick={onClick} endIcon={<Icon>add</Icon>}>Agregar</Button>
}

export default AddButton;