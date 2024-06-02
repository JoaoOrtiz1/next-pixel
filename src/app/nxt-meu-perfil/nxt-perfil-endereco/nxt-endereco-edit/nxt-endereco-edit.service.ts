import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtEnderecoEditService {
  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  updateEndereco(
    id_endc: number,
    id: number, 
    cep: number, 
    estado: string, 
    cidade: string, 
    numero: number, 
    apelido: string, 
    bairro: string, 
    recebe: string, 
    rua: string
): Observable<any> {
  return this.http.put(`${this.API}/endereco`,{
    id_endc, id, cep, estado, cidade, numero, apelido, bairro, recebe, rua
  })
}
}
