import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '../../../../../shared/models/product.model';
import { ButtonModule } from 'primeng/button';
import { NxtPaginatorComponent } from "../../../../../shared/components/nxt-paginator/nxt-paginator.component";
import { NxtRouter } from '../../../../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../../../../shared/services/nxt-router/nxt-router.service';
@Component({
    selector: 'app-nxt-pedido-detalhe-list',
    standalone: true,
    template: `
    <div class="nxt-pedido-detalhe-list">
      <div class="endereco-info">
        @if(!loading){
          <span><b>Endereço: </b>{{products[0].endc}}</span>
          <span><b>Valor total:</b> R$ {{valorTotal}} (PIX)</span>
        }
      </div>
      <p-table [loading]="loading" class="table-list-detail" [value]="products" [tableStyle]="{ 'min-width': '100%', 'border-radius':'10px' }">
        <ng-template pTemplate="header">
            <tr class="head-list-detail">
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor unitário</th>
                <th>Valor total</th>
                <th><i></i></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.prod_no_produto }}</td>
                <td>{{ product.prod_qt_produto }}</td>
                <td>R$ {{ product.prod_vl_preco }}</td>
                <td>R$ {{ product.prod_vl_preco*product.prod_qt_produto }}</td>
                <td><p-button icon="pi pi-external-link" (click)="nxtRouter.navigateTo('/produtos/'+product.prod_co_produto, {cameFrom: 'meu-perfil'})"></p-button></td>
            </tr>
        </ng-template>
      </p-table>
      <app-nxt-paginator (onPageChangeEvent)="onPageChange.emit($event)" [totalRecords]="total_records" [first]="first" [rows]="rows" />
    </div>
  `,
    styles: `

    ::ng-deep .head-list-detail > th{
      background-color: #1F3F73;
      color: white;
    }

    ::ng-deep .table-list-detail > div > div {
      border-radius: 10px;
    }

    .endereco-info{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
    }
    .endereco-info > span{
      font-size: 20px;
    }
  `,
    imports: [TableModule, ButtonModule, NxtPaginatorComponent]
})
export class NxtPedidoDetalheListComponent {
  @Input() products: Product[] = [];
  @Input() loading: boolean = true;
  @Input() first: number = 0;
  @Input() rows: number = 5;
  @Input() total_records: number = 0;
  @Input() valorTotal: number = 0;
  @Output() onPageChange = new EventEmitter();

  protected nxtRouter: NxtRouter = inject(NxtRouterService);
}
