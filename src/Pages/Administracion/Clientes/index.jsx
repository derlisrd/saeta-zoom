import React from 'react'
import Add from './Add'
import ClientesProvider from './ClientesProvider'
import Delete from './Delete'
import Edit from './Edit'
import ListaClientes from './ListaClientes'

const Clientes = () => {
  return (
    <ClientesProvider>
      <Delete />
      <Add />
      <Edit />
      <ListaClientes />
    </ClientesProvider>
  )
}

export default Clientes
