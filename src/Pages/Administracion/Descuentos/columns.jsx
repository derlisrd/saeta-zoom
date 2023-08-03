export const  columns = [
    {
        field:'id_descuento',
        title:'#'
    },
    {
        field:'ruc_cliente',
        title:'DOC.'
    },
    {
        field:'nombre_cliente',
        title:'CLIENTE'
    },
    {
        field:'codigo_producto',
        title:'CODIGO'
    },
    {
        field:'nombre_producto',
        title:'PRODUCTO'
    },
    {
        field:'precio_producto',
        title:'PRECIO',
        isNumber:true
    },  
    {
        field:'precio_descuento',
        title:'CON DESCUENTO',
        isNumber:true
    },  
    {
        field:'porcentaje_descuento',
        title:'PORCENTAJE',
        after:'%'
    }  

]