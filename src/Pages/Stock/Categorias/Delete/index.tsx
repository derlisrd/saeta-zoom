import { useState } from "react";
import DialogBorrar from "../../../../Components/Dialogo/DialogBorrar";
import useQuerys from "../../../../Hooks/useQuerys";
import { useCategoria } from "../CategoriaProvider";

function Delete() {

    const {dialogs,llaveDialog,getLista,formSelect} = useCategoria()
    const [isLoading,setIsloading]  = useState(false)
    const {borrar} = useQuerys()

    const erase = async()=>{
        setIsloading(true)
        let res = await borrar({table:'categorias',id: formSelect.id_categoria})
        if(res.response){
            getLista()
            close()
        }
        setIsloading(false)
    }

    const close = ()=>{ llaveDialog('delete',false)}

    return (<DialogBorrar open={dialogs.delete} isLoading={isLoading} onClose={close} send={erase} text="Cuidado! Si borra esta categoría puede tener productos hijos dentro de ella. Desea borrar este registro?"  />  );
}

export default Delete;