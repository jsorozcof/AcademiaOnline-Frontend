import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.check().pipe(
    switchMap((authenticated) => {
      if (!authenticated) {
        return of(router.parseUrl('/auth/login'));
      }
      return of(true);
    })
  );
};
