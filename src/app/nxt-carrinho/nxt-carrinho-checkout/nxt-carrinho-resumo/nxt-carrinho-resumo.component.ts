import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NxtCarrinhoResumo } from './nxt-carrinho-resumo.interface';
import { NxtCarrinhoResumoService } from './nxt-carrinho-resumo.service';
import { catchError, lastValueFrom } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { NxtRouter } from '../../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../../shared/services/nxt-router/nxt-router.service';

@Component({
  selector: 'app-nxt-carrinho-resumo',
  standalone: true,
  imports: [ToastModule, ButtonModule, MessagesModule],
  providers: [MessageService],
  template: `
    <div class="carrinho-resumo">
      <div class="resumo-title">
        <span><b>Resumo</b></span>
      </div>
      <div class="resumo-pre-infos">
        <span>Valor dos produtos: <b>R$ {{resumo == undefined ?  0 : resumo}}</b></span>
        <span>Valor do frete: <b>R$ {{frete == undefined ?  0: frete}}</b></span>
      </div>
      <div class="resumo-valor-desc">
        <span class="resumo-valor">R$ {{calcDesconto(resumo, frete)}}</span>
        <span>Valor total no <b>PIX</b></span>
        <span>Economia de <b>R$ {{calcEconomia(resumo)}}</b></span>
      </div>
      <div class="resumo-button-next">
        <p-button [disabled]="resumo == null" (click)="emitValuesToOrder()" [style]="{'background-color': '#1B4A96', 'margin': '20px 0px'}" label="Continuar para pagamento PIX" ></p-button>
        <p-button (click)="nxtRouter.navigateTo('/produtos', {cameFrom: '/carrinho'})"  class="button-continues-buy" [style]="{'background-color': '#AFC8E4', 'border': '2px solid #ddd'}" label="Continuar comprando"></p-button>
      </div>
    </div>
    @if(showMessage){
      <p-messages [(value)]="messages" [enableService]="false" />
    }
  `,
  styles: `
    ::ng-deep .button-continues-buy > button > span{
      color: #313131;
    }
    .resumo-button-next{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .resumo-valor-desc{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #aed3ae;
      padding: 10px;
    }

    .resumo-valor-desc > .resumo-valor{
      color: black;
      font-weight: bold;
      font-size: 20px;
    }

    .carrinho-resumo{
      background-color: #AFC8E4;
      border-radius: 10px;
      padding: 25px;
    }

    .resumo-title > span{
      font-size: 27px;
      color: black;
    }

    .resumo-pre-infos{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }

    .resumo-pre-infos > span{
      color: black;
      margin: 10px 0px;
    }
  `
})
export class NxtCarrinhoResumoComponent {
  @Input() frete: string = '0';
  @Output() onOrder = new EventEmitter();

  private resumoService: NxtCarrinhoResumo = inject(NxtCarrinhoResumoService);
  private messageService = inject(MessageService);
  protected nxtRouter: NxtRouter = inject(NxtRouterService);

  showMessage: boolean = false;
  messages: Message[] = [];
  resumo!: string;
  
  async getResumoCarrinho(id: number, isAuthenticated: boolean){
    const resumoCarrinho = await lastValueFrom(this.resumoService.getResumoCarrinho(id, isAuthenticated).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar valor total ' + error.error.message })
        return error;
      })
    ))
    if(resumoCarrinho.length > 0){
      this.resumo = resumoCarrinho[0].total_carrinho;
    }
  }

  calcDesconto(resumo: string, frete: string){
    frete == '0'? this.addMessages() : this.messages = [];
    let valor = (parseFloat(resumo) - parseFloat(resumo)*0.1 + parseFloat(frete)).toFixed(2);
    return valor == `NaN`? 0 : valor  
  }

  calcEconomia(resumo: string){
    let valor = (parseFloat(resumo)*0.1).toFixed(2);
    return valor == `NaN`? 0 : valor  
  }

  addMessages() {
    if(this.messages.length == 0){   
      this.messages = [
        { severity: 'warn', summary: 'Selecione uma opção de envio!' }
      ];
    }
  }

  emitValuesToOrder(){
    if(this.resumo !== null){
      if(this.messages.length > 0){
        this.showMessage = true;
      }else{
        this.showMessage = false;
        // continuar enviando
        this.onOrder.emit(this.calcDesconto(this.resumo, this.frete))
      }
    }
  }

}
