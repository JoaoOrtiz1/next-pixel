import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoPagamentoComponent } from './nxt-carrinho-pagamento.component';

describe('NxtCarrinhoPagamentoComponent', () => {
  let component: NxtCarrinhoPagamentoComponent;
  let fixture: ComponentFixture<NxtCarrinhoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoPagamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
