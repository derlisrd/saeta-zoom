import { Alert } from "@mui/material";

function ClienteAlert({datos}) {
    return (<Alert severity="info" icon={false}>
        <p>RUC: {datos.ruc_cliente}</p>
        <p>Nombre: {datos.nombre_cliente}</p>
    </Alert>  );
}

export default ClienteAlert;