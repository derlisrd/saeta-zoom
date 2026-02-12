import { Box, Button, Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Icon from "../ui/icon";

export default function NoPermissionScreen() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        {/* Icono Principal */}
        <Box>
          <Icon name="lock" size={38} />
        </Box>

        {/* Mensaje de Error */}
        <Box>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Acceso Restringido
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Lo sentimos, no tienes los permisos suficientes para ver este módulo.
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Si crees que esto es un error, por favor contacta al administrador del sistema.
          </Typography>
        </Box>

        {/* Acciones */}
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)} // Vuelve a la página anterior
          >
            Volver atrás
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")} // Va al dashboard o inicio
          >
            Ir al Inicio
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
