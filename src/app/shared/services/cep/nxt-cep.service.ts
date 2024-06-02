import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtCepFindService {
  private readonly API = `https://viacep.com.br/ws`
  protected http = inject(HttpClient);

  getCEPInfo(cep: number): Observable<any>{
    return this.http.get(`${this.API}/${cep}/json/`);
  }
}
