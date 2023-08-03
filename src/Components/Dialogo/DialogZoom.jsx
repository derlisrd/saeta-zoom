import { Dialog, DialogTitle, Zoom } from "@mui/material";

function DialogZoom({title,open,onClose,children, ...rest}) {
    return <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'}}}  open={open} onClose={onClose} {...rest} TransitionComponent={Zoom} ><DialogTitle>{title}</DialogTitle> {children} </Dialog> 
}

export default DialogZoom;