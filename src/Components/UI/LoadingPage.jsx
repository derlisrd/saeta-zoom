import { Box, CircularProgress } from "@mui/material";

function LoadingPage() {
    return (<Box height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center">
        <CircularProgress color="primary" />
      </Box>);
}

export default LoadingPage;