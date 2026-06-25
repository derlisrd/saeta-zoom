import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../../Services/api";

function BuscaCliente({setCliente}) {
    const [search,setSearch]= useState('')
    const [listaCliente,setListaCliente]=useState([])
    
    const [loadingSearch,setLoadingSearch]=useState(false)
    const insertarCliente = (e,value)=> {
        if(value){
            setCliente(value)
        }else{
            setListaCliente(null)
        }
    }
    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoadingSearch(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,fantasia_cliente',
                    filtersField:'id_cliente,nombre_cliente,ruc_cliente,fantasia_cliente',
                    filtersSearch:search,pagesize:20
                })
                setListaCliente(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])
    return (<Autocomplete
        autoComplete autoHighlight autoSelect  selectOnFocus
        getOptionLabel={(o) => {
            if(o){
                return o.id_cliente+' '+o.nombre_cliente+' - '+o.fantasia_cliente+' '+o.ruc_cliente
            }
            else{
                return null;
            }
        } }
        options={listaCliente || []}
        onChange={insertarCliente}
        fullWidth
        loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
        renderInput={(params) => <TextField {...params}  size="small" onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
    />);
}

export default BuscaCliente;