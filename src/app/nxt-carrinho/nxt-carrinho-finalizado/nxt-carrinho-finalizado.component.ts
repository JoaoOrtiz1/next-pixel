import { Component, OnInit, inject } from '@angular/core';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';

@Component({
  selector: 'app-nxt-carrinho-finalizado',
  standalone: true,
  imports: [],
  template: `
    <div class="carrinho-finalizado">
      <div class="finalizado-infos">
        <span class="info-finalizado"><b>Pagamento recebido com sucesso!</b></span>
        <span class="info-finalizado"><b>Obrigado pela preferência!</b></span>
        <span style="font-size: 20px;">Seu pedido logo será enviado e ficará disponível no seu perfil</span>
        <img style="margin-top: 40px;" width="70%" height="70%" src="../../../assets/check.png" alt="">
      </div>
    </div>
  `,
  styles: `
    .carrinho-finalizado{
      background-color: #AFC8E4;
      border-radius: 10px;
      padding: 20px;
    }

    .finalizado-infos{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .finalizado-infos > .info-finalizado{
      font-size: 29px;
      letter-spacing: 3px;
      color: black;
      margin: 15px 0px;
      text-align: center;
    }

    .finalizado-infos > img{
      max-width: 60%;
      max-height: 60%;
    }

  `
})
export class NxtCarrinhoFinalizadoComponent implements OnInit {
  private nxtRouter: NxtRouter = inject(NxtRouterService);

  ngOnInit(): void {
    setTimeout(() => {
      this.nxtRouter.navigateTo('/meu-perfil', {cameFrom: '/carrinho'})
    }, 3000);  
  }


}
