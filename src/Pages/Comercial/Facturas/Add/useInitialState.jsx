import { funciones } from "../../../../App/helpers/funciones";

function useInitialState() {
    const iDialogs = {
        main:true,
        finalizar:false,
        nro_factura:false,
        registrar_cliente:false,
        buscar_cliente:false,
        precio:false,
        insertar_pedido:false
    }


    const initialFactura = {
        pedidos:[],
        items:[],
        total:0,
        liquiiva5:0,
        liquiiva10:0,
        iva5:0,
        iva10:0,
        exenta:0,
        cliente:{
            id_cliente:1,
            ruc_cliente:'X',
            nombre_cliente:'SIN NOMBRE',
            direccion_cliente:'_'
        },
        tipo_factura:'1',
        nro_factura:'0',
        codigo_cliente_pedido:'',
        fecha: funciones.getFechaHorarioString(),
        hora: funciones.HoraActualHMS(),
        obs: {
            cliente:'',
            laboratorio:'',
            armazon_id:'0'
        }
    }


    return { iDialogs, initialFactura}
}

export default useInitialState;