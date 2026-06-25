import { Button,Box, Tooltip} from '@mui/material';
import style from './style.module.css'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Fragment, useEffect, useState,useRef } from 'react';
import { useInventario } from './InventarioProvider';
import CorregirInput from './CorregirInput';
import { funciones } from '../../../App/helpers/funciones';


function TableStock() {

  const {stock,rangos,setFormSelect,setStock} = useInventario()
  const tableRef = useRef(null); 
  const [formStock,setFormStock] = useState([])
  const widthTh = 100/(rangos.cilindrico.length + 2);
  
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Producto_name',
    sheet: 'Inventario'
})


  const openCorregir = (esf,cil,stockActual,producto_id,deposito_id,id_productos_deposito)=>{
   
    let copy_stock = [ ...stock]
    let foundEsfe = copy_stock.find(e=> e.esferico === esf)
    let indexEsfe = copy_stock.findIndex(e=> e.esferico ===esf)
    //let foundCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === formEdit.graduacion_cilindrico)
    let indexCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === cil)
    copy_stock[indexEsfe].cilindrico[indexCili].edit = true;
    setStock(copy_stock)

    setFormSelect({
      stock_producto_deposito: stockActual,
      producto_id:producto_id,
      deposito_id:deposito_id,
      graduacion_esferico:esf,
      graduacion_cilindrico:cil,
      id_productos_deposito: id_productos_deposito,
      indexEsferico: indexEsfe,
      indexCilindrico: indexCili
    })
    //setDialogs({...dialogs,corregir:true})
    //console.log(esf,cil,stock,deposito_id);
  }

  /* const change = (event,index)=>{
    const {value} = event.target
    let new_form = [...formStock]
    new_form[index].stock_producto_deposito = value
    setFormStock(new_form)
  } */

  useEffect(() => {
    setFormStock(stock)
  },[stock]);

  //console.log(formStock);

  return (<Box sx={{ margin:'0 8px' }}>
    <h4 style={{ textAlign:'center' }}>CILINDRICO</h4>
    <table width='100%'  ref={tableRef} className={style.table_stock} border={1}>
      <tbody>
        <tr className={style.head}>
          <th>Esferico</th>
          {
            rangos.cilindrico.map((e,i)=>(
              <th width={ `${widthTh}%`} key={i}>{funciones.addZeros(e)}</th>
            ))
          }
          <th>TOTAL</th>
        </tr>
        {
          formStock.map((e,i)=>(
            <tr key={i}>
              <td> {funciones.addZeros(e.esferico)}</td>
              {
                e.cilindrico.map((c,index)=>(
                  <Fragment key={index}>
                    <td>
                      {c.edit ? <CorregirInput /> : <Tooltip title={<h3>ESF: {e.esferico} CIL: {c.cilindrico}</h3>} arrow><p onClick={()=>{ openCorregir(e.esferico,c.cilindrico,c.stock,c.producto_id,c.deposito_id,c.id_productos_deposito)}}>{c.stock}</p></Tooltip>}
                    </td>
                  </Fragment>
                ))
              }
              <td> <b>{e.total}</b> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <Button sx={{ mt:2 }} variant='contained' size='large' onClick={onDownload}> Excel </Button>
    </Box>
  );
}

export default TableStock;
