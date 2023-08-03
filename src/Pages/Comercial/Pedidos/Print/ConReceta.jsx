import { useEffect, useState } from "react"
import { funciones } from "../../../../App/helpers/funciones"

function ConReceta({items,tipo}) {
    const [derecho,setDerecho] = useState(null)
    const [izquierdo,setIzquierdo] = useState(null)
    const [ambos,setAmbos] = useState(null)

    useEffect(()=>{
        items.forEach(elem=>{
            if(elem.tipo===1){
                //console.log(elem);
                if(elem.lado==='derecho')
                {
                    setDerecho( elem.receta )
                }
                if(elem.lado==='izquierdo')
                {
                    setIzquierdo ( elem.receta )
                }
                if(elem.lado==='ambos')
                {
                    setAmbos(elem.receta )
                }
            }
        })
    },[items])
    



    return ( <>
    <h1>{tipo==='4' ? 'SOLO CRISTAL' : 'RECETA'}</h1>
    
    {
        derecho && 
        <table className="table_pedido" border='1'>
        <thead>
            <tr>
                <th>OJO DERECHO</th>
                <th colSpan={4}>COD: {derecho.codigo_derecho}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width='20%'></td>
                <td width='20%'><b>ESF</b></td>
                <td width='20%'><b>CIL</b></td>
                <td width='20%'><b>EJE</b></td>
                <td width='20%'>DNP</td>
            </tr>
            <tr>
                <td width='20%'><b>LEJOS</b></td>
                <td width='20%'>{funciones.addZeros( derecho.lejos_derecho_esferico)}</td>
                <td width='20%'>{ funciones.addZeros(derecho.lejos_derecho_cilindrico)}</td>
                <td width='20%'>{derecho.lejos_eje_derecho}</td>
                <td width='20%'>{derecho.dnp_derecho}</td>
            </tr>
            <tr>
                <td width='20%'><b>ADICION</b></td>
                <td width='20%'>{funciones.addZeros(derecho.adicion_derecho)}</td>
                <td width='20%'></td>
                <td width='20%'></td>
                <td width='20%'>ALTURA</td>
            </tr>
            <tr>
                <td width='20%'><b>CERCA</b></td>
                <td width='20%'>{funciones.addZeros(derecho.cerca_derecho_esferico)}</td>
                <td width='20%'>{funciones.addZeros(derecho.cerca_derecho_cilindrico)}</td>
                <td width='20%'>{derecho.cerca_eje_derecho}</td>
                <td width='20%'>{derecho.altura_derecho}</td>
            </tr>
        </tbody>
    </table>
    }

    {
        izquierdo &&
        <table className="table_pedido" border='1'>
        <thead>
            <tr>
                <th>OJO IZQUIERDO</th>
                <th colSpan={4}>COD: {izquierdo.codigo_izquierdo}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width='20%'></td>
                <td width='20%'><b>ESF</b></td>
                <td width='20%'><b>CIL</b></td>
                <td width='20%'><b>EJE</b></td>
                <td width='20%'><b>DNP</b></td>
            </tr>
            <tr>
                <td width='20%'><b>LEJOS</b></td>
                <td width='20%'>{funciones.addZeros(izquierdo.lejos_izquierdo_esferico)}</td>
                <td width='20%'>{funciones.addZeros(izquierdo.lejos_izquierdo_cilindrico)}</td>
                <td width='20%'>{izquierdo.lejos_eje_izquierdo}</td>
                <td width='20%'><b>{izquierdo.dnp_izquierdo}</b></td>
            </tr>
            <tr>
                <td width='20%'><b>ADICION</b></td>
                <td width='20%'>{funciones.addZeros(izquierdo.adicion_izquierdo)}</td>
                <td width='20%'></td>
                <td width='20%'></td>
                <td width='20%'>ALTURA</td>
            </tr>
            <tr>
                <td width='20%'><b>CERCA</b></td>
                <td width='20%'>{funciones.addZeros(izquierdo.cerca_izquierdo_esferico)}</td>
                <td width='20%'>{funciones.addZeros(izquierdo.cerca_izquierdo_cilindrico)}</td>
                <td width='20%'>{izquierdo.cerca_eje_izquierdo}</td>
                <td width='20%'>{izquierdo.altura_izquierdo}</td>
            </tr>
        </tbody>
    </table>
    }


    {
        ambos && <>
        <table className="table_pedido" border='1'>
        <thead>
            <tr>
                <th>OJO DERECHO</th>
                <th colSpan={4}>COD: {ambos.codigo_derecho}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width='20%'></td>
                <td width='20%'><b>ESF</b></td>
                <td width='20%'><b>CIL</b></td>
                <td width='20%'><b>EJE</b></td>
                <td width='20%'>DNP</td>
            </tr>
            <tr>
                <td width='20%'><b>LEJOS</b></td>
                <td width='20%'>{funciones.addZeros( ambos.lejos_derecho_esferico)}</td>
                <td width='20%'>{ funciones.addZeros(ambos.lejos_derecho_cilindrico)}</td>
                <td width='20%'>{ambos.lejos_eje_derecho}</td>
                <td width='20%'>{ambos.dnp_derecho}</td>
            </tr>
            <tr>
                <td width='20%'><b>ADICION</b></td>
                <td width='20%'>{funciones.addZeros(ambos.adicion_derecho)}</td>
                <td width='20%'></td>
                <td width='20%'></td>
                <td width='20%'>ALTURA</td>
            </tr>
            <tr>
                <td width='20%'><b>CERCA</b></td>
                <td width='20%'>{funciones.addZeros(ambos.cerca_derecho_esferico)}</td>
                <td width='20%'>{funciones.addZeros(ambos.cerca_derecho_cilindrico)}</td>
                <td width='20%'>{ambos.cerca_eje_derecho}</td>
                <td width='20%'>{ambos.altura_derecho}</td>
            </tr>
        </tbody>
    </table>

    <table className="table_pedido" border='1'>
        <thead>
            <tr>
                <th>OJO IZQUIERDO</th>
                <th colSpan={4}>COD: {ambos.codigo_izquierdo}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width='20%'></td>
                <td width='20%'><b>ESF</b></td>
                <td width='20%'><b>CIL</b></td>
                <td width='20%'><b>EJE</b></td>
                <td width='20%'><b>DNP</b></td>
            </tr>
            <tr>
                <td width='20%'><b>LEJOS</b></td>
                <td width='20%'>{funciones.addZeros(ambos.lejos_izquierdo_esferico)}</td>
                <td width='20%'>{funciones.addZeros(ambos.lejos_izquierdo_cilindrico)}</td>
                <td width='20%'>{ambos.lejos_eje_izquierdo}</td>
                <td width='20%'><b>{ambos.dnp_izquierdo}</b></td>
            </tr>
            <tr>
                <td width='20%'><b>ADICION</b></td>
                <td width='20%'>{funciones.addZeros(ambos.adicion_izquierdo)}</td>
                <td width='20%'></td>
                <td width='20%'></td>
                <td width='20%'>ALTURA</td>
            </tr>
            <tr>
                <td width='20%'><b>CERCA</b></td>
                <td width='20%'>{funciones.addZeros(ambos.cerca_izquierdo_esferico)}</td>
                <td width='20%'>{funciones.addZeros(ambos.cerca_izquierdo_cilindrico)}</td>
                <td width='20%'>{ambos.cerca_eje_izquierdo}</td>
                <td width='20%'>{ambos.altura_izquierdo}</td>
            </tr>
        </tbody>
    </table></>
    }
    
    </> );
}

export default ConReceta;