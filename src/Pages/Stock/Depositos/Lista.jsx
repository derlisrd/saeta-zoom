import { Stack } from "@mui/material";
import { useState } from "react";
import AddButton from "../../../Components/Botones/AddButton";
import Tablas from "../../../Components/Tablas";
import Buscar from "../../../Components/TextFields/Buscar";
import {  useDeposito } from "./DepositoProvider";
import Columns from "./Columns";
import Opciones from "./Opciones";

function Lista() {
    const {isLoading,lista,llaveDialog,getLista} = useDeposito()
    const [inputSearch, setInputSearch] = useState("");

    const FilterData = lista.filter(
        (e) =>
          e.nombre_deposito.toLowerCase().includes(inputSearch.toLowerCase())
      ); 


    const Inputs = (
      <Stack spacing={2} direction="row">
        <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} />
        <AddButton
          onClick={() => {
            llaveDialog("add", true);
          }}
        />
      </Stack>
    );

    return ( <Tablas
        title="Depósitos"
        subtitle="Módulo de listado de depósitos"
        inputs={Inputs}
        datas={FilterData}
        loading={isLoading}
        icon={{ name:'store' }}
        showOptions
        Accions={Opciones}
        columns={Columns}
         /> );
}

export default Lista;