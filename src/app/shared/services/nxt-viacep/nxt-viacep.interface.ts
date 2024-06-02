import { Observable } from "rxjs/internal/Observable";

export interface NxtViaCep{
  getEnderecoPorCep(cep: number): Observable<any>;
}
