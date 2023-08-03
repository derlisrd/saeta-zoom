
import { Stack } from "@mui/material";
import { useCategoria } from "./CategoriaProvider";
import ButtonTip from "../../../Components/Botones/ButtonTip";



function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useCategoria()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <ButtonTip id='40' title='Editar' onClick={()=>{open(rowProps,'edit')}} icon='edit' />
        <ButtonTip id='41' title='Borrar' onClick={()=>{open(rowProps,'delete')}} icon="delete_forever" /> 
    </Stack>
    )
}

export default ListaOpciones ;