import { Component, Input, inject } from '@angular/core';
import { NxtPerfilEndereco } from './nxt-perfil-endereco.interface';
import { NxtPerfilEnderecoService } from './nxt-perfil-endereco.service';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Endereco } from '../../shared/models/endereco.model';
import { UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { NxtPerfilEnderecoListComponent } from "./nxt-perfil-endereco-list/nxt-perfil-endereco-list.component";
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-nxt-perfil-endereco',
    standalone: true,
    template: `
    <div class="nxt-perfil-endereco-component">
      <app-nxt-perfil-endereco-list [user]="user" (onPageChange)="getEnderecos(user.profile.usu_co_usuario, $event.first, $event.rows)" [enderecos]="enderecos" [first]="first" [rows]="rows" [loading]="loading" [total_records]="total_records" />
    </div>
    <p-toast></p-toast>
  `,
    styles: `
    .nxt-perfil-endereco-component{
      padding: 25px;
    }
  `,
    providers: [MessageService],
    imports: [NxtPerfilEnderecoListComponent, ToastModule]
})
export class NxtPerfilEnderecoComponent {
  @Input() loading: boolean = true;
  @Input() user!: UserAuth0;
  private perfilEndereco: NxtPerfilEndereco = inject(NxtPerfilEnderecoService);
  private messageService = inject(MessageService);

  first: number = 0;
  rows: number = 2;
  total_records: number = 0;

  enderecos: Endereco[] = [];
 
  async getEnderecos(id: number, first: number, rows: number){
    this.loading = true;
    const enderecos = await lastValueFrom(this.perfilEndereco.getEnderecos(id, first, rows).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar endereço do usuário: ' + error.error.message });
        return error;
      })
    ));
    if(enderecos !== null && enderecos.length > 0){
      this.enderecos = enderecos;
      this.total_records = enderecos[0].total_records;
    }
    
    this.loading = false;
  }
}
