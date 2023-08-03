import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';


const Context = createContext()

function RecibosProvider({children}) {
    const [listas,setListas] = useState([])
    const [formSelect,setFormSelect] = useState({})
    const [dialogs,setDialogs] = useState({add:false,addfecha:false,print:false})
    const [loading,setLoading] = useState(true)
    const getLista = useCallback(async()=>{
        setLoading(true)
        let res = await APICALLER.get({table:'recibos',sort:'id_recibo',include:'clientes',on:'id_cliente,cliente_id_recibo',
        fields:'nombre_cliente,ruc_cliente,id_recibo,total_recibo,fecha_recibo,efectivo_recibo,transferencia_recibo,cheque_recibo,banco_recibo,cheque_nro_recibo,nro_recibo'});
        if(res.response){
            setListas(res.results)
        }else{
            console.log(res);
        }
        setLoading(false)
    },[])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    const values = {formSelect,setFormSelect,getLista,listas,dialogs,setDialogs,loading}
    return (<Context.Provider value={values} >{children}</Context.Provider>);
}

export function useRecibosProvider(){
    const {formSelect,setFormSelect,getLista,listas,dialogs,setDialogs,loading} = useContext(Context)
    return {formSelect,setFormSelect,getLista,listas,dialogs,setDialogs,loading}
}

export default RecibosProvider;