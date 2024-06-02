import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { NxtCarrinhoEnderecoComponent } from "./nxt-carrinho-endereco/nxt-carrinho-endereco.component";
import { NxtCarrinhoProdutoComponent } from "./nxt-carrinho-produto/nxt-carrinho-produto.component";
import { NxtCarrinhoResumoComponent } from "./nxt-carrinho-resumo/nxt-carrinho-resumo.component";
import { UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-nxt-carrinho-checkout',
    standalone: true,
    template: `
    <div class="carrinho-checkout-component">
      <div class="section-left">
        <app-nxt-carrinho-endereco (onSelectEndc)="selectedEndc = $event" [user]="user" style="width: 100%;" (onSelectFrete)="frete = $event" />
        <app-nxt-carrinho-produto (onReturnProducts)="getResumo(user.profile.usu_co_usuario, user.isAuthenticated)" style="width: 100%; margin-top: 40px;" />
      </div>
      <div class="section-right">
        <app-nxt-carrinho-resumo (onOrder)="infosToOrder(user, $event, selectedEndc)" [frete]="frete" #resumo style="width: 100%;" />
      </div>
    </div>
    <p-toast></p-toast>
  `,
    styles: `
    .carrinho-checkout-component{
      background-color: #84A5C8;
      display: flex;
      justify-content: space-between;
    }

    .section-left{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 70%;
    }

    .section-right{
      display: flex;
      justify-content: center;
      width: 25%;
    }

    @media (max-width: 971px){
      .carrinho-checkout-component{
        flex-wrap: wrap;
      }

      .section-left,
      .section-right{
        width: 100%;
      }

      .section-right{
        margin-top: 25px;
      }
    }
  `,
    imports: [NxtCarrinhoEnderecoComponent, NxtCarrinhoProdutoComponent, NxtCarrinhoResumoComponent, ToastModule],
    providers: [MessageService]
})
export class NxtCarrinhoCheckoutComponent {
  @Input() user: UserAuth0 = {} as UserAuth0;
  @ViewChild('resumo', {static: true}) resumoComponet!: NxtCarrinhoResumoComponent;
  @Output() onConfirmOrder = new EventEmitter();   

  private nxtRouter: NxtRouter = inject(NxtRouterService);
  private messageService = inject(MessageService);

  selectedEndc!: number;
  frete: string = `0`
  
  getResumo(id: number, isAuthenticated: boolean){
    this.resumoComponet.getResumoCarrinho(id, isAuthenticated);
  }

  infosToOrder(user: UserAuth0, valor: number, selectedEndc: number ){
    if(user.isAuthenticated){
      this.onConfirmOrder.emit({valor, selectedEndc})
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Parece que você não está logado, vamos te redirecionar para fazer as coisas na ordem certa!' })
      setTimeout(() => {
        this.nxtRouter.navigateTo('meu-perfil', { cameFrom: '/carrinho'})
      }, 3500);
    }
  }
}
