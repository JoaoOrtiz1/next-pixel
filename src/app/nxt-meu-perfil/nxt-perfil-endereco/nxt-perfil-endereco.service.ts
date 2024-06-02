import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtPerfilEnderecoService {
  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  getEnderecos(id: number, first: number, rows: number){
    return this.http.get(`${this.API}/endereco/${id}/${first}/${rows}`);
  }
}
