import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoProdutoDeleteService {
  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);

  deleteProduto(id: number, id_produto: number, isAuthenticated: boolean){
    return this.http.delete(`${this.API}/produtos/${isAuthenticated ? 'auth/': ''}${id}/${id_produto}` )
  }
}
