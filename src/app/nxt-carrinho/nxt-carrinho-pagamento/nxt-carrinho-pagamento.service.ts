import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoPagamentoService {

  private readonly API = `${enviroment.API}/pedido`
  protected http = inject(HttpClient);

  postOrder(user: number, valor: number, selectedEndc: number){
    return this.http.post(`${this.API}`, {user, valor, selectedEndc});
  }
}
