import { TestBed } from '@angular/core/testing';

import { NxtPerfilEnderecoService } from './nxt-perfil-endereco.service';

describe('NxtPerfilEnderecoService', () => {
  let service: NxtPerfilEnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtPerfilEnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
