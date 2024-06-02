import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NxtPerfilEnderecoFormComponent } from "../nxt-perfil-endereco-form/nxt-perfil-endereco-form.component";
import { NxtEnderecoAdd } from './nxt-endereco-add.interface';
import { NxtEnderecoAddService } from './nxt-endereco-add.service';
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-nxt-endereco-add',
    standalone: true,
    template: `
    <div class="nxt-endereco-add">
      <app-nxt-perfil-endereco-form (onCancel)="onCancel.emit()" 
      (onSubmit)="postEndereco(
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
export class NxtEnderecoAddComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onAddEndereco = new EventEmitter();
  @Input() user!: number;

  private enderecoAddService: NxtEnderecoAdd = inject(NxtEnderecoAddService);
  private messageService = inject(MessageService);

  async postEndereco(
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
    const endereco = await lastValueFrom(this.enderecoAddService.postEndereco(
      id, cep, estado, cidade, numero, apelido, bairro, recebe,rua
    ).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar endereço:  ' + error.error.message });
        return error;
      })
    ));
    this.onAddEndereco.emit();  
  }
}
