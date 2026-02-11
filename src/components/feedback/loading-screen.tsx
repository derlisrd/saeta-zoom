import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box height="100vh" position="absolute" top={0} left={0} width="100%" zIndex={12} bgcolor="rgba(0, 0, 0, 0.6)" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="primary" />
    </Box>
  );
}
