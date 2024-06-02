import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NxtUserService {
  private readonly API = `${enviroment.API}/usuario`
  protected http = inject(HttpClient);

  getUsuario(id: string): Observable<any>{
    return this.http.get(`${this.API}/${id}`);
  }
  
  postUsuario(user: any): Observable<any>{
    return this.http.post(`${this.API}`, {user});
  }
}
