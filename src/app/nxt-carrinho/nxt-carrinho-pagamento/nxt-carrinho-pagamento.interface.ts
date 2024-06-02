import { Observable } from "rxjs";

export interface NxtCarrinhoPagamento{
    postOrder(user: number, valor: number, selectedEndc: number): Observable<any>;
}