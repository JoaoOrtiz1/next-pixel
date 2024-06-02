import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtCarrinhoEnderecoService {
  private readonly API = `${enviroment.API}/endereco`
  protected http = inject(HttpClient);

  getEnderecos(id: number, query: string): Observable<any>{
    return this.http.get(`${this.API}/${id}/${query}`);
  }
}
