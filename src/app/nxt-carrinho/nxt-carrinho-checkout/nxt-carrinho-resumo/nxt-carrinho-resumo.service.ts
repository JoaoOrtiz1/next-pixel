import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoResumoService {

  private readonly API = `${enviroment.API}/carrinho`
  protected http = inject(HttpClient);
  
  getResumoCarrinho(id: number, isAuthenticated: boolean): Observable<any>{
    return this.http.get(`${this.API}/resumo/${isAuthenticated ? 'auth/': ''}${id}`);
  }
}
