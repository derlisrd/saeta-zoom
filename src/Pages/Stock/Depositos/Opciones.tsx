import { Stack } from "@mui/material";
import { useDeposito } from "./DepositoProvider";
import ButtonTip from "../../../Components/Botones/ButtonTip";


function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useDeposito()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row">
        <ButtonTip id='49' onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip id='50' onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' />
    </Stack>
    )
}

export default ListaOpciones ;