import { useCallback, useEffect, useState } from "react"
import { APICALLER } from "../../../../Services/api"

function useGet() {
    
    const [listas,setListas] = useState({
      categorias:[],
      depositos:[]
    })
    const [isLoading,setIsLoading] = useState(true)

    const getLista = useCallback(async()=>{
      setIsLoading(true)
        let [cat,dep] = await Promise.all([APICALLER.get({
          table: "categorias",
          fields: "id_categoria,nombre_categoria,tipo_categoria"
        }),
        APICALLER.get({
          table: "depositos",
          fields: "id_deposito,nombre_deposito"
        })])
        if(cat.response && dep.response){
          setListas({
            categorias:cat.results,
            depositos: dep.results
          })
        }else{ console.log(cat,dep);}
      setIsLoading(false)
    },[])
    
    useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
    }, [getLista]);

    return {listas,isLoading}

}

export default useGet;