import React from 'react'
import Add from './Add'
import Delete from './Delete'

import CategoriaProvider from './CategoriaProvider'
import Edit from './Edit'
import Lista from './Lista'


const Clientes = () => {
  return (
    <CategoriaProvider>
      <Lista />
      <Add />
      <Edit />
      <Delete />
    </CategoriaProvider>
  )
}

export default Clientes
