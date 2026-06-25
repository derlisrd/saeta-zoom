
import { IconButton,Icon } from "@mui/material";
import { useTema } from "../../Providers/TemaProvider";

function ThemeToggle() {
    const {mode,toggleTheme} = useTema()
    const icono = mode === 'light' ? 'dark_mode' :  'light_mode'
    return <IconButton onClick={toggleTheme} ><Icon>{icono}</Icon></IconButton>;
}

export default ThemeToggle;