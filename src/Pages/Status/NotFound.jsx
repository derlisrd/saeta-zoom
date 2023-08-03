
import { Box, Button, Stack, Typography,Icon } from "@mui/material";
import {useNavigate} from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate();
    return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh">
        <Stack spacing={2} alignItems="center">
            <Typography fontSize={80} >ERROR 404</Typography>
            <Icon sx={{ fontSize:120 }} >sentiment_very_dissatisfied</Icon>
            <Button  onClick={() => navigate(-1)} variant="outlined">Volver</Button>
        </Stack>
    </Box>);
}

export default NotFound;