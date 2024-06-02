import { TestBed } from '@angular/core/testing';

import { NxtPerfilPedidoDetalheService } from './nxt-perfil-pedido-detalhe.service';

describe('NxtPerfilPedidoDetalheService', () => {
  let service: NxtPerfilPedidoDetalheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtPerfilPedidoDetalheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
