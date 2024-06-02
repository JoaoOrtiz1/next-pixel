import { Observable } from "rxjs";

export interface NxtCarrinhoResumo {
    getResumoCarrinho(id: number, isAuthenticated: boolean): Observable<any>;
}