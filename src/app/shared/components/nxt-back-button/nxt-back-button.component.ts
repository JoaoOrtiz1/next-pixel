import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NxtRouter } from '../../services/nxt-router/nxt-router.interface';
import { NxtRouterService } from '../../services/nxt-router/nxt-router.service';

@Component({
  selector: 'app-nxt-back-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
     <div class="button-back">
      <p-button (click)="navigateBack()" class="butto-back" icon="pi pi-arrow-left" [rounded]="true" [style]="{'background-color':'#1B4A96','border': '0'}"></p-button>
    </div>
  `,
  styles: `
    .button-back{
        display: flex;
        align-items: center;
      }

      ::ng-deep button.p-ripple.p-element.p-button.p-component.p-button-icon-only.p-button-rounded:focus{
        box-shadow: 0 0 0 2px #4196d3, 0 0 0 4px #2bb4e9, 0 1px 2px 0 rgb(0, 0, 0);
      }
  `
})
export class NxtBackButtonComponent {
  @Input() routerNavigateBack!: string;
  protected routerService: NxtRouter = inject(NxtRouterService);

  navigateBack(){
    this.routerService.navigateTo(`${this.routerNavigateBack}`)
  }
}
