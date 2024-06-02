import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NxtAuth0, UserAuth0 } from '../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { catchError, lastValueFrom, Subscription } from 'rxjs';
import { NxtCarrinhoProdutoService } from './nxt-carrinho-produto.service';
import { NxtCarrinhoProduto } from './nxt-carrinho-produto.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtCarrinhoProdutoListComponent } from "./nxt-carrinho-produto-list/nxt-carrinho-produto-list.component";
import { Product, ProductFilterBase } from '../../../shared/models/product.model';
import { NxtAuth0Service } from '../../../shared/services/nxt-auth0/nxt-auth0.service';
import { NxtCarrinhoProdutoDeleteComponent } from "./nxt-carrinho-produto-delete/nxt-carrinho-produto-delete.component";

@Component({
    selector: 'app-nxt-carrinho-produto',
    standalone: true,
    template: `

    <div class="carrinho-produto">
      <div class="carrinho-title">
        <span><b>Produtos</b></span>
        @if(produtos.length > 0){
          <app-nxt-carrinho-produto-delete [label]="'Limpar carrinho'" (onDelete)="getProdutosCarrinho(user.profile.usu_co_usuario, objectFilter.rows, 0, user.isAuthenticated, user.profile.usu_co_usuario_temp); onReturnProducts.emit()" [isAuthenticated]="user.isAuthenticated" [user]="user.profile.usu_co_usuario" />
        }
      </div>
      <div class="carrinho-produto-list">
        <app-nxt-carrinho-produto-list (onProdutoChange)="onReturnProducts.emit()" [user]="user" [loading]="loading" [produtos]="produtos" (onPageChangeEvent)="getProdutosCarrinho(user.profile.usu_co_usuario, $event.rows, $event.first, user.isAuthenticated, user.profile.usu_co_usuario_temp)" [objectFilter]="objectFilter" />
      </div>
    </div>
    <p-toast></p-toast>
  `,
    styles: `
    .carrinho-title{
      display: flex;
      justify-content: space-between;
    }

    .carrinho-produto{
      background-color: #AFC8E4;
      border-radius: 10px;
      padding: 25px;
    }

    .carrinho-title > span {
      font-size: 27px;
      color: black;
    }

    .carrinho-produto-list{
      margin-top: 30px;
    }
  `,
    providers: [MessageService],
    imports: [ToastModule, NxtCarrinhoProdutoListComponent, NxtCarrinhoProdutoDeleteComponent]
})
export class NxtCarrinhoProdutoComponent implements OnInit {
  @Output() onReturnProducts = new EventEmitter()
  user: UserAuth0 = {} as UserAuth0;

  private carrinhoProdService: NxtCarrinhoProduto = inject(NxtCarrinhoProdutoService);
  private messageService = inject(MessageService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  produtos: Product[] = [];
  objectFilter: ProductFilterBase = {} as ProductFilterBase;

  subs: Subscription[] = [];

  loading: boolean = false;

  ngOnInit(): void {
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
        if(user.profile?.usu_co_usuario){
          this.getProdutosCarrinho(user.profile.usu_co_usuario, 10, 0, user.isAuthenticated, user.profile.usu_co_usuario_temp);
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }


  async getProdutosCarrinho(id: number, rows: number, first: number, isAuthenticated: boolean, id_temp: number ){
    this.loading = true;
    const produtos = await lastValueFrom(this.carrinhoProdService.getProdutosCarrinho(id, rows, first, isAuthenticated, id_temp).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar produtos ' + error.error.message })
        return error;
      })
    ))

    this.produtos = [];
    if(produtos && produtos.length > 0){
      this.setObjectFilter(produtos[0].total_records, rows, first);
      this.produtos = produtos;
    }
    this.onReturnProducts.emit();
    this.loading = false;
  }

  setObjectFilter(total_records: number, rows: number, first: number){
    this.objectFilter.total_records = total_records;
    this.objectFilter.rows = rows;
    this.objectFilter.first = first;
  }
}
