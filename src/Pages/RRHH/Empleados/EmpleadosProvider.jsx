import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';

const EmpleadosContext = createContext()

const EmpleadosProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_empleado:"",doc_empleado:"",telefono_empleado:"",nombre_empleado:"",tipo_empleado:""
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "empleados",
      fields: 'id_empleado,doc_empleado,telefono_empleado,nombre_empleado,tipo_empleado',
      filtersField:"nombre_empleado,doc_empleado",
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
  return <EmpleadosContext.Provider value={values}>{children}</EmpleadosContext.Provider>
  
}

export function useEmpleados(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect} = useContext(EmpleadosContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
}

export default EmpleadosProvider
