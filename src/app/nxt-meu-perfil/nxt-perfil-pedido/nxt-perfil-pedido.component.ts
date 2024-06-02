import { Component, Input, inject } from '@angular/core';
import { UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtPerfilPedidoListComponent } from "./nxt-perfil-pedido-list/nxt-perfil-pedido-list.component";
import { NxtPedido } from '../../shared/models/pedido.model';
import { NxtPerfilPedido } from './nxt-perfil-pedido.interface';
import { NxtPerfilPedidoService } from './nxt-perfil-pedido.service';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-nxt-perfil-pedido',
    standalone: true,
    template: `
      <div class="nxt-perfil-pedido">
        <app-nxt-perfil-pedido-list (onPageChange)="getPedidos(user.profile.usu_co_usuario, $event.first, $event.rows)" [rows]="rows" [totalRecords]="total_records" [user]="user" [loading]="loading" [pedidos]="pedidos" />
      </div>
    `,
    styles: `
      .nxt-perfil-pedido{
        padding: 25px;
      }
    `,
    imports: [NxtPerfilPedidoListComponent],
    providers: [MessageService]
})
export class NxtPerfilPedidoComponent {
  loading: boolean = true;
  first: number = 0;
  rows: number = 0;
  @Input() user!: UserAuth0;

  private perfilPedidoService: NxtPerfilPedido = inject(NxtPerfilPedidoService);
  private messageService = inject(MessageService);

  pedidos: NxtPedido[] = [];
  total_records: number = 0;

  async getPedidos(id: number, first: number, rows: number){
    this.first = first;
    this.rows = rows;
    this.loading = true;
    const pedidos = await lastValueFrom(this.perfilPedidoService.getPedidos(id, first, rows).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar pedidos ' + error.error.message })
        return error;
      })
    ));
    if(pedidos.length > 0){
      this.pedidos = pedidos;
      this.total_records = pedidos[0].total_records;
    }
    this.loading = false;
  }
}
