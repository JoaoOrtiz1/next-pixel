import { Routes } from '@angular/router';
import { NxtHomeComponent } from './nxt-home/nxt-home.component';
import { NxtCarrinhoComponent } from './nxt-carrinho/nxt-carrinho.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NxtMeuPerfilComponent } from './nxt-meu-perfil/nxt-meu-perfil.component';

export const routes: Routes = [
    { path: '', component: NxtHomeComponent},
    { path: 'produtos', loadChildren: () => import('./nxt-products/nxt-products-routing.module').then(m => m.NxtProductsRoutingModule)},
    { path: 'carrinho', /*canActivate:[AuthGuard],*/ component: NxtCarrinhoComponent},
    { path: 'meu-perfil', canActivate:[AuthGuard], component: NxtMeuPerfilComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
