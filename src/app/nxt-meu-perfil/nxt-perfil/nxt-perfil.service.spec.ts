import { TestBed } from '@angular/core/testing';

import { NxtPerfilService } from './nxt-perfil.service';

describe('NxtPerfilService', () => {
  let service: NxtPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
