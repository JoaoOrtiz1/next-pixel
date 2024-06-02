import { Observable } from "rxjs";

export interface NxtDeleteEndereco {
    deleteEndereco(id: number, id_endc: number): Observable<any>;
}