import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtProductService {
  private readonly API = `${enviroment.API}/produtos`
  protected http = inject(HttpClient);

  getProduto(id: number): Observable<any>{
    return this.http.get(`${this.API}/${id}`);
  }
}
