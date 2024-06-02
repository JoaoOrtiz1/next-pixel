import { TestBed } from '@angular/core/testing';

import { NxtEnderecoEditService } from './nxt-endereco-edit.service';

describe('NxtEnderecoEditService', () => {
  let service: NxtEnderecoEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtEnderecoEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
