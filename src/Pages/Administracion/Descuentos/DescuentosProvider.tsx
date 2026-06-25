import { createContext,useContext,useEffect,useCallback,useState } from "react";
import { APICALLER } from "../../../Services/api";


const DescuentosContext = createContext()

function DescuentosProvider({children}) {
    const [dialogs,setDialogs] = useState({
        add:false,
        edit:false
    })
    const [formSelect,setFormSelect] = useState({})
    const [loading,setLoading] = useState(true)
    const [listas,setListas] = useState({
        descuentos:[]
    })

    const getLista = useCallback(async()=>{
        setLoading(true)
        let res = await APICALLER.get({table:'descuentos',include:'clientes,productos',on:'id_cliente,cliente_id_descuento,id_producto,producto_id_descuento',
        fields:'nombre_cliente,id_descuento,ruc_cliente,codigo_producto,nombre_producto,porcentaje_descuento,precio_producto'})
        if(res.response){
            let desc = []
            res.results.forEach((elm)=>{
                desc.push({...elm, precio_descuento: parseFloat(elm.precio_producto) - parseFloat(elm.precio_producto)*parseFloat(elm.porcentaje_descuento)/100 })
            })
            setListas({descuentos:desc})
        }   
        else{
            console.log(res);
        }
        setLoading(false)
    },[])
    
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    const values ={listas,getLista,loading,setDialogs,dialogs,formSelect,setFormSelect}
    return <DescuentosContext.Provider value={values}>{children}</DescuentosContext.Provider>
}

export function useDescuentos(){
    const {listas,getLista,loading,setDialogs,dialogs,formSelect,setFormSelect} = useContext(DescuentosContext)
    return {listas,getLista,loading,setDialogs,dialogs,formSelect,setFormSelect}
}


export default DescuentosProvider;