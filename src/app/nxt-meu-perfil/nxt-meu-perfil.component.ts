import { Component, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { NxtBackButtonComponent } from '../shared/components/nxt-back-button/nxt-back-button.component';
import { Subscription, catchError, lastValueFrom } from 'rxjs';
import { NxtAuth0, UserAuth0 } from '../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from '../shared/services/nxt-auth0/nxt-auth0.service';
import { NxtPerfilComponent } from "./nxt-perfil/nxt-perfil.component";
import { NxtMeuperfil } from './nxt-meu-perfil.interface';
import { NxtMeuPerfilService } from './nxt-meu-perfil.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NxtRouter } from '../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../shared/services/nxt-router/nxt-router.service';
import { NxtPerfilPedidoComponent } from "./nxt-perfil-pedido/nxt-perfil-pedido.component";
import { NxtPerfilEnderecoComponent } from "./nxt-perfil-endereco/nxt-perfil-endereco.component";

@Component({
    selector: 'app-nxt-meu-perfil',
    standalone: true,
    template: `
    <div class="meu-perfil-component">
      <div class="meu-perfil-title">
        <app-nxt-back-button [routerNavigateBack]="routerNavigateBack" />
        <h1>Meu Perfil</h1>
      </div>
      <div class="section-line"></div>
      <div class="meu-perfil">
        <div class="perfil">
          <app-nxt-perfil [user]="user" [loading]="loading"/>
        </div>

        <div class="pedidos">
          <app-nxt-perfil-pedido [user]="user" #perfilPedido />
        </div>

        <div class="enderecos">
          <app-nxt-perfil-endereco [user]="user" #perfilEndereco />
        </div>
      </div>
    </div>
    <p-toast></p-toast>
  `,
    styles: `
    .perfil,
    .pedidos,
    .enderecos{
      width: 100%;
    }
    .meu-perfil{
      display: flex;
      justify-content: center;
      border-radius: 15px;
      width: 85%;
      flex-direction: column;
      align-items: center;
    }
  
    .meu-perfil-component{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .meu-perfil-title{
        display: flex;
        align-items: center;
        padding: 10px;
        padding-left: 40px;
        width: 100%;
      }

      .meu-perfil-title > h1{
        font-size: 42px;
        margin-left: 25px;
        text-align: start;
      }

      .section-line{
      height: 1px;
      width: 100%;
      background-color: #ddd;
      }
  `,
    providers: [MessageService],
    imports: [NxtBackButtonComponent, NxtPerfilComponent, ToastModule, NxtPerfilPedidoComponent, NxtPerfilEnderecoComponent]
})
export class NxtMeuPerfilComponent implements OnInit {
  @ViewChild('perfilPedido',{static: true}) perfilPedido!: NxtPerfilPedidoComponent
  @ViewChild('perfilEndereco',{static: true}) perfilEndereco!: NxtPerfilEnderecoComponent


  private authService: NxtAuth0 = inject(NxtAuth0Service);
  private meuPerfilService: NxtMeuperfil = inject(NxtMeuPerfilService);
  private messageService = inject(MessageService);
  private nxtRouter: NxtRouter = inject(NxtRouterService);

  routerNavigateBack: string = history?.state.cameFrom ?? '';
  loading: boolean = true;
  subs: Subscription[] = [];
  user: UserAuth0 = {} as UserAuth0;
  

  ngOnInit(): void {
    let called = 0;
    this.subs.push(
      this.authService.user$.subscribe(user => {
        this.loading = true;
        if(user.isAuthenticated){
          this.user = user;
          setTimeout(() => {
            this.loading = false;
          }, 200);
          if(called == 0){
            this.perfilPedido.getPedidos(this.user.profile.usu_co_usuario, 0, 10);
            this.perfilEndereco.getEnderecos(this.user.profile.usu_co_usuario, 0, 10);
            called = 1;
          }
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
