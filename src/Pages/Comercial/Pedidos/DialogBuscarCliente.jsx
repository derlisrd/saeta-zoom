import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,TextField } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../Services/api";

function DialogBuscarCliente() {

    const {setDialogs,dialogs,setearFactura,factura} = usePedidos()
    const [lista,setLista] = useState([])
    const [search,setSearch] = useState('')
    const [codigo,setCodigo] = useState('')
    const [loading,setLoading] = useState(false)
    const close = ()=>{ 
        setDialogs({...dialogs,buscar_cliente:false});
        let f = {...factura}
        f.codigo_cliente_pedido = codigo
        setearFactura(f)
    }
    const enterCodigo = e=>{
        if(e.key==="Enter"){
            setDialogs({...dialogs,buscar_cliente:false});
            let new_fact = {...factura}
            new_fact.codigo_cliente_pedido = codigo
            setearFactura(new_fact)
            setDialogs({...dialogs,buscar_cliente:false});
        }
    }
    //const openRegistrar = ()=>{ setDialogs({...dialogs,buscar_cliente:false,registrar_cliente:true}) }

    const insertar = (e,val)=>{
        let f = {...factura}
       
            f.cliente = {
                id_cliente:val.id_cliente,
                ruc_cliente:val.ruc_cliente,
                fantasia_cliente:val.fantasia_cliente,
                nombre_cliente:val.nombre_cliente,
                direccion_cliente: val.direccion_cliente
            }
            
        f.codigo_cliente_pedido = codigo
        setearFactura(f)
        setDialogs({...dialogs,buscar_cliente:false});
    }

    useEffect(()=>{
        if(dialogs.buscar_cliente){
            setCodigo(factura.codigo_cliente_pedido)
        }
    },[dialogs,factura])
    
    
    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,fantasia_cliente',
                    filtersField:'id_cliente,nombre_cliente,ruc_cliente,fantasia_cliente',
                    filtersSearch:search,pagesize:20
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return ( <Dialog open={dialogs.buscar_cliente} maxWidth='md' fullWidth onClose={close} >
        <DialogTitle>Cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField autoFocus fullWidth label='Codigo interno' onKeyUp={enterCodigo}  value={codigo} onChange={(e)=>{setCodigo(e.target.value)}} />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    autoComplete autoHighlight autoSelect  selectOnFocus
                    getOptionLabel={(o) => o.id_cliente+' '+o.nombre_cliente+' - '+o.fantasia_cliente+' '+o.ruc_cliente }
                    options={lista}
                    onChange={insertar}
                    loadingText="Cargando..." loading={loading} noOptionsText="No existe en registro..."
                    renderInput={(params) => <TextField {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
                />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} variant="contained">CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogBuscarCliente;