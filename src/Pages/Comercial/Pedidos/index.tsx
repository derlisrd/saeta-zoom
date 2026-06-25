import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'
import DialogSelectDepositoStock from './DialogSelectDepositoStock'
import DialogBuscarCliente from './DialogBuscarCliente'
import DialogRegistrarCliente from './DialogRegistrarCliente'
import Main from './Main'
import FinalizarPedido from './FinalizarPedido'
import DialogObs from './DialogObs'
import CambiarPrecio from './CambiarPrecio'
import EditReceta from './EditReceta'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <CambiarPrecio />
      <DialogObs />
      <FinalizarPedido />
      <DialogRegistrarCliente />
      <DialogBuscarCliente />
      <EditReceta />
      <DialogSelectDepositoStock />
      <DialogMain />
      <Main />
    </PedidosProvider>
  )
}

export default Pedidos
