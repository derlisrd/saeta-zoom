
import AddButton from "../../../../Components/Botones/AddButton";
import Tablas from "../../../../Components/Tablas";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { useListadoProducto } from "./ListadoProductoProvider";
import TextFieldBuscar from "./TextFieldBuscar";
import Paginacion from "./Paginacion";
import {  Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import { columns } from "./columns";
import ButtonTip from "../../../../Components/Botones/ButtonTip";

function Lista() {
    const {navigate} = useGotoNavigate()
    const {listas,isLoading,llaveDialog,setFormSelect} = useListadoProducto()
    

    //const FilterData =  lista.filter(item => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase())|| item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase()));

    const inputs = (
        <Stack direction="row" spacing={1}>
            <TextFieldBuscar />
            <AddButton id='28' onClick={()=>{ navigate('/productos/add') }} />
        </Stack>
    )

    const openStock = (row)=>{
        setFormSelect(row)
        //console.log(row);
        llaveDialog('stock',true)
    }
    const openEdit = (row)=>{
        setFormSelect(row)
        //console.log(row);
        llaveDialog('edit',true)
    }

    function ListaOpciones({rowProps}) {
        return (<Stack direction="row"> 
            {rowProps.tipo_producto==="1" && <ButtonTip id='31' onClick={()=>{openStock(rowProps)}} title='Stock' icon="inventory" /> }
            <ButtonTip id='29' onClick={()=>{openEdit(rowProps)} } icon='edit' title='Editar' />
            <ButtonTip id='30' onClick={()=>{}}  icon="delete_forever" title='Eliminar' /> 
        </Stack>)
    }


    return (
    <>
    <Tablas
        title="Productos y Servicios"
        subtitle="Módulo de productos y servicios"
        icon={{ name:'inventory' }}
        loading={isLoading}
        columns={columns}
        datas={listas.productos}
        showOptions
        Accions={ListaOpciones}
        inputs={inputs}
        />
        <Paginacion />
    </>
    );
}

export default Lista;