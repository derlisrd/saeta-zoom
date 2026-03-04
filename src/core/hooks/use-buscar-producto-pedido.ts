import { apiProductos } from "@/services/api/productos";
import { useDeferredValue, useEffect, useState } from "react";
import { ProductoBusquedaModel } from "../models/producto-busqueda-model";

export function useBuscarProductoPedido() {
    const [q, setQ] = useState("");
    const deferredQ = useDeferredValue(q);
    const [isLoading, setIsLoading] = useState(false);
    const [listaBusqueda, setLista] = useState<ProductoBusquedaModel[]>([]); 

useEffect(() => {
  if (!deferredQ.trim()) {
    setLista([]);
    return;
  }

  const timer = setTimeout(async () => {
    setIsLoading(true);
    try {
      const res = await apiProductos.buscar(deferredQ);
      setLista(res ?? []);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setLista([]);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [deferredQ]);

    return { listaBusqueda, isLoading, q, setQ };
}