import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoButtonService } from './nxt-carrinho-button.service';

describe('NxtCarrinhoButtonService', () => {
  let service: NxtCarrinhoButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
