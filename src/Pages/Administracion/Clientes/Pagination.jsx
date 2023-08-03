import { Button, Stack } from "@mui/material";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";
import { useClientes } from "./ClientesProvider";


function Pagination() {
    const {navigate} = useGotoNavigate()
    const {currentPage,pagination,setCurrentPage} = useClientes()
    const anterior = currentPage - pagination.size;
    const siguiente = currentPage + pagination.size;
    //console.log(pagination);
    const change = (size)=>{
        navigate(`/clientes?p=${size}`)
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

export default Pagination;