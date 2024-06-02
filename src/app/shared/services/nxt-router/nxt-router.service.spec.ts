import { TestBed } from '@angular/core/testing';

import { NxtRouterService } from './nxt-router.service';

describe('RouterService', () => {
  let service: NxtRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
