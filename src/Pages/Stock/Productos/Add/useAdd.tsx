import { useState } from "react"

function useAdd() {
  

  
  const initialError = {active:false,code:0,message:''}
  const [error,setError] = useState(initialError)
  const [isLoadingSend,setIsLoadingSend] = useState(false)

    

    


    return {enviar,error,form,change,stock,addStock,isLoadingSend}

}

export default useAdd;