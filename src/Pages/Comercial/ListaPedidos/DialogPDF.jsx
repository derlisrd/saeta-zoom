import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent,DialogTitle,FormControlLabel,Grid,Icon, IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useEffect,useState,useRef} from "react";
import { APICALLER } from "../../../Services/api";
import DocumentoPDF from "./DocumentoPDF";
import { useReactToPrint } from 'react-to-print';
import { columnsDataPDF } from "./columns";
import xlsx from "json-as-xlsx"

function DialogPDF() {

    const divRef = useRef(null);
    const {dialogs,setDialogs} = useListaPedidos()
    const [todos,setTodos] = useState(false)
    const [error,setError]=useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta]= useState('')
    const [selectCliente,setSelectCliente]=useState(null)
    const [search,setSearch]= useState('')
    const [detalles,setDetalles] = useState({total:0,cliente:'',fecha_inicio:'',fecha_fin:''})
    const [listaCliente,setListaCliente]=useState([])
    const [loading,setLoading] = useState(false)
    const [lista,setLista]=useState([])
    const [loadingSearch,setLoadingSearch]=useState(false)
    const reset = ()=>{
        setLista([])
        setTodos(false)
        setSelectCliente(null)
        setDetalles({total:0,cliente:'',fecha_inicio:'',fecha_fin:''})
        setSearch('')
    }
    const insertarCliente = (e,value)=>{
        setSelectCliente(value)

    }
    const filtrar = async()=>{
        if(!todos && selectCliente===null){
            setError({code:2})
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
        let res = await APICALLER.get({table:'pedidos_items',include:'pedidos,productos,clientes',
        on:'pedido_id,id_pedido,id_producto,producto_id_item,id_cliente,cliente_id_pedido,codigo',
        fields:'precio_venta_item,id_pedido,cantidad_pedido,fecha_pedido,codigo_producto,nombre_producto,id_cliente,nombre_cliente,codigo_cliente_pedido',
        where
        })
        if(res.response)
        {   let total_venta = 0;
            let lista_arreglada = []
            res.results.forEach(elm => {
                total_venta += parseFloat(elm.precio_venta_item)*parseFloat(elm.cantidad_pedido)
                lista_arreglada.push({...elm,
                    precio_venta_item: parseFloat(elm.precio_venta_item),
                    total_pedido: parseFloat(elm.precio_venta_item)*parseFloat(elm.cantidad_pedido)
                })
            });
            if(selectCliente)
            {
                setDetalles({cliente:selectCliente.nombre_cliente,total:total_venta,fecha_inicio: desde,fecha_fin:hasta })
            }
            else{
                setDetalles({cliente:'Generales',total:total_venta,fecha_inicio: desde,fecha_fin:hasta })
                console.log('general');
            }
            

            setLista(lista_arreglada)
        }
        else
        {console.log(res);}
        setLoading(false)
    }
    const downloadExcel = () => {
        let data = [
          {
            sheet: "Pedidos",
            columns: columnsDataPDF,
            content: lista,
          },
          
        ]
        let settings = {
          fileName: "Pedidos",
        }
        xlsx(data, settings)
      }
    
    const print = useReactToPrint({
        content: () => divRef.current,
      });

    const close = ()=>{
        setDialogs({...dialogs,pdf:false})
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


    return (<Dialog fullScreen open={dialogs.pdf} onClose={close}>
            <DialogTitle> <IconButton onClick={close}><Icon>close</Icon></IconButton> Generar PDF</DialogTitle>
            <DialogContent>
                <Grid spacing={2} container>
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
                        options={listaCliente}
                        onChange={insertarCliente} disabled={todos} 
                        loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
                        renderInput={(params) => <TextField {...params} fullWidth size="small" onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <Stack direction='row' spacing={1}>
                            <TextField type="date"  fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
                            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
                       </Stack>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Stack direction='row' spacing={1}>
                        <Button onClick={filtrar} variant="outlined">Filtrar</Button>
                        <Button onClick={reset} startIcon={<Icon>cleaning_services</Icon>} variant="outlined">Limpiar</Button>
                        </Stack>
                    </Grid>
                </Grid>
                {
                    lista.length>0 && 
                    <div ref={divRef}><DocumentoPDF lista={lista} detalles={detalles} desde={desde} hasta={hasta} selectCliente={selectCliente} /></div>
                    
                }
            </DialogContent>
        <DialogActions>  
            {
                lista.length > 0 &&
                <>
                <Button startIcon={<Icon>calculate</Icon>} onClick={downloadExcel} variant="contained">EXCEL</Button>
                <Button startIcon={<Icon>picture_as_pdf</Icon>} onClick={print} variant="contained">PDF</Button>
                </>

            }
            <Button onClick={close} variant="outlined">
                CERRAR
            </Button>
        </DialogActions>
    </Dialog> );
}

export default DialogPDF;