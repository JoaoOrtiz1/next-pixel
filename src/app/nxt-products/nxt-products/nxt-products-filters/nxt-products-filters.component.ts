import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProductFilter } from '../../../shared/models/product.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-nxt-products-filters',
  standalone: true,
  imports: [InputTextModule, FormsModule, InputNumberModule, CalendarModule, RadioButtonModule],
  template: `
    <div class="products-filters-component">
      <div class="filters-title">
        <i class="pi pi-search"></i>
        <span><b>Filtros</b></span>
      </div>
      <div class="section-line"></div>
      <div class="filters">
        <div class="filter">
          <span>Produto</span>
          <div class="filter-input">
            <input placeholder="Nome" (keydown.enter)="onFilterChange.emit(objectFilter)" (focusout)="onFilterChange.emit(objectFilter)" type="text" pInputText [(ngModel)]="objectFilter.prod_no_produto" />
          </div>
        </div>
        <div class="section-line"></div>

        <div class="filter">
          <span>Preço</span>
          <div class="input-precos">
            <div class="input-preco" >
              <span>De</span>
              <p-inputNumber (keydown.enter)="onFilterChange.emit(objectFilter)" [(ngModel)]="objectFilter.prod_vl_preco_min" (focusout)="onFilterChange.emit(objectFilter)"  placeholder="R$10" mode="currency" currency="BRL" locale="pt-BR" [minFractionDigits]="2"> </p-inputNumber>
            </div>

            <div class="input-preco" >
              <span>Até</span>
              <p-inputNumber (keydown.enter)="onFilterChange.emit(objectFilter)" [(ngModel)]="objectFilter.prod_vl_preco_max" (focusout)="onFilterChange.emit(objectFilter)"  placeholder="R$4000,00" mode="currency" currency="BRL" locale="pt-BR" [minFractionDigits]="2"> </p-inputNumber>
            </div>
          </div>
        </div>

        <div class="section-line"></div>


        <div class="filter">
          <span>Data de lançamento</span>
          <div class="calendar-input">
            <div class="filter-input" >
              <span>De</span>
              <p-calendar (onSelect)="onFilterChange.emit(objectFilter)" placeholder="Ex: 01/01/1990"  [(ngModel)]="objectFilter.prod_dt_cadastro_ini"></p-calendar>
            </div>
            <div class="filter-input">
              <span>Até</span>
              <p-calendar (onSelect)="onFilterChange.emit(objectFilter)" placeholder="Ex: 07/04/2024" [(ngModel)]="objectFilter.prod_dt_cadastro_fim"></p-calendar>
            </div>
          </div>
        </div>

        <div class="section-line"></div>
        <div class="filter">
          <span>Status</span>
          <div class="filter-input" style="justify-content: start; padding: 0px 0px 10px 10px;">
            <p-radioButton (click)="onFilterChange.emit(objectFilter)" name="pizza" value="A" [(ngModel)]="objectFilter.prod_in_status" inputId="ingredient1"></p-radioButton>

            <span>Disponivéis</span>
          </div>

          <div class="filter-input" style="justify-content: start; padding: 0px 0px 10px 10px;">
            <p-radioButton (click)="onFilterChange.emit(objectFilter)" name="pizza" value="T" [(ngModel)]="objectFilter.prod_in_status" inputId="ingredient1"></p-radioButton>

            <span>Todos</span>
          </div>
        </div>
        <div class="section-line"></div>


        <div class="button-filter" style="display: flex; justify-content: space-between; margin-top: 10px;">
          <p-button label="Limpar" (click)="clear()" icon="pi pi-trash"></p-button>

          <p-button label="Filtrar" (click)="onFilterChange.emit(objectFilter)" icon="pi pi-search"></p-button>
        </div>
      </div>
    </div>
  `,
  styles: `
   .products-filters-component{
      background-color: #AFC8E4;
      padding: 25px;
      border-radius: 0px 0px 8px 0px;
   }

   .filters-title i{
      font-size: 25px;
      margin-right: 10px;
   }

   .filters-title span{
      font-size: 25px;
      letter-spacing: 2px;
   }

   .filters-title{
    margin-bottom: 10px;
   }


    .section-line{
      height: 1px;
      background-color: #ddd;
      margin: 20px 0px;
    }

    .filter{
      margin: 15px 0px;
      display: flex;
      flex-direction: column;
    }

    .filter > span {
      font-size: 20px;
      margin-bottom: 4px;
    }

    .input-precos,
    .input-preco,
    .filter-input{
      display: flex;
    }


    .input-preco,
    .calendar-input{
      justify-content: center;
      align-items: center;
    }


    .filter-input{
      justify-content: start;
      align-items: center;
    }
    .input-preco > span,
    .filter-input > span {
      padding: 0px 10px;
    }

    .calendar-input{
      display: flex;
    }

    ::ng-deep p-inputNumber > span > input {
      width: 100%;
    }

    ::ng-deep .p-button:focus {
      box-shadow: 0 0 0 0.2rem #BFDBFE !important;;
    }

    ::ng-deep .button-filter > p-button > button{
      background-color:#1B4A96
    }

    @media  (max-width: 1009px) {
      .filters{
        display: flex;
        flex-wrap: wrap;
      }

      .filter{
        width: 45% !important;
        margin-left: 20px;
      }

      .button-filter{
        width: 100% !important;
      }
    }

    @media  (max-width: 720px) {
      .filter{
        width: 85% !important;
      }
    }

    @media  (max-width: 1474px) {
      .calendar-input{
        flex-wrap: wrap;
        justify-content: start;
      }
      .calendar-input > .filter-input{
        margin-bottom: 15px;
      }
    }
  `
})
export class NxtProductsFiltersComponent {
  @Input() objectFilter: ProductFilter = {} as ProductFilter;
  @Output() onFilterChange = new EventEmitter()

  clear(){
    this.objectFilter = {prod_in_status: 'A', rows: 10, first: 0} as ProductFilter
    this.onFilterChange.emit(this.objectFilter);
  }
}
