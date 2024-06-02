import { NxtAuth0, UserAuth0 } from './../../../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NxtCarrinhoProdutoListQuantidadeService } from './nxt-carrinho-produto-list-quantidade.service';
import { NxtCarrinhoProdutoListQuantidade } from './nxt-carrinho-produito-list-quantidade.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtAuth0Service } from '../../../../../shared/services/nxt-auth0/nxt-auth0.service';

@Component({
  selector: 'app-nxt-carrinho-produto-list-quantidade',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  template: `
    <div class="quantidade-produto">
      <p-button icon="pi pi-minus" [text]="true" (click)="putQuantidade(user.profile.usu_co_usuario, produto, quantidade, user.isAuthenticated, false)"></p-button>
      <span>{{quantidade}}</span>
      <p-button icon="pi pi-plus" [text]="true" (click)="putQuantidade(user.profile.usu_co_usuario, produto, quantidade, user.isAuthenticated, true)" ></p-button>
    </div>
    <p-toast></p-toast>
  `,
  styles: `
    .quantidade-produto{
      display: flex;
      align-items: center;
    }
  `,
  providers: [MessageService]
})
export class NxtCarrinhoProdutoListQuantidadeComponent {
  @Input() quantidade: number = 0;
  @Input() produto: number = 0;
  @Input() user: UserAuth0 = {} as UserAuth0;
  @Output() deleteItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();

  private quantidadeService: NxtCarrinhoProdutoListQuantidade = inject(NxtCarrinhoProdutoListQuantidadeService);
  private messageService = inject(MessageService);

  async putQuantidade(id: number, produto: number, quantity: number, isAuthenticated: boolean, operation: boolean){
    let quantidade = operation ? this.quantidade +1 : this.quantidade -1;
    if(quantidade <= 0){
      this.deleteItem.emit()
    }else{
      const quantidadeProduto = await lastValueFrom(this.quantidadeService.putQuantidade(id, produto, quantidade, isAuthenticated).pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar quantidade ' + error.error.message })
          return error;
        })
      ));
      this.updateItem.emit(quantidade);
    }
  }
}
