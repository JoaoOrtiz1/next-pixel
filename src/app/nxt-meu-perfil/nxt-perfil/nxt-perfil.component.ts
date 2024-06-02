import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxtAuth0, UserAuth0 } from '../../shared/services/nxt-auth0/nxt-auth0.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NxtRouterService } from '../../shared/services/nxt-router/nxt-router.service';
import { SkeletonModule } from 'primeng/skeleton';
import { catchError, lastValueFrom } from 'rxjs';
import { NxtPerfil } from './nxt-perfil.interface';
import { NxtPerfilService } from './nxt-perfil.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { NxtAuth0Service } from '../../shared/services/nxt-auth0/nxt-auth0.service';
import { FileUploadModule } from 'primeng/fileupload';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FireStorageService } from '../../shared/services/firebase/firebase.service';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-nxt-perfil',
  standalone: true,
  imports: [ButtonModule, FieldsetModule, InputTextModule, FormsModule, ReactiveFormsModule, FloatLabelModule, SkeletonModule, ToastModule, MessageModule, FileUploadModule],
  providers: [MessageService],
  template: `
    <div class="perfil-component">
    <p-fieldset class="fieldset-display-perfil" legend="Perfil">
      <div class="title-perfil">
        <span></span>
      </div>
      <div class="perfil-content">
        @if(!loading){
          <div class="perfil-img">
            <div class="buttons-edit">
              <p-button (click)="isEditingImg = !isEditingImg" [style]="{'background-color':'#1F3F73'}" [rounded]="true" [icon]="isEditingImg ? 'pi pi-times' : 'pi pi-pencil'"></p-button>
            </div>
            <img [src]="user.profile.usu_ft_url ?? '../../../assets/default-profile.jpg'" alt="">
            @if(isEditingImg){
              <div class="buttons-edit-img">
                <p-button (click)="removeUserAvatar()" icon="pi pi-trash" severity="danger"></p-button>
                <p-fileUpload class="button-editar" mode="basic" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" [maxFileSize]="1000000" (onUpload)="onUpload($event)" [auto]="true" chooseLabel=""></p-fileUpload>
              </div>
            }
          </div>
          @if(!isEditing){
            <div class="perfil-infos-view" style="width: 50%; padding-left: 20px">
              <div class="info-view-perfil">
                <i class="pi pi-user"></i>
                <span>{{user.profile.usu_no_usuario}}</span>
              </div>

              <div class="info-view-perfil" style="margin-top: auto;">
                <i class="pi pi-envelope"></i>
                <span>{{user.profile.usu_no_email}}</span>
              </div>
            </div>
            <div class="buttons-atalho-perfil">
              <div class="button-edit-single" style="display: flex; justify-content: flex-end">
                <p-button (click)="editToggle()" [style]="{'background-color':'#1F3F73'}" [rounded]="true" [icon]="isEditing ? 'pi pi-times' : 'pi pi-pencil'"></p-button>
              </div>
              @if(!isEditing){
                <p-button (click)="blockUser()" label="Desativar conta" [style]="{'background-color':'#1F3F73', 'margin-right': '15px'}" icon="pi pi-lock"></p-button>
              }
              <p-button (click)="nxtRouter.navigateTo('/carrinho', {cameFrom: '/meu-perfil'})" label="Carrinho" icon="pi pi-cart-plus"></p-button>
            </div>
          }@else {
            <div class="perfil-infos-view" [formGroup]="formulario" style="width: 65%;">
              <div class="info-view-perfil">
                <i class="pi pi-user"></i>
                <p-floatLabel class="input-form-field">
                  <input id="usu_no_usuario" placeholder="Nome de usuário" type="text" pInputText formControlName="usu_no_usuario">
                  <label for="usu_no_usuario">Nome de usuário</label>
                  @if(verificaValidTouched('usu_no_usuario')){
                    <p-message severity="error" [style]="{'width':'90%', 'display': 'flex', 'justify-content':'start'}" text="Nome inválido"></p-message>
                  }
                </p-floatLabel>              
              </div>

              <div class="info-view-perfil" style="margin-top: auto;">
                <i class="pi pi-envelope"></i>
                <p-floatLabel class="input-form-field">
                  <input id="usu_no_email" placeholder="Email" type="text" pInputText formControlName="usu_no_email">
                  <label for="usu_no_email">Email</label>
                  @if(verificaValidTouched('usu_no_email')){
                    <p-message severity="error" [style]="{'width':'90%', 'display': 'flex', 'justify-content':'start'}" text="Email inválido"></p-message>
                  }
                </p-floatLabel>              
              </div>

              <div class="button-perfil-edit">
                <p-button (click)="editToggle()" label="Cancelar" severity="danger" icon="pi pi-times"></p-button>
                <p-button (keydown.enter)="onSubmitForm()" (click)="onSubmitForm()" label="Salvar" severity="success" icon="pi pi-check"></p-button>
              </div>
            </div>
          }
        }@else{
          <div class="perfil-img">
            <p-skeleton class="skeleton-perfil" shape="circle" width="100%" height="200px"></p-skeleton>
          </div>

          <div class="perfil-infos-view" style="width: 60%; padding-left: 20px">
              <div class="info-view-perfil">
                <i class="pi pi-user"></i>
                <div class="skeleton-perfil-fill" style="width: 100%; margin-left:20px">
                  <p-skeleton class="skeleton-perfil" width="90%" height="40px"></p-skeleton>
                </div>
              </div>

              <div class="info-view-perfil" style="margin-top: auto;">
                <i class="pi pi-envelope"></i>
                <div class="skeleton-perfil-fill" style="width: 100%; margin-left:20px">
                  <p-skeleton class="skeleton-perfil" width="90%" height="40px"></p-skeleton>
                </div>
              </div>
            </div>
            <div class="buttons-atalho-perfil">
              <p-button (click)="nxtRouter.navigateTo('/produtos', {cameFrom: '/meu-perfil'})" label="Ver produtos" icon="pi pi-arrow-right" iconPos="right"></p-button>
              <p-button (click)="nxtRouter.navigateTo('/carrinho', {cameFrom: '/meu-perfil'})" label="Carrinho" icon="pi pi-cart-plus"></p-button>
            </div>
        }
      </div>
      </p-fieldset>
    </div>
    <p-toast></p-toast>
  `,
  styles: `

    .buttons-edit{
      display: flex;
      justify-content: end;
    }
    
    ::ng-deep .skeleton-perfil > div{
      background-color: #84A5C8;
    }

    .buttons-atalho-perfil{
      display: flex;
      flex-direction: column;
    }

    ::ng-deep .buttons-atalho-perfil > p-button{
      margin: 20px 0px;
    }
    
    ::ng-deep .buttons-atalho-perfil > p-button > button {
      background-color: #1F3F73;
    }

    ::ng-deep .buttons-atalho-perfil > p-button,
    ::ng-deep .buttons-atalho-perfil > p-button > button{
      width: 100%;
    }

    .buttons-edit-img{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .button-perfil-edit{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    ::ng-deep .input-form-field {
      margin-left: 20px;
    }

    ::ng-deep .input-form-field > span > label {
      font-size: 20px;
      top: -1.5rem;
    }

    ::ng-deep .input-form-field,
    ::ng-deep .input-form-field > span > input {
      width: 90%
    }

    .perfil-component{
      border-radius: 10px;
      margin: 30px 0px;
      width: 100%;
      padding: 25px;
    }

    ::ng-deep .fieldset-display-perfil > fieldset{
      background-color: #AFC8E4;
      border: 0;
    }

    ::ng-deep .fieldset-display-perfil > fieldset > legend > span{
      font-size: 27px;
      color: white;
    }
    
    ::ng-deep .fieldset-display-perfil > fieldset > legend{
      background-color: #1B4A96;
      border: 0;
    }
    

    .perfil-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding: 0px 25px;
    }
    
    .title-perfil{
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
    .title-perfil > span{
      font-size: 27px;
      color: black;
    }

    .perfil-img{
      width: 20%;
    }

    .perfil-infos-view{
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .info-view-perfil{
      display: flex;
      align-items: center;
      width: 100%;
      margin: 40px 0px;
      line-break: anywhere;
    }

    .info-view-perfil > i{
      font-size: 35px;
      color: #1F3F73;
    }

    .info-view-perfil > span{
      font-size: 30px;
      color: black;
      font-weight: bold;
      margin-left: 25px;
    }

    .perfil-img > img {
      width:100%;
      object-fit: contain;
      border-radius: 49%;
      border: 6px solid #1F3F73;
    }

    @media (max-width: 1080px){
      .perfil-content{
        flex-wrap: wrap;
      }

      .buttons-atalho-perfil{
        width: 90%;
      }

      .perfil-infos-view{
        width: 70% !important;
      }

      .perfil-img{
        width: 60%
      }
      
      .perfil-content{
        justify-content: center;
      }
    }

    @media (max-width:988px) {
      .perfil-infos-view{
        width: 100% !important;
      }

      .perfil-img{
        width: 90%;
        margin-bottom: 30px;
      }

      .perfil-content{
        justify-content: center;
      }
    }
  `
})
export class NxtPerfilComponent{
  @Input() user!: UserAuth0;
  @Input() loading!: boolean;

  private formBuilder = inject(FormBuilder);
  private perfilService: NxtPerfil = inject(NxtPerfilService);
  private messageService = inject(MessageService);
  private authService: NxtAuth0 = inject(NxtAuth0Service);
  private angularFireStorage: AngularFireStorage = inject(AngularFireStorage);
  private storage = inject(FireStorageService);
  protected nxtRouter = inject(NxtRouterService);

  isEditing: boolean = false;
  isEditingImg: boolean = false;
  formulario!: FormGroup;

  editToggle(){
    this.isEditing = !this.isEditing;
    if(this.isEditing){
      this.initForm();
    }
  }

  initForm(){
    this.formulario = this.formBuilder.group({
      usu_no_usuario: [this.user.profile.usu_no_usuario, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      usu_no_email: [this.user.profile.usu_no_email, [Validators.required, Validators.email, Validators.maxLength(70)]]
    });
  }

  async onSubmitForm(){
    if(this.formulario.valid){
      await this.putUser(this.user.profile.usu_co_usuario, this.formulario.value.usu_no_usuario, this.formulario.value.usu_no_email, 'A');
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Campos inválidos', detail: `Preencha corretamente os campos de nome e email!`});
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
        controle?.markAsTouched();
      })
    }
  }

  async putUser(id: number, nome: string, email: string, status: string){
    this.loading = true;
    const updateUser = await lastValueFrom(this.perfilService.putUser(id, nome, email, status).pipe(
      catchError(error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar informações do usuário: ' + error.error.message })
        return error;
      })
    ));
    this.authService.setFullDataUser();
    this.isEditing = false;
  }

  async blockUser(){
    this.initForm();
    await this.putUser(this.user.profile.usu_co_usuario, this.formulario.value.usu_no_usuario, this.formulario.value.usu_no_email, 'I');
  }

  async onUpload(event: any){
    this.loading = true;
    const path = event.files[0];
    await this.angularFireStorage.upload(`/${this.user.profile.usu_co_usuario}/user-${this.user.profile.usu_co_usuario}`, path);
    this.authService.setFullDataUser();
    this.isEditingImg = !this.isEditingImg;
  }

  async removeUserAvatar(){
    this.loading = true;
    await lastValueFrom(this.storage.deleteFilesInFolder(`/${this.user.profile.usu_co_usuario}/`));
    this.authService.setFullDataUser();
    this.isEditingImg = !this.isEditingImg;
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

}
