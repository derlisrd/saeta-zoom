export interface InsertPedidoItemModel {
  id?: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precio: number;
  total: number;
  iva_exenta: number;
  iva_cinco: number;
  iva_diez: number;
  deposito_id: number;
}