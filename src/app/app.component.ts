import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NxtNavbarComponent } from "./nxt-navbar/nxt-navbar.component";
import { NxtFooterComponent } from "./nxt-footer/nxt-footer.component";
import { NxtAuth0, UserAuth0 } from './shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtAuth0Service } from './shared/services/nxt-auth0/nxt-auth0.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <div class="app-component">
      <app-nxt-navbar />
      <router-outlet />
      <app-nxt-footer />
      <p-toast></p-toast>
    </div>
  `,
    styles: `
      .app-component {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      app-nxt-footer{
        margin-top: auto;
      }
    `,
    imports: [RouterOutlet, NxtNavbarComponent, NxtFooterComponent, ToastModule],
    providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'next-pixel';
  subs: Subscription[] = [];
  private authService: NxtAuth0 = inject(NxtAuth0Service);

  ngOnInit() {
    this.authService.setFullDataUser();
  }


}
