import {  Stack } from "@mui/material";
import { useEmpleados } from "./EmpleadosProvider";
import ButtonTip from "../../../Components/Botones/ButtonTip";


function Opciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useEmpleados()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row">
        <ButtonTip id="" onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip id="" onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' /> 
    </Stack>
    )
}

export default Opciones ;