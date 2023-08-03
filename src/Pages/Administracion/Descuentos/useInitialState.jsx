function useInitialState() {
    const iCliente = {
        id_cliente:null,
        nombre_cliente:'',
        ruc_cliente:'',
        direccion_cliente:''
    }
    const iError = {
        code:0,
        active:false,
        msg:''
    }

    
    const iForm = {
        precio:'', porcentaje:''
    }

    const iProducto = []

    
    return {iError,iCliente,iProducto,iForm}
}

export default useInitialState;