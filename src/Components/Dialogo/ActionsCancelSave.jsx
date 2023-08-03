import { Button, DialogActions } from "@mui/material";

function ActionsCancelSave({close}) {
    return ( <DialogActions>
        <Button onClick={close} variant="outlined">Cancelar</Button>
        <Button type="submit" variant="contained">Guardar</Button>
      </DialogActions> );
}

export default ActionsCancelSave;