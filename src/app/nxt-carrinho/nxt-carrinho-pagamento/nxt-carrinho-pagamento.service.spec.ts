import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoPagamentoService } from './nxt-carrinho-pagamento.service';

describe('NxtCarrinhoPagamentoService', () => {
  let service: NxtCarrinhoPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
