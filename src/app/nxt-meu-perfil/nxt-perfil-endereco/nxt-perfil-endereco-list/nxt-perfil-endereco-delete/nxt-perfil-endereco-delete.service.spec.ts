import { TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoDeleteService } from './nxt-perfil-endereco-delete.service';

describe('NxtPerfilEnderecoDeleteService', () => {
  let service: NxtPerfilEnderecoDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtPerfilEnderecoDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
