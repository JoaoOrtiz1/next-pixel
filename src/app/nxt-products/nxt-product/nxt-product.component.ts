import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { NxtBackButtonComponent } from "../../shared/components/nxt-back-button/nxt-back-button.component";
import { ActivatedRoute } from '@angular/router';
import { ProductDetalhe } from './nxt-product.interface';
import { NxtProductService } from './nxt-product.service';
import { Product } from '../../shared/models/product.model';
import { Subscription, catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtProductDetalheComponent } from "./nxt-product-detalhe/nxt-product-detalhe.component";
import { DomSanitizer } from '@angular/platform-browser';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';

@Component({
    selector: 'app-nxt-product',
    standalone: true,
    template: `
    <div class="product-component">
      <div class="button-back">
        <app-nxt-back-button [routerNavigateBack]="routerNavigateBack" />
      </div>
      <div class="product-detalhe">
        <app-nxt-product-detalhe [loading]="loading" [product]="produto" />
      </div>
    </div>
    <p-toast></p-toast>
  `,
    styles: `
      .button-back{
        display: flex;
        align-items: center;
        padding: 40px 10px 10px 40px;

      }
    `,
    providers: [MessageService],
    imports: [NxtBackButtonComponent, ToastModule, NxtProductDetalheComponent]
})
export class NxtProductComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private productService: ProductDetalhe = inject(NxtProductService);
  private messageService = inject(MessageService);
  private nxtRouter: NxtRouter = inject(NxtRouterService);
  protected sanitizer: DomSanitizer = inject(DomSanitizer);

  loading: boolean = false;
  routerNavigateBack: string = history?.state.cameFrom ?? '';
  prod_co_produto: number = this.route.snapshot.params['id'] ?? history?.state.id ;

  produto: Product = {} as Product;
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.route.params.subscribe(params => {
        this.prod_co_produto = +params['id'];
        this.getProduto(this.prod_co_produto);
        window.scrollTo(0,0)
      })
    )
  }

  async getProduto(cod: number){
    this.loading = true;
    let produto = await lastValueFrom(this.productService.getProduto(cod).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao recuperar produtos ' + error.error.message })
        return error;
      })
    ))
    console.log('produtos', produto);
    if(produto && produto.length > 0){
      produto[0].prod_url_3d = this.sanitizer.bypassSecurityTrustResourceUrl(produto[0].prod_url_3d);
      this.produto = produto[0]
    }else{
      this.nxtRouter.navigateTo('/', {cameFrom: '/'});
    }

    this.loading = false;
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
