import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="primary" />
    </Box>
  );
}
