import swal from "sweetalert";
import { TextField } from "@mui/material";
import { useInventario } from "./InventarioProvider";
import { useEffect, useState } from "react";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import { APICALLER } from "../../../Services/api";

function CorregirInput() {
    const {formSelect,setStock,stock,token_user} = useInventario()
    const [formStock,setFormStock] = useState({})
    const change = e=>{
        setFormStock({...formStock,stock_producto_deposito:e.target.value})
    }



    const cambiar = async(e)=>{
        let s = [...stock]
        if(e.key==='Escape'){
            s[formSelect.indexEsferico].cilindrico[formSelect.indexCilindrico].edit = false
            setStock(s)
        }
        if(e.key === 'Enter'){
            let f = {...formStock}
            let last_id = null;
            delete f.indexEsferico
            delete f.indexCilindrico
            if(f.id_productos_deposito){
                
                let res = await APICALLER.update({table:'productos_depositos',data:{stock_producto_deposito: f.stock_producto_deposito},id:f.id_productos_deposito, token:token_user})
                if(!res.response){
                   swal({text:'Ocurrió un error',title:'error',icon:'warning',timer:2000})
                }
                
            }else{
                delete f.id_productos_deposito 
                let res = await APICALLER.insert({table:'productos_depositos',data:f,token:token_user})
                if(res.response){
                    last_id = res.last_id
                }
            }
            s[formSelect.indexEsferico].cilindrico[formSelect.indexCilindrico].edit = false
            s[formSelect.indexEsferico].cilindrico[formSelect.indexCilindrico].stock = parseInt(f.stock_producto_deposito)
            s[formSelect.indexEsferico].cilindrico[formSelect.indexCilindrico].id_productos_deposito = last_id
            s[formSelect.indexEsferico].total +=  parseInt(f.stock_producto_deposito)
            setStock(s)
        }
    }

    useEffect(()=>{
        setFormStock(formSelect)
    },[formSelect])

    return ( <TextField variant="standard" size="small" value={formStock.stock_producto_deposito} onChange={change} name="stock_producto_deposito" autoFocus  onKeyUp={cambiar} InputProps={{inputProps: { min: 0 },inputComponent: NumberFormatCustom}}  /> );
}

export default CorregirInput;