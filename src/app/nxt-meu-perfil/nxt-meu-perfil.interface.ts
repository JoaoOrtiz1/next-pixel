import { Observable } from "rxjs";

export interface NxtMeuperfil{
    getUser(id: number): Observable<any>;
}