import { createContext, ReactNode, useContext } from "react";

interface IAddPedidoContext {}

const AddPedidoContext = createContext<IAddPedidoContext | undefined>(undefined);

export const AddPedidoProvider = ({ children }: { children: ReactNode }) => {
  const values = {};

  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
};

export const useAddPedido = () => {
  const context = useContext(AddPedidoContext);
  if (context === undefined) {
    throw new Error("useAddPedido debe ser usado dentro de AddPedidoProvider");
  }
  return context;
};
