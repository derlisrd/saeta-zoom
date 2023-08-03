import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useReciboPedido } from "./Provider";
import { APICALLER } from "../../../Services/api";
import { useState } from "react";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import ListadoAgregado from "./ListadoAgregado";
import { useAuth } from "../../../Providers/AuthProvider";
import { funciones } from "../../../App/helpers/funciones";

function DialogAdd() {
    const {dialogs,setDialogs,getLista} = useReciboPedido()
    const {userData} = useAuth()
    const {token_user,id_user} = userData
    const [listado,setListado] = useState([])
    const [nro,setNro] = useState('') //nro de pedido
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,msg:''})
    const [cliente,setCliente] = useState({id:'',nombre:'',active:false})
    const [total,setTotal] = useState(0)
    const cancelar = ()=>{
        setListado([])
        setTotal(0)
        setLoading(false)
        setCliente({id:'',nombre:'',active:false})
        setError({active:false,msg:''})
        setNro('')
        close()
    }
    const crear = async()=>{
        setLoading(true)

        let listado_nros = ''
        listado.forEach(e=>{
            listado_nros += e.id_pedido+', '
        })
        
        let data_recibo = {
            fecha_recibo: funciones.getFechaHorarioString(),
            cliente_id_recibo:cliente.id,
            nros_pedidos: listado_nros.slice(0, -2),
            total_recibo:total,
            generado_por: id_user
        }
        //console.log(data_recibo,listado);
        let res = await APICALLER.insert({table:'recibo_pedidos',token:token_user,data:data_recibo})
        if(res.response){
            let promesas = [], last_id = res.last_id, listado_data = {}
            listado.forEach(elm=> {
                listado_data = {
                    recibo_pedido_id: last_id,
                    pedido_id_recibo: elm.id_pedido,
                    total_item_recibo: elm.total_pedido
                }
                promesas.push(APICALLER.insert({table:'recibo_pedidos_items',token:token_user,data:listado_data}))
            });
            await Promise.all(promesas) 
        }
        setLoading(false)
        cancelar()
        getLista()
    }
    const consultar = async()=>{
        let doc = document.getElementById('_nropedido')
        //let nro = doc.value
        if(nro==='' || nro.length<1){
            return false;
        }
        setError({active:false,msg:""})
        let found = listado.findIndex(el=> el.id_pedido === nro)
        if(found>=0){
            setError({active:true,msg:"Pedido ya esta en la lista"})
            return false;
        }
        setLoading(true)
        let res = await APICALLER.get({table:'pedidos',include:'clientes',on:'cliente_id_pedido,id_cliente',where:`id_pedido,=,'${nro}'`,
        fields:'id_pedido,fecha_pedido,total_pedido,nombre_cliente,id_cliente'})
        if(res.response){
            if(res.found>0){

                let first = res.results[0];
                if(cliente.active && first.id_cliente !== cliente.id ){
                    setError({active:true,msg:"Ese pedido pertenece a otro cliente"})
                    setLoading(false)
                    return false;
                }

                let previo = [...listado]
                previo.push(first)
                setTotal( total + parseFloat(first.total_pedido) )
                setCliente({active:true,nombre: first.nombre_cliente, id: first.id_cliente})
                setListado(previo)
                setNro('')
                doc.focus()
            }else{
                setError({active:true,msg:"No existe pedido"})
            }
        }else{console.log(res);}
        setLoading(false)
    }


    const close = ()=> setDialogs({...dialogs,add:false})
    
    return ( <Dialog open={dialogs.add} onClose={close} maxWidth="md" fullWidth>
        <DialogTitle>Agregar pedidos a recibo</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12}>{loading && <LinearProgress />}
                    {error.active && <Alert variant="outlined" icon={false} severity="error">{ error.msg}</Alert> }
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField name='nro' autoFocus value={nro} onChange={e=>setNro(e.target.value)} onKeyUp={e=> e.key==='Enter' && consultar() } InputProps={{inputComponent: NumberFormatCustom}}  id="_nropedido" fullWidth label="Nro de pedido" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" size="large" onClick={consultar} fullWidth>Agregar</Button>
                </Grid>
                <Grid item xs={12}>
                    <ListadoAgregado pedidos={listado} eliminar={()=>{}} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button disabled={listado.length<1} onClick={crear} variant="contained">CREAR</Button>
            <Button onClick={cancelar} variant="outlined">CANCELAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogAdd;