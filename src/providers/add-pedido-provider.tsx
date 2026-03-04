import { createContext, ReactNode, useContext, useState } from "react";

type ModalsState = {
  receta: boolean;
  cliente: boolean;
  producto: boolean;
};

interface IAddPedidoContext {
  modals: ModalsState;
  handleOpenModal: (modalName: keyof ModalsState, value: boolean) => void;
}

const AddPedidoContext = createContext<IAddPedidoContext | undefined>(undefined);

export const AddPedidoProvider = ({ children }: { children: ReactNode }) => {

  const [modals, setModals] = useState({
    receta: false,
    cliente: false,
    producto: false,
  });

  const handleOpenModal = (modalName: keyof ModalsState, value: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  }



  const values = {
    modals,
    setModals,
    handleOpenModal,
  };

  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
};

export const useAddPedido = () => {
  const context = useContext(AddPedidoContext);
  if (context === undefined) {
    throw new Error("useAddPedido debe ser usado dentro de AddPedidoProvider");
  }
  return context;
};
