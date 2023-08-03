import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';

const DepositoContext = createContext()

const DepositoProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_deposito:'',
    nombre_deposito:''
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "depositos",
      fields: "id_deposito,nombre_deposito",
      filtersField:"nombre_deposito",
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
  return <DepositoContext.Provider value={values}>{children}</DepositoContext.Provider>
  
}

export function useDeposito(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect} = useContext(DepositoContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
}

export default DepositoProvider
