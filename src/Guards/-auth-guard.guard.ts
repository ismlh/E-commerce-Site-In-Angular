import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let _authSer = inject(AuthServiceService);
  if (_authSer.getUserLoggedIn()) return true;
  else {
    _router.navigateByUrl('/Home');
    return false;
  }
};
