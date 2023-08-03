


import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../App/config";

function Facturas() {


    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Button size="large" variant="contained" component={Link} to={BASEURL +'/facturas/add'}>HACER FACTURA</Button>
                <Button size="large" variant="contained" component={Link} to={BASEURL +'/facturas/lista'} >LISTA DE FACTURAS </Button>
            </Stack>
        </Box>);
    
}

export default Facturas;