import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NxtEnderecoEdit } from './nxt-endereco-edit.interface';
import { NxtEnderecoEditService } from './nxt-endereco-edit.service';
import { catchError, lastValueFrom } from 'rxjs';
import { NxtPerfilEnderecoFormComponent } from "../nxt-perfil-endereco-form/nxt-perfil-endereco-form.component";
import { ToastModule } from 'primeng/toast';
import { Endereco } from '../../../shared/models/endereco.model';

@Component({
    selector: 'app-nxt-endereco-edit',
    standalone: true,
    template: `
    <div class="nxt-endereco-edit">
      <app-nxt-perfil-endereco-form (onCancel)="onCancel.emit()"  [endereco]="endereco"
      (onSubmit)="putEndereco(
        id_endc,
        user, 
        $event.endc_co_cep, 
        $event.endc_co_estado, 
        $event.endc_nu_cidade,
        $event.endc_nu_numero,
        $event.endc_no_apelido,
        $event.endc_no_bairro,
        $event.endc_no_recebe,
        $event.endc_no_rua
      )"/>
    </div>
    <p-toast></p-toast>
  `,
    styles: ``,
    imports: [NxtPerfilEnderecoFormComponent, ToastModule],
    providers: [MessageService]
})
export class NxtEnderecoEditComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onEditEndereco = new EventEmitter();
  @Input() user!: number;
  @Input() id_endc!: number;
  @Input() endereco!: Endereco;

  private enderecoEditService: NxtEnderecoEdit = inject(NxtEnderecoEditService);
  private messageService = inject(MessageService);


  async putEndereco(
    id_endc: number,
    id: number, 
    cep: number, 
    estado: string, 
    cidade: string, 
    numero: number, 
    apelido: string, 
    bairro: string, 
    recebe: string, 
    rua: string
  ){
    const endereco = await lastValueFrom(this.enderecoEditService.updateEndereco(
      id_endc, id, cep, estado, cidade, numero, apelido, bairro, recebe,rua
    ).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar endereço:  ' + error.error.message });
        return error;
      })
    ));
    this.onEditEndereco.emit();  
  }
}
