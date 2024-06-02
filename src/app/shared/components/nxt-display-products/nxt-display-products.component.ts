import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { NxtDisplayProductsListComponent } from "./nxt-display-products-list/nxt-display-products-list.component";
import { Product, ProductFilter } from '../../models/product.model';
import { DisplayProducts } from './nxt-display-products.interface';
import { NxtDisplayProductsService } from './nxt-display-products.service';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-nxt-display-products',
    standalone: true,
    template: `
  <div class="display-products">
    <app-nxt-display-products-list 
      [fieldsetLabel]="fieldsetLabel" 
      [routerLocation]="routerLocation" 
      [heightPanel]="heightPanel" 
      [paginatorVisible]="paginatorVisible" 
      (paginatorChange)="paginatorChange.emit($event)"
      [objectFilter]="objectFilter"
      [loading]="loading"
      [produtos]="produtos"
    />
  </div>
  <p-toast></p-toast>
  `,
    styles: `
      app-nxt-display-products-list{
        width: 100%;
      }
    `,
    imports: [FieldsetModule, NxtDisplayProductsListComponent, ToastModule],
    providers: [MessageService]
})
export class NxtDisplayProductsComponent implements OnInit {
  @Input() fieldsetLabel: string = '';
  @Input() routerLocation: string = '';
  @Input() heightPanel: string = '100%';
  @Input() paginatorVisible: boolean = true;
  @Output() paginatorChange = new EventEmitter();
  @Input() objectFilter: ProductFilter = {rows: 10, prod_in_status: 'A', first: 0} as ProductFilter;
  loading: boolean = false;
  produtos: Product[] = [];
  protected produtosService: DisplayProducts = inject(NxtDisplayProductsService);
  protected messageService = inject(MessageService);


  ngOnInit(): void {
    this.getProdutos(this.objectFilter);
  }

  async getProdutos(filters: ProductFilter){
    this.loading = true;
    const produtos = await lastValueFrom(
      this.produtosService.getProducts(filters).pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar produtos ' + error.error.message })
          return error;
        })
      )
    )


    this.produtos = produtos;
    if(produtos[0]){
      this.objectFilter.total_records = produtos[0].total_records; 
      this.heightPanel = '90vh';

    }else{
      this.objectFilter.total_records = 0;
      setTimeout(() => {
        this.heightPanel = '200px';

      },10)
    }

    setTimeout(() => {
      this.loading = false;
    }, 450);
  }

  
}
