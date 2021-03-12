import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { logoutAction } from './logout.action';

@Injectable()
export class LogoutEffects {

constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private router: Router
) { }

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      map(() => {
          this.router.navigate(['/login'])
          return this.auth.logout()
      })
    ), { dispatch: false });
}