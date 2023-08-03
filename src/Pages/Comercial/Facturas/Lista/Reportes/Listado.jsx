import { funciones } from "../../../../../App/helpers/funciones";
import '../../../../../Styles/reportes.css';

function Listado({listado}) {
  return (
    <div id='_pdf'>
    <table width="100%">
      <tbody>
        <tr>
          <th>Fecha</th>
          <th>Nro</th>
          <th>Ruc</th>
          <th>Cliente</th>
          <th>Condición</th>
          <th>Total</th>
        </tr>
        {listado.map((e, i) => (
          <tr key={i}>
            <td>{(e.fecha_factura)}</td>
            <td>{e.nro_factura}</td>
            <td>{e.ruc_cliente}</td>
            <td>{e.nombre_cliente}</td>
            <td>{e.condicion}</td>
            <td>{ funciones.numberFormat(e.total_factura) }</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Listado;
