import { TextField } from "@mui/material";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import { useInventario } from "./InventarioProvider";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../Services/api";

function CorregirInputBloco() {
    const {formSelect,setStock,stock,token_user,formInfo} = useInventario()
    const [formStock,setFormStock] = useState({})

        const cambiar = async(e)=>{
            let nuevo_stock = (document.getElementById('_id_producto').value);
            let s = [...stock]
            if(e.key==='Escape'){
                s[formSelect.indexAdicion].bases[formSelect.indexBase].edit = false;
                setStock(s)
                return;
            }
            if(e.key==='Enter'){
                if(nuevo_stock === ''){
                    return;
                }
                let f = {...formStock}
                let last_id = null;
                delete f.indexAdicion
                delete f.indexBase
                console.log(f);

                if(f.id_productos_deposito){
                
                    let res = await APICALLER.update({table:'productos_depositos',data:{stock_producto_deposito: nuevo_stock},id:f.id_productos_deposito, token:token_user})
                    if(!res.response){
                       swal({text:'Ocurrió un error',title:'error',icon:'warning',timer:2000})
                    }
                    
                }else{
                    delete f.id_productos_deposito 
                    f.stock_producto_deposito = nuevo_stock
                    f.producto_id = formInfo.id_producto
                    let res = await APICALLER.insert({table:'productos_depositos',data:f,token:token_user})
                    if(res.response){
                        last_id = res.last_id
                    }
                    s[formSelect.indexAdicion].bases[formSelect.indexBase].id_productos_deposito = last_id
                }
                s[formSelect.indexAdicion].bases[formSelect.indexBase].edit = false;
                s[formSelect.indexAdicion].bases[formSelect.indexBase].stock = parseInt(nuevo_stock)
                s[formSelect.indexAdicion].total +=  parseInt(nuevo_stock)
                setStock(s)
            }
            
        }

        useEffect(()=>{
            setFormStock(formSelect)
        },[formSelect])

    return ( <TextField variant="standard" size="small" value={formStock.stock_producto_deposito} id="_id_producto" name="stock_producto_deposito" autoFocus  onKeyUp={cambiar} InputProps={{inputProps: { min: 0 },inputComponent: NumberFormatCustom}}  />);
}

export default CorregirInputBloco;