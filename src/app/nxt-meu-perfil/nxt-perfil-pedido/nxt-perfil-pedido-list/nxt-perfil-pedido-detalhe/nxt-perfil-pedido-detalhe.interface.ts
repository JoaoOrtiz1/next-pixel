import { Observable } from "rxjs";

export interface NxtPerfilPedidoDetalhe{
    getProdutosPedido(id: number, id_pedido: number, id_endc: number, first: number, rows: number): Observable<any>;
}