import { Observable } from "rxjs";

export interface NxtCarrinhoEndereco{
  getEnderecos(id: number, query: string): Observable<any>;

}
