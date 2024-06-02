import { Component } from '@angular/core';

@Component({
  selector: 'app-nxt-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="footer-component">
      <span>Desenvolvido por João Ortiz.</span>
    </div>
  `,
  styles: `
    .footer-component{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1B4A96;
      padding: 4px;
      color: white;
    }
  `
})
export class NxtFooterComponent {

}
