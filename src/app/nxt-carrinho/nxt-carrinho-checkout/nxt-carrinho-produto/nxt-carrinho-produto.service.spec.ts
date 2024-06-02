import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoService } from './nxt-carrinho-produto.service';

describe('NxtCarrinhoProdutoService', () => {
  let service: NxtCarrinhoProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
