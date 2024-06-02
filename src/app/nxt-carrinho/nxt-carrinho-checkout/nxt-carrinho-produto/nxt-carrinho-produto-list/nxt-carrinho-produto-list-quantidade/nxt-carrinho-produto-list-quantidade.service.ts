import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoProdutoListQuantidadeService {

  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);

  putQuantidade(id: number, produto: number, quantity: number, isAuthenticated: boolean){
    return this.http.put(`${this.API}/produtos/quantidade/${isAuthenticated == true ? `auth` : ''}`, {id, produto, quantity});
  }
}
