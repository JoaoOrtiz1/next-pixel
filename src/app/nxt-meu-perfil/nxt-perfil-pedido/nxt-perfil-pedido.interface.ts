import { Observable } from "rxjs";

export interface NxtPerfilPedido{
    getPedidos(id: number, first: number, rows: number): Observable<any>;
}