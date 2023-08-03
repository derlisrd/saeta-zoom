import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent,DialogTitle,FormControlLabel,Grid,Icon, IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useEffect,useState,useRef} from "react";
import { APICALLER } from "../../../Services/api";
import { useReactToPrint } from 'react-to-print';
import { columnsData } from "./columns";
import xlsx from "json-as-xlsx"
import DocumentoExcel from "./DocumentoExcel";

function DialogExcel() {

    const divRef = useRef(null);
    const [todos,setTodos] = useState(false)
    const {dialogs,setDialogs} = useListaPedidos()
    const [error,setError]=useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta]= useState('')
    const [selectCliente,setSelectCliente]=useState(null)
    const [search,setSearch]= useState('')
    const [listaCliente,setListaCliente]=useState([])
    const [loading,setLoading] = useState(false)
    const [lista,setLista]=useState([])
    const [loadingSearch,setLoadingSearch]=useState(false)
    const reset = ()=>{
        setLista([])
        setSelectCliente(null)
        setSearch('')
    }
    const insertarCliente = (e,value)=> setSelectCliente(value)

    const filtrar = async()=>{
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
        let where = `fecha_pedido,between,'${desde} 00:00:00',and,'${hasta} 23:59:59',and,estado_pedido,<>,0`
        if(!todos){
            where =`cliente_id_pedido,=,${selectCliente.id_cliente},and,fecha_pedido,between,'${desde} 00:00:00',and,'${hasta} 23:59:59',and,estado_pedido,<>,0`
        }
        let res = await APICALLER.get({table:'pedidos',include:'clientes,users',
        on:'cliente_id_pedido,id_cliente,id_user,user_id_pedido',
        fields:'tipo_pedido,total_pedido,facturado_pedido,id_pedido,nombre_user,nombre_cliente,fecha_pedido,codigo_cliente_pedido',
        where
        })

        
        if(res.response)
        {   
            let tipoPedido = {
                "1": "NORMAL PREESCRIPCION",
                "2": "CORTESIA",
                "3": "GARANTIA",
                "4": "NORMAL SOLO CRISTAL"
              }
            let total2 = 0
            let pedidos = []
            res.results.forEach(elm=>{
                pedidos.push({...elm,
                    total_pedido: (elm.tipo_pedido==='2' || elm.tipo_pedido==='3') ? `-${elm.total_pedido}` : parseFloat(elm.total_pedido) , 
                    facturado: elm.facturado_pedido==='0'? 'No' : 'Si',
                    tipo: tipoPedido[elm.tipo_pedido]
                })
                total2 += (elm.tipo_pedido==='1' || elm.tipo_pedido==='4') ? parseFloat(elm.total_pedido) : 0
            })
            pedidos.push({total_pedido:total2, facturado:'',
            tipo:'',fecha_pedido:'',id_pedido:'',codigo_cliente_pedido:'',nombre_user:'',nombre_cliente:''})
            setLista(pedidos)
            
        }
        else
        {console.log(res);}
        setLoading(false)
    }
    const downloadExcel = () => {
        let data = [
          {
            sheet: "Pedidos",
            columns: columnsData,
            content: lista,
          },
          
        ]
        let settings = {
          fileName: "Pedidos",
        }
        xlsx(data, settings)
      }
    
    const print = useReactToPrint({content: () => divRef.current});

    const close = ()=>{
        setDialogs({...dialogs,excel:false})
        reset()
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
                setListaCliente(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Dialog fullScreen open={dialogs.excel} onClose={close}>
            <DialogTitle> <IconButton onClick={close}><Icon>close</Icon></IconButton> Generar Excel por cliente</DialogTitle>
            <DialogContent>
                <Grid spacing={1} container>
                    <Grid item xs={12}>
                        {loading && <LinearProgress />}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <FormControlLabel control={<Checkbox checked={todos} onChange={()=>setTodos(!todos)} />} label="Todos" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Autocomplete
                        autoComplete autoHighlight autoSelect  selectOnFocus
                        getOptionLabel={(o) => o.id_cliente+' '+o.nombre_cliente+' - '+o.fantasia_cliente+' '+o.ruc_cliente }
                        options={listaCliente} disabled={todos}
                        onChange={insertarCliente}
                        loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
                        renderInput={(params) => <TextField {...params} fullWidth size="small" onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <Stack direction='row' spacing={1}>
                            <TextField type="date"  fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
                            <TextField type="date"  fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
                       </Stack>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Stack direction='row' spacing={1}>
                        <Button onClick={filtrar} variant="outlined">Filtrar</Button>
                        <Button onClick={reset} variant="outlined">Reiniciar</Button>
                        </Stack>
                    </Grid>
                </Grid>
                {
                    
                    <div ref={divRef}>
                        <DocumentoExcel lista={lista} />
                    </div>
                    
                }
            </DialogContent>
        <DialogActions>  
            {
                lista.length > 0 &&
                <>
                <Button startIcon={<Icon>calculate</Icon>} onClick={downloadExcel} variant="contained">EXCEL</Button>
                <Button startIcon={<Icon>print</Icon>} onClick={print} variant="contained">IMPRIMIR</Button>
                </>

            }
            <Button onClick={close} variant="outlined">
                CERRAR
            </Button>
        </DialogActions>
    </Dialog> );
}

export default DialogExcel;