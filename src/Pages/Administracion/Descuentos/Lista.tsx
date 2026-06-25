import { Stack } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useDescuentos } from "./DescuentosProvider";
import {columns} from './columns'
import ButtonTip from "../../../Components/Botones/ButtonTip";
import AddButton from "../../../Components/Botones/AddButton";
import { useAuth } from "../../../Providers/AuthProvider";
import { APICALLER } from "../../../Services/api";

function ListaDescuentos() {
    
    const {listas,dialogs,setDialogs,loading,getLista} = useDescuentos()
    const {userData} = useAuth()
    const {token_user} = userData
    const add = ()=>{ setDialogs({...dialogs,add:true})}

    const Inputs = (<Stack direction='row'>
        <AddButton id='34' onClick={add} />
        <ButtonTip id='33' title='Actualizar' onClick={getLista} icon='refreshs' />
    </Stack>)

    const borrar = async(id)=>{
        let res = await APICALLER.delete({table:'descuentos',id:id,token:token_user})
        if(res.response){
            getLista()
        }
        else{
            console.log(res);
        }
    }

    const Opciones = ({rowProps})=>(
        <Stack direction='row'>
            <ButtonTip id='36' title='Borrar' onClick={()=>{borrar(rowProps.id_descuento)}} icon='delete_forever' />
        </Stack>
    )


    return (<Tablas 
        title='Descuentos'
        subtitle='Descuentos por clientes'
        icon={{ name:'price_check' }}
        loading={loading}
        showOptions
        Accions={Opciones}
        datas={listas.descuentos}
        columns={columns}
        inputs={Inputs}
    />);
}

export default ListaDescuentos;