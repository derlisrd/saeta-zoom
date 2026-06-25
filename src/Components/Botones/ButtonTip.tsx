import { Tooltip,IconButton,Icon } from "@mui/material";
import { useAuth } from "../../Providers/AuthProvider";

function ButtonTip({title,icon,onClick,id}) {

    const {userData} = useAuth()
    const {permisos} = userData

    
    return  (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(id)) ) && <Tooltip arrow title={title}><IconButton onClick={onClick} ><Icon>{icon}</Icon></IconButton></Tooltip> 
}

export default ButtonTip;