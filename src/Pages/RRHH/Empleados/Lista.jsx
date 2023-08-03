import { Stack } from "@mui/material";
import { useState } from "react";
import AddButton from "../../../Components/Botones/AddButton";
import Tablas from "../../../Components/Tablas";
import Buscar from "../../../Components/TextFields/Buscar";
import { useEmpleados } from "./EmpleadosProvider";
import ListaColumns from "./ListaColumns";
import Opciones from "./Opciones";

function Lista() {
    const {isLoading,lista,llaveDialog,getLista} = useEmpleados()
    const [inputSearch, setInputSearch] = useState("");

    const FilterData = lista.filter(
        (e) =>
          e.nombre_empleado.toLowerCase().includes(inputSearch.toLowerCase()) ||
          e.doc_empleado.toLowerCase().includes(inputSearch.toLowerCase())
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
        title="Empleados"
        subtitle="Módulo de listado de empleados"
        inputs={Inputs}
        datas={FilterData}
        loading={isLoading}
        icon={{ name:'perm_contact_calendar' }}
        showOptions
        Accions={Opciones}
        columns={ListaColumns}
         /> );
}

export default Lista;