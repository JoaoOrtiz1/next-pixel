import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoEnderecoService } from './nxt-carrinho-endereco.service';

describe('NxtCarrinhoEnderecoService', () => {
  let service: NxtCarrinhoEnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoEnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
