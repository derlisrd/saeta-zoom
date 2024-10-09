import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexDirection: "column" }}>
      <span role="img" style={{ fontSize: "10rem" }}></span>
      <Typography variant="h3">ZOOM OPTICAL</Typography>
      <Typography variant="h1">SGA</Typography>
      <Typography variant="body">1.0.2</Typography>
    </Box>
  );
}

export default Home;
