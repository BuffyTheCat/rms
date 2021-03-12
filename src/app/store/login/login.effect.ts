import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { loginSuccessAction, loginAction, loginErrorAction, ClearloginErrorsAction } from './login.action'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { selectMultifactorSetting } from '../selectors';

@Injectable()
export class AuthEffects {

constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private store: Store<AppState>,
    private router: Router
) { }

multifactorSetting = this.store.select(selectMultifactorSetting);
mfa: boolean = false;


login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginAction),
    switchMap((user) => this.auth.login(user).toPromise()),
    map(() => {
      this.multifactorSetting.subscribe((mfa) => {
        this.mfa = mfa
      })

      if(!this.mfa) {
        this.router.navigateByUrl('/home')
      } else {
        this.router.navigateByUrl('/questions')
      }

      return loginSuccessAction()
    }),
    catchError((e, caught) => {
      this.store.dispatch(ClearloginErrorsAction())
      this.store.dispatch(loginErrorAction({error: e.error.error.message}))
      return caught})
  ));
}