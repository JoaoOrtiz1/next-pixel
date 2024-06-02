import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NxtCarrinhoProdutoDeleteService } from './nxt-carrinho-produto-delete.service';
import { NxtCarrinhoProdutoDelete } from './nxt-carrinho-produto-delete.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtAuth0 } from '../../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../../../../shared/services/nxt-auth0/nxt-auth0.service';

@Component({
  selector: 'app-nxt-carrinho-produto-delete',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  template: `
    <div class="butto-produto-delete">
      <p-button [label]="label" (click)="deleteProduto(user, produto, isAuthenticated)" icon="pi pi-trash"></p-button>
    </div>
    <p-toast></p-toast>
  `,
  styles: ``,
  providers: [MessageService]
})
export class NxtCarrinhoProdutoDeleteComponent {
  @Input() isAuthenticated!: boolean;
  @Input() user!: number;
  @Input() produto!: number;
  @Input() label: string = '';
  @Output() onDelete = new EventEmitter();

  private deleteService: NxtCarrinhoProdutoDelete = inject(NxtCarrinhoProdutoDeleteService);
  private messageService = inject(MessageService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  async deleteProduto(user: number, produto: number, isAuthenticated: boolean){
    if(user){
      const deleteProdutos = await lastValueFrom( this.deleteService.deleteProduto(user, produto, isAuthenticated).pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar produtos ' + error.error.message })
          return error;
        }))
      )
    this.onDelete.emit();
    this.authService.setAnyBS('change');
    }
  }
}
