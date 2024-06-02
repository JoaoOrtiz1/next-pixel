import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilter } from '../../models/product.model';
import { enviroment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NxtDisplayProductsService {
  private readonly API = `${enviroment.API}/produtos`
  protected http = inject(HttpClient);


  getProducts(filters: ProductFilter): Observable<any>{
    return this.http.post(`${this.API}`, filters);
  }
}
