import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtMeuPerfilService {

  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  getUser(id: number){
    return this.http.get(`${this.API}/${id}`);
  }

}
