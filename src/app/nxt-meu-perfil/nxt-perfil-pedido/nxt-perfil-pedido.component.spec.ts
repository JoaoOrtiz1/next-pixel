import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilPedidoComponent } from './nxt-perfil-pedido.component';

describe('NxtPerfilPedidoComponent', () => {
  let component: NxtPerfilPedidoComponent;
  let fixture: ComponentFixture<NxtPerfilPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
