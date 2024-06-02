import { Observable } from "rxjs";

export interface NxtCarrinhoButton{
  getCarrinhoQuantidade(id: number, id_temp: number, isAuthenticated: boolean): Observable<any>;
}
