import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, LinearProgress } from "@mui/material";
import { useReciboPedido } from "./Provider";
import { useEffect, useState, useCallback, useRef } from "react";
import { APICALLER } from "../../../Services/api";
import { NOMBRE_EMPRESA } from "../../../Utils/constants";
import '../../../Styles/recibo.css';
import { funciones } from "../../../App/helpers/funciones";

import { useReactToPrint } from 'react-to-print';

function PrintRecibo() {
    const {dialogs,setDialogs,formSelect} = useReciboPedido()
    const [loading,setLoading] = useState(true)
    const [total,setTotal] = useState(0)
    const divRef = useRef()
    const [lista,setLista] = useState([])
    const close = ()=>{ setDialogs({...dialogs,print:false})}
    const handlePrint = useReactToPrint({content: () => divRef.current});

    const getLista = useCallback(async()=>{
        if(dialogs.print){
            setLoading(true)
            let res = await APICALLER.get({table:'recibo_pedidos_items',
            include:'pedidos',
            on:'id_pedido,pedido_id_recibo' ,where:`recibo_pedido_id,=,${formSelect.id_recibo_pedido}`})
            if(res.response){
                setLista(res.results)
                let tot = 0;
                res.results.forEach(elm => {
                    tot += parseFloat(elm.total_pedido)
                });
                setTotal(tot)
            }else{
                console.log(res);
            }
            setLoading(false)
        }
    },[dialogs,formSelect])

    //console.log(lista);
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    return (<Dialog fullScreen open={dialogs.print} onClose={close}>
        <DialogTitle>
            Imprimir Recibo de pedidos
        </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                    <div id="imprimir" ref={divRef} className="_imprimir_recibo">
                        <div className="_titulo_empresa">
                            <h3>{NOMBRE_EMPRESA}</h3>
                            <h4>CONTROL DE RECIBO</h4>
                        </div>
                        <div className="_detalles_cliente">
                            <p><b>CLIENTE:</b> {formSelect.nombre_cliente} - {formSelect.ruc_cliente}</p>
                            <p><b>CONTROL NRO:</b> {formSelect.id_recibo_pedido}</p>
                            <p><b>FECHA :</b> {formSelect.fecha_recibo}</p>
                        </div>
                        <div className="_items">
                            <table width='100%'>
                                <tbody>
                                    <tr className="_head_items">
                                        <th>PEDIDO</th>
                                        <th>FECHA</th>
                                        <th>CODIGO</th>
                                        <th>VALOR</th>
                                    </tr>
                                    {
                                        lista.map((data,i)=>(
                                        <tr key={i}>
                                            <td>{data.pedido_id_recibo}</td>
                                            <td>{data.fecha_pedido}</td>
                                            <td>{data.codigo_cliente_pedido}</td>
                                            <td>{funciones.numberFormat(data.total_pedido)}</td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="_total">
                            <h4>TOTAL: {funciones.numberFormat(total)}</h4>
                        </div>
                        <div className="_firmas">
                            <p>___________________________________________</p>
                            {formSelect.nombre_cliente}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button startIcon={<Icon>print</Icon>} onClick={handlePrint} variant="contained">IMPRIMIR</Button>
            <Button onClick={close} variant="outlined">CERRAR</Button>
        </DialogActions>
    </Dialog>  );
}

export default PrintRecibo;