import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedInUser = localStorage.getItem('loggedInUser');
  const authToken = localStorage.getItem('authToken');

  if (loggedInUser && authToken) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
