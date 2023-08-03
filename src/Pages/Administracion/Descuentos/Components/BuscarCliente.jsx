import { Autocomplete, TextField} from "@mui/material"
import { useEffect, useState } from "react"
import { APICALLER } from "../../../../Services/api"

function BuscarCliente({setSelectCliente}) {

    const [search,setSearch] = useState('')
    const [lista,setLista] = useState([])
    const [loadingSearch,setLoadingSearch] = useState(false)
    const insertar = (e,val)=>{
        if(val && val.id_cliente){
            setSelectCliente({...val})
        }
    }

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoadingSearch(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,fantasia_cliente',
                    filtersField:"nombre_cliente,ruc_cliente,fantasia_cliente",filtersSearch:search,pagesize:20
                })
                setLista(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return(
        <Autocomplete
        getOptionLabel={(option) => option.id_cliente+" - "+option.nombre_cliente+" - "+option.ruc_cliente }
        options={lista}
        onChange={insertar}
        loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
        renderInput={(params) => <TextField {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar cliente" /> } />
    )
}

export default BuscarCliente;