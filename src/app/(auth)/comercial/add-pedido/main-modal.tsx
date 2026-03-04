import Icon from "@/components/ui/icon";
import { useBuscarProductoPedido } from "@/core/hooks/use-buscar-producto-pedido";
import { useAddPedido } from "@/providers/add-pedido-provider";
import { Autocomplete, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip } from "@mui/material";

export default function MainModal() {

    const back = () => window.history.back();
    const { handleOpenModal } = useAddPedido();
    const { listaBusqueda, isLoading, q, setQ } = useBuscarProductoPedido();

    const setearProducto = () => {
        handleOpenModal("receta", true);
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
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>
}