import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtPerfilService {
  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  putUser(id: number, nome: string, email: string, status: string){
    return this.http.put(`${this.API}`, {id, nome, email, status});
  }
}
