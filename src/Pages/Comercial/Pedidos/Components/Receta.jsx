import { Fragment } from "react";
import { usePedidos } from "../PedidosProvider";
import { useState } from "react";
import InputNumerico from "./InputNumerico";

function Receta() {
    const {setearFactura,factura}  = usePedidos()
    const initialParam = {
        lejos_derecho_esferico:'0',
        lejos_derecho_cilindrico:'0',
        lejos_izquierdo_cilindrico:'0',
        lejos_izquierdo_esferico:'0',
        lejos_eje_derecho:'0',
        lejos_eje_izquierdo:'0',

        cerca_derecho_esferico:'0',
        cerca_derecho_cilindrico:'0',
        cerca_izquierdo_cilindrico:'0',
        cerca_izquierdo_esferico:'0',
        cerca_eje_derecho:'0',
        cerca_eje_izquierdo:'0',
        adicion_izquierdo:'0',
        adicion_derecho:'0'
    }
   const [param,setParam] = useState(initialParam)

    const change = e=>{
        const {value,name} = e.target
        let p = {...param}

        if( name === 'lejos_derecho_esferico' && !(parseFloat(p.cerca_derecho_esferico))==0 ){
            p.lejos_derecho_esferico = value
            p.adicion_derecho = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.cerca_derecho_esferico) 
            setParam(p)
            return;
        }

        

        if( name === 'lejos_izquierdo_esferico' && !(parseFloat(p.cerca_derecho_esferico))==0 ){
            p.lejos_izquierdo_esferico = value
            p.adicion_izquierdo = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.cerca_izquierdo_esferico) 
            setParam(p)
            return;
        }

        if(name=== 'cerca_derecho_esferico'){
            let valor = parseFloat(value)
            p.cerca_derecho_esferico = valor
            if(!valor===0){
                p.adicion_derecho = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.cerca_derecho_esferico) 
                setParam(p)
            }
            return;
        }

        if(name=== 'cerca_izquierdo_esferico'){
            let valor = parseFloat(value)
            p.cerca_izquierdo_esferico = valor
            if(!valor===0){
                p.adicion_izquierdo = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.cerca_izquierdo_esferico) 
                setParam(p)
            }
            return;
        }

        if(name=== 'adicion_derecho'){
            p.adicion_derecho = value;
            p.cerca_derecho_esferico = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.adicion_derecho) 
            setParam(p)
            return;
        }

        if(name=== 'adicion_izquierdo'){
            p.adicion_izquierdo = value;
            p.cerca_izquierdo_esferico = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.adicion_izquierdo) 
            setParam(p)
            return;
        }

        setParam({...param, [name]:value})
    }

    

    const key = e=>{
        const {value,name} = e.target
        let p = {...param}
        
        if(e.key==='ArrowUp'){
            let nuevo_valor = parseFloat(value) + 0.25
            p[name] = nuevo_valor
            if(name==='cerca_derecho_esferico'){
                p.adicion_derecho = nuevo_valor + parseFloat(p.lejos_derecho_esferico)
            }
            if(name==='cerca_izquierdo_esferico'){
                p.adicion_izquierdo = nuevo_valor + parseFloat(p.lejos_izquierdo_esferico)
            }
            
            setParam(p) 
        }
        if(e.key==='ArrowDown'){
            let nuevo_valor = parseFloat(value) - 0.25
            p[name] = nuevo_valor
            if(name==='cerca_derecho_esferico'){
                p.adicion_derecho = nuevo_valor + parseFloat(p.lejos_derecho_esferico)
            }
            if(name==='cerca_izquierdo_esferico'){
                p.adicion_izquierdo = nuevo_valor + parseFloat(p.lejos_izquierdo_esferico)
            }
            setParam(p) 
        }
    }

    return (<Fragment>
        <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12}><Typography variant="button">LEJOS</Typography></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO:</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key} autoFocus  name="lejos_derecho_esferico" onChange={change} value={param.lejos_derecho_esferico} fullWidth label='Esférico' /> </Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key} name="lejos_derecho_cilindrico" onChange={change} value={param.lejos_derecho_cilindrico}  label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_eje_derecho" onChange={change} value={param.lejos_eje_derecho}  label='Eje' /></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO:</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key}  name="lejos_izquierdo_esferico" onChange={change} value={param.lejos_izquierdo_esferico} fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key}  name="lejos_izquierdo_cilindrico" onChange={change} value={param.lejos_izquierdo_cilindrico}  label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_eje_izquierdo" onChange={change} value={param.lejos_eje_izquierdo}  label='Eje' /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12}><Typography variant="button">CERCA</Typography></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key} name="cerca_derecho_esferico" onChange={change} value={param.cerca_derecho_esferico} fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key} name="cerca_derecho_cilindrico" onChange={change} value={param.cerca_derecho_cilindrico}   label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_eje_derecho" onChange={change} value={param.cerca_eje_derecho}  label='Eje' /></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key}  name="cerca_izquierdo_esferico" onChange={change} value={param.cerca_izquierdo_esferico}  fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico onKeyUp={key}  name="cerca_izquierdo_cilindrico" onChange={change} value={param.cerca_izquierdo_cilindrico}   label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico name="cerca_eje_izquierdo" onChange={change} value={param.cerca_eje_izquierdo}  label='Eje' /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12} sm={12}><Typography variant="overline">ADICION</Typography></Grid>
                        <Grid item xs={12} sm={6}><InputNumerico onKeyUp={key} name="adicion_derecho" onChange={change} value={param.adicion_derecho} fullWidth label='Derecho' /></Grid>
                        <Grid item xs={12} sm={6}><InputNumerico onKeyUp={key} name="adicion_izquierdo" onChange={change} value={param.adicion_izquierdo} fullWidth label='Izquierdo' /></Grid>
                        
                    </Grid>
                </Grid>
    </Fragment>  );
}

export default Receta;