const ListaColumns= [
    {
        field:'id_user',
        title:'ID'
    },
    {
        field:'nombre_user',
        title:'Nombre'
    },
    {
        field:'username_user',
        title:'Login'
    },
    {
        field:'email_user',
        title:'Email'
    },
    
    {
        field:'rol_user',
        title:'ROL',
        compareField:"rol_user",
        styleFieldCondition: "rol_user",
            items: {
                "0":'Mantenimiento',
                "1": "Administrador",
                "2": "Gerente",
                "3": "Vendedor",
                "4": "Financiero",
                "5": "Deposito",
                "6": "Caja"
              },
    },
]
export default ListaColumns ;