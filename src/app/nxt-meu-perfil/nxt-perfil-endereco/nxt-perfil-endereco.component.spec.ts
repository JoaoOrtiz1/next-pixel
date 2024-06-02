import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoComponent } from './nxt-perfil-endereco.component';

describe('NxtPerfilEnderecoComponent', () => {
  let component: NxtPerfilEnderecoComponent;
  let fixture: ComponentFixture<NxtPerfilEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
