
import { Avatar, Box,  Stack, Typography,Icon } from '@mui/material'
import React from 'react'

const TableInfo = ({icon,title,subtitle}) => {
  return (
    <Box padding={1} margin={1} >
    <Stack direction="row" spacing={2}>
        <Box p={1}>
          <Avatar variant='rounded' sx={{ padding:'5px' }} >
            {icon && <Icon>{icon.name}</Icon>}
          </Avatar>
        </Box>
        <Box>
            <Typography variant='h6' color="text.primary" >{title}</Typography>
            <Typography variant='caption'>{subtitle}</Typography>
        </Box>
    </Stack>
    </Box>
  )
}

export default TableInfo
