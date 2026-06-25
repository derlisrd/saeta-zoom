import { useAuth } from "../../Providers/AuthProvider";
import {Box} from '@mui/material'
function InfoUsuario() {
    const {userData} = useAuth()
    return (<Box sx={{ display:{xs:'none',sm:'block'} }}> <b>Usuario: {userData.nombre_user}</b> </Box>);
}

export default InfoUsuario;