import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoButtonService {

  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);

  getCarrinhoQuantidade(id: number, id_temp: number, isAuthenticated: boolean){
    return this.http.get(`${this.API}/produtos/quantidade/${isAuthenticated ? 'auth/' : ''}${id}/${id_temp}`);
  }
}
