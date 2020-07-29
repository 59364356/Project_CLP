import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// export class guardCheck implements CanActivate{
//   constructor(private _guardCheck: )
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {

//   }
// }

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
