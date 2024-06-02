import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilPedidoListComponent } from './nxt-perfil-pedido-list.component';

describe('NxtPerfilPedidoListComponent', () => {
  let component: NxtPerfilPedidoListComponent;
  let fixture: ComponentFixture<NxtPerfilPedidoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilPedidoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
