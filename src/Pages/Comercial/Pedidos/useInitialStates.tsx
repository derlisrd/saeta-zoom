import { funciones } from "../../../App/helpers/funciones";

function useInitialStates() {

    const initialFactura = {
        items:[],
        total:0,
        iva5:0,
        iva10:0,
        exenta:0,
        cliente:{
            id_cliente:1,
            ruc_cliente:'X',
            nombre_cliente:'SIN NOMBRE',
            fantasia_cliente:'',
            direccion_cliente:''
        },
        tipo_pedido:'1',
        codigo_cliente_pedido:'',
        fecha: funciones.getFechaHorarioString(),
        obs: {
            cliente:'',
            laboratorio:'',
            armazon_id:'0'
        },
        /* receta:{
            lejos_derecho_esferico:'0',
            lejos_derecho_cilindrico:'0',
            lejos_izquierdo_cilindrico:'0',
            lejos_izquierdo_esferico:'0',
            lejos_eje_derecho:'0',
            lejos_eje_izquierdo:'0',
    
            cerca_derecho_esferico:'0',
            cerca_derecho_cilindrico:'0',
            cerca_izquierdo_cilindrico:'0',
            cerca_izquierdo_esferico:'0',
            cerca_eje_derecho:'0',
            cerca_eje_izquierdo:'0',
            adicion_izquierdo:'0',
            adicion_derecho:'0',

            dnp_izquierdo:'0',
            dnp_derecho:'0',

            codigo_derecho:'',
            codigo_izquierdo:'',

            altura_derecho:'0',
            altura_izquierdo:'0'
        } */
    }

    const iDialogs = {
        main:false,
        finalizar:false,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false,
        obs:false,
        precio:false,
        edit_receta:false
    }

    return { iDialogs,initialFactura}

}

export default useInitialStates;

