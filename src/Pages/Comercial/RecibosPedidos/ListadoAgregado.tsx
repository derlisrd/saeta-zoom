import { Button, Icon } from "@mui/material";
import { funciones } from "../../../App/helpers/funciones";

function ListadoAgregado({pedidos,eliminar}) {
    return ( <table width='100%' >
    <tbody>
        <tr style={{ background:'black',color:'white' }}>
            <th>PEDIDO.</th>
            <th>FECHA</th>
            <th>CLIENTE</th>
            <th>TOTAL</th>
            <th>ACCION</th>
        </tr>
        {pedidos.map((e,i)=>(
            <tr key={i}>
                <td>{e.id_pedido}</td>
                <td>{e.fecha_pedido}</td>
                <td>{e.nombre_cliente}</td>
                <td>{funciones.numberFormat(e.total_pedido)} </td>
                <td><Button variant="outlined" color="error" startIcon={<Icon>delete_forever</Icon>} onClick={()=>{eliminar(i)}}>Eliminar</Button></td>
            </tr>
        ))}
    </tbody>
</table> );
}

export default ListadoAgregado;