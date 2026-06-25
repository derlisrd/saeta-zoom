import { funciones } from "../../../../../App/helpers/funciones";

function TablasDatos({factura,style}) {
    return ( <div style={style ? style : null}>
            <table className="tablas nro_factura" >
              <tbody>
                <tr>
                  <td width="70%"></td>
                  <td width="30%" valign="bottom" align="center">
                    {factura.nro_factura}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="tablas info_cliente">
              <tbody>
                <tr>
                  <td width="15%"></td>
                  <td width="65%">
                    <p>{factura.fecha}</p>
                    <p>{factura.cliente.nombre_cliente}</p>
                    <p>{factura.cliente.direccion_cliente}</p>
                    <p>{factura.cliente.ruc_cliente}</p>
                  </td>
                  <td>
                    <b>{factura.tipo_factura==='1' ? 'CONTADO' : 'CREDITO'}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="descripciones">
            {factura.items.map((e,i)=>(
              <div key={i} className="items_descripciones">
                  <div className="cod">{e.codigo_producto}</div>
                  <div className="cant">{e.cantidad}</div>
                  <div className="nombre_des">{e.nombre_producto}</div>
                  <div className="precio_uni">{funciones.numberFormat(e.precio)}</div>
                  <div className="exenta">{e.iva===0 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</div>
                  <div className="iva5">{e.iva===5 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</div>
                  <div className="iva10">{e.iva===10 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</div>
              </div>
            )) }
            </div>
                <table className='tablas subtotales' >
                    <tbody>
                        <tr>
                            <td width='64%'></td>
                            <td width='12%'>{funciones.numberFormat(factura.exenta)}</td>
                            <td width='12%'>{funciones.numberFormat(factura.iva5)}</td>
                            <td width='12%'>{funciones.numberFormat(factura.iva10)}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}> {funciones.NumeroALetras(factura.total,"")}</td>
                            <td > {funciones.numberFormat(factura.total)}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='tablas liquidacion_iva' >
                    <tbody>
                        <tr>
                            <td width='30%'></td>
                            <td width='20%'>{funciones.numberFormat(factura.liquiiva5)}</td>
                            <td width='20%'>{funciones.numberFormat(factura.liquiiva10)}</td>
                            <td width='30%'>{funciones.numberFormat(factura.liquiivatotal)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="spacing_bottom"></div>
                </div>
 );
}

export default TablasDatos;