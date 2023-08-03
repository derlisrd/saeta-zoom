import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,TextField } from "@mui/material";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../../Services/api";
import { useFacturas } from "./FacturasProvider";

function DialogBuscarCliente() {

    const {setDialogs,dialogs,setearFactura,factura} = useFacturas()
    const [lista,setLista] = useState([])
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    const close = ()=>{ 
        setDialogs({...dialogs,buscar_cliente:false});
    }

    const openRegistrar = ()=>{ setDialogs({...dialogs,buscar_cliente:false,registrar_cliente:true}) }

    const insertar = (e,val)=>{
        if(val.id_cliente){
            let new_fact = {...factura}
            new_fact.cliente = {
                id_cliente:val.id_cliente,
                ruc_cliente:val.ruc_cliente,
                nombre_cliente:val.nombre_cliente,
                direccion_cliente: val.direccion_cliente
            }
            if(val.tipo_cliente!=='1'){
                new_fact.tipo_factura = '2' 
            }
            setearFactura(new_fact)
            close()
        }
    }
    
    
    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,tipo_cliente',
                    filtersField:"nombre_cliente,ruc_cliente,fantasia_cliente,id_cliente",filtersSearch:search,pagesize:20
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return ( <Dialog open={dialogs.buscar_cliente} fullWidth maxWidth='lg' onClose={close} >
        <DialogTitle>Cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>

            <Grid item xs={12}>
                <Autocomplete
                    autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
                    getOptionLabel={(option) => option.nombre_cliente+" - "+option.ruc_cliente }
                    options={lista} 
                    onChange={insertar}
                    loadingText="Cargando..." loading={loading} noOptionsText="No existe en registro..."
                    renderInput={(params) => <TextField autoFocus {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar" />}
                />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={openRegistrar} variant="outlined" >REGISTRAR</Button>
            <Button onClick={close} variant="contained" >CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogBuscarCliente;