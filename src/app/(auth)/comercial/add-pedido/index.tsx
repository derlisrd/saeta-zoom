import { AddPedidoProvider } from "@/providers/add-pedido-provider";
import MainModal from "./main-modal";
import { RecetaModal } from "./receta-modal";

export default function AddPedido() {
  return <AddPedidoProvider>
    <RecetaModal />
    <MainModal />

  </AddPedidoProvider>
}
