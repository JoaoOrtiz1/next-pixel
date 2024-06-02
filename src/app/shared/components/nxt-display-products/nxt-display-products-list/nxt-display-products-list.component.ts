import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { Product, ProductFilter } from '../../../models/product.model';
import { ButtonModule } from 'primeng/button';
import { NxtRouter } from '../../../services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../../services/nxt-router/nxt-router.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NxtPaginatorComponent } from "../../nxt-paginator/nxt-paginator.component";
import { SkeletonModule } from 'primeng/skeleton';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NxtCarrinhoAdd } from '../../../services/nxt-carrinho-add/nxt-carrinho-add.interface';
import { NxtCarrinhoAddService } from '../../../services/nxt-carrinho-add/nxt-carrinho-add.service';
import { NxtAuth0, UserAuth0 } from '../../../services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../../../services/nxt-auth0/nxt-auth0.service';
import { catchError, lastValueFrom, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-nxt-display-products-list',
    standalone: true,
    template: `
    <div class="display-products-list">
      <p-fieldset class="fieldset-display-products" [legend]="fieldsetLabel">
        <p-scrollPanel [style]="{ width: '100%', 'max-height': heightPanel }">

        @if(loading){
          <div class="products-list">
          @for(product of [].constructor(objectFilter.rows); track product){
            <div class="product" (click)="nxtRouter.navigateTo('produtos/'+1, {id: 1, cameFrom: routerLocation})">
              <div class="product-model-3d">
                <p-skeleton width="100%" height="200px"></p-skeleton>

              </div>
              <div class="product-infos">
                <p-skeleton width="100%" height="15px"></p-skeleton>

                <div class="product-price">
                  <p-skeleton width="100%" height="25px"></p-skeleton>

                </div>
              </div>
              <div class="product-buttons">
                <p-button label="Comprar agora"></p-button> <!-- COLOCAR FUNCTION PARA JA IR AO CARRINHO -->
                <p-button icon="pi pi-cart-plus"></p-button> <!-- COLOCAR FUNCTION PARA ADICIONAR AO CARRINHO -->
              </div>
            </div>
          }
          </div>
        }@else {
          <div class="products-list">
          @for(product of produtos; track product){
            <div class="product">
              <div class="product-model-3d">
                @if(!product.show_iframe){
                  <img (mouseenter)="product.show_iframe = !product.show_iframe " [src]="product.prod_path_url_thumbnail" alt="">

                }@else {
                  <iframe
                    allow="accelerometer; gyroscope; xr-spatial-tracking"
                    (click)="nxtRouter.navigateTo('produtos/'+product.prod_co_produto, {id: 1, cameFrom: routerLocation})"
                    (mouseleave)="product.show_iframe = !product.show_iframe; " [src]="sanitizeUrl(product.prod_url_3d)" frameborder="0" height="250px" width="100%"
                  ></iframe>
                }
              </div>
              <div class="product-infos" (click)="nxtRouter.navigateTo('/produtos/'+product.prod_co_produto, {id: product.prod_co_produto, cameFrom: routerLocation})">
                <span>{{product.prod_no_produto}}</span>
                <div class="product-price">
                  <span><b>R$ {{product.prod_vl_preco}}</b></span>
                </div>
              </div>
              <div class="product-buttons">
                <p-button label="Comprar agora" (click)="addProdutoCarrinho(user.profile.usu_co_usuario, product.prod_co_produto, user.isAuthenticated); nxtRouter.navigateTo('/carrinho', {cameFrom: 'produtos'})"></p-button> <!-- COLOCAR FUNCTION PARA JA IR AO CARRINHO -->
                <p-button icon="pi pi-cart-plus" (click)="addProdutoCarrinho(user.profile.usu_co_usuario, product.prod_co_produto, user.isAuthenticated);"></p-button> <!-- COLOCAR FUNCTION PARA ADICIONAR AO CARRINHO -->
              </div>
            </div>
          }@empty {
            <span style="text-align: center; font-size: 25px;">Nenhum produto encontrado!</span>
          }
          </div>
        }

      </p-scrollPanel>

        @if(paginatorVisible){
          <div class="products-paginator" style="width: 100%;">
            <app-nxt-paginator [first]="objectFilter.first" [rows]="objectFilter.rows" [totalRecords]="objectFilter.total_records" style="width: 100%;" (onPageChangeEvent)="paginatorChange.emit($event)"/>
          </div>
        }
      </p-fieldset>

    </div>
    <p-toast></p-toast>
  `,
    styles: `

    ::ng-deep p-skeleton > div{
      background-color: #84A5C8
    }

    .products-paginator{
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    ::ng-deep .p-button:focus{
      box-shadow: none;
    }
    ::ng-deep .fieldset-display-products{
      width: 100%;
    }

    .product-model-3d > img {
      width: 100%;
      height: 250px;
      object-fit: contain;
      border-radius: 6px;
    }

    .products-list {
      display: grid;
      grid-gap: 25px; /* Espaço entre os itens */
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
      margin: 30px 0px;
    }

    .display-products-list{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    ::ng-deep .display-products-list > p-fieldset > fieldset > legend{
      background-color: #1B4A96;
      border: 0;
      color: white;
    }
    ::ng-deep .display-products-list > p-fieldset > fieldset{
      background-color: #AFC8E4;
      border: 0;
    }

    .product{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      background-color:#1F3F73;
      border-radius: 10px;
      cursor: pointer;
      width: 100%;
      transition: 0.3s;
    }

    .product-infos{
      margin-top: 15px;
      color: white;
      text-align: center;
      font-size: 19px;
    }

    .product-price{
      margin-top: 15px;
      text-align: start;
    }

    .product-buttons{
      margin-top: 15px;
      display: flex;
      justify-content: space-between
    }

    .product{
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.6); /* Add shadow on hover */

    }

    .product:hover {
      transform: translateY(-7px); /* Move the div slightly up on hover */
    }

    @media (max-width: 645px){
      ::ng-deep .fieldset-display-products{
        width: 100%;
      }
    }
  `,
    imports: [FieldsetModule, ButtonModule, ScrollPanelModule, NxtPaginatorComponent, SkeletonModule, ToastModule],
    providers: [MessageService]
})
export class NxtDisplayProductsListComponent {
  @Input() fieldsetLabel: string = '';
  @Input() routerLocation: string = '';
  @Input() heightPanel: string = '100%';
  @Input() paginatorVisible: boolean = true;
  @Output() paginatorChange = new EventEmitter();
  @Input() objectFilter: ProductFilter = {} as ProductFilter;
  @Input() loading: boolean = false;
  @Input() produtos: Product[] = [];

  protected nxtRouter: NxtRouter = inject(NxtRouterService);
  protected sanitizer: DomSanitizer = inject(DomSanitizer);

  private nxtCarrinhoAddService: NxtCarrinhoAdd = inject(NxtCarrinhoAddService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);
  private messageService = inject(MessageService);

  products: Product[] = [{} as Product];
  user: UserAuth0 = {} as UserAuth0;
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
      })
    )
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async addProdutoCarrinho(id: number, prod_id: number, isAuthenticated: boolean){
    const addItem = await lastValueFrom(this.nxtCarrinhoAddService.addItemCarrinho(id, prod_id, isAuthenticated).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar produto no carirnho:  ' + error.error.message })
        return error;
      })
    ));
    this.authService.setAnyBS('change');
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Adicionado no carrinho!'})

  }
}
