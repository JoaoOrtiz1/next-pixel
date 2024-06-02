import { Component, Input, OnInit, inject } from '@angular/core';
import { UserAuth0 } from '../../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtPedidoDetalheListComponent } from "./nxt-pedido-detalhe-list/nxt-pedido-detalhe-list.component";
import { Product } from '../../../../shared/models/product.model';
import { catchError, lastValueFrom } from 'rxjs';
import { NxtPerfilPedidoDetalhe } from './nxt-perfil-pedido-detalhe.interface';
import { NxtPerfilPedidoDetalheService } from './nxt-perfil-pedido-detalhe.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-nxt-perfil-pedido-detalhe',
    standalone: true,
    template: `
    <div class="nxt-perfil-pedido-detalhe">
      <app-nxt-pedido-detalhe-list [valorTotal]="valorTotal" (onPageChange)="getProdutosPedido(user.profile.usu_co_usuario, selectedPedido.id, selectedPedido.endc, $event.first, $event.rows)" [first]="first" [rows]="rows" [total_records]="total_records" [products]="produtos" [loading]="loading" />
    </div>
  `,
    styles: `
    
  `,
    imports: [NxtPedidoDetalheListComponent],
    providers: [MessageService]
})
export class NxtPerfilPedidoDetalheComponent implements OnInit {
  @Input() user!: UserAuth0;
  @Input() selectedPedido = {} as any;
  @Input() valorTotal: number = 0;

  
  private pedidoProdutosService: NxtPerfilPedidoDetalhe = inject(NxtPerfilPedidoDetalheService);
  private messageService = inject(MessageService);

  first: number = 0;
  total_records: number = 0;
  rows: number = 5;
  produtos: Product[] = [];
  loading: boolean = true;
  async ngOnInit() {
    await this.getProdutosPedido(this.user.profile.usu_co_usuario, this.selectedPedido.id, this.selectedPedido.endc, this.first, this.rows);
  }

  async getProdutosPedido(id: number, id_pedido: number, id_endc: number, first: number, rows: number){
    this.first = first;
    this.rows = rows;
    this.loading = true;
    const produtos = await lastValueFrom(this.pedidoProdutosService.getProdutosPedido(id, id_pedido, id_endc, first, rows).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar pedidos ' + error.error.message })
        return error;
      })
    ));

    if(produtos.length > 0) {
      this.produtos = produtos;
      this.total_records = produtos[0].total_records;
    }
    this.loading = false;
  }
}
