import { TestBed } from '@angular/core/testing';

import { NxtCepFindService } from './nxt-cep.service';

describe('NxtCepService', () => {
  let service: NxtCepFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtCepFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
