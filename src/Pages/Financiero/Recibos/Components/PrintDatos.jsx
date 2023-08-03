import { funciones } from '../../../../App/helpers/funciones';
import style from '../print.module.css'

function PrintDatos({datos,styles}) {
    return (<div className={style.print_container} style={styles ? styles : null}>
        <div className={style.cabeza}></div>
        <div className={style.cuerpo}>
            <div className={style.facturas}>
                <div className={style.montos_facturas}>
                {
                    datos.facturas.map((e,i)=>(
                        <div key={i} className={style.facturas_items}>
                            <div className={style.factura_nro}>
                                {e.nro_factura}
                            </div>
                            <div className={style.factura_importe}>
                                {funciones.numberFormat(e.total_factura)}
                            </div>
                        </div>
                    ))
                }
                </div>
                <div className={style.total_numero_factura}>
                    <p>{funciones.numberFormat(datos.total_recibo)}</p>
                </div>
            </div>
            <div className={style.datos}>
                <div className={style.fecha}>
                    <div className={style.dia}>
                        <p>{funciones.getDiaString(datos.fecha_recibo + " 00:00:01")}</p>
                    </div>
                    <div className={style.mes}>
                        <p>{funciones.getMesString(datos.fecha_recibo + " 00:00:01")}</p>
                    </div>
                    <div className={style.year}>
                        <p>{funciones.get2lastYear(datos.fecha_recibo + " 00:00:01")}</p>
                    </div>
                    <div className={style.monto}>
                        <p>{funciones.numberFormat(datos.total_recibo)}</p>
                    </div>
                </div>
                <div className={style.cliente}>
                    <p>{datos.nombre_cliente}</p>
                </div>
                <div className={style.ruc}>
                    <p>{datos.ruc_cliente}</p>
                </div>

                <div className={style.pagos}>
                    <div className={style.efectivo}>
                        <span className={style.efectivo_x}> {(parseFloat(datos.efectivo_recibo)>0) && 'X'} </span>
                        <span>{funciones.numberFormat(datos.efectivo_recibo)}</span>
                    </div>
                    <div className={style.transferencia}>
                    <span className={style.transferencia_x}> {(parseFloat(datos.transferencia_recibo)>0) && 'X'} </span>
                    <span>{funciones.numberFormat(datos.transferencia_recibo)}</span>
                    </div>
                    <div className={style.cheque}>
                        <div className={style.cheque_nro}>
                            <span className={style.cheque_x}> {(parseFloat(datos.cheque_recibo)>0) && 'X'} </span>
                            <span>{datos.cheque_nro_recibo}</span>
                        </div>
                        <div className={style.banco}>
                            <span>{datos.banco_recibo}</span>
                        </div>
                        <div className={style.cheque_total}>
                            <span>{funciones.numberFormat(datos.cheque_recibo)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PrintDatos;