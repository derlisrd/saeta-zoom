import { env } from "../../../../App/config";
import { funciones } from "../../../../App/helpers/funciones";
import { useAuth } from "../../../../Providers/AuthProvider";
import ConReceta from "./ConReceta";
import SoloCristal from "./SoloCristal";



function Ticket({factura,userData,nro}) {

    const {dataEmpresa} = useAuth()
    const armazones = env.ARMAZONES.find(e=> e.id_armazon === factura.obs.armazon_id)
    const nombre_armazon = armazones.nombre_armazon
    const tipoPedido = {"1":"NORMAL PRESCRIPCION","2":"CORTESIA","3":"GARANTIA","4":"VENTA NORMAL SOLO CRISTAL"}



    return ( <>
    <table className="table_pedido" width='100%'>
        <tbody>
            <tr><td><h1>{dataEmpresa.nombre_empresa}</h1></td></tr>
            <tr><td><h1>PEDIDO NRO: {nro} - USO INTERNO</h1></td></tr>
            <tr><td align="center"><h3>TIPO DE PEDIDO: { tipoPedido[factura.tipo_pedido] }</h3></td></tr>
            <tr><td>FECHA: {factura.fecha}</td></tr>
            <tr><td>VENDEDOR: {userData.nombre_user}</td></tr>
            <tr><td>DOC: {factura.cliente.ruc_cliente} COD: {factura.cliente.id_cliente}</td></tr>
            <tr><td>CLIENTE: {factura.cliente.nombre_cliente} _ {factura.cliente?.fantasia_cliente}</td></tr>
            <tr><td>CODIGO CLIENTE: {factura.codigo_cliente_pedido} </td></tr>
            <tr><td>DIRECCION: {factura.cliente.direccion_cliente} </td></tr>
        </tbody>
    </table>
    <table className="table_pedido" width='100%' border='1'>
    <tbody>
    <tr className="table_head">
        <td>COD.</td>
        <td>CANT.</td>
        <td>DESCRIP</td>
        <td>PRECIO</td>
    </tr>
    {
    factura.items.map((e,i)=>(
        <tr key={i} >
            <td>{e.codigo}</td>
            <td>{e.cantidad}</td>
            <td>{e.descripcion}</td>
            <td>{funciones.numberFormat(e.precio * e.cantidad)}</td>
        </tr>
    ))
    }
    <tr><td align="right" colSpan={4}><b>TOTAL: {funciones.numberFormat(factura.total)} </b></td></tr>
    </tbody>
    </table>
    
    {
        <ConReceta  items={factura.items} tipo={factura.tipo_pedido} />
    }
    



    <table className="table_pedido" border='1'>
        <tbody>
            <tr>
                <td>
                    ARMAZON: {nombre_armazon} 
                </td>
            </tr>
            <tr>
                <td>
                    OBS LABORATORIO: {factura.obs.laboratorio} 
                </td>
            </tr>
            <tr>
                <td>
                    OBS CLIENTE: {factura.obs.cliente} 
                </td>
            </tr>
        </tbody>
    </table>
</> );
}

export default Ticket;