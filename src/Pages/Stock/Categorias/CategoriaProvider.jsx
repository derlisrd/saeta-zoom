import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';

const CategoriaContext = createContext()

const CategoriaProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_categoria:'',
    nombre_categoria:'',
    tipo_categoria:''
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "categorias",
      fields: "id_categoria,nombre_categoria,tipo_categoria",
      filtersField:"nombre_categoria",
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
  return <CategoriaContext.Provider value={values}>{children}</CategoriaContext.Provider>
  
}

export function useCategoria(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect} = useContext(CategoriaContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
}

export default CategoriaProvider
