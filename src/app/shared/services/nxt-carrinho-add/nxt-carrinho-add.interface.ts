import { Observable } from "rxjs";

export interface NxtCarrinhoAdd{
    addItemCarrinho(id: number, prod_id: number, isAuthenticated: boolean): Observable<any>;
}