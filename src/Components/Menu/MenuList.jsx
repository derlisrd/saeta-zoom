import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography, Icon
} from "@mui/material";
import { Link,useLocation } from "react-router-dom";
import { ListaMenu } from "../../Utils/ListaMenu";
import { Fragment,useState } from "react";
import styles from './styles.module.css'
import { useMenu } from "./MenuProvider";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { env } from "../../App/config";
import { useAuth } from "../../Providers/AuthProvider";


function MenuList({isMobile}) {
  const { BASEURL,APPNAME} = env;
  const {userData} = useAuth()
  const {permisos} = userData
  const location = useLocation();
  const pathname =  (location.pathname).substring(6);

  const [lista,setLista] = useState(ListaMenu);

  const {setMobileOpen} = useMenu()

  const closeMobileMenu = ()=> setMobileOpen(false);

  const openCollapseMenu = (sw,id)=>{
    let array = [...lista];
    let index = array.findIndex((e)=> e.id===id)
    array[index].open = !sw;
    setLista(array);
  }

  const SELECTED = { "&:hover, &.Mui-selected":{borderRadius:'0 18px 18px 0', margin:'0',borderLeftStyle:'solid',borderLeftWidth:'1px',borderLeftColor:'primary.main', "div":{color:'primary.main'},'span':{fontWeight:'bold'}}  }

  return (<SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
    <Toolbar >
      <Stack direction='row' alignItems='center' justifyContent={isMobile ? 'flex-end':'space-around'} width='100%'>
        {isMobile ? <IconButton onClick={closeMobileMenu} ><Icon>menu</Icon></IconButton> :
        <> <Typography variant="button">{APPNAME}</Typography> </>  }
        </Stack>
      </Toolbar>
      <List >

        {lista.map((e, i) => (
          <Fragment key={i}>
            {e.sub ? (
              <Fragment>
              <ListItem disablePadding >
                <ListItemButton  onClick={()=>openCollapseMenu(e.open,e.id)} className={styles.listmenu}>
                  <ListItemIcon className={styles.iconmenu}>
                    <Icon height={24} >{e.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu}  primary={e.title} />
                  <Icon>
                    {e.open ? `expand_less` : `expand_more`} </Icon>
                </ListItemButton>
              </ListItem>
              <Collapse in={e.open} timeout="auto" unmountOnExit>
                <List component="div" className={styles.submenu} disablePadding >
                  {
                    e.submenu.map((elem,indexsub)=>(
                      (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(elem.id)) ) &&
                      <ListItem disablePadding key={indexsub}>
                        <ListItemButton selected={pathname === elem.url} sx={SELECTED}  onClick={closeMobileMenu} component={Link} to={BASEURL + elem.url} className={styles.listmenu}>
                          <ListItemIcon className={styles.iconmenu}>
                          <Icon>{elem.icon}</Icon> 
                          </ListItemIcon>
                          <ListItemText className={styles.textmenu}  primary={elem.title} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
              </Fragment>
            ) : (
              <ListItem disablePadding>
                <ListItemButton selected={pathname === e.url}  
                  sx={SELECTED}
                onClick={closeMobileMenu} className={styles.listmenu}  component={Link} to={BASEURL + e.url}>
                  <ListItemIcon className={styles.iconmenu}>
                    <Icon>{e.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu} primary={e.title} />
                </ListItemButton>
              </ListItem>
            )}
          </Fragment>
        ))}

      </List>
      </SimpleBar>
  );
}

export default MenuList;
