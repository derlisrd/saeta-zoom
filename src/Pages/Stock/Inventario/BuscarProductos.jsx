
import { Autocomplete, Grid, LinearProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import TableStock from "./TableStock";

import { useInventario } from "./InventarioProvider";
import SelectDeposito from "./SelectDepositos";
import SelectCategoria from "./SelectCategoria";
import TableStockBloco from "./TableStockBloco";

function BuscarProductos() {

    const {setStock,formInfo,setFormInfo,setRangos,depositos,categorias} = useInventario()
    const [search,setSearch] = useState('')
    const [depositoID,setDepositoID] = useState('')
    const [categoriaID,setCategoriaID] = useState('')
    const [lista,setLista] = useState([])
    const [loading,setLoading] = useState(false)
    const [cargando,setCargando] = useState(false)


    const insertar = async(e,val)=>{
        let id = val?.id_producto;

        
        if(id){
            setCargando(true)
            let res = await APICALLER.get({table:'productos_depositos',
            include:'depositos',on:'deposito_id,id_deposito',
            where:`producto_id,=,${id},and,deposito_id,=,${depositoID}`})
            //console.log(res.results);
            if(res.response){            
                let min_esferico = parseFloat(val.min_esferico), 
                max_esferico = parseFloat(val.max_esferico),
                min_cilindrico = parseFloat(val.min_cilindrico), 
                max_cilindrico = parseFloat(val.max_cilindrico),
                base_min = parseFloat(val.base_min),
                base_max = parseFloat(val.base_max),
                adicion_max = parseFloat(val.adicion_max),
                adicion_min = parseFloat(val.adicion_min),
                new_rangos_esferico = [], new_rangos_cilindrico=[],
                new_rangos_base= [], new_rangos_adicion= [];

                
                let found,new_stock = []

                if(categoriaID==='4'){

                    while (min_esferico <= max_esferico) {
                        new_rangos_esferico.push(max_esferico.toString())
                        max_esferico -= 0.25
                    }
                    
                    while (max_cilindrico >= min_cilindrico) {
                        new_rangos_cilindrico.push(max_cilindrico.toString())
                        max_cilindrico -= 0.25
                    }
                    setRangos({esferico:new_rangos_esferico,cilindrico:new_rangos_cilindrico})
                    
                    new_rangos_esferico.forEach(RE=>{
                        let cil = []
                        let total= 0;
                        new_rangos_cilindrico.forEach(RC=>{
                            found = res.results.find(ele => ele.graduacion_esferico === RE && ele.graduacion_cilindrico===RC);
                            if(found){
                                total += parseFloat(found.stock_producto_deposito)
                                cil.push({
                                    edit:false,
                                    stock: found.stock_producto_deposito,
                                    cilindrico:RC,producto_id:id,
                                    id_productos_deposito:found.id_productos_deposito,
                                    deposito_id:depositoID
                                })
                            }else{
                                cil.push({
                                    edit:false,
                                    stock: '0',
                                    cilindrico:RC,
                                    producto_id:id,id_productos_deposito:null,
                                    deposito_id:depositoID
                                })
                            }        
                        })
                        new_stock.push({esferico: RE, cilindrico: cil,total })
                    })
                }


                else{
                    while (adicion_max >= adicion_min) {
                        new_rangos_adicion.push(adicion_min.toString())
                        adicion_min += 0.25
                    }
                    while (base_max >= base_min) {
                        new_rangos_base.push({lado:"2",base:base_min.toString(),string:"L"})
                        new_rangos_base.push({lado:"1",base:base_min.toString(),string:"R"})
                        base_min += 2
                    }
                    
                    setRangos({adicion:new_rangos_adicion,bases:new_rangos_base})
                    new_rangos_adicion.forEach(RA=>{
                        let bas = []
                        let total= 0;
                        new_rangos_base.forEach(RB=>{
                            found = res.results.find(ele => (ele.base === RB.base && ele.lado === RB.lado && ele.adicion===RA) );

                            if(found){
                                bas.push({
                                    edit:false,
                                    stock: found.stock_producto_deposito,
                                    base:RB,
                                    producto_id:id,
                                    id_productos_deposito:found.id_productos_deposito,
                                    deposito_id:depositoID,
                                    lado:found.lado
                                })
                            }else{
                                bas.push({
                                    edit:false,
                                    stock: '0',
                                    base:RB,
                                    producto_id:id,
                                    id_productos_deposito:null,
                                    deposito_id:depositoID,
                                    lado:RB.lado
                                })
                            }
                        })
                        new_stock.push({adicion: RA, bases: bas,total })
                    })
                }
                //console.log(new_stock);
                setStock(new_stock);
            setFormInfo(val);
          }else{console.log(res)}

            setCargando(false)

        }else{
            setFormInfo({})
            setLista([])
            setFormInfo({})
        }
    }


    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "productos",
                    fields:'codigo_producto,id_categoria_producto,id_producto,nombre_producto,tipo_producto,min_esferico,max_esferico,min_cilindrico,max_cilindrico,base_max,base_min,adicion_max,adicion_min',
                    filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20',
                    where:`tipo_producto,=,1,and,id_categoria_producto,=,${categoriaID}`
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])

    
    

    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            {cargando && <LinearProgress />}
        </Grid>
        <Grid item xs={12} sm={6}>
            <Autocomplete
                autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
                getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
                options={lista}
                disabled={depositoID===''}
                onChange={insertar}
                size="small" 
                loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
                renderInput={(params) => <TextField   {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
            />
        </Grid>
        
        <Grid item xs={12} sm={3}>
            <SelectDeposito opciones={depositos} name='deposito_id' value={depositoID} onChange={e=>{setDepositoID(e.target.value)}} />
        </Grid>
        <Grid item xs={12} sm={3}>
            <SelectCategoria opciones={categorias} name='id_categoria_producto' value={categoriaID} onChange={e=>{setCategoriaID(e.target.value)}} />
        </Grid>
        {
            formInfo.id_producto && (
                categoriaID==='4' ?
                <Fragment>
                <Grid item xs={12}>
                    <TableStock />
                </Grid>
            </Fragment>:
            <Fragment>
            <Grid item xs={12}>
                <TableStockBloco />
            </Grid>
            </Fragment>
            )
        }
    </Grid>);
}

export default BuscarProductos;