import { TestBed } from '@angular/core/testing';

import { ProtectedGuardGuard } from './protected-guard.guard';

describe('ProtectedGuardGuard', () => {
  let guard: ProtectedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
