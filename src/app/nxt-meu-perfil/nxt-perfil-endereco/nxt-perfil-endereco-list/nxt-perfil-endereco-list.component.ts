import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Endereco } from '../../../shared/models/endereco.model';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { NxtPaginatorComponent } from "../../../shared/components/nxt-paginator/nxt-paginator.component";
import { SkeletonModule } from 'primeng/skeleton';
import { NxtPerfilEnderecoDeleteComponent } from "./nxt-perfil-endereco-delete/nxt-perfil-endereco-delete.component";
import { UserAuth0 } from '../../../shared/services/nxt-auth0/nxt-auth0.interface';
import { DialogModule } from 'primeng/dialog';
import { NxtEnderecoAddComponent } from "../nxt-endereco-add/nxt-endereco-add.component";
import { CEPPipe } from "../../../shared/pipes/cep-pipe";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NxtEnderecoEditComponent } from "../nxt-endereco-edit/nxt-endereco-edit.component";

@Component({
    selector: 'app-nxt-perfil-endereco-list',
    standalone: true,
    template: `
    <div class="nxt-perfil-endereco-list">
      <p-fieldset class="fieldset-display-endereco" legend="Endereços">
        <div class="button-add-endereco button-actions">
          <p-button (click)="visibleAdd = true" icon="pi pi-plus" ></p-button>
        </div>
        <p-scrollPanel class="scrollpanel-endereco" [style]="{ width: '100%', 'max-height': '450px' }">
          @if(!loading){
            <div class="enderecos">
            @for(endereco of enderecos; track endereco){
              <div class="endereco">
                <p-fieldset class="fieldset-endereco" [legend]="endereco.endc_no_apelido">
                  <div class="endereco-content">
                    <div class="group-endereco">
                      <div class="endereco-info" style="margin-bottom: 10px;">
                        <span><b>Rua:</b> {{endereco.endc_no_rua}}</span>
                      </div>
  
                      <div class="endereco-info">
                        <span><b>Número:</b> {{endereco.endc_nu_numero}}</span>
                      </div>
                    </div>

                    <div class="group-endereco">
                      <div class="endereco-info" style="margin-bottom: 10px;">
                        <span><b>Bairro:</b> {{endereco.endc_no_bairro}}</span>
                      </div>
  
                      <div class="endereco-info">
                        <span><b>CEP:</b> {{endereco.endc_co_cep | cep}}</span>
                      </div>
                    </div>

                    <div class="group-endereco">
                      <div class="endereco-info">
                        <span style="display: flex; flex-direction: column; align-items: center"><b>Quem Recebe: </b> {{endereco.endc_no_recebe}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="button-actions" style="margin-top: 10px;">
                    <p-button icon="pi pi-pencil" (click)="visibleEdit = true; id_endc = endereco.endc_co_endereco; enderecoSelected = endereco"></p-button>
                    <app-nxt-perfil-endereco-delete (onDelete)="onPageChange.emit({first: 0, rows: 2}); successMsg('info', 'Sucesso', 'Endereço deletado com sucesso!') " [user]="user.profile.usu_co_usuario" [endc]="endereco.endc_co_endereco" />
                  </div>
                </p-fieldset>
              </div>
            }@empty {
              <span style="font-size: 24px; color: #656565; font-weight: bold">Nenhum endereço encontrado! Cadastre um agora para seu poder realizar sua primeira compra.</span>
            }
            </div>
          }@else {
            <div class="enderecos">
            @for(endereco of [].constructor(3); track endereco){
              <div class="endereco">
                <p-fieldset class="fieldset-endereco" legend="...">
                  <div class="endereco-content">
                    <div class="group-endereco endereco-skeleton">
                      <div class="endereco-info" style="margin-bottom: 10px;">
                        <span><b>Rua:</b></span>
                        <div class="skeleton-endereco" style="width: 40%;">
                        <p-skeleton width="100%" height="20px" ></p-skeleton>
                        </div>
                      </div>
  
                      <div class="endereco-info">
                        <span><b>Número:</b></span>
                        <div class="skeleton-endereco" style="width: 40%;">
                        <p-skeleton width="100%" height="20px" ></p-skeleton>
                        </div>
                      </div>
                    </div>

                    <div class="group-endereco endereco-skeleton">
                      <div class="endereco-info" style="margin-bottom: 10px;">
                        <span><b>Bairro:</b></span>
                        <div class="skeleton-endereco" style="width: 40%;">
                        <p-skeleton width="100%" height="20px" ></p-skeleton>
                        </div>
                      </div>
  
                      <div class="endereco-info">
                        <span><b>CEP:</b></span>
                        <div class="skeleton-endereco" style="width: 40%;">
                        <p-skeleton width="100%" height="20px" ></p-skeleton>
                        </div>
                      </div>
                    </div>

                    <div class="group-endereco endereco-skeleton">
                      <div class="endereco-info">
                        <span style="display: flex; flex-direction: column; align-items: center"><b>Quem Recebe: </b></span>
                        <div class="skeleton-endereco" style="width: 40%;">
                        <p-skeleton width="100%" height="20px" ></p-skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="button-actions" style="margin-top: 10px;">
                    <p-button icon="pi pi-pencil" (click)="true"></p-button>
                    <p-button icon="pi pi-trash" (click)="true"></p-button>
                  </div>
                </p-fieldset>
              </div>
            }
            </div>
          }
        </p-scrollPanel>
        <app-nxt-paginator (onPageChangeEvent)="onPageChange.emit($event)" [first]="first" [rows]="rows" [totalRecords]="total_records" />
      </p-fieldset>
    </div>


    <p-dialog class="modal-manage-endereco" header="Adicionar Endereço" [modal]="true" [draggable]="false" [(visible)]="visibleAdd" [style]="{ width: '55vw' }">
      @if(visibleAdd){
        <app-nxt-endereco-add (onAddEndereco)="onPageChange.emit({rows: rows, first: first}); visibleAdd = false; successMsg('success', 'Sucesso', 'Endereço cadastrado com sucesso!')" (onCancel)="visibleAdd = false;"  [user]="user.profile.usu_co_usuario"/>
      }
    </p-dialog>

    <p-dialog class="modal-manage-endereco" header="Adicionar Endereço" [modal]="true" [draggable]="false" [(visible)]="visibleEdit" [style]="{ width: '55vw' }">
      @if(visibleEdit){
        <app-nxt-endereco-edit [endereco]="enderecoSelected" (onEditEndereco)="onPageChange.emit({rows: rows, first: first}); visibleEdit = false; successMsg('success', 'Sucesso', 'Endereço editado com sucesso!')" (onCancel)="visibleEdit = false;" [id_endc]="id_endc"  [user]="user.profile.usu_co_usuario"/>
      }
    </p-dialog>
    <p-toast></p-toast>
  `,
    styles: `
  
    ::ng-deep .modal-manage-endereco > div > div > div{
      background-color: #84A5C8;
    }

    ::ng-deep .modal-manage-endereco > div > div > div > span{
      color: black;
    }

    .endereco-skeleton{
      display: flex;
      width: 33%;
      flex-direction: column;
    }
    
    @media (max-width: 902px){
      .endereco-skeleton{
        width: 100%;
      }
    }

    .skeleton-endereco{
      padding-left: 15px;
    }

    ::ng-deep .skeleton-endereco > p-skeleton > div{
      background-color: #AFC8E4;
    }

    ::ng-deep .scrollpanel-endereco > div{
      height: 100% !important;
    }

    ::ng-deep .fieldset-display-endereco > fieldset,
    ::ng-deep .fieldset-endereco > fieldset {
      border: 0;
    }

    ::ng-deep .fieldset-endereco > fieldset{
      background-color: #84A5C8;
    }

    ::ng-deep .fieldset-display-endereco > fieldset{
      background-color: #AFC8E4;
    }

    ::ng-deep .fieldset-display-endereco > fieldset > legend > span{
      font-size: 27px;
      color: white;
    }

    ::ng-deep .fieldset-endereco > fieldset > legend > span{
      font-size: 22px;
      color: white;
    }

    ::ng-deep .fieldset-display-endereco > fieldset > legend,
    ::ng-deep .fieldset-endereco > fieldset > legend{
      background-color: #1B4A96;
      border: 0;
    }

    .endereco,
    .enderecos{
      display: flex;
      align-items: center;
    }

    ::ng-deep .button-actions > p-button > button {
      background-color: #1B4A96
    }

    ::ng-deep .button-actions {
      display: flex;
      justify-content: flex-end;
    }

    ::ng-deep .button-actions > p-button {
      margin: 0px 5px;
    }
  
    .endereco-info{
      color: black;
      padding: 10px 0px;
      display: flex;
      align-items: center;
    }

    .endereco-info > span > b{
      margin-right: 5px;
    }

    .endereco-info > span{
      font-size: 20px;
    }

    .endereco-info-skeleton > span{
      display: flex;
    }
    .endereco-content{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .enderecos{
      justify-content: center;
      flex-direction: column;
    }

    .endereco{
      padding: 15px;
      width: 90%;
      display: flex;
    }

    ::ng-deep .endereco > p-fieldset{
      width: 100%
    }
  `,
    providers: [MessageService],
    imports: [FieldsetModule, ToastModule, ScrollPanelModule, ButtonModule, NxtPaginatorComponent, SkeletonModule, NxtPerfilEnderecoDeleteComponent, DialogModule, NxtEnderecoAddComponent, CEPPipe, NxtEnderecoEditComponent]
})
export class NxtPerfilEnderecoListComponent {
  @Input() enderecos: Endereco[] = [];
  @Input() rows: number = 2;
  @Input() first: number = 0;
  @Input() total_records: number = 0;
  @Input() loading: boolean = true;
  @Input() user!: UserAuth0;
  @Output() onPageChange = new EventEmitter();

  private messageService = inject(MessageService);

  visibleAdd: boolean = false;
  visibleEdit: boolean = false;
  id_endc!: number;
  enderecoSelected!: Endereco;
  
  successMsg(severity: string, message: string, summary: string){
    this.messageService.add({ severity: severity, summary: message, detail: summary});
  }

}
