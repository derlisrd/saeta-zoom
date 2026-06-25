
import {Stack,Icon } from "@mui/material";
import { useProveedor } from "./ProveedorProvider";
import { red } from "@mui/material/colors";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function Opciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useProveedor()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <ButtonTip onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' />
    </Stack>
    )
}

export default Opciones ;