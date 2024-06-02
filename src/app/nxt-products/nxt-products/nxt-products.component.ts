import { Component, ViewChild } from '@angular/core';
import { NxtProductsFiltersComponent } from "./nxt-products-filters/nxt-products-filters.component";
import { NxtBackButtonComponent } from "../../shared/components/nxt-back-button/nxt-back-button.component";
import { ButtonModule } from 'primeng/button';
import { NxtDisplayProductsComponent } from "../../shared/components/nxt-display-products/nxt-display-products.component";
import { ProductFilter } from '../../shared/models/product.model';

@Component({
    selector: 'app-nxt-products',
    standalone: true,
    template: `
    <div class="nxt-products-component">
      <div class="products-title">
        <app-nxt-back-button [routerNavigateBack]="routerNavigateBack" />
        <h1>Produtos</h1>
      </div>
      <div class="section-line"></div>
      <div class="products-component">
        <div class="products-filters" style="display: flex; width: 25%">
          <app-nxt-products-filters [objectFilter]="objectFilter" (onFilterChange)="onFilterChange($event)" />
        </div>
        <div class="products-list">
          <app-nxt-display-products  [routerLocation]="'produtos'"  #displayProducts [objectFilter]="objectFilter" [fieldsetLabel]="'Produtos'" style="width: 90%; " [heightPanel]="'90vh'" (paginatorChange)="onPageChange($event)"/>
        </div>
      </div>
    </div>
  `,
    styles: `
      .products-component{
        display:flex;
      }
      .products-title{
        display: flex;
        align-items: center;
        padding: 10px;
        padding-left: 40px;
      }

      .products-title > h1{
        font-size: 42px;
        margin-left: 25px;
      }

      .section-line{
      height: 1px;
      width: 100%;
      background-color: #ddd;
      }

      .products-list{
        width: 75%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      @media  (max-width: 1009px) {
        .products-component{
          flex-direction: column;
          align-items: center;
        }

        .products-filters{
          width: 100% !important;
          flex-wrap: wrap;
        }
      }

    `,
    imports: [NxtProductsFiltersComponent, NxtBackButtonComponent, ButtonModule, NxtDisplayProductsComponent]
})
export class NxtProductsComponent {
  @ViewChild('displayProducts',  { static: true }) displayProducts!: NxtDisplayProductsComponent

  routerNavigateBack: string = history?.state.cameFrom ?? '';
  sidebarVisible: boolean = false;
  objectFilter: ProductFilter = {prod_in_status: 'A', total_records: 0, rows: 10, first: 0} as ProductFilter;

  onPageChange(event: any){
    this.objectFilter.first = event.first;
    this.objectFilter.rows = event.rows;
    this.displayProducts.getProdutos(this.objectFilter);
  }

  onFilterChange(event: any){
    this.objectFilter = event as ProductFilter;
    this.displayProducts.getProdutos(this.objectFilter);
  }
}
