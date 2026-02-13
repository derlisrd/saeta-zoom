import { Fragment, useState } from "react";

import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  ListItemButtonBaseProps,
  Stack,
  Tooltip,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Icon from "@/components/ui/icon";
import { useAuth } from "@/providers/auth-provider";
import menu from "@/constants/menu";

const MenuNavList = ({ isMobile = false, navegar, isOpenMenu = true }: { isMobile?: boolean; navegar: Function; isOpenMenu?: boolean }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [lista, setLista] = useState(menu);
  const { user } = useAuth();

  const SELECTED = {
    "&.Mui-selected": {
      borderRadius: isOpenMenu ? "0 18px 18px 0" : "10px",
      margin: "0px",
      borderLeftStyle: isOpenMenu ? "solid" : "none",
      background: "primary.main",
      borderLeftWidth: isOpenMenu ? "2px" : "0",
      borderLeftColor: "primary.main",
      div: { color: "primary.main" },
      span: { fontWeight: "normal" },
    },
    ":hover": {
      borderRadius: isOpenMenu ? "0 18px 18px 0" : "10px",
      background: "primary.main",
    },
    justifyContent: isOpenMenu ? "flex-start" : "center",
    padding: isOpenMenu ? undefined : "12px 0",
    fontWeight: "100",
    fontSize: "9px",
  } as ListItemButtonBaseProps["sx"];

  const openCollapseMenu = (id: number) => {
    // Solo permitir colapsar/expandir si el menú está completamente abierto
    if (!isOpenMenu) return;
    setLista((pre) => {
      return pre.map((item) => {
        if (item.id === id && item.submenu !== null) {
          return { ...item, open: !item.open };
        }
        return item;
      });
    });
  };

  return (
    <div style={{ maxHeight: "100vh", height: "100%" }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", minHeight: isOpenMenu ? undefined : "70px" }}>
        <Stack gap={1} my={1} direction="column" alignItems="center" justifyContent="center" width="100%">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            SGA
          </Typography>
          <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
            <Icon name="user-square-rounded" size={32} />
            <Typography variant="caption">{user ? user.nombre : "non"}</Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <Divider />
      <List>
        {lista.map((e) => (
          <Fragment key={e.id}>
            {e.submenu != null ? (
              <Fragment>
                <ListItem disablePadding>
                  {isOpenMenu ? (
                    <ListItemButton onClick={() => openCollapseMenu(e.id)} sx={SELECTED}>
                      <ListItemIcon>
                        <Icon name={e.icon} size={18} />
                      </ListItemIcon>
                      <ListItemText primary={e.title} />
                      <Icon name={e.open ? `chevron-right` : `chevron-down`} />
                    </ListItemButton>
                  ) : (
                    <Tooltip title={e.title} placement="right">
                      <ListItemButton onClick={() => openCollapseMenu(e.id)} sx={SELECTED}>
                        <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                          <Icon name={e.icon} size={18} />
                        </ListItemIcon>
                      </ListItemButton>
                    </Tooltip>
                  )}
                </ListItem>
                {isOpenMenu && (
                  <Collapse in={e.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ paddingLeft: 1 }}>
                      {e.submenu.map((elem) => (
                        <ListItem disablePadding key={elem.id}>
                          <ListItemButton
                            sx={SELECTED}
                            selected={pathname === elem.url}
                            onClick={() => navegar(elem.url ?? "#", isMobile, { state: { descripcion: elem.descripcion } })}
                          >
                            <ListItemIcon>
                              <Icon name="caret-right" />
                            </ListItemIcon>
                            <ListItemText primary={elem.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            ) : (
              <ListItem disablePadding>
                {isOpenMenu ? (
                  <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile, { state: { descripcion: e.descripcion } })} sx={SELECTED}>
                    <ListItemIcon>
                      <Icon size={18} name={e.icon} />
                    </ListItemIcon>
                    <ListItemText>{e.title}</ListItemText>
                  </ListItemButton>
                ) : (
                  <Tooltip title={e.title} placement="right">
                    <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile, { state: { descripcion: e.descripcion } })} sx={SELECTED}>
                      <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                        <Icon size={18} name={e.icon} />
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                )}
              </ListItem>
            )}
          </Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1, zIndex: 100 }}>
        <Button size="large" fullWidth variant="text" onClick={() => navigate("/logout")} startIcon={<Icon name="logout" />}>
          Cerrar sesión
        </Button>
      </Box>
    </div>
  );
};

export default MenuNavList;
