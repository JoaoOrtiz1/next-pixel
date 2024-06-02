import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoProdutoService {

  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);

  getProdutosCarrinho(id: number, rows: number, first: number, isAuthenticated: boolean, id_temp: number){
    return this.http.get(`${this.API}/produtos/itens/${isAuthenticated == true ? `auth/` : ''}${id}/${rows}/${first}/${id_temp}`);
  }
}
