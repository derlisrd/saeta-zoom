import { Button, Stack } from "@mui/material";
import { useListadoProducto } from "./ListadoProductoProvider";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";


function Paginacion() {
    const {navigate} = useGotoNavigate()
    const {currentPage,pagination,setCurrentPage} = useListadoProducto()
    const anterior = currentPage - pagination.size;
    const siguiente = currentPage + pagination.size;
    //console.log(pagination);
    const change = (size)=>{
        navigate(`/productos?p=${size}`)
        setCurrentPage(size)
    }
    

    return ( <Stack direction="row" spacing={2} marginY={3} width="100%" justifyContent="center" >
        {
            currentPage > 0 && <Button onClick={()=>{change(anterior)}} variant="outlined">Anterior</Button>
        }
        {
            pagination.total > (currentPage + pagination.size) && <Button onClick={()=>{change(siguiente)}} variant="outlined">Siguiente</Button>
        }
    </Stack> );
}

export default Paginacion;