import { Button } from "@mui/material";
import style from './style.module.css';
import { funciones } from "../../../../App/helpers/funciones";

function ListaFacturasRecibo({ listado,borrar }) {
  return (
    <table width='100%' className={style.lista} border='1'>
        <thead>
            <tr>
                <th>#</th>
                <th>NRO</th>
                <th>TOTAL</th>
                <th>FECHA</th>
                <th>ACCIONES</th>
            </tr>
        </thead>
      <tbody>
        {listado.map((e, i) => (
          <tr key={i}>
            <td>{e.id_factura}</td>
            <td>{e.nro_factura}</td>
            <td>{funciones.numberFormat(e.total_factura)}</td>
            <td>{e.fecha_factura}</td>
            <td><Button variant="outlined" onClick={()=>{borrar(e.id_factura)}} color="error" >ELIMINAR</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaFacturasRecibo;
