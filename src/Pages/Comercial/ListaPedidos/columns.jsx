export const columnsData = [
  { label: "NRO", value: "id_pedido" },
  { label: 'CODIGO INTERNO', value:"codigo_cliente_pedido"},
  { label: 'FECHA', value:"fecha_pedido"},
  { label: 'VENDEDOR', value:"nombre_user"},
  { label: 'CLIENTE', value:"nombre_cliente"},
  { label: 'TIPO', value:"tipo"},
  { label: 'FACTURADO', value:"facturado"},
  { label: 'TOTAL', value:"total_pedido"},
]

export const columnsDataPDF = [
  { label: 'FECHA', value:"fecha_pedido"},
  { label: 'NRO PEDIDO', value:"id_pedido"},
  { label: 'CODIGO INTERNO', value:"codigo_cliente_pedido"},
  { label: 'CODIGO', value:"codigo_producto"},
  { label: 'PRODUCTO', value:"nombre_producto"},
  { label: 'PRECIO', value:"precio_venta_item"},
  { label: 'TOTAL', value:"total_pedido"},
  
]

export const columns = [
    {
        field:'id_pedido',
        title:'NRO'
    },
    {
        field:'fecha_pedido',
        title:'fecha'
    },
    {
      field:'factura_id',
      title:'factura'
  },
    {
        field:'nombre_user',
        title:'vendedor'
    },
    {
        field:'nombre_cliente',
        title:'cliente'
    },{
      field:'codigo_cliente_pedido',
      title:'Codigo interno'
    },
    {
      field:'facturado_pedido',
      title:'Facturado',
      compareField: "facturado_pedido",
      items: {
          "0": "PENDIENTE",
          "1": "FACTURADO"
        },
      styleFieldCondition: "facturado_pedido",  
      styleCondition: {
        "0": {
          backgroundColor: "#aa3d5e",
          padding: "4px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#fff",
        },
        "1": {
          backgroundColor: "#eca92d",
          padding: "4px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#000000",
        },
      }
    },
    {
      field:'tipo_pedido',
      title:'Tipo',
      compareField: "tipo_pedido",
      items: {
          "1": "NORMAL PREESCRIPCION",
          "2": "CORTESIA",
          "3": "GARANTIA",
          "4": "NORMAL SOLO CRISTAL"
        },
    },{
      field:'pago',
      title:'PAGO'
    },
    {
        field:'estado_pedido',
        title:'Estado',
        compareField:"estado_pedido",
        items: {
          "0": "CANCELADO...",
          "1": "PENDIENTE",
          "2": "PRODUCCION",
          "3": "REVISION",
          "4": "ENTREGADO"
        },
        styleFieldCondition: "estado_pedido",
        styleCondition: {
            "0": {
              backgroundColor: "#86042b",
              padding: "4px",fontWeight:"bold",
              borderRadius: "5px",
              color: "#fff",
            },
            "1": {
              backgroundColor: "#eca92d",
              padding: "4px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#000000",
            },
            "2": {
              backgroundColor: "#2d96ec",
              padding: "4px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#ffffff",
            },
            "3": {
                backgroundColor: "#2d96ec",
                padding: "4px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#ffffff",
            },
            "4": {
                backgroundColor: "#0c962a",
                padding: "4px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#fff",
              },
        }
    },
    {
      field:'total_pedido',
      title:'total',
      isNumber:true
    }
]