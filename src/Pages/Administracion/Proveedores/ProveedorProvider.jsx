import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';

const ProveedorContext = createContext()

const ProveedorProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_proveedor:"",ruc_proveedor:"",telefono_proveedor:"",nombre_proveedor:""
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "proveedors",
      fields: 'id_proveedor,ruc_proveedor,telefono_proveedor,nombre_proveedor',
      filtersField:"nombre_proveedor,ruc_proveedor",
      filtersSearch:`${searchTxt}`,
    };
    let res = await APICALLER.get(config)
    if(res.response){
      setLista(res.results)
    }else{ console.log(res);}
    setIsLoading(false)
  },[])

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
  }, [getLista]);

  const values = {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
  return <ProveedorContext.Provider value={values}>{children}</ProveedorContext.Provider>
  
}

export function useProveedor(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect} = useContext(ProveedorContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
}

export default ProveedorProvider
