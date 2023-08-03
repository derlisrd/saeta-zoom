import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from "@mui/material";
import { useRecibosProvider } from "./Provider";
import { useEffect,useState,useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { APICALLER } from "../../../Services/api";
import LoadingPage from "../../../Components/UI/LoadingPage";
import style from './print.module.css'
import PrintDatos from "./Components/PrintDatos";
function Print() {
    const {dialogs,setDialogs,formSelect} = useRecibosProvider();
    const ref = useRef(null)
    const [datos,setDatos] = useState({})
    const [loading,setLoading] = useState(true)
    const close = ()=> setDialogs({...dialogs,print:false})

    const print = useReactToPrint({content: () => ref.current});
    const getLista = async()=>{
        if(dialogs.print){
            setLoading(true)
            let res = await APICALLER.get({table:'recibos_items',include:'facturas',on:'factura_id_recibo,id_factura',where:`recibo_id,=,${formSelect.id_recibo}`})
            if(res.response){
                setDatos({
                    ...formSelect,
                    facturas: res.results
                })
            }else{
                console.log(res);
            }
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    },[formSelect,dialogs])

    return ( <Dialog fullScreen onClose={close} open={dialogs.print}>
        <DialogTitle>Imprimir recibo</DialogTitle>
        <DialogContent>
            {
                loading ? <LoadingPage /> :
                <div ref={ref} className={style.print}>
                    <PrintDatos datos={datos} styles={{ paddingBottom:'11mm' }} />
                    <PrintDatos datos={datos} styles={{ paddingBottom:'10mm' }}  />
                    <PrintDatos datos={datos} styles={{ marginBottom:'0' }}  />
                </div>
            }
        </DialogContent>
        <DialogActions>
            <Button variant="contained" size="large" onClick={print} startIcon={<Icon>print</Icon>}>IMPRIMIR</Button>
            <Button variant="outlined" onClick={close} size="large">CLOSE</Button>
        </DialogActions>
    </Dialog>);
}

export default Print;