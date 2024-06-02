import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NxtProductsComponent } from './nxt-products/nxt-products.component';
import { NxtProductComponent } from './nxt-product/nxt-product.component';

const routes: Routes = [
  { path: '', component: NxtProductsComponent},
  { path: ':id', component: NxtProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NxtProductsRoutingModule { }
