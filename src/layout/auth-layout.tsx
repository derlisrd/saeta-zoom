import Icon from "@/components/ui/icon";
import { useAuth } from "@/providers/auth-provider";

import { Drawer, Box, Toolbar, Stack, IconButton, Tooltip } from "@mui/material";
import { NavigateOptions, Outlet, To, useNavigate } from "react-router-dom";
import MenuNavList from "./menu-nav-list";
import { useLayoutProvider } from "@/providers/layout-provider";

function AuthMenuLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isOpenMenu, toggleMenu, isOpenMobileMenu, toggleMobileMenu, DRAWER_WIDTH } = useLayoutProvider();

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : "0";
  let width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";

  const navegar = (to: To, isMobile: boolean, options?: NavigateOptions) => {
    navigate(to, options);
    isMobile && toggleMobileMenu();
  };
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const TopBar = () => {
    return (
      <Toolbar
        component="header"
        sx={{ position: "fixed", display: "flex", width: "100%", zIndex: 1100, backdropFilter: "blur(5px)", alignItems: "center", padding: "0 !important" }}
      >
        <Stack justifyContent="space-between" flexDirection="row" width="100%" alignItems="center">
          <Stack flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
            <IconButton onClick={toggleMobileMenu} sx={{ width: "50px", height: "50px", display: { xs: "block", md: "none" } }}>
              <Icon size={24} name="menu-2" />
            </IconButton>
            <Tooltip placement="bottom" arrow title={isOpenMenu ? "Cerrar menú" : "Abrir menú"}>
              <IconButton onClick={toggleMenu} sx={{ width: "50px", height: "50px", marginLeft: margin_left, display: { xs: "none", md: "block", transition: "all 0.2s" } }}>
                <Icon size={24} name={"menu-2"} />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack flexDirection="row">
            <Tooltip placement="bottom" arrow title="Cerrar sesión">
              <IconButton onClick={handleSignOut}>
                <Icon name="door-exit" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    );
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        open={isOpenMenu}
        onClose={toggleMenu}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        <MenuNavList navegar={navegar} />
      </Drawer>
      <Drawer
        variant="temporary"
        closeAfterTransition
        open={isOpenMobileMenu}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: "block", md: "none" },

          "& .MuiDrawer-paper": { bosmizing: "border-box", width: 256, backgroundColor: "background.paper" },
        }}
      >
        <MenuNavList navegar={navegar} isMobile />
      </Drawer>
      <TopBar />
      <Box sx={{ paddingTop: 8, paddingLeft: 1, paddingRight: 1, width: { md: width_main }, marginLeft: { md: margin_left }, transition: "all 0.2s" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AuthMenuLayout;
