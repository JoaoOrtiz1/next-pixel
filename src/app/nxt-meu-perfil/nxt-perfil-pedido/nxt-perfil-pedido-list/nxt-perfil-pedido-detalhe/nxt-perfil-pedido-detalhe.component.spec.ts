import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilPedidoDetalheComponent } from './nxt-perfil-pedido-detalhe.component';

describe('NxtPerfilPedidoDetalheComponent', () => {
  let component: NxtPerfilPedidoDetalheComponent;
  let fixture: ComponentFixture<NxtPerfilPedidoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilPedidoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilPedidoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
