import { Button,  Stack, TextField, Grid, Alert } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useListaPedidos } from "./ListaPedidosProvider";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";
import swal from "sweetalert";
import { funciones } from "../../../App/helpers/funciones";
import SelectTipo from "./SelectTipo";
import ButtonPermisos from "../../../Components/Botones/ButtonPermisos";
import BuscaCliente from "./Components/BuscaCliente";

function Lista() {
    const {listas,loading,setFormSelect,dialogs,setDialogs,getLista,setSelectCliente,selectCliente,getFiltrar} = useListaPedidos()
    const {navigate} = useGotoNavigate()
    const [error] = useState({code:0})
    
    const [desde,setDesde] = useState('')
    const [hasta,setHasta] = useState('')
    const [filterLista,setFilterLista] = useState([])
    const downloadExcel = () => { setDialogs({...dialogs,excel:true})}

    const changeTipo = e=>{
        const {value} = e.target
        let l = [...listas.pedidos]
        if(value==='0'){
            setFilterLista(l)
            return;
        }
        let filtrado = l.filter(elem=> elem.tipo_pedido === value )
        setFilterLista(filtrado)
    }  


    const openPDF = ()=>{setDialogs({...dialogs,pdf:true}) }
    const editPedido = r =>{navigate(`/pedidos?open=nuevo&id=${r.id_pedido}`)}
    const print = (r)=>{ setFormSelect(r); setDialogs({...dialogs,imprimir:true})}
    const cambioestado = (r)=>{ setFormSelect(r); setDialogs({...dialogs,cambio_estado:true})}
    const cancelar = (r)=> {setFormSelect(r); setDialogs({...dialogs,cancelar:true})}
    const pago = (r)=> {setFormSelect(r); setDialogs({...dialogs,pago:true})}
    const navegar = ()=>{ navigate('/pedidos?open=nuevo') }
    const motivoCancela = (r)=>{
        swal({text:r.motivo_cancela, title:`Pedido ${r.id_pedido} - Motivo:`,icon:'info'})
    }



    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            {
                rowProps.estado_pedido!=='0' && 
                <>
                <ButtonTip id='3' onClick={()=>{editPedido(rowProps)}} icon='edit' title='Editar pedido' />
                <ButtonTip id='4' onClick={()=>{cancelar(rowProps)}} icon='cancel' title='Cancelar pedido' />
                <ButtonTip id='5' title='Cambio de estado' onClick={()=>{cambioestado(rowProps)}} icon='display_settings' />
                <ButtonTip id='59' title='Cambiar Pago' onClick={()=>{pago(rowProps)}} icon='account_balance_wallet' />
                </> 
            }
            <ButtonTip id='2' title='Imprimir pedido' onClick={()=>{print(rowProps)}} icon='print' />
            {
            rowProps.estado_pedido==='0' && 
            <ButtonTip id='8' title='Motivo de cancelamiento' onClick={()=>{motivoCancela(rowProps)}} icon='info' />
            } 
        </Stack>
    )


    const Inputs = (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12}>
                <ButtonPermisos id='9' onClick={navegar} variant="contained" size="large">Nuevo pedido</ButtonPermisos>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
                    <SelectTipo onChange={changeTipo} />
                    <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Presione Enter' label='Número de pedido' />
                    <BuscaCliente  setSelectCliente={setSelectCliente} /> 
                    {/* <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} label="Cliente" helperText="RUC o nombre" /> */}
                    <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
                    <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
                    <Button variant="outlined" size="large" onClick={()=>getFiltrar(selectCliente,desde,hasta)}>Filtrar</Button>
                    <ButtonTip id='1' onClick={()=>{ getLista('');}} title='Actualizar' icon='sync' />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Stack direction='row' spacing={1}>
                    <ButtonPermisos id='10' variant="outlined" fullWidth onClick={openPDF} color='primary'>PDF</ButtonPermisos>
                    <ButtonPermisos id='10' variant="outlined" fullWidth onClick={downloadExcel} color='success'>EXCEL</ButtonPermisos>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Alert icon={false}>Pedidos: {listas.total}</Alert>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Alert icon={false}>Entrada hoy: {funciones.numberFormat(listas.entrada )}</Alert>
            </Grid>
        </Grid>
    )

    useEffect(()=>{
        setFilterLista(listas.pedidos)
    },[listas]) 

    return (<Tablas
        title="Pedidos"
        subtitle="Módulo de listado de pedidos"
        inputs={Inputs}
        datas={filterLista}
        loading={loading}
        icon={{ name:'receipt' }}
        showOptions
        Accions={ListaOpciones}
        columns={columns}
         />  );
}

export default Lista;