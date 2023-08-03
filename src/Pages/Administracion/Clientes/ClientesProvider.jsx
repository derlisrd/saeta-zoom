import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import useQuery from '../../../Hooks/useQuery';
import { APICALLER } from '../../../Services/api';

const ClientesContext = createContext()

const ClientesProvider = ({children}) => {
  let query = useQuery();
  let pageInitial = query.get('p') 
  const [currentPage,setCurrentPage] = useState( pageInitial ? parseInt(pageInitial) : 0 )
  const [pagination,setPagination] = useState({
    size: 60,
    total:0,
    found:0
  })
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_cliente:'',
    nombre_cliente:'',
    email_cliente:'',
    ruc_cliente:'',
    telefono_cliente:'',
    tipo_pago:'',
    fantasia_cliente:''
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let actual_pagina = 0
    if(searchTxt===''){
      actual_pagina = currentPage;
    }
    let config = {
      table: "clientes",
      fields: "ruc_cliente,nombre_cliente,id_cliente,email_cliente,telefono_cliente,tipo_pago,fantasia_cliente,direccion_cliente",
      filtersField:"nombre_cliente,ruc_cliente",
      filtersSearch:`${searchTxt}`,
      sort:'-nombre_cliente',
      pagenumber:actual_pagina,pagesize:pagination.size
    };
    let res = await APICALLER.get(config)
    if(res.response){
      setLista(res.results)
      setPagination(pre=>{ return {...pre,total:res.total,found:res.found} })
    }else{ console.log(res);}
    setIsLoading(false)
  },[currentPage])

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
  }, [getLista]);

  const values = {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination}
  return <ClientesContext.Provider value={values}>{children}</ClientesContext.Provider>
  
}

export function useClientes(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination} = useContext(ClientesContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination}
}

export default ClientesProvider
