import { Component, inject } from '@angular/core';
import { NxtDisplayProductsComponent } from "../shared/components/nxt-display-products/nxt-display-products.component";
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { NxtRouter } from '../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../shared/services/nxt-router/nxt-router.service';
import { ProductFilter } from '../shared/models/product.model';

@Component({
    selector: 'app-nxt-home',
    standalone: true,
    template: `
  <div class="home-component">
    <div class="home-title">
      <h1 style="text-align: center;">Next Pixel</h1>
      <span style="text-align: center;">A sua loja de periféricos gamers onde a experiência se torna realidade em 3D!</span>
    </div>
    <div class="section-line"></div>
    <div class="destaques-dia">
      <div class="destaques-title">
        <h2>Destaques da semana!</h2>
      </div>
      <div class="display-products">
        <app-nxt-display-products  [objectFilter]="objectFilter" [fieldsetLabel]="'Produtos'" [routerLocation]="''" [paginatorVisible]="false"/>
      </div>
      <div class="destaques-dia-seemore">
        <p-button label="Ver produtos" (click)="nxtRouter.navigateTo('produtos', {cameFrom: ''})" iconPos="right" icon="pi pi-arrow-right"></p-button>
      </div>
    </div>
    <div class="section-line"></div>
    <div class="about-us">
      <div class="about-us-title">
        <h2>Descubra o que nos torna excepcionais!</h2>
      </div>
      <p-fieldset legend="Sobre nós" [style]="{'width': '85%'}">
        <div class="about-us-content">
          <p>
            Desbrave a NextPixel, onde a magia do 3D transforma a escolha de periféricos gamers em uma jornada intuitiva e irresistível, eliminando dúvidas e elevando cada clique a uma experiência cativante.
          </p>
          <p>
            Venha agora para o mundo fascinante da NextPixel e vivencie um novo patamar de satisfação na sua jornada de compra!
          </p>
        </div>
      </p-fieldset>
    </div>
  </div>`,
    styles: `
    .display-products{
      width: 80%;
    }

    .destaques-dia{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .home-title{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      letter-spacing: 16px;
      flex-direction: column;
    }

    .home-component{
      margin-bottom: 25px;
    }

    .home-title > span{
      font-size: 25px;
      letter-spacing: 0;
    }

    .section-line{
      height: 1px;
      width: 100%;
      background-color: #ddd;
      margin-top: 25px;
    }

    .destaques-dia-seemore{
      display: flex;
      justify-content: center;
      margin-top: 25px;
    }

    .destaques-title{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .about-us{
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 40px;
      flex-direction: column;
    }


    .about-us-title{
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .about-us-content{
      text-align: center;
      font-size: 22px;
      font-weight: 600;
    }

    ::ng-deep .about-us > p-fieldset{
      width: 100%;
      display: flex;
      justify-content: center;
    }


    ::ng-deep .about-us > p-fieldset > fieldset > legend{
      background-color: #1B4A96;
      border: 0;
      color: white;
    }
    ::ng-deep .about-us > p-fieldset > fieldset{
      background-color: #AFC8E4;
      border: 0;
    }

    @media (max-width: 534px){
      .home-title{
        letter-spacing: 0px;
      }
    }
  `,
    imports: [NxtDisplayProductsComponent, FieldsetModule, ButtonModule]
})
export class NxtHomeComponent {
  protected nxtRouter: NxtRouter = inject(NxtRouterService);
  objectFilter: ProductFilter = {rows: 4, prod_in_status: 'A'} as ProductFilter
}
