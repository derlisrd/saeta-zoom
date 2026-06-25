import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, LinearProgress } from "@mui/material";
import { useListaFactura } from "../ListaFacturaProvider";
import Listado from "./Listado";
import Filtrado from "./Filtrado";
import { useState, useRef } from "react";
import { columnsData } from "../columns";
import xlsx from "json-as-xlsx"
import { useReactToPrint } from 'react-to-print';

function Reportes() {

    const divRef = useRef(null);
    const {dialogs,setDialogs} = useListaFactura()
    const close = ()=>setDialogs({...dialogs,reportes:false})
    const [lista,setLista] = useState([])
    const [loading,setLoading]=useState(false)
    const [total,setTotal] = useState(0)

    const print = useReactToPrint({content: () => divRef.current});

    const downloadExcel = () => {
        let data = [
          {
            sheet: "Facturas",
            columns: columnsData,
            content: lista,
          },
          
        ]
        let settings = {
          fileName: "Facturas",
        }
        xlsx(data, settings)
      }

    return ( <Dialog fullScreen open={dialogs.reportes} onClose={close}>
            <DialogTitle> <IconButton onClick={close}><Icon>close</Icon></IconButton> Reportes</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Filtrado setLista={setLista} setLoading={setLoading} setTotal={setTotal} />
                    </Grid>
                    <Grid item xs={12}>
                        {loading && <LinearProgress />}
                    </Grid>
                    <Grid item xs={12}>
                        <div ref={divRef}>
                            <Listado listado={lista} total={total} />
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            {
                lista.length > 0 &&
                <>
                <Button startIcon={<Icon>calculate</Icon>} onClick={downloadExcel} variant="contained">EXCEL</Button>
                <Button startIcon={<Icon>print</Icon>} onClick={print} variant="contained">IMPRIMIR</Button>
                </>

            }
            <Button onClick={close} variant="outlined">
                CERRAR
            </Button>
            </DialogActions>
    </Dialog> );
}

export default Reportes;