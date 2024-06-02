import { Observable } from "rxjs";

export interface NxtPerfilEndereco{
    getEnderecos(id: number, first: number, rows: number): Observable<any>; 
}