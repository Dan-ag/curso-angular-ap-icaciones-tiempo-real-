import { TestBed } from '@angular/core/testing';

import { GuardUserService } from './user-guard';

describe('GuardUserService', () => {
  let service: GuardUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
