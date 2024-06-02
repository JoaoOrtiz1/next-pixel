import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoAddService {
  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);

  addItemCarrinho(id: number, prod_id: number, isAuthenticated: boolean): Observable<any>{
    return this.http.post(`${this.API}/produtos/itens${isAuthenticated ? '/auth': ''}`, {id, prod_id});
  }

}
