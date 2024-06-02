import { TestBed } from '@angular/core/testing';

import { NxtDisplayProductsService } from './nxt-display-products.service';

describe('NxtDisplayProductsService', () => {
  let service: NxtDisplayProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtDisplayProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
