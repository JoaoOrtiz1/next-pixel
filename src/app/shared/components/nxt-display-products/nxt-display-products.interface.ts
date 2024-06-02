import { Observable } from "rxjs";
import { ProductFilter } from "../../models/product.model";

export interface DisplayProducts{
  getProducts(filters: ProductFilter): Observable<any>;
}
