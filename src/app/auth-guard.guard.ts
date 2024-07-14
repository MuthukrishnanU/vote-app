import { CanActivateFn, Router } from '@angular/router';
import { UserAuthServiceService } from './services/user-auth-service.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let userAuthService = inject(UserAuthServiceService);
  let router = inject(Router);
  let isUserLoggedIn = userAuthService.isUserLoggedIn.value || userAuthService.isUserLoginAuth;
  if(isUserLoggedIn){
    return true;
  }
  else{
    return router.navigateByUrl('login');
  }
};
