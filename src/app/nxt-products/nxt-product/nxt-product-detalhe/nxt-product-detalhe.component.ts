import { Component, Input, inject } from '@angular/core';
import { Product, ProductFilter } from '../../../shared/models/product.model';
import { ButtonModule } from 'primeng/button';
import { NxtFreteComponent } from "../../../shared/components/nxt-frete/nxt-frete.component";
import { SkeletonModule } from 'primeng/skeleton';
import { FieldsetModule } from 'primeng/fieldset';
import { NxtDisplayProductsComponent } from "../../../shared/components/nxt-display-products/nxt-display-products.component";
import { Subscription, catchError, lastValueFrom } from 'rxjs';
import { NxtAuth0, UserAuth0 } from '../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../../../shared/services/nxt-auth0/nxt-auth0.service';
import { MessageService } from 'primeng/api';
import { NxtCarrinhoAdd } from '../../../shared/services/nxt-carrinho-add/nxt-carrinho-add.interface';
import { NxtCarrinhoAddService } from '../../../shared/services/nxt-carrinho-add/nxt-carrinho-add.service';
import { ToastModule } from 'primeng/toast';
import { NxtRouter } from '../../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../../shared/services/nxt-router/nxt-router.service';
@Component({
    selector: 'app-nxt-product-detalhe',
    standalone: true,
    template: `
    <div class="product-detalhe-component">
      @if(!loading){
        <div class="product-title">
        <span>{{product.prod_no_produto}}</span>
        </div>
        <div class="product-infos">
          <div class="product-model">
            <iframe style="border-radius: 10px;" allow="accelerometer; gyroscope; xr-spatial-tracking" [src]="product.prod_url_3d" frameborder="0" height="90%" width="100%"></iframe>
            <!-- <div class="button-vr" style="display: flex; justify-content: end; margin-top: 10px">
              <p-button icon="pi pi-discord" label="Visualizar em VR" (click)="openLink(product.prod_url_3d)" ></p-button>
            </div> -->
          </div>
          <div class="product-detail">
              <span>R$ {{product.prod_vl_preco}} <span><s>R$ {{calcRealValue(product.prod_vl_preco)}}</s></span></span>
              <div class="product-desconto-infos">
                <span>À vista no PIX com até <b>5% OFF</b></span>
              </div>
              <div class="product-other-infos">
                <span>Em até 10x de R$ {{divValue(product.prod_vl_preco)}} sem juros no cartão!</span>
              </div>
              <div class="product-calc-frete">
                <app-nxt-frete />
              </div>
              <div class="product-actions">
                <p-button label="Adicionar no carrinho" (click)="addProdutoCarrinho(user.profile.usu_co_usuario, product.prod_co_produto, user.isAuthenticated)" icon="pi pi-cart-plus"></p-button>
                <p-button label="Comprar agora" (click)="addProdutoCarrinho(user.profile.usu_co_usuario, product.prod_co_produto, user.isAuthenticated); nxtRouter.navigateTo('/carrinho', {cameFrom: 'produtos'})" icon="pi pi-dollar"></p-button>
              </div>
          </div>
        </div>
      }@else{
        <div class="product-title">
        <span>{{product.prod_no_produto}}</span>
        </div>
        <div class="product-infos">
          <div class="product-model">
            <p-skeleton class="skeleton-product" width="100%" height="100%"></p-skeleton>
          </div>
          <div class="product-detail">
              <p-skeleton class="skeleton-product" width="50%" height="40px"></p-skeleton>

              <div class="product-other-infos">
                <p-skeleton class="skeleton-product" width="100%" height="20px"></p-skeleton>
              </div>
              <div class="product-calc-frete">
                <app-nxt-frete />
              </div>
              <div class="product-actions">
                <p-button label="Comprar agora"></p-button>
                <p-button icon="pi pi-cart-plus"></p-button>
              </div>
          </div>
        </div>

      }
      <div class="section-line"></div>

      <div class="product-description">
        <div class="description-title">
          <span>Informações Adicionais</span>
        </div>
        <div class="description-content">
          <p-fieldset legend="Descrição">
            <div class="fieldset-content">
              <p>{{product.prod_tx_descricao}}</p>
            </div>
          </p-fieldset>
        </div>
      </div>

      <div class="section-line"></div>
      <div class="see-more-products">
        <div class="description-title">
          <span>Outros Produtos</span>
        </div>
        <app-nxt-display-products [objectFilter]="objectFilter" [fieldsetLabel]="'Produtos'" [routerLocation]="''" [paginatorVisible]="false"/>
      </div>

    </div>
    <p-toast></p-toast>
  `,
    styles: `

      ::ng-deep .button-vr > p-button > button {
        background-color: #1B4A96;
      }

    .product-detail > span > span{
      font-size: 19px;
      margin-left: 20px;
      text-align: center;
    }
    .description-content{
      margin-top: 15px;
    }

    .product-desconto-infos > span {
      font-size: 22px;
    }

    .see-more-products{
      margin-top: 20px;
      width: 80%;
    }

    .fieldset-content{
      color: black;
      font-size: 17px;
    }

    ::ng-deep .description-content > p-fieldset > fieldset > legend {
      background-color: #1B4A96;
      color:white;
      border: 0
    }

    ::ng-deep .description-content > p-fieldset > fieldset {
      background-color: #AFC8E4;
      border: 0;
    }
    .product-description{
      width: 80%
    }
    .description-title{
      margin-top: 20px;
    }

    .description-title > span{
      font-size: 27px;
      font-weight: bold;
    }

    .section-line{
      height: 1px;
      width: 100%;
      background-color: #ddd;
      margin-top: 25px;
    }

    ::ng-deep .skeleton-product  > div{
      background-color: #AFC8E4
    }

    .product-detail{
      display: flex;
      flex-direction: column;
    }

    .product-calc-frete{
      margin-top: 20px;
    }
    .product-other-infos{
      margin-top: 15px;
    }

    .product-other-infos > span{
      font-size: 25px;
    }

    .product-actions{
      margin-top: auto;
      display: flex;
      justify-content: space-between;
    }

    ::ng-deep .product-actions > p-button > button{
      background-color: #1B4A96
    }
    .product-title{
      margin-bottom: 20px;
    }

    .product-title > span{
      font-size: 37px;
      font-weight: bold;
    }

    .product-detalhe-component{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }

    .product-detail > span{
      font-size: 34px;
      font-weight: bold;
    }


    .product-title{
      width: 80%;
    }

    .product-infos{
      display: flex;
      justify-content: space-between;
      width: 80%
    }

    .product-model{
      height: 60vh;
      background-image: url('../../../../assets/loading.jpg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position-y: center;

    }

    .product-model,
    .product-detail{
      width: 48%;
    }

    @media (max-width: 1055px){
      .product-infos{
        flex-direction: column;
      }
      .product-model,
      .product-detail{
        width: 100%;
      }

      .product-detail{
        margin-top: 15px;
      }
    }

  `,
    imports: [ToastModule, ButtonModule, NxtFreteComponent, SkeletonModule, FieldsetModule, NxtDisplayProductsComponent],
    providers: [MessageService]
})
export class NxtProductDetalheComponent {
  @Input() product: Product = {} as Product;
  @Input() loading: boolean = false;

  protected nxtRouter: NxtRouter = inject(NxtRouterService);

  private nxtCarrinhoAddService: NxtCarrinhoAdd = inject(NxtCarrinhoAddService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);
  private messageService = inject(MessageService);

  objectFilter: ProductFilter = {rows: 4, prod_in_status: 'A'} as ProductFilter
  user: UserAuth0 = {} as UserAuth0;
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
      })
    )
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

  divValue(value: number){
    return (value/10).toFixed(2)
  }

  openLink(link: any){
    window.open(link.changingThisBreaksApplicationSecurity+'&cardboard=1', '_blank');
  }

  calcRealValue(value: any){
    return parseFloat(value) + parseFloat(value)*0.3
  }

}
