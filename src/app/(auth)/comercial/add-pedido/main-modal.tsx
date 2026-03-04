import Icon from "@/components/ui/icon";
import { useBuscarProductoPedido } from "@/core/hooks/use-buscar-producto-pedido";
import { useAddPedido } from "@/providers/add-pedido-provider";
import { apiPedidos } from "@/services/api/pedidos";
import { apiPedidosItems } from "@/services/api/pedidos-items";
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip } from "@mui/material";

export default function MainModal() {

    const back = () => window.history.back();
    const { handleOpenModal } = useAddPedido();
    const { listaBusqueda, isLoading, q, setQ } = useBuscarProductoPedido();

    const setearProducto = () => {
        handleOpenModal("receta", true);
    }

    const finalizarPedido = async () => {
        const pedido = await apiPedidos.insert({
            numero_factura: "0",
            cliente_id: 1,
            armazon: "NYLON",
            obs_laboratorio: "",
            obs_cliente: "",
            total: 0,
            total_iva_exenta: 0,
            total_iva_cinco: 0,
            total_iva_diez: 0,
            estado: "GENERADO",
            facturado: 0,
            tipo: "NORMAL",
            pagado: "PENDIENTE",
            motivo_cancelacion: "",
            usuario_id: 1
        });

        const pedidosItems = await apiPedidosItems.insert([{
            pedido_id: pedido.id,
            producto_id: 1,
            cantidad: 2,
            precio: 100,
            total: 200,
            iva_cinco: 0,
            iva_diez: 20,
            iva_exenta: 0,
            deposito_id: 1
        }]);
    }


    return <Dialog open fullScreen >
        <DialogTitle>
            <Tooltip title="Cerrar">
                <IconButton onClick={back}>
                    <Icon name="arrow-narrow-left-dashed" size={24} />
                </IconButton>
            </Tooltip>

        </DialogTitle>
        <DialogContent>
            <Grid container spacing={1} pt={1}>
                <Grid size={8}>
                    tablita
                </Grid>
                <Grid size={4}>
                    <Autocomplete
                        onChange={(_, value) => {
                            if (value) {
                                setearProducto()
                            }
                        }}
                        getOptionLabel={(option: any) => `${option.codigo} - ${option.nombre}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={listaBusqueda}
                        loading={isLoading}
                        loadingText="Buscando..."
                        noOptionsText="No se encontraron resultados"
                        renderInput={(params) => <TextField {...params} placeholder="Buscar producto..." value={q} autoFocus onChange={(e) => setQ(e.target.value)} />}
                    />
                    <Button onClick={finalizarPedido}>Finalizar pedido</Button>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
}