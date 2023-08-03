import { useState } from "react";
import Tablas from "../../../Components/Tablas";
import { useUsuarios } from "./UsuariosProvider";
import { Stack } from "@mui/material";
import Buscar from "../../../Components/TextFields/Buscar";
import AddButton from "../../../Components/Botones/AddButton";
import ListaColumns from "./ListaColumns";
import ListaOpciones from "./ListaOpciones";

function Lista() {
    const {isLoading,lista,llaveDialog,getLista} = useUsuarios()
    const [inputSearch, setInputSearch] = useState("");

    const FilterData = lista.users.filter(e => e.nombre_user.toLowerCase().includes(inputSearch.toLowerCase()));
    
      const Inputs = (
        <Stack spacing={2} direction="row">
          <Buscar label="Buscar" onClick={()=>{getLista(inputSearch)}}  onChange={(e) => setInputSearch(e.target.value)} />
          <AddButton id='11'
            onClick={() => {
              llaveDialog("add", true);
            }}
          />
        </Stack>
      );
  
      return (<Tablas
          title="Usuarios"
          subtitle="Módulo de usuarios y credenciales"
          inputs={Inputs}
          datas={FilterData}
          loading={isLoading}
          icon={{ name:'assignment_ind' }}
          showOptions
          Accions={ListaOpciones}
          columns={ListaColumns}
           />);
}

export default Lista;