import { InputAdornment, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { APICALLER } from "../../../../Services/api";

function ConsultarProducto({setErr,setProduct,ref}) {

    const [loading,setLoading] = useState(false)
    const consultar = async (e)=>{
        const {value} = e.target
        if(value.length>0 && !value==""){
            setErr({active:false,code:0,msg:''})
            setLoading(true)
            let res = await APICALLER.get({table:'productos',fields:'nombre_producto,codigo_producto,id_producto,precio_producto',
            where:`codigo_producto,=,'${value}'`})
            if(res.response){
                if(res.found>0){
                    setProduct(res.results[0])
                }else{
                    setProduct(null)
                    setErr({active:true,code:404,msg:'No existe producto'})
                }
            }else{
                console.log(res);
            }
        }
        setLoading(false)
    }

    return ( <Grid container spacing={0}>
        <Grid item xs={12}>
            <TextField id='__inputCodigo' fullWidth helperText='Presione luego Enter' onKeyUp={(e)=>{ e.key==='Enter' && consultar(e) }} label='Codigo producto' 
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        {loading && <CircularProgress size={24} />}
                      </InputAdornment>
                    )
                  }}
                  
            />
        </Grid>
    </Grid> );
}

export default ConsultarProducto;