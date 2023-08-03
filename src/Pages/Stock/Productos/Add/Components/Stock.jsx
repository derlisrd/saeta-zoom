
import ButtonTip from "../../../../../Components/Botones/ButtonTip";

function Stock({ stock, setStock}) {
    
    const borrar = (i)=>{
      let fact = [...stock]
      fact.splice(i,1)
      setStock(fact)
    }
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>Dep</td>
          <td>Ca</td>
          <td>Esf</td>
          <td>Cil</td>
          <td>Eje</td>
          <td>Acc</td>
        </tr>
        {stock.map((e, i) => (
          <tr key={i}>
            <td>{e.deposito_id}</td>
            <td>{e.stock_producto_deposito}</td>
            <td>{e.graduacion_cilindrico}</td>
            <td>{e.graduacion_esferico}</td>
            <td>{e.eje}</td>
            <td><ButtonTip onClick={()=>borrar(i)} title='Borrar' icon="delete_forever" /> </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Stock;
