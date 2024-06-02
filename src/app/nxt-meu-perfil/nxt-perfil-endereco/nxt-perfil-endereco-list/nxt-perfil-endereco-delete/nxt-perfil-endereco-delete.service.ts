import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtPerfilEnderecoDeleteService {

  private readonly API = `${enviroment.API}/meu-perfil`
  protected http = inject(HttpClient);

  deleteEndereco(id: number, id_endc: number){
    return this.http.delete(`${this.API}/endereco/${id}/${id_endc}`);
  }
}
