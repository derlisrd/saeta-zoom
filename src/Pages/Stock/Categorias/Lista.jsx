import { Stack } from "@mui/material";
import { useState } from "react";
import AddButton from "../../../Components/Botones/AddButton";
import Tablas from "../../../Components/Tablas";
import Buscar from "../../../Components/TextFields/Buscar";
import {  useCategoria } from "./CategoriaProvider";
import Columns from "./Columns";
import Opciones from "./Opciones";

function Lista() {
    const {isLoading,lista,llaveDialog,getLista} = useCategoria()
    const [inputSearch, setInputSearch] = useState("");

    const FilterData = lista.filter((e) =>e.nombre_categoria.toLowerCase().includes(inputSearch.toLowerCase())); 


    const Inputs = (
      <Stack spacing={2} direction="row">
        <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} />
        <AddButton id='42'
          onClick={() => {
            llaveDialog("add", true);
          }}
        />
      </Stack>
    );

    return ( <Tablas
        title="Categorías"
        subtitle="Módulo de listado de categorías"
        inputs={Inputs}
        datas={FilterData}
        loading={isLoading}
        icon={{ name:'category' }}
        showOptions
        Accions={Opciones}
        columns={Columns}
         /> );
}

export default Lista;