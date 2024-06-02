import { Observable } from "rxjs";

export interface UserService {
    getUsuario(id: string): Observable<any>;

    postUsuario(user: any): Observable<any>;
}