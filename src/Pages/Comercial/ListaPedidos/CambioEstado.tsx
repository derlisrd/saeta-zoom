import { Button, FormControl,FormLabel,FormControlLabel,Radio,RadioGroup, Dialog, DialogActions, DialogContent, DialogTitle,LinearProgress } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useEffect,useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useAuth } from "../../../Providers/AuthProvider";

function CambioEstado() {
    const {userData} = useAuth()
    const {token_user,id_user} = userData
    const {dialogs,setDialogs,formSelect,getLista} = useListaPedidos()
    const [estado,setEstado] = useState('')
    const [loading,setLoading] = useState(false)
    const estados = [{
        id:'1',
        estado:'PENDIENTE',
    },
    {
        id:'2',
        estado:'EN PRODUCCION',
    },
    {
        id:'3',
        estado:'REVISION',
    },
    {
        id:'4',
        estado:'ENTREGADO',
    }
    ]

    const confirmar = async()=>{
        console.log(token_user,id_user);
        setLoading(true)
        
        let [res,ped] = await Promise.all([
            APICALLER.update({table:'pedidos',id:formSelect.id_pedido,data:{estado_pedido:estado},token:token_user}),
            APICALLER.insert({table:'pedidos_registros',data:{user_id: id_user,pedido_id:formSelect.id_pedido,actividad: `Cambio de estado a ${estado}`},token:token_user })
        ])
        if(res.response && ped.response){
            getLista()
            close()
        }else{
            console.log(res,ped);
        }
        setLoading(false) 
    }


    const close = ()=>{
        setDialogs({...dialogs,cambio_estado: false})
    }

    useEffect(()=>{
        setEstado(formSelect.estado_pedido)
    },[formSelect])

    return (<Dialog open={dialogs.cambio_estado} fullWidth onClose={close}>
        <DialogTitle>Cambiar estado de pedido</DialogTitle>
        <DialogContent>
        {loading && <LinearProgress sx={{ mb:3 }} />}
        <FormControl>
            <FormLabel id="estado_pedido">Estado</FormLabel>
            <RadioGroup row name="estado">
                {
                    estados.map((e)=>(
                        <FormControlLabel key={e.id} value={e.id} checked={e.id===estado} onChange={e=>{ setEstado(e.target.value);}}  control={<Radio />} label={e.estado} />
                    ))
                }
            </RadioGroup>
        </FormControl>

        </DialogContent>
        <DialogActions>
            <Button onClick={close} >Cerrar</Button>
            <Button variant="contained" onClick={confirmar}>Confirmar</Button>
        </DialogActions>
    </Dialog>);
}

export default CambioEstado;