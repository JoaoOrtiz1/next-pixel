import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Product, ProductFilterBase } from '../../../../shared/models/product.model';
import { NxtPaginatorComponent } from "../../../../shared/components/nxt-paginator/nxt-paginator.component";
import { NxtRouter } from '../../../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../../../shared/services/nxt-router/nxt-router.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SkeletonModule } from 'primeng/skeleton';
import { NxtCarrinhoProdutoDeleteComponent } from "../nxt-carrinho-produto-delete/nxt-carrinho-produto-delete.component";
import { UserAuth0 } from '../../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtCarrinhoProdutoListQuantidadeComponent } from "./nxt-carrinho-produto-list-quantidade/nxt-carrinho-produto-list-quantidade.component";
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-nxt-carrinho-produto-list',
    standalone: true,
    template: `
    <div class="carrinho-produto-list">
      <div class="carrinho-produtos">
        @if(!loading){
          @for(produto of produtos; track produto){
            <div class="carrinho-produto">
              <div class="carrinho-produto-model-3d" (click)="nxtRouter.navigateTo('produtos/'+produto.prod_co_produto, {id: 1, cameFrom: '/carrinho'})">
                @if(!produto.show_iframe){
                  <img (mouseenter)="produto.show_iframe = !produto.show_iframe " [src]="produto.prod_path_url_thumbnail" alt="">
                }@else {
                  <iframe
                    allow="accelerometer; gyroscope; xr-spatial-tracking"
                    (mouseleave)="produto.show_iframe = !produto.show_iframe; " [src]="sanitizeUrl(produto.prod_url_3d)" frameborder="0" height="250px" width="100%" style="border-radius: 10px"
                  ></iframe>
                }
              </div>
              <div class="carrinho-produto-infos" >
                <div class="produto-carrinho-title">
                  <span><b>{{produto.prod_no_produto}}</b></span>
                </div>
                <div class="produto-carrinho-description">
                  <span style="display: flex; align-items: center">Quantidade: <app-nxt-carrinho-produto-list-quantidade (updateItem)="produto.prod_qt_produto = $event; onProdutoChange.emit()" [produto]="produto.prod_co_produto" [user]="user" (deleteItem)="deleteButton.deleteProduto(user.profile.usu_co_usuario, produto.prod_co_produto, user.isAuthenticated)" [quantidade]="produto.prod_qt_produto" /> </span>
                  <span>Valor unitário: <b> R$ {{produto.prod_vl_preco}}</b></span>
                </div>
                <div class="produto-carrinho-preco">
                  <span>Em até 10x de <b>R$ {{(produto.prod_vl_preco * produto.prod_qt_produto /10).toFixed(2)}}</b> sem juros no cartão!</span>
                </div>
              </div>
             <div class="preco-delete-carrinho">
              <div class="button-actions-produto" style="display: flex;">
                <p-button [style]="{'margin-right': '10px'}" icon="pi pi-external-link" (click)="nxtRouter.navigateTo('produtos/'+produto.prod_co_produto, {id: 1, cameFrom: '/carrinho'})"></p-button>
                <app-nxt-carrinho-produto-delete #deleteButton [style]="{'margin-left': '10px'}" (onDelete)="this.onPageChangeEvent.emit({rows: 10, first: 0})" [isAuthenticated]="user.isAuthenticated" [user]="user.profile.usu_co_usuario" [produto]="produto.prod_co_produto" />
              </div>
              <div class="carrinho-preco-avista" >
                    <span>Preço a vista no pix</span>
                    <span><b>R$ {{(produto.prod_vl_preco* produto.prod_qt_produto - (produto.prod_vl_preco* produto.prod_qt_produto)* 0.1).toFixed(2)}}</b></span>
                    <small>(10% off)</small>
              </div>
             </div>
            </div>
          }@empty {
            <div class="carrinho-produto-empty">
              <span>Nenhum produto adicionado no carrinho ainda!</span>
            </div>
          }
        }@else {
          @for(produto of [].constructor(4); track produto){
            <div class="carrinho-produto">
              <div class="carrinho-produto-model-3d">
                <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%">
                  <p-skeleton class="skeleton-carrinho" width="100%" height="250px"></p-skeleton>
                </div>

              </div>
              <div class="carrinho-produto-infos">
                <div class="produto-carrinho-title">
                  <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%">
                    <p-skeleton class="skeleton-carrinho" width="100%" height="40px"></p-skeleton>
                  </div>
                </div>
                <div class="produto-carrinho-description">
                  <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%; margin: 20px 0px">
                    <p-skeleton class="skeleton-carrinho" width="40%" height="20px"></p-skeleton>
                  </div>

                  <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%; margin: 20px 0px">
                    <p-skeleton class="skeleton-carrinho" width="50%" height="20px"></p-skeleton>
                  </div>
                </div>
                <div class="produto-carrinho-preco">
                  <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%">
                    <p-skeleton class="skeleton-carrinho" width="60%" height="30px"></p-skeleton>
                  </div>
                </div>
              </div>
              <div class="preco-delete-carrinho" style="width: 20%; height: 100%">
                <div class="carrinho-preco-avista">
                  <div class="skeleton-carrinho-produto" style="width: 100%; height: 100%; margin: 10px 0px">
                    <p-skeleton class="skeleton-carrinho" width="100%" height="100%"></p-skeleton>
                  </div>
                </div>
              </div>
            </div>
          }
        }
      </div>
      <div class="carrinho-paginator">
        <app-nxt-paginator (onPageChangeEvent)="setObjectFilter($event)" [first]="objectFilter.first" [rows]="objectFilter.rows" [totalRecords]="objectFilter.total_records"  />
      </div>
    </div>
  `,
    styles: `
      .carrinho-produto-empty{
        margin: 20px 0px;
      }

      ::ng-deep .skeleton-carrinho > div{
        background-color: #AFC8E4;
      }

      .preco-delete-carrinho{
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
      }

      .carrinho-produto-empty > span{
        font-weight: 500;
        font-size: 27px;
      }

      .carrinho-produtos-list,
      .carrinho-produtos{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .carrinho-preco-avista{
        background-color: #aed3ae;
        padding: 10px;
        border-radius: 10px;
        margin-top: 20px;
      }

      .produto-carrinho-preco{
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }

      .carrinho-preco-avista{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
      }

      .carrinho-preco-avista > span {
        margin: 10px 0px
      }

      .carrinho-preco-avista > span,
      .produto-carrinho-preco > span{
        color: black;
        font-size: 20px;
      }

      .produto-carrinho-title {
        margin: 20px;
      }

      .produto-carrinho-title > span{
        font-size: 25px;
        color: black;
      }
      .produto-carrinho-description{
        padding: 0px 20px;
        display: flex;
        flex-direction: column;
      }

      .produto-carrinho-description > span{
        font-size: 20px;
        color: black;
        margin: 10px 0px;
      }

      .carrinho-produto{
        width: 90%;
        background-color: #84A5C8;
        margin: 20px;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }

      .carrinho-produto-model-3d{
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .carrinho-produto-model-3d > img{
        width: 100%;
        height: 250px;
        object-fit: fill;
        border-radius: 15px;
      }

      .carrinho-produto-infos {
        width: 45%;
      }



    .carrinho-produto{
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.6); /* Add shadow on hover */
      transition: 0.5s;
      cursor: pointer;
    }

    .carrinho-produto:hover {
      transform: translateY(-7px); /* Move the div slightly up on hover */
    }

    @media (max-width: 1170px) {
      
      .carrinho-produto{
        flex-wrap: wrap;
      }

      .carrinho-produto-model-3d{
        width: 100%
      }

      .carrinho-produto-infos{
        width: 100%
      }

      .preco-delete-carrinho{
        width: 100%
      }

      .carrinho-produto-model-3d > img{
        width: 50%
      }
    }

    @media (max-width: 588px){
      .carrinho-produto-model-3d > img{
        width: 80%
      }
    }
    `,
    imports: [NxtPaginatorComponent, SkeletonModule, NxtCarrinhoProdutoDeleteComponent, NxtCarrinhoProdutoListQuantidadeComponent, ButtonModule]
})
export class NxtCarrinhoProdutoListComponent {
  @ViewChild('delete-button', {static: true}) deleteButton!: NxtCarrinhoProdutoDeleteComponent;
  @Input() objectFilter: ProductFilterBase = {} as ProductFilterBase;
  @Input() produtos: Product[] = [];
  @Input() loading: boolean = false;
  @Output() onPageChangeEvent = new EventEmitter()
  @Output() onProdutoChange = new EventEmitter();
  @Input() user: UserAuth0 = {} as UserAuth0;
  protected nxtRouter: NxtRouter = inject(NxtRouterService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);


  setObjectFilter(event: any){
    this.objectFilter.first = event.first,
    this.objectFilter.rows = event.rows,
    this.objectFilter.total_records = event.total_records
    this.onPageChangeEvent.emit(this.objectFilter)
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
