import { TestBed } from '@angular/core/testing';

import { NxtMeuPerfilService } from './nxt-meu-perfil.service';

describe('NxtMeuPerfilService', () => {
  let service: NxtMeuPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtMeuPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
