import { funciones } from "../../../App/helpers/funciones";
import '../../../Styles/reportes.css'

function DocumentoExcel({lista}) {
    return (<table width='100%'>
    <tbody>
        <tr className="_pdf_head">
            <td>Fecha</td>
            <td>NroPedido</td>
            <td>Codigo interno</td>
            <td>Vendedor</td>
            <td>Cliente</td>
            <td>Tipo</td>
            <td>Facturado</td>
            <td>Total</td>
        </tr>
        {
            lista.map((e,i)=>(
                <tr key={i}>
                    <td>{e.fecha_pedido}</td>
                    <td>{e.id_pedido}</td>
                    <td>{e.codigo_cliente_pedido}</td>
                    <td>{e.nombre_user}</td>
                    <td>{e.nombre_cliente}</td>
                    <td>{e.tipo}</td>
                    <td>{e.facturado}</td>
                    <td>{funciones.numberFormat( e.total_pedido)}</td>
                </tr>
            ))
        }
    </tbody>
</table>);
}

export default DocumentoExcel;