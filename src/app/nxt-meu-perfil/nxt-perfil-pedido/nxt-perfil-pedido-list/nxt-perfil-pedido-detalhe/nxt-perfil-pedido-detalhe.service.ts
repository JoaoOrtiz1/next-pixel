import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtPerfilPedidoDetalheService {
  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);


  getProdutosPedido(id: number, id_pedido: number, id_endc: number, first: number, rows: number): Observable<any>{
    return this.http.get(`${this.API}/pedido/${id}/${id_pedido}/${id_endc}/${first}/${rows}`);
  }
}
