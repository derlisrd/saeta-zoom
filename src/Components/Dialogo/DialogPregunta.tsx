
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom,Icon } from "@mui/material";


function DialogPregunta({title,text,open,onClose,children,icon}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon sx={{ fontSize:96,color:icon.color ?? 'inherit' }}>{icon.name}</Icon> </Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      {children}
    </DialogActions>
  </Dialog> );
}

export default DialogPregunta;