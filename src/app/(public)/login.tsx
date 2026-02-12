import { useState, ChangeEvent, SubmitEvent, Fragment } from "react";
import { Box, Button, Container, TextField, Typography, Paper, Alert } from "@mui/material";
import { useAuth } from "@/providers/auth-provider";
import LoadingScreen from "@/components/feedback/loading-screen";

// Definimos la interfaz para el estado del formulario
interface LoginState {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const { signIn, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<LoginState>({
    identifier: "",
    password: "",
  });

  // Tipado para el cambio de inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tipado para el envío del formulario
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(formData.identifier, formData.password);
  };

  return (
    <Fragment>
      {isLoading && <LoadingScreen />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="600">
              INGRESAR
            </Typography>
            {error && (
              <Alert severity="error" icon={false} variant="outlined">
                {error.message}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario o correo"
                name="identifier"
                autoComplete="identifier"
                autoFocus
                value={formData.identifier}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                INGRESAR
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Fragment>
  );
};

export default LoginPage;
