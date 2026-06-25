
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom,Icon } from "@mui/material";


function DialogAlerta({title,text,open,onClose}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon sx={{ fontSize:98,color:'#d32f2f'}}>report</Icon></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="error">Cerrar</Button>
    </DialogActions>
  </Dialog> );
}

export default DialogAlerta;