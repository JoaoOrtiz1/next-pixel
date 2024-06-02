import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoResumoService } from './nxt-carrinho-resumo.service';

describe('NxtCarrinhoResumoService', () => {
  let service: NxtCarrinhoResumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoResumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
