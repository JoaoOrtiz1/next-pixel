import { Component, inject, Input, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';
import { NxtAuth0, UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { catchError, lastValueFrom, Subscription } from 'rxjs';
import { NxtCarrinhoButton } from './nxt-carrinho-button.interface';
import { NxtCarrinhoButtonService } from './nxt-carrinho-button.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtAuth0Service } from '../../shared/services/nxt-auth0/nxt-auth0.service';
import { NxtCarrinhoProdutoComponent } from '../../nxt-carrinho/nxt-carrinho-checkout/nxt-carrinho-produto/nxt-carrinho-produto.component';

@Component({
  selector: 'app-nxt-carrinho-button',
  standalone: true,
  imports: [BadgeModule, ToastModule],
  template: `
  <div class="carrinho">
    <i class="pi pi-cart-plus" pBadge [value]="badgeValue" (click)="nxtRouter.navigateTo('/carrinho', {cameFrom: '/'})"></i>
  </div>
  <p-toast></p-toast>
  `,
  styles: `

  .carrinho{
      margin-right: 20px;
      padding: 6px;
      transition: 0.6s;
      border-radius: 5px
    }

    .carrinho:hover{
      background-color: #84A5C8
    }

    .carrinho > i {
      color: white;
      font-size: 30px;
      cursor: pointer;
    }
  `,
  providers: [MessageService]
})
export class NxtCarrinhoButtonComponent implements OnInit {
  @Input() user: UserAuth0 = {} as UserAuth0;

  protected nxtRouter: NxtRouter = inject(NxtRouterService);
  private carrinhoService: NxtCarrinhoButton = inject(NxtCarrinhoButtonService);
  private messageService = inject(MessageService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  badgeValue: number = 0;
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.getQuantidadeCarrinho(this.user.profile.usu_co_usuario, this.user.profile.usu_co_usuario_temp, this.user.isAuthenticated);
    
    this.subs.push(
      this.authService.triggerSubject$.subscribe(value => {
        this.getQuantidadeCarrinho(this.user.profile.usu_co_usuario, this.user.profile.usu_co_usuario_temp, this.user.isAuthenticated);
      })
    )
  }

  async getQuantidadeCarrinho(id: number, id_temp: number, isAuthenticated: boolean){
    const quantidade = await lastValueFrom(this.carrinhoService.getCarrinhoQuantidade(id, id_temp, isAuthenticated).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro:  ' + error.error.message })
        return error;
      })
    ))
    if(quantidade.length > 0){
      this.badgeValue = quantidade[0].total_records;
    }
  }
}
