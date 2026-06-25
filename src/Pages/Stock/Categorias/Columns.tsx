const ListaColumns= [
    {
        field:'id_categoria',
        title:'ID'
    },
    {
        field:'nombre_categoria',
        title:'Nombre'
    },
    {
        field:'tipo_categoria',
        title:'Tipo',
        compareField:"tipo_categoria",
        styleFieldCondition: "tipo_categoria",
        items: {
            "0": "Servicio",
            "1": "Artículo",
            "2": "Insumo"  
        },
    },
]
export default ListaColumns ;