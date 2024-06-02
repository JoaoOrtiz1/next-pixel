import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtPerfilPedidoService {

  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  getPedidos(id: number, first: number, rows: number): Observable<any>{
    return this.http.get(`${this.API}/pedidos/${id}/${first}/${rows}`);
  };
}
