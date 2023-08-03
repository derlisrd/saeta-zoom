import { useState } from "react";
import Buscar from "../../../../Components/TextFields/Buscar";
import { useListadoProducto } from "./ListadoProductoProvider";

function TextFieldBuscar() {
    const {getLista} = useListadoProducto()
    const [inputSearch, setInputSearch] = useState('');

    return ( <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} /> );
}

export default TextFieldBuscar;