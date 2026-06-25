import React from 'react'
import ProveedorProvider from './ProveedorProvider'
import Lista from './Lista'
import Add from './Add'
import Delete from './Delete'
import Edit from './Edit'

const Proveedores = () => {

  return <ProveedorProvider>
    <Lista />
    <Add />
    <Edit />
    <Delete />
  </ProveedorProvider>
}

export default Proveedores
