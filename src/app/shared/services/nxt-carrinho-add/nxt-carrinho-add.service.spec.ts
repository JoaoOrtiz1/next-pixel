import { TestBed } from '@angular/core/testing';

import { NxtCarrinhoAddService } from './nxt-carrinho-add.service';

describe('NxtCarrinhoAddService', () => {
  let service: NxtCarrinhoAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCarrinhoAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
