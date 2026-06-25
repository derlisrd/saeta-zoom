import { Button, Box, Tooltip } from "@mui/material";
import { useInventario } from "./InventarioProvider";
import { Fragment, useState, useEffect, useRef } from "react";
import { funciones } from "../../../App/helpers/funciones";
import style from './style.module.css'
import CorregirInputBloco from "./CorregirInputBloco";

function TableStockBloco() {
    const {stock,rangos,setFormSelect,setStock} = useInventario()
    const [formStock,setFormStock] = useState([])
    const tableRef = useRef(null); 
    const widthTh = 100/(rangos.bases.length + 2);
    const onDownload = ()=>{}
    //console.log(stock);
    const corregir = (adicion,base,lado,stockActual,id,deposito_id)=>{
        //console.log(adicion,base,lado,stock,id);

        let copy_stock = [ ...stock]
        let indexAdicion = copy_stock.findIndex(a=> a.adicion === adicion)
        let indexBase = copy_stock[indexAdicion].bases.findIndex(b=> b.lado === lado && b.base.base === base )
        copy_stock[indexAdicion].bases[indexBase].edit = true;

        setStock(copy_stock)

        setFormSelect({
            stock_producto_deposito: stockActual,
            id_productos_deposito: id,
            deposito_id,
            indexAdicion,
            indexBase,
            adicion,
            base,
            lado
          })
    }
    
    useEffect(() => {
        setFormStock(stock)
      },[stock]);

    return (<Box sx={{ margin:'0 8px' }}>
    <h4 style={{ textAlign:'center' }}>BASE</h4>
    <table width='100%'  ref={tableRef} className={style.table_stock} border={1}>
      <tbody>
        <tr className={style.head}>
          <th>ADICION</th>
          {
            rangos.bases.map((e,i)=>(
              <th width={ `${widthTh}%`} key={i}>{e.base} {e.string}</th>
            ))
          }
          <th>TOTAL</th>
        </tr>
        {
          formStock.map((a,i)=>(
            <tr key={i}>
              <td> {funciones.addZeros(a.adicion)}</td>
              {
                a.bases.map((b,index)=>(
                  <Fragment key={index}>
                    <td>
                      { b.edit ? <CorregirInputBloco /> : <Tooltip title={<h3>BASE: {b.base.base} ADICION: {a.adicion} LADO: {b.base.string}</h3>} arrow><p onClick={()=>{ corregir(a.adicion,b.base.base,b.lado,b.stock,b.id_productos_deposito,b.deposito_id); }}>{b.stock}</p></Tooltip> }
                    </td>
                  </Fragment>
                ))
              }
              <td> <b>{a.total}</b> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <Button sx={{ mt:2 }} variant='contained' size='large' onClick={onDownload}> Excel </Button>
    </Box>);
}

export default TableStockBloco;