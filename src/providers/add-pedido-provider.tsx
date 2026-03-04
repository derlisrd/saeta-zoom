import { InsertPedidoItemModel } from "@/core/models/insert-pedido-item-model";
import { InsertPedidoModel } from "@/core/models/insert-pedido-model";
import { createContext, ReactNode, useContext, useState } from "react";

const initialPedido: InsertPedidoModel = {
  numero_factura: "0",
  cliente_id: 0,
  armazon: "",
  obs_laboratorio: "",
  obs_cliente: "",
  total: 0,
  total_iva_exenta: 0,
  total_iva_cinco: 0,
  total_iva_diez: 0,
  estado: "GENERADO",
  facturado: 0,
  tipo: "NORMAL",
  pagado: "PENDIENTE",
  motivo_cancelacion: "",
  usuario_id: 1,
  fecha: new Date().toISOString(),

}


type ModalsState = {
  receta: boolean;
  cliente: boolean;
  producto: boolean;
};

interface IAddPedidoContext {
  modals: ModalsState;
  handleOpenModal: (modalName: keyof ModalsState, value: boolean) => void;
  pedido: InsertPedidoModel;
  setPedido: React.Dispatch<React.SetStateAction<InsertPedidoModel>>;
  pedidoItems: InsertPedidoItemModel[];
  setPedidoItems: React.Dispatch<React.SetStateAction<InsertPedidoItemModel[]>>;
  receta: any;
  setReceta: React.Dispatch<React.SetStateAction<any>>;
}




const AddPedidoContext = createContext<IAddPedidoContext | undefined>(undefined);

export const AddPedidoProvider = ({ children }: { children: ReactNode }) => {

  const [modals, setModals] = useState({
    receta: false,
    cliente: false,
    producto: false,
  });

  const [pedido, setPedido] = useState<InsertPedidoModel>(initialPedido);
  const [pedidoItems, setPedidoItems] = useState<InsertPedidoItemModel[]>([]);
  const [receta, setReceta] = useState<any>(null);

  const handleOpenModal = (modalName: keyof ModalsState, value: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  }



  const values = {
    modals,
    setModals,
    handleOpenModal,
    pedido,
    setPedido,
    pedidoItems,
    setPedidoItems,
    receta,
    setReceta
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
