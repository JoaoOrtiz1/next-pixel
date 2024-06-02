import { TestBed } from '@angular/core/testing';

import { NxtProductService } from './nxt-product.service';

describe('NxtProductService', () => {
  let service: NxtProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
