import { Observable } from "rxjs";

export interface NxtCarrinhoProduto{
  getProdutosCarrinho(id: number, rows: number, first: number, isAuthenticated: boolean, id_temp: number): Observable<any>;
}
