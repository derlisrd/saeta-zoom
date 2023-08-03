import { Checkbox, FormControlLabel, Grid,Autocomplete,TextField, Stack, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../../../Services/api";

function Filtrado({setLista,setLoading,setTotal}) {
    const [todos,setTodos] = useState(false)
    const [listaClientes,setListaClientes] = useState([])
    const [loadingSearch,setLoadingSearch] = useState(false)
    const [search,setSearch] = useState('')
    const [error,setError]=useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta]= useState('')
    const [selectCliente,setSelectCliente]=useState(null)
    const [condicion,setCondicion] = useState('0')

    const insertarCliente = (e,value)=> setSelectCliente(value)
    const reset = ()=>{
        setLista([])
        setSelectCliente(null)
        setSearch('')
    }
    const filtrar = async ()=>{
        if(!todos && selectCliente===null){
            setError({code:3})
            return false;
        }
        if(desde===''){
            setError({code:1})
            return false;
        }
        if(hasta===''){
            setError({code:2})
            return false
        }
        setError({code:0})
        setLoading(true)
        let where = `fecha_factura,between,'${desde} 00:00:00',and,'${hasta} 23:59:59'`
        if(!todos){
            where =`cliente_id,=,${selectCliente.id_cliente},and,fecha_factura,between,'${desde} 00:00:00',and,'${hasta} 23:59:59'`
        }
        if(condicion!=='0'){ 
          where += `,and,tipo_factura,=,${condicion}`
        }
        let res = await APICALLER.get({table:'facturas',include:'clientes',on:'id_cliente,cliente_id',where,fields:'fecha_factura,nro_factura,ruc_cliente,nombre_cliente,tipo_factura,total_factura'})
        if(res.response){
          let arr = [], tipos = {1:'Contado',2:'Credito'}, total = 0
          res.results.forEach(elm=>{
            arr.push({...elm,
              condicion: tipos[elm.tipo_factura],
              total_factura: parseFloat(elm.total_factura)
            })
            total += parseFloat(elm.total_factura)
          })
          arr.push({fecha_factura:'',nro_factura:'',ruc_cliente:'',nombre_cliente:'',tipo_factura:'',total_factura:total})
          setTotal(total) 
          setLista(arr)
        }else{ console.log(res);}
        setLoading(false)
    }

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoadingSearch(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,fantasia_cliente',
                    filtersField:'id_cliente,nombre_cliente,ruc_cliente,fantasia_cliente',
                    filtersSearch:search,pagesize:20
                })
                setListaClientes(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={1}>
        <FormControlLabel
          control={
            <Checkbox checked={todos} onChange={() => setTodos(!todos)} />
          }
          label="Todos"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
            autoComplete autoHighlight autoSelect  selectOnFocus
            getOptionLabel={(o) => o.id_cliente+' '+o.nombre_cliente+' - '+o.fantasia_cliente+' '+o.ruc_cliente }
            options={listaClientes} disabled={todos}
            onChange={insertarCliente}
            loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
            renderInput={(params) => <TextField {...params} fullWidth size="small" onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
            />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction='row' spacing={1}>
            <TextField type="date"  fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
            <TextField type="date"  fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
            <FormControl fullWidth>
              <InputLabel  sx={{ lineHeight:'0.8rem' }}>Condición</InputLabel>
              <Select
                value={condicion}
                onChange={(e)=>{setCondicion(e.target.value)}}
                size="small"
              >
                <MenuItem value='0'>Todos</MenuItem>
                <MenuItem value='1'>Contado</MenuItem>
                <MenuItem value='2'>Crédito</MenuItem>
              </Select>
            </FormControl>
        </Stack>
    </Grid>
    <Grid item xs={12} sm={2}>
        <Stack direction='row' spacing={1}>
        <Button onClick={filtrar} variant="outlined">Filtrar</Button>
        <Button onClick={reset} variant="outlined">Reiniciar</Button>
        </Stack>
    </Grid>
    </Grid>
  );
}

export default Filtrado;
