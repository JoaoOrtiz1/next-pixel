import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NxtAuth0, UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { NxtCarrinhoPagamentoService } from './nxt-carrinho-pagamento.service';
import { NxtCarrinhoPagamento } from './nxt-carrinho-pagamento.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtCarrinhoButtonComponent } from '../../nxt-navbar/nxt-carrinho-button/nxt-carrinho-button.component';
import { NxtAuth0Service } from '../../shared/services/nxt-auth0/nxt-auth0.service';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';

@Component({
  selector: 'app-nxt-carrinho-pagamento',
  standalone: true,
  imports: [ToastModule],
  template: `
    <div class="carrinho-pagamento">
      <div class="pagamento-title">
        <span><b>Quase lá!</b></span>
      </div>
      <div class="pagamento-content">
        <div class="pagamento-instructions">
          <span>Basta realizar o pagamento <b>PIX</b> através do <b>QRCODE</b> abaixo!</span>
        </div>
        <div class="pagamento-qrcode">
          <img width="80%" height="80%" src="https://api.qrserver.com/v1/create-qr-code/?size=550x550&data=00020126580014BR.GOV.BCB.PIX0136e0ef3682-5665-44bc-b148-d43dc8f59c0452040000530398654041.005802BR5924Joao Gabriel Peral Ortiz6009SAO PAULO6214051083g2Y0dEQJ6304C39E" alt="">
        </div>
        <div class="pagamento-instructions" style="margin-top: 40px;">
          <span>Valor total: <b>R$ {{valor}}</b></span>
        </div>
      </div>
    </div>
    <p-toast></p-toast>
  `,
  styles: `
    .pagamento-content{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    
    .pagamento-instructions{
      margin-bottom: 40px;
    }

    .pagamento-qrcode{
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }

    .pagamento-qrcode > img{
      border-radius: 10px;
      padding: 2px;
    }

    .carrinho-pagamento{
      background-color: #AFC8E4;
      border-radius: 10px;
    }

    .pagamento-title{
      padding: 40px 0px 20px 40px;
    }

    .pagamento-title > span{
      color: black;
      font-size: 29px;
    }

    .pagamento-content{
      display: flex;
      justify-content: center;
    }
    
    .pagamento-instructions > span{
      color: black;
      font-size: 27px;
    }
  `,
  providers: [MessageService, NxtCarrinhoButtonComponent ]
})
export class NxtCarrinhoPagamentoComponent implements OnInit {
  @Input() user!: UserAuth0;
  @Input() valor: number = 0;
  @Input() endcId: number = 0;
  @Input() selectedEndc!: number;
  @Output() onOrderPaid = new EventEmitter();

  private pagamentoService: NxtCarrinhoPagamento = inject(NxtCarrinhoPagamentoService);
  private messageService = inject(MessageService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  ngOnInit(): void {
    this.postOrder(this.user, this.valor, this.selectedEndc);

    setTimeout(() => {
      this.onOrderPaid.emit();
    }, 5000);
  }

  async postOrder(user: UserAuth0, valor: number, selectedEndc: number){
    const order = await lastValueFrom(this.pagamentoService.postOrder(user.profile.usu_co_usuario, valor, selectedEndc).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar pedido ' + error.error.message })
        return error;
      })
    ));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido cadastrado com sucesso! ' })

    this.authService.setAnyBS('change');
    
  }
}
