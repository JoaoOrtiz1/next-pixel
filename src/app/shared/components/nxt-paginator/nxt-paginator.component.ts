import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-nxt-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  template: `
    <div class="container-paginator">
        <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" [rowsPerPageOptions]="[1, 2, 5, 10, 20, 30]"></p-paginator>
    </div>

  `,

  styles:`
    .container-paginator{
      width: 100%;
    }

    ::ng-deep p-paginator > div {
      background-color: #1F3F73;
    }

    ::ng-deep p-paginator > div > button,
    ::ng-deep p-paginator > div > span > button {
      color: white;
    }

    ::ng-deep p-paginator > div > span > .p-highlight,
    ::ng-deep p-paginator > div > button:hover,
    ::ng-deep p-paginator > div > span > button:hover{
      background-color: #84A5C8 !important;
    }

    ::ng-deep p-paginator > div > p-dropdown > div{
      background-color: #AFC8E4
    }

  `

})
export class NxtPaginatorComponent {
  @Output() onPageChangeEvent = new EventEmitter();

  @Input() first = 0;
  @Input() rows = 10;
  @Input() totalRecords = 0;

    onPageChange(event: PaginatorState){
      this.onPageChangeEvent.emit(event);
    }

}
