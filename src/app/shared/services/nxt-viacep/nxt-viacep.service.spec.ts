import { TestBed } from '@angular/core/testing';

import { NxtViacepService } from './nxt-viacep.service';

describe('NxtViacepService', () => {
  let service: NxtViacepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtViacepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
