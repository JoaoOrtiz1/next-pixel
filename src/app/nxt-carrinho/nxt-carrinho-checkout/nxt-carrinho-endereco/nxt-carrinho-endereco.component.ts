import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NxtCarrinhoEndereco } from './nxt-carrinho-endereco.interface';
import { NxtCarrinhoEnderecoService } from './nxt-carrinho-endereco.service';
import { UserAuth0 } from '../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { Endereco, EnderecoAutoComplete, EnderecoFull } from '../../../shared/models/endereco.model';
import { catchError, concatMap, from, lastValueFrom, of, switchMap, toArray } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NxtFreteComponent } from "../../../shared/components/nxt-frete/nxt-frete.component";
@Component({
    selector: 'app-nxt-carrinho-endereco',
    standalone: true,
    template: `
    <div class="carrinho-endereco">
      <div class="endereco-title">
        <span><b>Selecione o Endereço</b></span>
      </div>
      <div class="endereco-autocomplete">
        <p-autoComplete  (onClear)="onSelectFrete.emit('0')" (onSelect)="activeFrete = true; onSelectEndc.emit(selectedEndereco.optionValue.split('|')[0])" forceSelection="true" showClear="true" [style]="{'width': '100%'}" optionLabel="optionLabelSimple"  placeholder="Busque o nome do endereço cadastrado" [(ngModel)]="selectedEndereco" [suggestions]="enderecos" (completeMethod)="getEnderecos($event)"></p-autoComplete>
        <p-button icon="pi pi-plus" (click)="true"></p-button>
      </div>
      @if(selectedEndereco?.optionLabel){
        <div class="endereco-selected">
          <span><b>Entregar em:</b> {{selectedEndereco.optionLabel}}</span>
        </div>
        <app-nxt-frete (onSelectFrete)="onSelectFrete.emit($event)" style="width: 100%;" [showSearch]="false" [activeFrete]="activeFrete" />
      }
    </div>
    <p-toast></p-toast>
  `,
    styles: `

    .carrinho-endereco{
      background-color: #AFC8E4;
      border-radius: 10px;
      padding: 25px;
    }

    .endereco-title > span {
      font-size: 27px;
      color: black;
    }

    .endereco-autocomplete{
      margin-top: 20px;
      display: flex;
      width: 100%;
    }

    .endereco-selected{
      margin: 20px 0px;
    }

    .endereco-selected > span{
      font-size: 20px;
      color: black;
    }

    ::ng-deep p-autocomplete{
      min-width: 30%;
    }

    ::ng-deep .endereco-autocomplete > p-autocomplete > div > input{
      width: 100%;
    }

  `,
    providers: [MessageService],
    imports: [AutoCompleteModule, FormsModule, ToastModule, ButtonModule, NxtFreteComponent]
})
export class NxtCarrinhoEnderecoComponent {
  private carrinhoEndService: NxtCarrinhoEndereco = inject(NxtCarrinhoEnderecoService);
  private messageService = inject(MessageService);
  @Input() user: UserAuth0 = {} as UserAuth0;
  @Output() onSelectFrete = new EventEmitter();
  @Output() onSelectEndc = new EventEmitter();

  activeFrete: boolean = false;
  enderecos: EnderecoAutoComplete[] = [];
  selectedEndereco: any; // = {}

  async getEnderecos(event: any){
    if(this.user.isAuthenticated){
      const enderecos = await lastValueFrom(this.carrinhoEndService.getEnderecos(this.user.profile.usu_co_usuario, event.query).pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar endereços ' + error.error.message })
          return error;
        })
      ));
      this.enderecos = [];
      this.enderecos = enderecos;
    }else{
      this.enderecos = [{optionLabelSimple: 'Nenhum endereço encontrado'} as EnderecoAutoComplete]
    }
  }
}
