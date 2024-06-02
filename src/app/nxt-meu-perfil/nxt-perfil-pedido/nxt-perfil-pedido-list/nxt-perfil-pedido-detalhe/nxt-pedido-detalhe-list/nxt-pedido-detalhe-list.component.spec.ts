import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPedidoDetalheListComponent } from './nxt-pedido-detalhe-list.component';

describe('NxtPedidoDetalheListComponent', () => {
  let component: NxtPedidoDetalheListComponent;
  let fixture: ComponentFixture<NxtPedidoDetalheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPedidoDetalheListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPedidoDetalheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
