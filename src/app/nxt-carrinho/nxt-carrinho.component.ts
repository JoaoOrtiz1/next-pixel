import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { NxtBackButtonComponent } from "../shared/components/nxt-back-button/nxt-back-button.component";
import { NxtCarrinhoCheckoutComponent } from "./nxt-carrinho-checkout/nxt-carrinho-checkout.component";
import { NxtCarrinhoPagamentoComponent } from "./nxt-carrinho-pagamento/nxt-carrinho-pagamento.component";
import { NxtCarrinhoFinalizadoComponent } from "./nxt-carrinho-finalizado/nxt-carrinho-finalizado.component";
import { NxtAuth0, UserAuth0 } from '../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../shared/services/nxt-auth0/nxt-auth0.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-nxt-carrinho',
    standalone: true,
    template: `

    <div class="carrinho-component">
      <div class="carrinho-title">
        <app-nxt-back-button [routerNavigateBack]="routerNavigateBack" />
        <h1>Carrinho</h1>
      </div>
      <div class="section-line"></div>
      <div class="carrinho-stepper">
        <p-stepper [(activeStep)]="activeStep"  >
            <p-stepperPanel header="Header I">
              <ng-template pTemplate="header">
                <div class="button-stepper">
                  <p-button [rounded]="true" [disabled]="activeStep+1 == 1? false : true" [label]="'1'"></p-button>
                  <span>Checkout</span>
                </div>
              </ng-template>
              <ng-template  pTemplate="content">
                <app-nxt-carrinho-checkout (onConfirmOrder)="valor = $event.valor; selectedEndc = $event.selectedEndc; activeStep = activeStep+1" [user]="user" />
              </ng-template>
            </p-stepperPanel>

            <p-stepperPanel header="Header II">
              <ng-template pTemplate="header">
                <div class="button-stepper">
                  <p-button [rounded]="true" [disabled]="activeStep+1 == 2? false : true" [label]="'2'"></p-button>
                  <span>Pagamento</span>
                </div>
              </ng-template>
              <ng-template  pTemplate="content">
                <app-nxt-carrinho-pagamento (onOrderPaid)="activeStep = activeStep+1" [selectedEndc]="selectedEndc" [valor]="valor" [user]="user" />
              </ng-template>
            </p-stepperPanel>

            <p-stepperPanel header="Header III">
              <ng-template pTemplate="header">
                <div class="button-stepper">
                  <p-button [rounded]="true" [disabled]="activeStep+1 == 3? false : true" [label]="'3'"></p-button>
                  <span>Finalizado</span>
                </div>
              </ng-template>
              <ng-template  pTemplate="content">
                <app-nxt-carrinho-finalizado />
              </ng-template>
            </p-stepperPanel>
        </p-stepper>
      </div>
    </div>

  `,
    styles: `

    ::ng-deep .p-stepper-panels{
      background-color: #84A5C8
    }

    .button-stepper{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ::ng-deep .p-button:not(:disabled):hover{
      box-shadow: none !important;
    }

    ::ng-deep .button-stepper{
      background-color: #84A5C8;
      border-radius: 0;
    }

    ::ng-deep .button-stepper > p-button > button{
      background-color: #1B4A96;
    }

    ::ng-deep .button-stepper > p-button > button > span{
      font-size: 20px;
    }


    ::ng-deep .p-stepper .p-stepper-header .p-stepper-separator{
      height: 4px;
    }

    ::ng-deep p-stepper .p-stepper-header.p-highlight .p-stepper-number{
      background-color: #1B4A96;
      color: white;
      border: 0;
    }

    ::ng-deep .p-stepper .p-stepper-header:has(~ .p-highlight) .p-stepper-separator{
      background-color: #1B4A96;
    }

    .carrinho-stepper{
      width: 90%;
      margin-top: 20px;
    }

    .carrinho-component{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .carrinho-title{
        display: flex;
        align-items: center;
        padding: 10px;
        padding-left: 40px;
        width: 100%;
      }

      .carrinho-title > h1{
        font-size: 42px;
        margin-left: 25px;
        text-align: start;
      }

      .section-line{
      height: 1px;
      width: 100%;
      background-color: #ddd;
      }
  `,
    imports: [StepperModule, ButtonModule, NxtBackButtonComponent, NxtCarrinhoCheckoutComponent, NxtCarrinhoPagamentoComponent, NxtCarrinhoFinalizadoComponent]
})
export class NxtCarrinhoComponent implements OnInit {
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  routerNavigateBack: string = history?.state.cameFrom ?? '';
  
  activeStep: number = 0;
  valor: number = 0;
  selectedEndc!: number;

  subs: Subscription[] = [];
  user: UserAuth0 = {} as UserAuth0;

  ngOnInit(): void {
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
