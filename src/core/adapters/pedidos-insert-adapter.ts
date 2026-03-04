import { InsertPedidoResponseModel } from "../models/insert-pedido-model";

export class PedidosInsertAdapter {



    static fromApiToJson(res: any): InsertPedidoResponseModel {
        const data = res[0];
        return {
            id: data.id
        }
    }
}