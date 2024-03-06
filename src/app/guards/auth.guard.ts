import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  let _authService : AuthService = inject(AuthService)
  // console.log(_authService.getRole())
  // if(_authService.getRole() == "Admin")
    return true
  return false
};

//pas utilisé dans mon cas