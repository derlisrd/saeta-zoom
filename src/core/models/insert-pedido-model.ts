export interface InsertPedidoModel {
  id?: number;
  numero_factura: string;
  cliente_id: number;
  armazon: string;
  obs_laboratorio: string;
  obs_cliente: string;
  total: number;
  total_iva_exenta: number;
  total_iva_cinco: number;
  total_iva_diez: number;
  estado: string;
  facturado: number;
  tipo: string;
  pagado: string;
  motivo_cancelacion: string;
  usuario_id: number;
}

export interface InsertPedidoResponseModel {
  id: number;
}