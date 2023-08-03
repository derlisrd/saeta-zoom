import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useAuth } from "../../../Providers/AuthProvider";
import './stylos.css'
import { funciones } from "../../../App/helpers/funciones";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function FinalizarPedido() {

    const {userData} = useAuth()
    const {dialogs,setDialogs,factura} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,finalizar:false}) }

    const imprimir = ()=>{
        
    }

    return ( <Dialog open={dialogs.finalizar} onClose={close} fullScreen >
        <DialogTitle><ButtonTip title='Volver' icon='arrow_back' onClick={close} /> Imprimir pedido</DialogTitle>
        <DialogContent>
            <div id="print">
                <table className="table_pedido" width='100%' border="1">
                    <tbody>
                        <tr><td colSpan={5}><h1>PEDIDO NRO: {1} - USO INTERNO</h1></td></tr>
                        <tr>
                            <td>Vendedor: {userData.nombre_user}</td>
                            <td>Cliente: {factura.cliente.nombre_cliente} {factura.cliente.ruc_cliente} </td>
                            <td>Direccion: {factura.cliente.direccion_cliente} </td>
                            <td>Fecha: {factura.fecha}</td>
                            <td>Hora: {factura.hora}</td>
                        </tr>
                    </tbody>
                </table>
            <table className="table_pedido" width='100%' border='1'>
                <tbody>
                <tr className="table_head">
                    <td width="10%">CODIGO</td>
                    <td width="30%">DESCRIPCION</td>
                    <td width="10%">CANT</td>
                    <td width="10%">UNITARIO</td>
                    <td width="10%">EXENTA</td>
                    <td width="15%">GRAVADA 5%</td>
                    <td width="15%">GRAVADA 10%</td>
                </tr>
                {
                factura.items.map((e,i)=>(
                    <tr key={i} >
                        <td width="10%">{e.codigo}</td>
                        <td width="30%">{e.descripcion}</td>
                        <td width="10%">{e.cantidad}</td>
                        <td width="10%">{funciones.numberFormat(e.precio)}</td>
                        <td width="10%">{e.iva ===0 ? funciones.numberFormat(e.precio*e.cantidad) : 0}</td>
                        <td width="15%">{e.iva ===5 ? funciones.numberFormat(e.precio*e.cantidad) : 0}</td>
                        <td width="15%">{e.iva ===10 ? funciones.numberFormat(e.precio*e.cantidad) : 0}</td>
                    </tr>
                ))
                }
                <tr><td colSpan={7}>{' '}</td></tr>
                <tr className="table_head">
                    <td colSpan={4}>
                        SUB:
                    </td>
                    <td width="10%">{factura.exenta}</td>
                    <td width="15%">{factura.iva5}</td>
                    <td width="15%">{ funciones.numberFormat( factura.iva10)}</td>
                </tr>
                <tr>
                    <td colSpan={4}>LIQUIDACION IVA </td>
                    <td>IVA 5%: { funciones.redondeo2decimalesNumberFormat( factura.iva5/21 )}</td>
                    <td>IVA 10%: { funciones.redondeo2decimalesNumberFormat( factura.iva10/11 )}</td>
                    <td>TOTAL: { funciones.redondeo2decimalesNumberFormat( (factura.iva5/21)+(factura.iva10/11)) } </td>
                </tr>
                <tr className="table_head">
                    <td colSpan={6}></td>
                    <td>TOTAL: {funciones.numberFormat(factura.total)}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </DialogContent>
        <DialogActions>
            <Button color="info" variant="outlined" onClick={close} size="large"> CERRAR </Button>
            <Button color="success" variant="contained" onClick={imprimir} size="large"> IMPRIMIR </Button>
        </DialogActions>
    </Dialog> );
}

export default FinalizarPedido;