import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAuth0 } from '../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtPedido } from '../../../shared/models/pedido.model';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { NxtPaginatorComponent } from "../../../shared/components/nxt-paginator/nxt-paginator.component";
import { SkeletonModule } from 'primeng/skeleton';
import { FormatarTimestampPipeDMY } from "../../../shared/pipes/date-pipe";
import { DialogModule } from 'primeng/dialog';
import { NxtPerfilPedidoDetalheComponent } from "./nxt-perfil-pedido-detalhe/nxt-perfil-pedido-detalhe.component";

@Component({
    selector: 'app-nxt-perfil-pedido-list',
    standalone: true,
    template: `
    <div class="nxt-perfil-pedido-list">
      <p-fieldset class="fieldset-display-pedidos" legend="Pedidos">
        <p-scrollPanel [style]="{ width: '100%', 'max-height': '450px' }">

          @if(!loading){
            <div class="pedidos">
              @for(pedido of pedidos; track pedido){
                <div class="pedido">
                  <div class="pedido-info">
                    <span><b>Número do pedido</b></span>
                    <span><p-button (click)="openDialogDetalhe(pedido.ped_co_pedido, pedido.endc_co_endereco, pedido.ped_vl_pedido)" [label]="'#'+pedido.ped_co_pedido" [link]="true"></p-button></span>
                  </div>
  
                  <div class="pedido-info">
                    <span><b>Status</b></span>
                    <span [style]="{'background-color': returnColor(pedido.ped_in_status), 'padding': '10px', 'border-radius': '10px'}"><b>{{returnStatus(pedido.ped_in_status)}}</b></span>
                  </div>
  
                  <div class="pedido-info">
                    <span><b>Data</b></span>
                    <span>{{pedido.ped_dt_pedido | formatarTimestampDMY}}</span>
                  </div>
  
                  <div class="pedido-info">
                    <span><b>Valor</b></span>
                    <span>R$ {{pedido.ped_vl_pedido}} (PIX)</span>
                  </div>
                </div>
              }@empty {
                <span style="font-size: 24px; color: #656565; font-weight: bold">Nenhum pedido encontrado! Faça sua primeira compra e veja os pedidos aqui.</span>
              }
            </div>
          }@else{
            <div class="pedidos">
              @for(pedido of [].constructor(4); track pedido){
                <div class="pedido">
                  <div class="pedido-info pedido-skeleton">
                    <span><b>Número do pedido</b></span>
                    <div class="skeleton-full" style="width: 100%;">
                      <p-skeleton width="100%" height="20px"></p-skeleton>
                    </div>
                  </div>
  
                  <div class="pedido-info pedido-skeleton">
                    <span><b>Status</b></span>
                    <div class="skeleton-full" style="width: 100%;">
                      <p-skeleton width="100%" height="20px"></p-skeleton>
                    </div>                  
                  </div>
  
                  <div class="pedido-info pedido-skeleton">
                    <span><b>Data</b></span>
                    <div class="skeleton-full" style="width: 100%;">
                      <p-skeleton width="100%" height="20px"></p-skeleton>
                    </div>
                  </div>
  
                  <div class="pedido-info pedido-skeleton">
                    <span><b>Valor</b></span>
                    <div class="skeleton-full" style="width: 100%;">
                      <p-skeleton width="100%" height="20px"></p-skeleton>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </p-scrollPanel>
        <app-nxt-paginator (onPageChangeEvent)="onPageChange.emit($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" />
      </p-fieldset>
    </div>

    <p-dialog class="detalhe-component" [draggable]="false" [header]="'Pedido #'+selectedPedido.id" [modal]="true" [(visible)]="visible" [style]="{ width: '60vw', 'max-width': '70vw' }">
      @if(visible){
        <app-nxt-perfil-pedido-detalhe [valorTotal]="valorTotal" [user]="user" [selectedPedido]="selectedPedido" />
      }
    </p-dialog>
  `,
    styles: `
    
    ::ng-deep .detalhe-component > div > div > div{
      background-color: #84A5C8;
    }

    ::ng-deep .detalhe-component > div > div > div > span,
    ::ng-deep .detalhe-component > div > div > div > div > button > timesicon{
      color: black;
    }
    
    ::ng-deep .fieldset-display-pedidos > fieldset {
      background-color: #AFC8E4;
      border: 0;
    }

    ::ng-deep .fieldset-display-pedidos > fieldset > legend > span{
      font-size: 27px;
      color: white;
    }

    ::ng-deep .fieldset-display-pedidos > fieldset > legend{
      background-color: #1B4A96;
      border: 0;
    }
    
    .pedidos{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .pedido-skeleton{
      width: 16%
    }

    .pedido{
      background-color: #84A5C8;
      padding: 25px;
      width: 90%;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      margin: 15px 0px;
      flex-wrap: wrap;
    }

    .pedido-info{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pedido-info > span{
      color: black;
      margin: 10px 0px;
    }

    ::ng-deep .pedido-info > span > p-button > button > span{
      color: blue;
    }
    
    ::ng-deep .skeleton-full > p-skeleton > div {
      background-color: #AFC8E4;
    }

    @media (max-width: 835px){
      .pedido-info{
        width: 45%;
      }
      
      
    }

  `,
    imports: [DialogModule, FieldsetModule, SkeletonModule, ScrollPanelModule, ButtonModule, NxtPaginatorComponent, FormatarTimestampPipeDMY, NxtPerfilPedidoDetalheComponent]
})
export class NxtPerfilPedidoListComponent {
  @Input() loading: boolean = true;
  @Input() user!: UserAuth0;
  @Input() pedidos : NxtPedido[] = [];
  @Input() first: number = 0;
  @Input() rows: number = 5;
  @Input() totalRecords: number = 0;
  @Output() onPageChange = new EventEmitter();

  valorTotal: number = 0;
  heightPanel: string = '100%';
  visible: boolean = false;
  selectedPedido = {} as any;

  openDialogDetalhe(id_pedido: number, id_endc: number, valorTotal: number){
    this.selectedPedido = {id: id_pedido, endc: id_endc};
    this.valorTotal = valorTotal
    this.visible = true;
  }

  returnColor(param: string){
    switch (param) {
      case 'C':
        return 'green';    
      case 'P':
        return 'yellow';
      default:
        return '#ddd'
    }
  }

  returnStatus(param: string){
    switch (param) {
      case 'C':
        return 'Concluido';    
      case 'P':
        return 'Processado';
      default:
        return '#ddd'
    }
  }
}
