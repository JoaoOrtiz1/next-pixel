import { Observable } from "rxjs";

export interface NxtCarrinhoProdutoDelete{
  deleteProduto(id: number, id_produto: number, isAuthenticated: boolean): Observable<any>;
}
