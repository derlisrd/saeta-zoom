import React from 'react'
import Add from './Add'
import Delete from './Delete'

import DepositoProvider from './DepositoProvider'
import Edit from './Edit'
import Lista from './Lista'


const Clientes = () => {
  return (
    <DepositoProvider>
      <Lista />
      <Add />
      <Edit />
      <Delete />
    </DepositoProvider>
  )
}

export default Clientes
