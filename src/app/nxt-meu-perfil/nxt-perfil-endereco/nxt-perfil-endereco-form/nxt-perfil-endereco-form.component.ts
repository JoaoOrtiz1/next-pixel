import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '../../../shared/models/endereco.model';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NxtCepFindService } from '../../../shared/services/cep/nxt-cep.service';
import { NxtCepService } from '../../../shared/services/cep/nxt-cep.interface';
import { CEPPipe } from "../../../shared/pipes/cep-pipe";
import { catchError, lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-nxt-perfil-endereco-form',
    standalone: true,
    template: `
    <div class="nxt-perfil-endereco-form">
      <form [formGroup]="formulario">
        <div class="formulario-endereco" style="padding: 15px;">
          <div class="form-group-endereco" style="width: 100%;">
              <div class="form-group" style="width: 48%;">
                <span>Apelido do endereço *</span>
                <input pInputTex type="text" pInputText formControlName="endc_no_apelido" />
                @if(verificaValidTouched('endc_no_apelido')){
                  <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Apelido inválido"></p-message>
                }
              </div>

              <div class="form-group" style="width: 48%;">
                <span>Quem Recebe *</span>
                <input pInputTex type="text" pInputText formControlName="endc_no_recebe" />
                @if(verificaValidTouched('endc_no_recebe')){
                  <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Nome recebedor inválido"></p-message>
                }
              </div>
          </div>

          <div class="form-group-endereco">
            <div class="form-group">
              <span for="endc_no_apelido">CEP *</span>
              <div class="cep-input-group" style="display: flex; width: 100%">
                <input [style]="{'margin-right': '10px;', 'width':'90%'}" [value]="formulario.value.endc_co_cep | cep" (change)="findCepInfos()" pInputTex type="text" pInputText formControlName="endc_co_cep" />
                @if(loadingCep){
                  <p-button [link]="true" [loading]="true"></p-button>
                }
              </div>
              @if(verificaValidTouched('endc_co_cep')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="CEP inválido"></p-message>
              }
            </div>

            <div class="form-group">
              <span>Cidade *</span>
              <input pInputTex type="text" pInputText formControlName="endc_nu_cidade" />
              @if(verificaValidTouched('endc_nu_cidade')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Cidade inválida"></p-message>
              }
            </div>
          </div>

          <div class="form-group-endereco">
            <div class="form-group">
              <span>Estado *</span>
              <input pInputTex type="text" pInputText formControlName="endc_co_estado" />
              @if(verificaValidTouched('endc_co_estado')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Estado inválido"></p-message>
              }
            </div>

            <div class="form-group">
              <span>Bairro *</span>
              <input pInputTex type="text" pInputText formControlName="endc_no_bairro" />
              @if(verificaValidTouched('endc_no_bairro')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Bairro inválida"></p-message>
              }
            </div>
          </div>

          <div class="form-group-endereco">
            <div class="form-group">
              <span>Rua *</span>
              <input pInputTex type="text" pInputText formControlName="endc_no_rua" />
              @if(verificaValidTouched('endc_no_rua')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Rua inválida"></p-message>
              }
            </div>

            <div class="form-group">
              <span>Número *</span>
              <input pInputTex type="text" pInputText formControlName="endc_nu_numero" />
              @if(verificaValidTouched('endc_nu_numero')){
                <p-message severity="error" [style]="{'width':'100%', 'display': 'flex', 'justify-content':'start'}" text="Número inválido"></p-message>
              }
            </div>
          </div>

        </div>
        <div class="buttons-formulario-endereco">
          <p-button severity="danger" label="Cancelar" icon="pi pi-times" (click)="onCancel.emit()"></p-button>
          <p-button severity="success" label="Salvar" icon="pi pi-check" (click)="onSubmitForm()"></p-button>
        </div>
      </form>
    </div>
    <p-toast></p-toast>
  `,
    styles: `
    .buttons-formulario-endereco{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .form-group-endereco{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0px;
    }
    
    .form-group{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 48%;
    }

    ::ng-deep .form-group > p-message{
      width: 100%;
    }

    .form-group > input{
      width: 100%;
    }

    .form-group  > span{
      color: black;
      font-size: 17px;
      margin-bottom: 9px;
      margin-left: 2px;
    }
  `,
    imports: [FormsModule, ReactiveFormsModule, InputTextModule, MessageModule, CEPPipe, ToastModule, ButtonModule],
    providers: [MessageService]
})
export class NxtPerfilEnderecoFormComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  private formBuilder: FormBuilder = inject(FormBuilder);
  private cepSercice: NxtCepService = inject(NxtCepFindService);
  private messageService = inject(MessageService);

  formulario!: FormGroup;
  @Input() endereco: Endereco = {} as Endereco;
  loadingCep: boolean = false;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      endc_no_apelido: [this.endereco.endc_no_apelido ?? null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      endc_co_cep: [this.endereco.endc_co_cep ?? null, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      endc_co_estado: [this.endereco.endc_co_estado ?? null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      endc_nu_cidade: [this.endereco.endc_nu_cidade ?? null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      endc_nu_numero: [this.endereco.endc_nu_numero ?? null, [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      endc_no_bairro: [this.endereco.endc_no_bairro ?? null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      endc_no_recebe: [this.endereco.endc_no_recebe ?? null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      endc_no_rua: [this.endereco.endc_no_rua ?? null, [Validators.required, Validators.minLength(3), Validators.maxLength(65)]]
    })
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  async findCepInfos(){
    if(this.formulario.value.endc_co_cep.replace(/-/g, '').length == 8){
      this.loadingCep = true
      this.desativarCampos(this.formulario, true);
      const cepInfos = await lastValueFrom(this.cepSercice.getCEPInfo(this.formulario.value.endc_co_cep.replace(/-/g, '')).pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar CEP do usuário: ' + error.error.message });
          return error;
        })
      )) 

      if(cepInfos.cep !== undefined){
        this.formulario.patchValue({
          endc_no_bairro: cepInfos.bairro,
          endc_nu_cidade: cepInfos.localidade,
          endc_no_rua: cepInfos.logradouro,
          endc_co_estado: cepInfos.uf
        })
      }
      this.loadingCep = false;
      this.desativarCampos(this.formulario, false);

    }
  }

  onSubmitForm(){
    if(this.formulario.valid){
      this.onSubmit.emit(this.formulario.value)
    }else{
    Object.keys(this.formulario.controls).forEach((campo) => {
      const controle = this.formulario.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
    })
  }

  }

  desativarCampos(formulario: FormGroup, action: boolean) {
    Object.keys(formulario.controls).forEach(key => {
      if(!action){
        formulario.get(key)?.enable()
      }else{
        formulario.get(key)?.disable()
      }
    });
  }

}


