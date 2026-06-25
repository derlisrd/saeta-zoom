import { Button, Icon } from "@mui/material";

function ListadoAgregado({productos,eliminar}) {


    


    return ( <table width='100%' >
    <tbody>
        <tr style={{ background:'black',color:'white' }}>
            <th>COD.</th>
            <th>PRODUCTO</th>
            <th>PORCENTAJE</th>
            <th>PRECIO DESCUENTO</th>
            <th>ACCION</th>
        </tr>
        {productos.map((e,i)=>(
            <tr key={i}>
                <td>{e.codigo_producto}</td>
                <td>{e.nombre_producto}</td>
                <td>{e.porcentaje_descuento} %</td>
                <td>{e.precio_descuento} </td>
                <td><Button variant="outlined" color="error" startIcon={<Icon>delete_forever</Icon>} onClick={()=>{eliminar(e.id_descuento)}}>Eliminar</Button></td>
            </tr>
        ))}
    </tbody>
</table> );
}

export default ListadoAgregado;