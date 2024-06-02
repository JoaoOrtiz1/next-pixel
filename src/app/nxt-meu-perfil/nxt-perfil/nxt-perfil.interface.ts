import { Observable } from "rxjs/internal/Observable";

export interface NxtPerfil{
    putUser(id: number, nome: string, email: string, status: string): Observable<any>;
}