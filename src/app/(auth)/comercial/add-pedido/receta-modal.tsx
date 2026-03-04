import { useAddPedido } from "@/providers/add-pedido-provider"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const RecetaModal = () => {


    const { modals, handleOpenModal } = useAddPedido();

    return <Dialog open={modals.receta} maxWidth='lg' onClose={() => handleOpenModal("receta", false)}>
        <DialogTitle>Receta</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleOpenModal("receta", false)}>Cerrar</Button>
        </DialogActions>
    </Dialog>
}