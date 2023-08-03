import {  Stack } from "@mui/material";
import { useUsuarios } from "./UsuariosProvider";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useUsuarios()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <ButtonTip id='14' onClick={()=>{open(rowProps,'permisos')}} title='Permisos' icon="manage_accounts" />
        <ButtonTip id='12' onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip id='13' onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' />
    </Stack>
    )
}

export default ListaOpciones ;