import { Component, OnInit, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { NxtRouter } from '../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../shared/services/nxt-router/nxt-router.service';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { NxtUserMenuComponent } from "./nxt-user-menu/nxt-user-menu.component";
import { NxtAuth0, UserAuth0 } from '../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../shared/services/nxt-auth0/nxt-auth0.service';
import { Subscription } from 'rxjs';
import { NxtCarrinhoButtonComponent } from "./nxt-carrinho-button/nxt-carrinho-button.component";

@Component({
    selector: 'app-nxt-navbar',
    standalone: true,
    template: `
    <div class="nxt-navbar-component">
      <p-menubar [model]="items">
        <ng-template pTemplate="start">
          <h1 (click)="nxtRouter.navigateTo('/')" style="color: white; margin-left: 20px; cursor: pointer">NextPixel</h1>
        </ng-template>

        <ng-template pTemplate="end">
         <div class="user-interactions">
           <div class="user-menu">
              @if(user.isAuthenticated){
                <app-nxt-user-menu [user]="user" />
              }@else{
                <div class="buttons-login">
                  <p-button label="Cadastre-se" (click)="nxtRouter.navigateTo('/meu-perfil', {cameFrom: '/'})"></p-button>
                  <p-button class="button-singup" label="Entrar" [text]="true" (click)="nxtRouter.navigateTo('/meu-perfil', {cameFrom: '/'})"></p-button>
                </div>
              }
            </div>
            @if(user.profile && user.profile.usu_co_usuario){
              <app-nxt-carrinho-button [user]="user" />
            }
         </div>
        </ng-template>

      </p-menubar>
    </div>
  `,
    styles: `
    ::ng-deep .button-singup > button{
      color: white;
    }

    .user-interactions{
      display: flex;
      align-items: center;
    }

    ::ng-deep p-menubar > div{
      background-color: #1B4A96;
      border: 0;
    }

    ::ng-deep .p-menubar-end > input{
      background-color: #92A8C0;
    }

    ::ng-deep .p-menubar-end > input::placeholder{
      color: white;
    }

    ::ng-deep p-menubarsub > ul > li > div > a > span {
      color: white;
    }

    ::ng-deep p-menubarsub{
      margin-left: 25px;
    }

    ::ng-deep p-menubarsub > ul > li > div:hover{
      background-color:#92A8C0;
    }

    ::ng-deep p-menubarsub > ul{
      background-color: #1B4A96;
    }

    ::ng-deep .p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content{
      background-color: #1B4A96 !important;
    }

    ::ng-deep barsicon{
      color: white;
    }

    ::ng-deep barsicon > svg{
      width: 24px;
      height: 24px;
    }

    ::ng-deep p-menubar > div > a{
      margin-left: 20px;
    }

    ::ng-deep barsicon:hover{
      color: black;
    }

    @media (max-width: 522px){
      ::ng-deep p-menubar > div{
        flex-wrap: wrap;
        justify-content: center;
      }

      ::ng-deep p-menubar > div > .p-menubar-end{
        margin: 0;
      }
    }
  `,
    imports: [MenubarModule, InputTextModule, ButtonModule, BadgeModule, NxtUserMenuComponent, NxtCarrinhoButtonComponent]
})
export class NxtNavbarComponent implements OnInit {
  protected nxtRouter: NxtRouter = inject(NxtRouterService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  items = [
    {
      label:'Produtos',
      command: () => this.nxtRouter.navigateTo('/produtos', {cameFrom: '/'})
    },
    {
      label:'Meu Perfil',
      command: () => this.nxtRouter.navigateTo('/meu-perfil', {cameFrom: '/'})
    },
  ]
  subs: Subscription[] = [];
  user: UserAuth0 = {} as UserAuth0;

  ngOnInit(): void {
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
