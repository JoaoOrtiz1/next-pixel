import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtEnderecoAddService {
  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  postEndereco(
    id: number, 
    cep: number, 
    estado: string, 
    cidade: string, 
    numero: number, 
    apelido: string, 
    bairro: string, 
    recebe: string, 
    rua: string  
  ): Observable<any>{
    return this.http.post(`${this.API}/endereco`,{
      id, cep, estado, cidade, numero, apelido, bairro, recebe, rua
    })
  }

}
