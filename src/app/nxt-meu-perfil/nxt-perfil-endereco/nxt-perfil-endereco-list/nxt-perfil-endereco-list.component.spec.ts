import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoListComponent } from './nxt-perfil-endereco-list.component';

describe('NxtPerfilEnderecoListComponent', () => {
  let component: NxtPerfilEnderecoListComponent;
  let fixture: ComponentFixture<NxtPerfilEnderecoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilEnderecoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilEnderecoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
