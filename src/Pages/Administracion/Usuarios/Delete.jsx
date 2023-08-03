import { Button } from "@mui/material";
import DialogPregunta from "../../../Components/Dialogo/DialogPregunta";
import { useUsuarios } from "./UsuariosProvider";
import { APICALLER } from "../../../Services/api";

function Delete() {
    
    const {dialogs,llaveDialog,formSelect,token_user,getLista} = useUsuarios()
    const close = ()=> llaveDialog('delete',false)
    const confirmar = async()=>{
        Promise.allSettled([
            APICALLER.delete({table:'users',id:formSelect.id_user,token:token_user}),
            APICALLER.delete({table:'permisos_users',id:formSelect.id_user,namecolumns:'id_user_permiso',token:token_user})
        ]).then(res=>{
            getLista()
            close()
        }).catch(e=>{
            console.log(e);
        })
    }
    return ( <DialogPregunta title='Borrar' text='Desea borrar este usuario?' open={dialogs.delete} onClose={close} icon={{ name:'error_outline' }} >
        <Button variant="contained" onClick={confirmar}>CONFIRMAR</Button>
        <Button variant="outlined" onClick={close}>CANCELAR</Button> 
    </DialogPregunta> );
}

export default Delete;