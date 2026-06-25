

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom ,Icon} from "@mui/material";
import { green } from "@mui/material/colors";

function DialogAlertaOk({title,text,open,onClose}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon  sx={{ fontSize:96,color:green[600] }} >check_circle</Icon></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="success">Ok</Button>
    </DialogActions>
  </Dialog> );
}

export default DialogAlertaOk;