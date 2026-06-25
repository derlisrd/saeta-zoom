export const columns = [
  {
    field:'id_producto',
    title:'ID'
  },
    {
        field:'codigo_producto',
        title:'COD.'
    },
    {
        field:'nombre_producto',
        title:'Nombre'
    },
    {
      field:'nombre_categoria',
      title:'Categoria',
      style:{
        fontWeight:'bold'
      }
    },
    {
      field:'precio_producto',
      title:'Precio',
      isNumber:true
    },
    {
        field:'tipo_producto',
        title:'tipo',
        compareField:"tipo_producto",
        styleFieldCondition: "tipo_producto",
        items: {
            "1": "Artículo",
            "2": "Servicio",
            "3": "Sin lucro"
          },
        styleCondition: {
          "3": {
            backgroundColor: "#92b108",
            padding: "3px",fontWeight:"bold",
            borderRadius: "5px",
            color: "#ffffff",
          },
            "2": {
              backgroundColor: "#6b8eff",
              padding: "3px",fontWeight:"bold",
              borderRadius: "5px",
              color: "#004c78",
            },
            "1": {
              backgroundColor: "#2dec76",
              padding: "3px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#007b02",
            },
        }
    },
    
];