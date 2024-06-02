import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoDeleteComponent } from './nxt-perfil-endereco-delete.component';

describe('NxtPerfilEnderecoDeleteComponent', () => {
  let component: NxtPerfilEnderecoDeleteComponent;
  let fixture: ComponentFixture<NxtPerfilEnderecoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilEnderecoDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilEnderecoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
