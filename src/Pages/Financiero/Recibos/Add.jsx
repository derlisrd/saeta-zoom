import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useRecibosProvider } from "./Provider";
import { useState } from "react";
import { APICALLER } from "../../../Services/api";
import ListaFacturasRecibo from "./Components/ListaFacturasRecibo";
import ClienteAlert from "./Components/ClienteAlert";
import Pagos from "./Components/Pagos";
import { funciones } from "../../../App/helpers/funciones";
import { useAuth } from "../../../Providers/AuthProvider";

function Add() {
    const {dialogs,setDialogs,getLista} = useRecibosProvider()
    const {userData} = useAuth();
    const {token_user} = userData
    const [lista,setLista] = useState([])
    const today = funciones.getFechaHorarioString()
    const [total,setTotal] = useState(0)
    const initialPagos = {efectivo_recibo:0,transferencia_recibo:0,banco_recibo:'',cheque_nro_recibo:'',cheque_recibo:0,fecha_recibo:'',nro_recibo:''}
    const [pagos,setPagos] = useState(initialPagos)
    const [loading,setLoading]=useState(false)
    const initialCliente = {id_cliente:null,nombre_cliente:'',ruc_cliente:''}
    const [cliente,setCliente] = useState(initialCliente)
    const [error,setError]= useState({active:false,msg:''})
    const close = ()=> {
        setLoading(false);
        setDialogs({...dialogs,add:false})
        setCliente(initialCliente)
        setError({active:false,msg:''})
        setLista([])
        setPagos(initialPagos)
        setTotal(0)
    }
    const finalizar = async()=>{
        if(pagos.fecha_recibo==='' || pagos.nro_recibo===''){
            setError({active:true, msg:'Complete todos los datos'})
            return false;
        }
        let suma_total_pagos = parseFloat(pagos.efectivo_recibo) + parseFloat(pagos.transferencia_recibo) + parseFloat(pagos.cheque_recibo)
        
        if(suma_total_pagos<total){
            setError({active:true,msg:"El pago debe ser igual al total"})
            return false;
        }
        setError({active:false,msg:''})
        let promises =[];
        setLoading(true)
        let data_recibos = {...pagos,total_recibo:total,cliente_id_recibo:cliente.id_cliente}
        let res = await APICALLER.insert({table:'recibos',data:data_recibos,token:token_user})
        if(res.response){
            let last_id = res.last_id;
            lista.forEach(elm=>{
                promises.push(APICALLER.insert({table:'recibos_items',data:{recibo_id:last_id,factura_id_recibo:elm.id_factura},token:token_user}))
            })
            await Promise.all(promises)
        }else{
            console.log(res);
        }
        getLista()
        close()
    }
    const hacerSumaTotal = ()=>{
        let copytotal = 0;
        lista.forEach(el=>{
            copytotal += parseFloat(el.total_factura)
        })
        setTotal(copytotal)
    }
    const borrar = id=>{
        let copy = [...lista]

       let nueva = copy.filter(elem=> elem.id_factura !== id );
        /* copy.splice(index, 1);*/
        setLista(nueva) 
        if(nueva.length<1){
            setCliente(initialCliente)
        }
        hacerSumaTotal()
        document.getElementById('_facturanro').focus() 
    }


    const pressEnter = (e)=>{ if(e.key==='Enter'){  agregar()} }
    const agregar = async()=>{
        const nro = document.getElementById('_facturanro')
        if(nro.value === ''){ return false;}
        let findIndex = lista.findIndex(elm=> elm.nro_factura === nro.value)
        if(findIndex>=0){
            setError({active:true,msg:'Esa factura ya está en lista'})
            return false;   
        }
        if(lista.length>12){ setError({active:true,msg:'El recibo solo tiene hasta 12 items'}); return false;}
        setError({active:false,msg:''})
        setLoading(true)
        let res = await APICALLER.get({table:'facturas',include:'clientes',
        on:'cliente_id,id_cliente',where:`nro_factura,=,'${nro.value}'`,fields:'id_cliente,nombre_cliente,ruc_cliente,total_factura,nro_factura,id_factura,fecha_factura'})
        
        if(res.response){
            if(res.found>0){
                let factura = res.first;
                if(cliente.id_cliente !== factura.id_cliente && cliente.id_cliente!==null){
                    setError({active:true,msg:'Ese número de factura, pertenece a otro cliente.'})
                    setLoading(false)
                    return false;
                }
                setCliente({id_cliente:factura.id_cliente,nombre_cliente:factura.nombre_cliente,ruc_cliente:factura.ruc_cliente})
                setTotal( prev=> prev + parseFloat(factura.total_factura))
                let copialista = [...lista]
                copialista.push(factura)
                setLista(copialista)
                nro.value = ''
                nro.focus()
            }else{
                setError({active:true,msg:'No se ha encontrado factura'})
            }
        }else{
            console.log(res);
        }
        setLoading(false)
    }

    return (<Dialog open={dialogs.add} onClose={close} fullWidth maxWidth='md'>
        <DialogTitle>Agregar recibo nuevo | Total: {funciones.numberFormat(total)}</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}  >
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert icon={false} severity="error"> {error.msg}</Alert>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField size="small" onKeyUp={pressEnter} helperText='Ingrese la factura' autoComplete="off" id="_facturanro" label="Factura nro" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button onClick={agregar} variant="contained">AGREGAR</Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                    {lista.length>0 && <Pagos pagos={pagos} setPagos={setPagos} />}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {cliente.id_cliente && <ClienteAlert datos={cliente} />}
                </Grid>
                <Grid item xs={12}>
                    <ListaFacturasRecibo listado={lista} borrar={borrar} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={finalizar}>FINALIZAR</Button>
            <Button variant="outlined" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog>);
}

export default Add;