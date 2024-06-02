import { TestBed } from '@angular/core/testing';

import { NxtAuth0Service } from './nxt-auth0.service';

describe('NxtAuth0Service', () => {
  let service: NxtAuth0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtAuth0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
