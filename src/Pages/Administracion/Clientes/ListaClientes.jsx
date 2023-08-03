import { Stack } from "@mui/material";
import { useState } from "react";
import AddButton from "../../../Components/Botones/AddButton";
import Tablas from "../../../Components/Tablas";
import Buscar from "../../../Components/TextFields/Buscar";
import { useClientes } from "./ClientesProvider";
import ListaColumns from "./ListaColumns";
import ListaOpciones from "./ListaOpciones";
import Pagination from "./Pagination";

function ListaClientes() {
    const {isLoading,lista,llaveDialog,getLista} = useClientes()
    const [inputSearch, setInputSearch] = useState("");

    const FilterData = lista.filter(
        (e) =>
          e.nombre_cliente.toLowerCase().includes(inputSearch.toLowerCase()) ||
          e.ruc_cliente.toLowerCase().includes(inputSearch.toLowerCase())
      ); 


    const Inputs = (
      <Stack spacing={2} direction="row">
        <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} />
        <AddButton id='24'
          onClick={() => {
            llaveDialog("add", true);
          }}
        />
      </Stack>
    );

    return (<><Tablas
        title="Clientes"
        subtitle="Módulo de listado de clientes"
        inputs={Inputs}
        datas={FilterData}
        loading={isLoading}
        icon={{ name:'groups' }}
        showOptions
        Accions={ListaOpciones}
        columns={ListaColumns}
         /> 
         <Pagination />
         </>
         );
}

export default ListaClientes;