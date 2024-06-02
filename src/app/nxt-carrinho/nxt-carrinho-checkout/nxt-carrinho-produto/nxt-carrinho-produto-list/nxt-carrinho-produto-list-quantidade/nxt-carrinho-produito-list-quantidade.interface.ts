import { Observable } from "rxjs";

export interface NxtCarrinhoProdutoListQuantidade{
  putQuantidade(id: number, produto: number, quantity: number, isAuthenticated: boolean): Observable<any>;
}
