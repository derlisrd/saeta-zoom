import { funciones } from "../../../App/helpers/funciones";
import '../../../Styles/reportes.css'

function DocumentoPDF({selectCliente,desde,hasta,lista,detalles}) {
    return ( <div id='_pdf'>
    <table width='100%' className="_pdf_detalles">
        <tbody>
            <tr>
                <th>
                    CLIENTE: {selectCliente?.id_cliente} {selectCliente?.nombre_cliente} {selectCliente?.ruc_cliente}
                </th>
            </tr>
            <tr>
                <th>
                    FECHA INICIO: {desde}
                </th>
            </tr>
            <tr>
                <th>
                    FECHA FIN: {hasta}
                </th>
            </tr>
        </tbody>
    </table>
    <table width='100%'>
        <tbody>
            <tr className="_pdf_head">
                <td>Fecha</td>
                <td>Nro</td>
                <td>Codigo Int</td>
                <td>Cliente</td>
                <td>Codigo</td>
                <td>Prod./Serv.</td>
                <td>Cant</td>
                <td>Precio</td>
                <td>Total</td>
            </tr>
            {
                lista.map((e,i)=>(
                    <tr key={i}>
                        <td>{funciones.fechaActualDMY( e.fecha_pedido)}</td>
                        <td>{e.id_pedido}</td>
                        <td>{e.codigo_cliente_pedido}</td>
                        <td>{e.nombre_cliente}</td>
                        <td>{e.codigo_producto}</td>
                        <td>{e.nombre_producto}</td>
                        <td>{e.cantidad_pedido}</td>
                        <td>{funciones.numberFormat(e.precio_venta_item)}</td>
                        <td>{funciones.numberFormat(e.total_pedido)}</td>
                    </tr>
                ))
            }
            <tr>
                <th colSpan={6} align="right">
                    TOTAL:
                </th>
                <th> 
                    {funciones.numberFormat( detalles.total )}
                </th>
            </tr>
        </tbody>
    </table>
</div> );
}

export default DocumentoPDF;