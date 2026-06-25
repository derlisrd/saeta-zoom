import { Button } from "@mui/material";

function RegistrarButton({...rest}) {
    return ( <Button fullWidth size="large" {...rest} variant="contained">Registrar</Button> );
}

export default RegistrarButton;