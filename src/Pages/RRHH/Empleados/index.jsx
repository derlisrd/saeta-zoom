import React from 'react'
import Add from './Add'
import Delete from './Delete'
import Edit from './Edit'
import EmpleadosProvider from './EmpleadosProvider'
import Lista from './Lista'


const Empleados = () => {

  return <EmpleadosProvider>
    <Add />
    <Delete />
    <Edit />
    <Lista />
  </EmpleadosProvider>
}

export default Empleados
