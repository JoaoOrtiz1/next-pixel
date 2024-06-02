import { TestBed } from '@angular/core/testing';

import { NxtCepFormatService } from './nxt-cep.service';

describe('NxtCepService', () => {
  let service: NxtCepFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCepFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
