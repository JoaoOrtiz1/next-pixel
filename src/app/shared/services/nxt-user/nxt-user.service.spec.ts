import { TestBed } from '@angular/core/testing';

import { NxtUserService } from './nxt-user.service';

describe('NxtUserService', () => {
  let service: NxtUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
