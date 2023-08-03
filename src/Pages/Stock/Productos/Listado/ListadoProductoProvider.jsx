import { createContext, useContext,useState,useEffect,useCallback } from "react";
import { APICALLER } from "../../../../Services/api";
import useQuery from "../../../../Hooks/useQuery";
import { useAuth } from "../../../../Providers/AuthProvider";
const ListadoProductoContext = createContext()

function ListadoProductoProvider({children}) {
    const {userData} = useAuth()
    const {token_user} = userData
    const [listas,setListas] = useState({
        productos:[],
        categorias:[]
    })
    const [isLoading,setIsLoading] = useState(true)
    let query = useQuery();
    let pageInitial = query.get('p') 
    const [currentPage,setCurrentPage] = useState( pageInitial ? parseInt(pageInitial) : 0 )
    const [pagination,setPagination] = useState({
      size: 60,
      total:0,
      found:0
    })

    const [dialogs,setDialogs] = useState({stock:false,edit:false,delete:false})
    const [formSelect,setFormSelect] = useState({
        id_producto:''
    })

    const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }


    const getLista = useCallback(async(searchTxt='')=>{
        setIsLoading(true)
        let actual_pagina = 0
        if(searchTxt===''){
        actual_pagina = currentPage;
        }
        let [res,cat] = await Promise.all([APICALLER.get({table:'productos', include:'categorias',on:'id_categoria_producto,id_categoria',
        filtersField:"nombre_producto,codigo_producto",
        filtersSearch:`${searchTxt}`,
        fields:'id_producto,adicion_max,adicion_min,base_max,base_min,nombre_categoria,min_esferico,max_esferico,min_cilindrico,max_cilindrico,id_producto,nombre_producto,id_categoria_producto,iva_producto,nombre_producto,precio_producto,preciom_producto,tipo_producto,codigo_producto,costo_producto',
        pagenumber:actual_pagina,pagesize:pagination.size
        }),
        APICALLER.get({table:'categorias',fields:'nombre_categoria,id_categoria'})
        ])
        if(res.response){
            setListas({productos:res.results,categorias:cat.results})
            setPagination(pre=>{ return {...pre,total:res.total,found:res.found} })
        }else{ console.log(res);}
        setIsLoading(false)
    },[currentPage])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);

    const values = {listas,isLoading,getLista,currentPage,pagination,setPagination, setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect,token_user}
    return <ListadoProductoContext.Provider value={values}>{children}</ListadoProductoContext.Provider>
}

export function useListadoProducto(){
    const {listas,isLoading,getLista,currentPage,pagination,setPagination, setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect,token_user} = useContext(ListadoProductoContext)
    return {listas,isLoading,getLista,currentPage,pagination,setPagination, setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect,token_user}
}

export default ListadoProductoProvider;