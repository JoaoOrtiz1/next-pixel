import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtMeuPerfilComponent } from './nxt-meu-perfil.component';

describe('NxtMeuPerfilComponent', () => {
  let component: NxtMeuPerfilComponent;
  let fixture: ComponentFixture<NxtMeuPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtMeuPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtMeuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
