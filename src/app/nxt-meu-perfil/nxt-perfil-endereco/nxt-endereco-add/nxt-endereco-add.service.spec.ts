import { TestBed } from '@angular/core/testing';

import { NxtEnderecoAddService } from './nxt-endereco-add.service';

describe('NxtEnderecoAddService', () => {
  let service: NxtEnderecoAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtEnderecoAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
