import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoDeleteService } from './nxt-carrinho-produto-delete.service';

describe('NxtCarrinhoProdutoDeleteService', () => {
  let service: NxtCarrinhoProdutoDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoProdutoDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
