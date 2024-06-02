import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CEPPipe } from "../../pipes/cep-pipe";
import { NxtCepFormatService } from '../../services/cep-format/nxt-cep.service';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-nxt-frete',
    standalone: true,
    template: `
    <div class="frete-component">
      @if(showSearch){
        <div class="frete-search">
          <input pInputText type="text" placeholder="CEP" [(ngModel)]="cepNumber" [value]="cepNumber | cep">
          <p-button label="Calcular" (click)="getFrete()" [loading]="loading"></p-button>
        </div>
      }
      <div class="frete-results">
        @if(activeFrete){
          <p-accordion [activeIndex]="activeIndex" [style]="{'width':'100%'}">
            <p-accordionTab header="Opções encontradas" >
              <div class="frete-results" style="display: flex; flex-direction: column">
              <span>
                <p-radioButton (click)="onSelectFrete.emit(freteSelected);" name="pizza" value="39.90" [(ngModel)]="freteSelected" inputId="frete1"></p-radioButton>
                <b>SEDEX Correios</b> - 3 dias úteis - <b>R$39,90</b>
              </span>
              <span>
                <p-radioButton (click)="onSelectFrete.emit(freteSelected);" name="pizza" value="45.90" [(ngModel)]="freteSelected" inputId="frete2"></p-radioButton>
                <b>SEDEX 10 Correios</b> - 2 dias úteis - <b>R$45,90</b>
              </span>
              <span>
                <p-radioButton (click)="onSelectFrete.emit(freteSelected);" name="pizza" value="29.90" [(ngModel)]="freteSelected" inputId="frete3"></p-radioButton>
                <b>PAC Correios</b> - 7 dias úteis - <b>R$29,90</b>
              </span>

              </div>
            </p-accordionTab>
          </p-accordion>
        }

      </div>
    </div>
  `,
    styles: `
      .frete-results > span{
        font-size: 18px;
      }

      ::ng-deep .frete-results > p-accordion > div > p-accordiontab > div > div > div {
        background-color: #ddd;
      }

      ::ng-deep .frete-results > p-accordion > div > p-accordiontab > div > div > div > div > span{
        margin: 12px;
      }
      ::ng-deep .frete-results > p-accordion > div > p-accordiontab > div > div > div > div > span > p-radioButton{
        margin-right: 10px;
      }

      ::ng-deep p-accordiontab > div > div> a{
        background-color: #AFC8E4 !important;
        color: black;
      }

      ::ng-deep .frete-search > p-button > button{
      background-color: #1B4A96
    }
  `,
    imports: [AccordionModule, InputTextModule, FormsModule, ButtonModule, CEPPipe, RadioButtonModule]
})
export class NxtFreteComponent {
  private cepService = inject(NxtCepFormatService);
  @Input() showSearch: boolean = true;
  @Output() onSelectFrete = new EventEmitter();
  @Input() activeFrete: boolean = false;

  freteSelected: any;
  cepNumber: string = ''
  activeIndex: number = 1;
  loading: boolean = false;

  getFrete(){
    if(this.cepNumber !== ''){
      this.loading = true;
      setTimeout(() => {
        this.activeFrete = true
        this.loading = false;
      }, 1000);
    }
  }
}
