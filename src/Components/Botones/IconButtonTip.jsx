import { Tooltip,Icon,IconButton } from "@mui/material";

function IconButtonTip({onClick,icon,title}) {
    return <Tooltip title={title} arrow ><IconButton onClick={onClick}><Icon color={icon.color ?? 'inherit'}>{icon.name}</Icon></IconButton></Tooltip>
}

export default IconButtonTip;