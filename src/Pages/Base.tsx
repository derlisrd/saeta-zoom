import { Box } from '@mui/material';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//import SimpleBar from 'simplebar-react';
//import 'simplebar-react/dist/simplebar.min.css';
import DrawerMainMenu from '../Components/Menu/DrawerMainMenu'

import {env} from '../App/config'
import ToolbarMain from '../Components/Menu/ToolbarMain';
import { useAuth } from '../Providers/AuthProvider';
import { useMenu } from '../Components/Menu/MenuProvider';

const Base = () => {
  const {DRAWER_WIDTH} = env
  const {isOpenMenu} = useMenu()
  const {userData} = useAuth()
  const {permisos} = userData

  

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : '0';
  let width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%';

  let stylesMain = {px:2, pt:'80px', pb:"40px", mt:'0', ml:{ md: margin_left}, width: { md: width_main},bgcolor:'background.paper',minHeight:"100vh",transition:'all 0.2s' }

  if(!userData.login){
    return <Navigate to="/" />
  }

  return (
    <>
      <DrawerMainMenu />
      <ToolbarMain />
      <Box component="main"sx={stylesMain} >
        <Outlet />
      </Box>
    </>
  )
}

export default Base
