import { Observable } from "rxjs";

export interface NxtCepService {
    getCEPInfo(cep: number): Observable<any>;
}