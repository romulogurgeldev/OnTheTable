import { TestBed } from '@angular/core/testing';

import { AuthGuardAdmGuard } from './auth-guard-adm.guard';

describe('AuthGuardAdmGuard', () => {
  let guard: AuthGuardAdmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardAdmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
