import { Observable } from "rxjs";

export interface ProductDetalhe{
    getProduto(id: number): Observable<any>;
}