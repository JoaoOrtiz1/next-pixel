import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NxtDeleteEndereco } from './nxt-perfil-endereco-delete.interface';
import { NxtPerfilEnderecoDeleteService } from './nxt-perfil-endereco-delete.service';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-nxt-perfil-endereco-delete',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  template: `
    <div class="button-endereco-delete">
      <p-button icon="pi pi-trash" (click)="deleteEndereco(user, endc)"></p-button>
    </div>
    <p-toast></p-toast>
  `,
  styles: `
    ::ng-deep .button-endereco-delete > p-button > button {
      background-color: #1B4A96
    }
  `
})
export class NxtPerfilEnderecoDeleteComponent {
  @Output() onDelete = new EventEmitter();

  @Input() user!: number;
  @Input() endc!: number;
  private perfilEnderecoService: NxtDeleteEndereco = inject(NxtPerfilEnderecoDeleteService);
  private messageService = inject(MessageService);

  async deleteEndereco(id: number, id_endc: number){
    const deleteEndereco = await lastValueFrom(this.perfilEnderecoService.deleteEndereco(id, id_endc).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar endereço: ' + error.error.message });
        return error;
      })
    ));
    this.onDelete.emit();
  }
}
