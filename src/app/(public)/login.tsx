import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Container, TextField, Typography, Paper, Avatar } from "@mui/material";
import { useAuth } from "@/providers/auth-provider";

// Definimos la interfaz para el estado del formulario
interface LoginState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<LoginState>({
    email: "",
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(formData.email, formData.password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>Z</Avatar>

          <Typography component="h1" variant="h5" fontWeight="600">
            INGRESAR
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              value={formData.email}
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
              variant="outlined"
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
  );
};

export default LoginPage;
