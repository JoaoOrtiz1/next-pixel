import { Component, Input, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtRouter } from '../../shared/services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-nxt-user-menu',
  standalone: true,
  imports: [ButtonModule, MenuModule, AvatarModule, AvatarGroupModule],
  template: `
    <div class="user-menu-component">
      <div class="img-user">
        <!-- <img [src]="" alt=""> -->
        <p-avatar 
          [image]="user.profile.usu_ft_url ?? '../../../assets/default-profile.jpg'" 
          styleClass="mr-4" 
          size="xlarge" 
          shape="circle" />
      </div>
        <span><b>{{user.profile.usu_no_usuario}}</b></span>
      <div class="menu-drop">
        <p-menu #menu [model]="items" [popup]="true"></p-menu>
        <p-button icon="pi pi-angle-down" [link]="true"  [text]="true" (click)="menu.toggle($event)"></p-button>
      </div>

    </div>
  `,
  styles: `
    ::ng-deep p-button > button > span{
      color: white;
    }

    ::ng-deep p-menu > div > ul > li > div > a{
      background-color: white !important;
    }

    .user-menu-component{
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    .user-menu-component > span{
      color: white;
      margin-left: 10px;
    }

    .img-user > img{
      max-width: 50px;
      max-height: 50px;
      border-radius: 15px;
    }
  `
})
export class NxtUserMenuComponent {
  @Input() user: UserAuth0 = {} as UserAuth0;
  private auth0Service: AuthService = inject(AuthService);
  private nxtRouter: NxtRouter = inject(NxtRouterService);

  items: MenuItem[] = [
    {
      label: 'Meu perfil',
      icon: 'pi pi-user',
      command: () => {
        this.nxtRouter.navigateTo('/meu-perfil', {cameFrom: '/'})
      }
    },
    {
      label: 'Sair',
      icon:'pi pi-sign-out',
      command: () => {
        this.auth0Service.logout();
      }
    },
  ]

}
