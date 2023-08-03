import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../../Services/api';
import { useAuth } from '../../../Providers/AuthProvider';
import useQuery from '../../../Hooks/useQuery';

const UsuariosContext = createContext()

const UsuariosProvider = ({children}) => {
  const {userData} = useAuth()
  const {token_user} = userData
  let query = useQuery();
  let pageInitial = query.get('p') 
  const [currentPage,setCurrentPage] = useState( pageInitial ? parseInt(pageInitial) : 0 )
  const [pagination,setPagination] = useState({
    size: 60,
    total:0,
    found:0
  })
  const [lista,setLista] = useState({users:[],permisos:[]})
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false,permisos:false})
  const [formSelect,setFormSelect] = useState({
    id_user:'',nombre_user:'',username_user:'',email_user:'',rol_user:''
  })
  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "users",
      fields: `id_user,nombre_user,username_user,email_user,rol_user`,
      filtersField:"nombre_user,username_user",
      filtersSearch:`${searchTxt}`,
      sort:'-nombre_user',
      token:token_user,
      pagenumber:currentPage,pagesize:pagination.size
    };
    let [res,per] = await Promise.all([APICALLER.get(config),APICALLER.get({table:'permisos',sort:'clave_permiso'})])
    if(res.response){
      setLista({users:res.results,permisos:per.results})
      setPagination(pre=>{ return {...pre,total:res.total,found:res.found} })
    }else{ console.log(res);}
    setIsLoading(false)
  },[currentPage])

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
  }, [getLista]);

  const values = {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination,token_user}
  return <UsuariosContext.Provider value={values}>{children}</UsuariosContext.Provider>
  
}

export function useUsuarios(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination,token_user} = useContext(UsuariosContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,currentPage,setCurrentPage,pagination,token_user}
}

export default UsuariosProvider
