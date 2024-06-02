import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoFormComponent } from './nxt-perfil-endereco-form.component';

describe('NxtPerfilEnderecoFormComponent', () => {
  let component: NxtPerfilEnderecoFormComponent;
  let fixture: ComponentFixture<NxtPerfilEnderecoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilEnderecoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilEnderecoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
