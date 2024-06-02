import { TestBed } from '@angular/core/testing';

import { NxtPerfilPedidoService } from './nxt-perfil-pedido.service';

describe('NxtPerfilPedidoService', () => {
  let service: NxtPerfilPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtPerfilPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
