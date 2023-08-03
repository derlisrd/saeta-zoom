
import {  IconButton, Toolbar, Stack, Box,Icon } from "@mui/material";
import { useMenu } from "./MenuProvider";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";
import { env } from "../../App/config";
import InfoUsuario from "./InfoUsuario";


const Icono = ()=>( <Icon sx={{ fontWeight:'bold' }}>menu</Icon>)

function ToolbarMain() {

  const {DRAWER_WIDTH} = env
  const {mobileOpen,setMobileOpen,setIsOpenMenu,isOpenMenu} = useMenu()
  const handleDrawerToggle = ()=>{ setMobileOpen(!mobileOpen) }
  const DesktopMenu = ()=>{ setIsOpenMenu(!isOpenMenu)}

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : '0';


    

  return (

      
      <Toolbar
      component="header"
      sx={{ position:'fixed', display: "flex", width:'100%', zIndex:1100, 
      backdropFilter:'blur(5px)',  alignItems: "center",padding:'0 !important',
      boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <Box display='flex' justifyContent='space-between' width='100%' alignItems="center" >
          <Box>
              <IconButton onClick={handleDrawerToggle} sx={{ minWidth:'50px', display:{xs:'block',md:'none'} }}>
              <Icono />
            </IconButton>
            <IconButton onClick={DesktopMenu} sx={{  minWidth:'50px', marginLeft: margin_left, display:{xs:'none', md:'block',transition:'all 0.2s'} }}>
              <Icono />
            </IconButton>
          </Box>
          <Stack direction='row' alignItems='center' spacing={1} marginRight={1} >
            <InfoUsuario />
            <ThemeToggle />
            <ProfileMenu />
          </Stack>
        </Box>
    </Toolbar>

  );
}

export default ToolbarMain;
