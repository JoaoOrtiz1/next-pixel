import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtViacepService {
  private readonly VIA_CEP_API = 'https://viacep.com.br/ws';
  protected http = inject(HttpClient);


  getEnderecoPorCep(cep: number): Observable<any> {
    return this.http.get(`${this.VIA_CEP_API}/${cep}/json/`);
  }
}
