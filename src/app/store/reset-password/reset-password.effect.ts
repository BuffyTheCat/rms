import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResetPasswordAction } from './reset-password.action';
import { ResetPasswordService } from 'src/app/services/reset-pass.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class ResetPasswordEffects {

constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthenticationService,
    private reset: ResetPasswordService
) { }

resetPass$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ResetPasswordAction),
        switchMap(({idToken, password}) => this.reset.resetPass({idToken, password}).toPromise()),
        map(() => {
            this.router.navigate(['/login'])
            this.auth.logout();
        }),
    ), { dispatch: false });
}

