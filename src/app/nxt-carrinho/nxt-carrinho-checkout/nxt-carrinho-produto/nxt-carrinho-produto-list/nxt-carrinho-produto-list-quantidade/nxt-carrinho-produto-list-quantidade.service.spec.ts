import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoListQuantidadeService } from './nxt-carrinho-produto-list-quantidade.service';

describe('NxtCarrinhoProdutoListQuantidadeService', () => {
  let service: NxtCarrinhoProdutoListQuantidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoProdutoListQuantidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
